import { checkSchema } from 'express-validator'
import { usersController } from '~/controllers/users.controllers'
import { validate } from '~/middlewares/validation.middlewares'
import { verifyJWT } from './jwt'
import { hashPassword } from './hashPassword'
import { ErrorStatus } from '~/models/error'
import { Request } from 'express'
import { configENV } from '~/contants/configENV'
import { ModelUsers } from '~/models/model/users.model'
import mongoose from 'mongoose'


export const validationRegister = validate(checkSchema({

  name: {
    notEmpty: true,
    isLength: {
      options: {
        min: 1,
        max: 100
      }
    },
    trim: true,
    errorMessage: "không được để trống"
  },
  email: {

    isEmail: true,
    custom: {
      options: async (value, { req }) => {
        if (!value) {
          throw new Error("Trường này phải bắt buộc nhập")
        }
        const result = await usersController.checkExistsEmail(req.body.email)
        if (result) {
          throw new Error('email đã tồn tại ')
        }
        return true
      }
    }
  },

  password: {
    notEmpty: true,
    isLength: {
      options: {
        min: 6,
        max: 25
      }
    },
    isStrongPassword: {
      options: {
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      }
    }
  },
  confirmPassword: {
    notEmpty: true,
    isLength: {
      options: {
        min: 6,
        max: 25
      }
    },
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('bạn nhập lại mật khẩu chưa đúng')
        }
        return true
      }
    },
    isStrongPassword: {
      options: {
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      }
    }
  },
  date_of_birth: {
    notEmpty: true,
    isISO8601: {
      options: {
        strict: true,
        strictSeparator: true
      }
    }
  }
}, ['body']))

export const validationLogin = validate(checkSchema({
  email: {

    isEmail: true,
    custom: {
      options: async (value, { req }) => {
        if (!value) {
          throw new Error('Trường này phải bắt buộc nhập')
        }
        const result = await usersController.checkExistsEmail(req.body.email)
        if (!result) {
          throw new ErrorStatus({ message: "email bạn đăng nhập sai", status: 403 })
        } else {
          const compare = hashPassword(req.body.password)
          if (!compare) {
            throw new ErrorStatus({ message: "mật khẩu bạn nhập sai", status: 403 })
          } else {
            return true
          }
        }

      }
    }
  },
  password: {
    notEmpty: true,
    isLength: {
      options: {
        min: 6,
        max: 25
      }
    },
    isStrongPassword: {
      options: {
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      }
    }
  },

}, ['body']))

export const validitionAccessToken = validate(checkSchema({
  access_token: {
    custom: {
      options: async (value, { req }) => {
        const authorizationHeader = (req as Request).headers.authorization
        if (authorizationHeader) {
          const access_token = authorizationHeader.split(' ')[1]

          if (!access_token) {
            throw new ErrorStatus({
              message: "bạn chưa có quyền",
              status: 401
            })
          }
          try {
            const decoded = await verifyJWT({ token: access_token, privateKey: configENV.ACCESS_TOKEN })
            req.access_token = decoded
          }
          catch (error) {
            throw new ErrorStatus({
              message: "access_token đã hết hạn",
              status: 401
            })
          }


        }
      }
    }
  }
}, ['headers']))

export const validationRefreshToken = validate(checkSchema({

  refresh_token: {
    trim: true,
    custom: {
      options: async (value, { req }) => {
        if (!value) {
          throw new ErrorStatus({
            message: "refresh_token không được để trống",
            status: 401
          })
        }
        try {
          const decodedRefreshToken = await verifyJWT({ token: value, privateKey: configENV.REFRESH_TOKEN })
          req.refresh_token = decodedRefreshToken
        } catch (error) {

          throw new ErrorStatus({
            message: "refresh_token đã hết hạn",
            status: 401
          })
        }






      }
    }
  }
}, ['body']))

export const validationVerifyEmail = validate(checkSchema({
  email_token_verify: {

    trim: true,
    custom: {
      options: async (value, { req }) => {
        if (!value) {
          throw new ErrorStatus({
            message: "không được để trống trường này",
            status: 401
          })
        }
        try {
          const decodedVerifyEmail = await verifyJWT({ token: value, privateKey: configENV.ACCESS_TOKEN })
          req.email_verify_token = decodedVerifyEmail
        }
        catch (error) {
          throw new ErrorStatus({
            message: "mã của bạn không đúng",
            status: 401
          })
        }
        return true
      }
    }
  }
}, ['body']))

export const validationForgotPassword = validate(checkSchema({
  email: {
    custom: {
      options: async (value, { req }) => {
        if (!value) {
          throw new Error("email bắt buộc phải nhập")
        }
        const checkExistsEmail = await usersController.checkExistsEmail(value)
        if (checkExistsEmail === null) {
          throw new ErrorStatus({
            status: 401,
            message: "email bạn nhập không đúng"
          })
        }
        return true
      }
    }
  }
}, ['body']))

export const validationVerifyForgotPassword = validate(checkSchema({
  fotgot_password_verify: {
    custom: {
      options: async (value, { req }) => {
        if (!value) {
          throw new Error('Trường này không được để trống')
        }
        try {
          const decodeVerifyForgotPassword = await verifyJWT({ token: value, privateKey: configENV.ACCESS_TOKEN })
          req.decodeVerifyForgotPassword = decodeVerifyForgotPassword
        }
        catch (e) {
          throw new ErrorStatus({
            message: "token của bạn đã hết hạn hoặc không đúng",
            status: 401
          })
        }

      }
    }
  }

}, ['body']))

export const validationResetPassword = validate(checkSchema({
  password: {
    notEmpty: true,
    trim: true,
    isLength: {
      options: {
        min: 6,
        max: 30
      }
    },
    isStrongPassword: {
      options: {
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      }
    }
  },
  confirmPassword: {
    notEmpty: true,
    trim: true,
    isStrongPassword: {
      options: {
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      }
    },
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("bạn nhập lại mật khẩu chưa đúng")
        }
        return true
      }
    }
  }

}, ['body']))

export const validationChangePassowrd = validate(checkSchema({
  passwordOld: {
    trim: true,
    custom: {
      options: async (value, { req }) => {
        if (!value) {
          throw new Error("trường này bắt buộc phải nhập")
        }
        const { user_id } = req.access_token
        console.log(user_id)
        const checkPassword = await ModelUsers.findOne({ password: hashPassword(req.body.passwordOld), _id: new mongoose.Types.ObjectId(user_id) })

        if (!checkPassword) {
          throw new ErrorStatus({
            message: "mật khẩu bạn nhập chưa đúng",
            status: 401
          })
        }
        return true

      }
    }
  },
  newPassword: {

    trim: true,
    isLength: {
      options: {
        min: 6,
        max: 20
      }
    },
    isStrongPassword: {
      options: {
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      }
    }

  },
  newConfirmPassword: {

    trim: true,
    isStrongPassword: {
      options: {
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      }
    },
    custom: {
      options: (value, { req }) => {
        if (!value) {
          throw new Error("Trường này bắt buộc phải nhập")
        }
        else {
          if (value !== req.body.newPassword) {
            throw new Error("bạn nhập lại mật khẩu chưa đúng")
          }
          return true
        }

      }
    }
  }
}, ['body']))

export const validationAccount = validate(checkSchema({
  name: {
    notEmpty: true,
    isLength: {
      options: {
        min: 1,
        max: 100
      }
    },
    trim: true,
    errorMessage: "không được để trống"
  },
  date_of_birth: {
    notEmpty: true,
    isISO8601: {
      options: {
        strict: true,
        strictSeparator: true
      }
    }
  },
  website: {
    notEmpty: true,
  },
  avatar: {
    notEmpty: true,
  },
  bio: {
    notEmpty: true,
  },
}, ['body']))
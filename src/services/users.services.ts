import { ModelUsers } from '~/models/model/users.model'
import { UserType } from '~/types/users.types'
import mongoose from 'mongoose'
import { hashPassword } from '~/utils/hashPassword'
import { singJWT } from '~/utils/jwt'
import { configENV } from '~/contants/configENV'
import { modelRefreshToken } from '~/models/model/refreshToken.model'
import { VerifyType } from '~/models/schema/users.shema'
import { modelFollower } from '~/models/model/follower.model'

type RegisterType = Pick<UserType, 'email' | 'password' | 'name' | 'date_of_birth'>
export const userServices = {
  
  accessToken: (user_id: string, date: string) => {
    return singJWT({ token: { user_id: user_id }, privateKey: configENV.ACCESS_TOKEN, option: { expiresIn: date } })
  },

  refreshToken: (id: string, exp?: number) => {
    if (exp) {
      return singJWT({ token: { user_id: id, exp: exp }, privateKey: configENV.REFRESH_TOKEN })
    } else {
      return singJWT({ token: { user_id: id }, privateKey: configENV.REFRESH_TOKEN, option: { expiresIn: '7d' } })
    }
  },

  register: async (payload: RegisterType) => {
    const user_id = new mongoose.Types.ObjectId()
    const email_token_verifier = await userServices.accessToken(user_id.toString() as string, '10d')
    const result = await ModelUsers.create({
      ...payload,
      password: hashPassword(payload.password),
      email_token_verify: email_token_verifier,
      username: payload.name,
      _id: user_id
    })
 
    const [access_token, refresh_token, user] = await Promise.all([
      userServices.accessToken(result._id.toString(), '2d'),
      userServices.refreshToken(result._id.toString()),
      ModelUsers.findById({ _id: result._id }).select(
        '-verify -email_token_verify -confirmPassword -fotgot_password_verify'
      )
    ])

    await modelRefreshToken.create({
      token: result._id,
      refresh_token
    })
    return {
      access_token,
      refresh_token,
      user
    }
  },
  login: async (payload: Pick<RegisterType, 'email' | 'password'>) => {
    const result = await ModelUsers.findOne({ email: payload.email }).select(
      '-verify -email_token_verify -confirmPassword -fotgot_password_verify'
    ) as UserType

    const [access_token, refresh_token] = await Promise.all([
      userServices.accessToken(result._id as string, '7d'),
      userServices.refreshToken(result._id as string)
    ])

    await modelRefreshToken.create({
      token: result._id, refresh_token
    })

    return {
      access_token,
      refresh_token,
      user: result
    }
  },
  logout: async (user_id: string) => {
    await modelRefreshToken.deleteOne({ token: user_id })
    return {
      messsage: "logout successfully"
    }
  },
  refresh_token: async (user_id: string, refresh_token: string, exp: number) => {
    const [access_token, refreshToken,] = await Promise.all([
      userServices.accessToken(user_id, '2d'),
      userServices.refreshToken(user_id, exp),
      modelRefreshToken.deleteOne({ refresh_token })]);
    await modelRefreshToken.create({ token: user_id, refresh_token })
    return { access_token, refresh_token: refreshToken }
  },
  verify_email: async (user_id: string) => {

    const result = await ModelUsers.findOneAndUpdate({
      _id: user_id
    },
      {
        $set: {
          email_token_verify: "",
          verify: VerifyType.Verified,

        },
        $currentDate: {
          updated_at: true
        }
      },
      {
        new: true
      }
    )
    return result
  },
  forgot_password: async (user_id: string) => {
    const forgot_password_verified = await userServices.accessToken(user_id, '2d')

    const result = await ModelUsers.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(user_id) },
      {
        $set: {
          fotgot_password_verify: forgot_password_verified
        },
        $currentDate: {
          updated_at: true
        }
      }, {
      new: true
    })

    return result

  },
  verifyForgotPassword: async (user_id: string) => {
    const result = await ModelUsers.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(user_id) }, {
      $set: {
        fotgot_password_verify: ""
      },
      $currentDate: {
        updated_at: true
      }
    }, {
      new: true
    })
    return result
  },
  resetPassword: async (user_id: string, newPassword: string) => {
    const result = await ModelUsers.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(user_id) }, {
      $set: {
        fotgot_password_verify: "",
        password: hashPassword(newPassword)

      },
      $currentDate: {
        updated_at: true
      }
    }, { new: true })
    return result
  },
  getMe: async (user_id: string) => {
    const result = await ModelUsers.findOne({ _id: new mongoose.Types.ObjectId(user_id) }).select('-verify -email_token_verify -fotgot_password_verify -confirmPassword')
    return result
  },
  getProfile: async (id: string) => {
    const result = await ModelUsers.findById({ _id: new mongoose.Types.ObjectId(id) }).select('-verify -email_token_verify -fotgot_password_verify -password')
    return result
  },

  follower: async ({ id, user_id }: { id: string, user_id: string }) => {
    const result = await modelFollower.create({
      user_id_followed: id,
      user_id_follower: user_id
    })
    return result
  },
  changePassword: async (user_id: string, newPassword: string) => {
    const result = await ModelUsers.findByIdAndUpdate({ _id: user_id }, {
      $set: {
        password: hashPassword(newPassword)
      },
      $currentDate: {
        updated_at: true
      }
    }, {
      new: true
    })
    return result
  },

  changeAccount: async (user_id: string, body: Pick<UserType, 'name' | 'website' | 'bio' | 'avatar' | 'date_of_birth'>) => {
    const result = await ModelUsers.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(user_id) }, {
      $set: {
        website: body.website,
        bio: body.bio,
        avatar: body.avatar,
        date_of_birth: body.date_of_birth,
        name: body.name,
        username: body.name
      },
      $currentDate: {
        updated_at: true
      }
    }, {
      new: true
    }).select('-verify -fotgot_password_verify -email_token_verify')
    return result
  }
}

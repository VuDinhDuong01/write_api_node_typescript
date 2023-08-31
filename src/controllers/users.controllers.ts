/* eslint-disable prettier/prettier */
import { Response, Request } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'


import { ModelUsers } from '~/models/model/users.model'
import { userServices } from '~/services/users.services'
import { TypePayloadRequest } from '~/type'
import { UserType } from '~/types/users.types'

export const usersController = {
  register: async (req: Request<ParamsDictionary, any, Pick<UserType, 'email' | 'password' | 'confirmPassword' | 'name' | 'date_of_birth'>>, res: Response) => {

    const result = await userServices.register(req.body)
    return res.json({
      message: 'register successfully',
      data: result
    })

  },

  checkExistsEmail: async (email: string) => {
    const checkEmail = await ModelUsers.findOne({ email })
    return checkEmail
  },

  login: async (req: Request<ParamsDictionary, any, Pick<UserType, 'email' | 'password'>>, res: Response) => {

    const result = await userServices.login(req.body)
    return res.json({
      message: 'login successfully',
      data: result
    })

  },
  logout: async (req: Request, res: Response) => {
    const { user_id } = req.refresh_token as TypePayloadRequest


    const result = await userServices.logout(user_id)
    return res.json(result)

  },
  refresh_token: async (req: Request, res: Response) => {
    const { user_id, exp } = req.refresh_token as TypePayloadRequest
    const { refresh_token } = req.body

    const result = await userServices.refresh_token(user_id, refresh_token, exp)
    return res.json({
      message: "refresh token successfully",
      result
    })
  },
  verify_email: async (req: Request, res: Response) => {

    const { user_id } = req.email_verify_token as TypePayloadRequest
    await userServices.verify_email(user_id)
    return res.json({
      message: "bạn đã xác thực tài khoản thành công"
    })

  },
  forgot_password: async (req: Request, res: Response) => {

    const { email } = req.body
    const user = await ModelUsers.findOne({ email })

    user !== null && await userServices.forgot_password(user._id.toString())
    return res.json({
      message: "bạn kiểm tra email để verify"
    })


  },
  verifyForgotPassword: async (req: Request, res: Response) => {
    const { user_id } = req.decodeVerifyForgotPassword as TypePayloadRequest
    await userServices.verifyForgotPassword(user_id)
    return res.json({
      message: "bạn đã verify thành công"
    })
  },
  resetPassword: async (req: Request, res: Response) => {

    const { user_id } = req.params
    console.log(user_id)
    const { password } = req.body
    await userServices.resetPassword(user_id, password)
    return res.json({
      message: "bạn đã đổi mật khẩu thành công"
    })


  },
  getMe: async (req: Request, res: Response) => {

    const { user_id } = req.access_token as TypePayloadRequest
    const result = await userServices.getMe(user_id)
    return res.json({
      message: "lấy thông tin thành công",
      data: result
    })

  },
  getProfile: async (req: Request, res: Response) => {

    const { id } = req.params
    const result = await userServices.getProfile(id)
    return res.json({
      message: "lấy thông tin bạn bè thành công",
      data: result
    })

  },
  follower: async (req: Request, res: Response) => {

    const { id } = req.params;
    const { user_id } = req.access_token as TypePayloadRequest
    const result = await userServices.follower({ id, user_id })
    return res.json({
      message: "bạn đã follow người khác thành công",
      data: result
    })


  },
  changePassword: async (req: Request, res: Response) => {

    const { user_id } = req.access_token as TypePayloadRequest
    const { newPassword } = req.body
    await userServices.changePassword(user_id, newPassword)
    return res.json({
      message: "thay đổi mật khẩu thành công"
    })


  },
  changeAccount: async (req: Request, res: Response) => {
    const { user_id } = req.access_token as TypePayloadRequest
    const result = await userServices.changeAccount(user_id, req.body)
    return res.json({
      message: "thay đổi tài khoản thành công",
      data: result
    })

  },
  oauthGoogle:async (req: Request, res: Response) => {

  }
}

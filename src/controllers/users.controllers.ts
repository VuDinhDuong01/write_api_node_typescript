/* eslint-disable prettier/prettier */
import { Response, Request } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
// import { modelRefreshToken } from '~/models/model/refreshToken.model'

import { ModelUsers } from '~/models/model/users.model'
import { userServices } from '~/services/users.services'
import { TypePayloadRequest } from '~/type'
import { UserType } from '~/types/users.types'

export const usersController = {
  register: async (req: Request<ParamsDictionary, any, Pick<UserType, 'email' | 'password' | 'confirmPassword' | 'name' | 'date_of_birth'>>, res: Response) => {
    try {
      const result = await userServices.register(req.body)
      return res.json({
        message: 'register successfully',
        data: result
      })
    } catch (err) {
      console.log(err)
    }
  },

  checkExistsEmail: async (email: string) => {
    const checkEmail = await ModelUsers.findOne({ email })
    return checkEmail
  },

  login: async (req: Request<ParamsDictionary, any, Pick<UserType, 'email' | 'password'>>, res: Response) => {
    try {
      const result = await userServices.login(req.body)
      return res.json({
        message: 'login successfully',
        data: result
      })
    } catch (err) {
      console.log(err)
    }
  },
  logout: async (req: Request, res: Response) => {
    const { user_id } = req.refresh_token as TypePayloadRequest

    try {
      const result = await userServices.logout(user_id)
      return res.json(result)
    }
    catch (err) {
      console.log(err)
    }
  },
  refresh_token: async (req: Request, res: Response) => {
    const { user_id } = req.refresh_token as TypePayloadRequest
    const result = await userServices.refresh_token(user_id)

    return res.json({
      message: "refresh token successfully",
      result
    })
  },
  verify_email: async (req: Request, res: Response) => {
    try {
      const { user_id } = req.email_verify_token as TypePayloadRequest
      await userServices.verify_email(user_id)
      return res.json({
        message: "bạn đã xác thực tài khoản thành công"
      })
    }
    catch (error) {
      console.log(error)
    }
  },
  forgot_password: async (req: Request, res: Response) => {
    try {
      const { email } = req.body
      const user = await ModelUsers.findOne({ email })

      user !== null && await userServices.forgot_password(user._id.toString())
      return res.json({
        message: "bạn kiểm tra email để verify"
      })

    }
    catch (error) {
      console.log(error)
    }
  },
  verifyForgotPassword: async (req: Request, res: Response) => {
    try {
      const { user_id } = req.decodeVerifyForgotPassword as TypePayloadRequest
      await userServices.verifyForgotPassword(user_id)
      return res.json({
        message: "bạn đã verify thành công"
      })
    }

    catch (error) {
      console.log(error)
    }

  },
  resetPassword:async(req:Request, res:Response)=>{
    try{
      const { user_id } = req.params
      console.log(user_id)
      const {password} = req.body
      await userServices.resetPassword(user_id,password)
      return res.json({
        message:"bạn đã đổi mật khẩu thành công"
      })
    }

    catch(error) {
      console.log(error)
    }
  },
  getMe:async(req: Request, res: Response)=>{
    try{
      const {user_id}= req.access_token as TypePayloadRequest
      const result =await userServices.getMe(user_id)
      return res.json({
        message:"lấy thông tin thành công",
        data:result
      })
    }catch(error) {
      console.log(error)
    }
  },
  
  getProfile:async(req:Request<ParamsDictionary, any,{id:string}>, res:Response)=>{
   try{
    const {id} = req.params
    const result = await userServices.getProfile(id)
    return res.json({
      message:"lấy thông tin bạn bè thành công",
      data:result
    })
  
   }
   catch(error){
    console.log(error)
   }
  },
  follower:async(req:Request, res:Response)=>{
    try{
      const {id}=req.params;
      const {user_id}= req.access_token as TypePayloadRequest
      const result = await userServices.follower({id,user_id})
      return res.json({
        message:"bạn đã follow người khác thành công",
        data:result
      })
    }catch(error){
      console.log(error)
    }

  },
  changePassword:async(req:Request, res:Response)=>{
    try{
      const {user_id}= req.access_token as TypePayloadRequest
      const result = await  userServices.changePassword(user_id)
    }catch(error){
      console.log(error)
    }

  }
}

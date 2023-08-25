export interface TypePayloadRequest {
  user_id: string
  iat: number
  exp: number
}

declare module 'express' {

  interface Request {
    access_token?: TypePayloadRequest
    refresh_token?: TypePayloadRequest
    email_verify_token?: TypePayloadRequest
    decodeVerifyForgotPassword?: TypePayloadRequest
  }
  
}
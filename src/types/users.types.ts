import { ObjectId } from "mongoose"

export interface UserType {
  _id?: string ,
  name: string,
  email: string,
  password: string
  confirmPassword?: string,
  verify?: string,
  email_token_verify?: string,
  fotgot_password_verify?: string
  bio?: string,
  username?: string,
  website?: string
  avatar?: string
  created_at: Date
  updated_at?: Date
  date_of_birth?: Date
}
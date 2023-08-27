import mongoose, { Schema } from 'mongoose'

import { UserType } from '~/types/users.types';

export enum VerifyType {
  Unverified,
  Verified
}

const date = new Date();
export const UserSchema: Schema<UserType> = new mongoose.Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  bio: { type: String, default: '' },
  created_at: { type: Date, default: date },
  password: { type: String, default: '' },
  verify: { type: String, default: VerifyType.Unverified },
  email_token_verify: { type: String, default: '' },
  fotgot_password_verify: { type: String, default: '' },
  username: { type: String, default: '' },
  website: { type: String, default: '' },
  avatar: { type: String, default: '' },
  updated_at: { type: Date, default: date },
  date_of_birth: { type: Date, default: date },
},
  {
    collection: 'users'
  }
);
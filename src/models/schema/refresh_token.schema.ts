import mongoose, { Schema } from 'mongoose'


export type RefreshTokenType = {
  token: string,
  refresh_token: string,
  created_at?: Date,
  updated_at?: Date
}

const date = new Date();
export const RefreshTokenSchema: Schema<RefreshTokenType> = new mongoose.Schema({
  token: { type: String, default: '' },
  refresh_token: { type: String, default: '' },
  created_at: { type: Date, default: date },
  updated_at: { type: Date, default: date }
},
  {
    collection: 'refresh_token'
  });
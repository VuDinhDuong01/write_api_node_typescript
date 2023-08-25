import mongoose, { Schema } from 'mongoose'

export type FollowerType = {
  user_id_follower: string,
  user_id_followed: string
  created_at?: Date,
  updated_at?: Date
}

const date = new Date();
export const FollowerSchema: Schema<FollowerType> = new mongoose.Schema({
  user_id_follower: { type: String, default: '' },
  user_id_followed: { type: String, default: '' },
  created_at: { type: Date, default: date },
  updated_at: { type: Date, default: date }
},
  {
    collection: 'follower'
  });
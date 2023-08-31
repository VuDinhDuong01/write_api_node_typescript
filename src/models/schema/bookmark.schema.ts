import mongoose, { Schema } from 'mongoose'

export type BookMarkType = {
  user_id: string
  post_id: string
  created_at?: Date
  updated_at?: Date
}

const date = new Date();
export const BookmarkSchema: Schema<BookMarkType> = new mongoose.Schema({
  user_id: { type: String, default: '' },
  post_id: { type: String, default: '' },
  created_at: { type: Date, default: date },
  updated_at: { type: Date, default: date }
},
  {
    collection: 'bookmark'
  });
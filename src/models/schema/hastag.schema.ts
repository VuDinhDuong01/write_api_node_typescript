import mongoose, { Schema } from 'mongoose'

export type HastagType = {
  user_id: string
  hastag: string[]
  created_at?: Date
  updated_at?: Date
}

const date = new Date();
export const HastagSchema: Schema<HastagType> = new mongoose.Schema({
  user_id: { type: String, default: '' },
  hastag: { type: [String], default: [] },
  created_at: { type: Date, default: date },
  updated_at: { type: Date, default: date }
},
  {
    collection: 'hastag'
  });
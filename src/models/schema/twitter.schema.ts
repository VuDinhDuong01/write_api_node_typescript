import mongoose, { ObjectId, Schema } from 'mongoose'
enum MediaType {
  Image,
  Video
}
enum TweetType {
  Tweet,
  Retweet,
  Comment,
  QuoteTweet
}
enum TweetAudience {
  Everyone,
  FeopleFlower
}

export type TwitterType = {
  _id?: ObjectId
  content: string
  hastag: string[]
  user_id: string
  created_at: Date
  updated_at: Date
  media: MediaType[]
  guest_views: number
  user_views: number
  parent_id: null | string
  typeTweet: TweetType
  audience: TweetAudience
}

const date = new Date()
export const TwitterSchema: Schema<TwitterType> = new mongoose.Schema(
  {
    typeTweet: { type: Number, default: TweetType.Tweet },// kiểu bài đăng là Tweet hay là  comment ...
    content: { type: String, default: '' }, // nội dung
    user_views: { type: Number, default: 0 },// tăng lượt like khi có user đăng nhập
    guest_views: { type: Number, default: 0 },// tăng lượt like khi có user đăng nhập
    user_id: { Type: String, default: '' },// user_id
    media: { type: [MediaType], default: [] },// post image or video
    parent_id: { type: String, default: '' }, //
    hastag: { type: [String], default: [] },// thêm hastage
    created_at: { type: Date, default: date },
    updated_at: { type: Date, default: date },
    audience: { type: Number, default: TweetAudience.Everyone } // đăng công khai cho mn hoặc chỉ những người flower
  },
  {
    collection: 'twitter'
  }
)

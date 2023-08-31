
import mongoose, { Model } from 'mongoose';
import { LikeSchema, LikeType } from '../schema/like.schema';
export const modelLike: Model<LikeType> = mongoose.model('modelLike', LikeSchema);
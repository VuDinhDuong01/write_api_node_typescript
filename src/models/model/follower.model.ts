import { FollowerSchema, FollowerType } from '../schema/follower.schema';
import mongoose, { Model } from 'mongoose';

export const modelFollower: Model<FollowerType> = mongoose.model('modelFollower', FollowerSchema);
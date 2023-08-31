import { TwitterType, TwitterSchema } from '../schema/twitter.schema';
import mongoose, { Model } from 'mongoose';

export const modelTweet: Model<TwitterType> = mongoose.model('modelTweet', TwitterSchema);
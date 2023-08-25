import { RefreshTokenSchema, RefreshTokenType } from '../schema/refresh_token.schema';
import mongoose, { Model } from 'mongoose';

export const modelRefreshToken: Model<RefreshTokenType> = mongoose.model('modelRefreshToken', RefreshTokenSchema);
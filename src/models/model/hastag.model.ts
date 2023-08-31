
import mongoose, { Model } from 'mongoose';
import { HastagSchema, HastagType } from '../schema/hastag.schema';

export const modelHastag: Model<HastagType> = mongoose.model('modelHastag', HastagSchema);
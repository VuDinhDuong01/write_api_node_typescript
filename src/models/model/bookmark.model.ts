import { BookMarkType, BookmarkSchema } from '../schema/bookmark.schema';
import mongoose, { Model } from 'mongoose';

export const modelBookMark: Model<BookMarkType> = mongoose.model('modelBookMark', BookmarkSchema);
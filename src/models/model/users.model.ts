import { UserType } from '~/types/users.types';
import {UserSchema} from '../schema/users.shema'
import mongoose ,{Model} from 'mongoose';

export const ModelUsers:Model<UserType>=mongoose.model('modelUsers',UserSchema );
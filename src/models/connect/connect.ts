import mongoose from "mongoose"
import { ModelUsers } from "../model/users.model"
import { modelRefreshToken } from "../model/refreshToken.model"


export const createEmailIndexUser = async () => {
  const checkExistsIndex = await ModelUsers.collection.indexExists(['email_1', 'email_1_password_1', 'password_1'])
  if (!checkExistsIndex) {
    await ModelUsers.collection.createIndex({ email: 1 }, { unique: true, })
    await ModelUsers.collection.createIndex({ email: 1, password: 1 }, { unique: true })
    await ModelUsers.collection.createIndex({ password: 1 }, { unique: true })
  }
}

export const createIndexRefresToken=async()=>{
  const checkExistsIndex= await modelRefreshToken.collection.indexExists('refresh_token_1')
  if(!checkExistsIndex){
    await modelRefreshToken.collection.createIndex({refresh_token:1},{unique:true})
  }
}



export const connectDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/Twitter_clone')
    console.log('connect successfully')
  }
  catch (err) {
    console.log('connect failed')
  }
}
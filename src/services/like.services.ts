import { modelLike } from "~/models/model/like.model"

export const  likeServices= {
  like:async({user_id, post_id}:{user_id:string , post_id:string})=>{
    const result= await modelLike.create({user_id:user_id, post_id:post_id})
    return {
      message: "post like successfully",
      data:result
    }

  },
  unLike:async({user_id, post_id}:{user_id:string , post_id:string})=>{
     await modelLike.deleteOne({user_id:user_id, post_id:post_id})
    return {
      message:"unlike successfully"
    }

  }
}
import {Request ,Response} from 'express'
export const TweetController={
  createTweet:async(req:Request, res:Response)=>{
    return res.json({message:"create successfull"})
  }
}
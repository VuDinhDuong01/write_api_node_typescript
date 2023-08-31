import { Request, Response } from "express"
import { bookMarkServices } from "~/services/bookmark.services"
import { TypePayloadRequest } from "~/type"

export const bookmarkController = {
  
  createBookMark: async (req: Request, res: Response) => {
    try {
      const { user_id } = req.access_token as TypePayloadRequest
      const {bookmark_id}= req.params
      const result = await bookMarkServices.createBookMark({user_id,bookmark_id})
      return res.json(result)
    }
    catch (err) {
      console.log(err)
    }
  },

  getBookMark: async (req: Request, res: Response) => {
    try{
      const result = await bookMarkServices.getBookMark();
      return res.json(result)
    }catch(err){
      console.log(err)
    }
  },

  unBookMark: async (req: Request, res: Response) => {
    try{
      const { user_id } = req.access_token as TypePayloadRequest
      const {bookmark_id}= req.params
      const result = await bookMarkServices.unBookMark({user_id, bookmark_id})
      return res.json(result)
    }catch(err){
      console.log(err)
    }
  }
  
}
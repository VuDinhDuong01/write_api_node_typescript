import { likeServices } from '~/services/like.services'
import { TypePayloadRequest } from '~/type'
import { Request, Response } from 'express'

export const likeController = {
  like: async (req: Request, res: Response) => {
    try {
      const { user_id } = req.access_token as TypePayloadRequest
      const { post_id } = req.body
      const result = await likeServices.like({ user_id, post_id })
      return res.json(result)
    } catch (error) {
      console.log(error)
    }
  },

  unLike: async (req: Request, res: Response) => {
    try {
      const { user_id } = req.access_token as TypePayloadRequest
      const { post_id } = req.body
      const result = await likeServices.unLike({ user_id, post_id })
      return res.json(result)
    } catch (error) {
      console.log(error)
    }
  }
}

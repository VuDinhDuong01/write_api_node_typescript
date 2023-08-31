import { Request, Response } from 'express'
import { hastagServices } from '~/services/hastag.services'
import { TypePayloadRequest } from '~/type'

export const HastagController = {
  createHastag: async (req: Request, res: Response) => {
    try {
      const { user_id } = req.access_token as TypePayloadRequest
      const { hastag } = req.body
      const result = await hastagServices.createHastag({ hastag, user_id })
      return res.json(result)
    }
    catch (error) {
      console.log(error)
    }
  }
}
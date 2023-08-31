import { modelHastag } from "~/models/model/hastag.model"

export const hastagServices = {
  createHastag: async ({hastag, user_id}:{hastag:string[], user_id:string} ) => {
    const result = await modelHastag.create({hastag,user_id})
    return {
      message: "create hastag successfully",
      data: result
    }
  }
}
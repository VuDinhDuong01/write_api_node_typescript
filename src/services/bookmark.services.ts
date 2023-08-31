import { modelBookMark } from "~/models/model/bookmark.model"

export const bookMarkServices = {
  createBookMark: async ({ user_id, bookmark_id }: { user_id: string, bookmark_id: string }) => {
    const result = await modelBookMark.create({
      user_id: user_id,
      twitter_id: bookmark_id
    })
    return {
      message: "create bookmark successfully",
      result
    }

  },
  getBookMark: async () => {
    const result = await modelBookMark.find();
    return {
      message: "get all book mark successfully",
      data: result
    }
  },
  unBookMark: async ({ user_id, bookmark_id }: { user_id: string, bookmark_id: string }) => {
     await modelBookMark.deleteOne({ user_id, twitter_id: bookmark_id })
    return {
      message: "delete bookmark successfully"
    }
  }
}
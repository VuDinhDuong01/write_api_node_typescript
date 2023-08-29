import { handleUploadFileImage, handleUploadVideo } from "~/utils/file"
import sharp from 'sharp'
import { Request } from "express"
import path from 'path'
import fs from 'fs'

export const mediaServices = {
  uploadFileImage: async (req: Request) => {
    const files = await handleUploadFileImage(req)
    const result = await Promise.all(
      files.map(async file => {
        const newFileName = file.newFilename.split('.')[0]
        const newFile = path.resolve('Upload' + `/${newFileName}.jpg`)
        // file.filePath nghĩa là ảnh gốc để cho vào sử lý
        // newFile là ảnh sau khi sử lý 
        await sharp(file.filepath).jpeg({ quality: 70 }).toFile(newFile)

        // phải cần xóa những file trong images 
        fs.unlinkSync(`Upload/images/${newFileName}.jpg`)

        return {
          type: "image",
          image: `http://localhost:5000/Upload/${newFileName}.jpg`

        }
      })
    )
    return result
  },
  uploadVideo: async (req: Request) => {
    const file = await handleUploadVideo(req)
    const video = file[0].newFilename
    return {
      type: 'video',
      video: `http://localhost:5000/Upload/video/${video}`
    }
  }
}
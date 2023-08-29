import formidable, { File } from 'formidable'
import fs from 'fs'
import path from 'path'
import { Request } from 'express'

export const createFolder = () => {
  ['Upload/images','Upload/video'].map(dir =>{
    const checkFolderEsist = fs.existsSync(path.resolve(dir))
    if (!checkFolderEsist) {
      fs.mkdirSync(path.resolve(dir), {
        
        recursive: true
      })
    }
  })
  
}


export const handleUploadFileImage = async (req: Request) => {
  const form = formidable({
    uploadDir: 'Upload/images',
    keepExtensions: true,
    allowEmptyFiles: false,
    minFileSize: 1024,
    maxFiles: 4,
    maxFileSize: 2 * 200 * 1024,
    maxTotalFileSize: 4 * 200 * 1024 * 1024,
    filter: function ({ name, originalFilename, mimetype }) {
      const valid = Boolean(mimetype?.includes('image/'))

      if (!valid) {
        throw new Error('file upload không hợp lện')
      }
      return valid
    }
  })
  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err)
      }

      if (!files.image) {
        return reject(new Error('file lỗi'))
      }
      
      resolve(files.image as File[])
    })
  })
}

export const  handleUploadVideo=(req:Request)=>{
  const form = formidable({
    uploadDir: 'Upload/video',
    keepExtensions: true,
    allowEmptyFiles: false,
    minFileSize: 1024 * 1024,
    maxFiles: 1,
    maxFileSize: 10 * 1024 * 1024,
    
    filter: function ({ name, originalFilename, mimetype }) {
      const valid = Boolean(mimetype?.includes('video/'))
      if (!valid) {
        throw new Error('video upload không hợp lện')
      }
      return valid
    }
  })
  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err)
      }

      if (!files.video) {
        return reject(new Error('video lỗi'))

      }
      
      resolve(files.video as File[])
    })
  })
}

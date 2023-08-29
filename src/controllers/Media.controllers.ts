import { Request, Response, NextFunction } from "express"
import { mediaServices } from "~/services/media.services"
import path from 'path'
import mime from "mime"
import fs from 'fs'
export const mediaController = {
  uploadImage: async (req: Request, res: Response) => {
    try {
      const result = await mediaServices.uploadFileImage(req)
      return res.json(result)
    }
    catch (err) {
      console.log(err)
    }
  },

  getImage: async (req: Request, res: Response) => {
    const { name } = req.params
    return res.sendFile(path.resolve('Upload', name))
  },

  uploadVideo: async (req: Request, res: Response) => {
    const result = await mediaServices.uploadVideo(req)

    return res.json(result
    )
  },
  staticVideo: async (req: Request, res: Response) => {
    const { name } = req.params
    const range = req.headers.range;
    
    if (!range) {
      res.status(400).send("Requires Range header");
    }

    const videoPath = path.resolve('Upload/video', name);
    console.log(videoPath);
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10e6;
    const start = Number((range as string).replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    }

    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
  }
}


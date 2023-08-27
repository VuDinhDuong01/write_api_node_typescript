import { Request, Response, NextFunction } from "express"

type FnType = (req: Request, res: Response, next: NextFunction) => void

export const handleAsync = (fn: FnType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await fn(req, res, next)
    } catch (err) {
      console.log(err)
    }
  }
}
import { Request, Response, NextFunction } from "express"
import { httpStatusCode } from "~/contants/httpStatus"
import { ErrorStatus } from "~/models/error"

import omit from 'lodash/omit'
export const handleError = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorStatus && err.status !== httpStatusCode.UNPROCESSABLE_ENTITY) {
    return res.status(err.status).json(omit(err,['status']))
  }
  return res.status(httpStatusCode.UNPROCESSABLE_ENTITY).json(err)
}
import { checkSchema } from "express-validator"
import { validate } from "./validation.middlewares"
import { ErrorStatus } from "~/models/error"

export const validationBookmark = validate(checkSchema({
  bookmark_id: {
    trim: true,
    custom: {
      options: (value, { req }) => {
        if (!value) {
          throw new ErrorStatus({
            message: "trường này không được để trống",
            status: 422
          })
        }
      }
    }
  }
}, ['params']))
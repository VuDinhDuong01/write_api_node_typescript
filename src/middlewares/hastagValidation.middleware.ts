import { checkSchema } from "express-validator"
import { validate } from "./validation.middlewares"
import { ErrorStatus } from "~/models/error"

export const validationHastag= validate(checkSchema({
  hastag: {
    isArray: {
      options: {
        min: 1
      }
    },
    custom: {
      options: (value, { req }) => {
        if (value.length === 0) {
          throw new ErrorStatus({
            message: "không được để trống",
            status: 422
          })
        }
        for (const hastag of value) {
          if (typeof hastag !== "string" || hastag.length === 0) {
            throw new ErrorStatus({
              message: "giá trị không hợp lệ",
              status: 422
            })
          }
        }

      }
    }

  }
}, ['body']))
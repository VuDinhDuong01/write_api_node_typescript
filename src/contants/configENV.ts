import dotenv from 'dotenv'
dotenv.config()
export const configENV={
  PORT: process.env.PORT as string ,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN as string,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN as string
}
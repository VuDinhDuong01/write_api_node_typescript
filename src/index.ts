import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { connectDatabase, createEmailIndexUser, createIndexRefresToken } from './models/connect/connect'
import { routes } from './routes/index'
import { handleError } from './middlewares/handleError.middleware'
import { createFolder } from './utils/file'

config()
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: 'http://127.0.0.1:5174',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ['Content-Type', 'Authorization']
}))
connectDatabase().then(() => {
  createEmailIndexUser()
  createIndexRefresToken()
})
routes(app)
app.use(handleError)
createFolder()
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

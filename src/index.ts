import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { connectDatabase, createEmailIndexUser } from './models/connect/connect'
import { routes } from './routes/index'
import { handleError } from './middlewares/handleError.middleware'
config()
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({}))
connectDatabase().then(() => {
  createEmailIndexUser()
})
routes(app)
app.use(handleError)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

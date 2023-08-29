import { Application } from 'express'
import routeRegister from './users.routes'
import authRouter from './oauth.routes'
import mediaRouter from './media.routes'
export const routes=(app:Application) =>{
  app.use('/api/auth',routeRegister)
  app.use('/api/auth',authRouter)
  app.use('/api/media',mediaRouter)
}
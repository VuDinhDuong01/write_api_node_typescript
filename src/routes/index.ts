import { Application } from 'express'
import routeRegister from './users.routes'
import authRouter from './oauth.routes'

export const routes=(app:Application) =>{
  app.use('/api/auth',routeRegister)
  app.use('/api/auth',authRouter)
}
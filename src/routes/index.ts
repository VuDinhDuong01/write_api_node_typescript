import { Application } from 'express'
import routeRegister from './users.routes'
export const routes=(app:Application) =>{
  app.use('/api/auth',routeRegister)
}
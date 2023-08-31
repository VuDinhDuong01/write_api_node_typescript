import { Application } from 'express'
import routeRegister from './users.routes'
import authRouter from './oauth.routes'
import mediaRouter from './media.routes'
import hastagRouter from './hastag.routes'
import bookmarkRouter from './bookmark.routes'
import likeRouter from './like.routes'
export const routes=(app:Application) =>{
  app.use('/api/auth',routeRegister)
  app.use('/api/auth',authRouter)
  app.use('/api/media',mediaRouter)
  app.use('/api/hastags', hastagRouter)
  app.use('/api/bookmarks', bookmarkRouter)
  app.use('/api/likes', bookmarkRouter)
}
import { Router } from "express";

import passport from "../services/Oauth";
import { usersController } from "~/controllers/users.controllers";

const router = Router()
router.get('/google',
  passport.authenticate('google', { scope: ['profile','email',] , session:false,prompt: 'select_account'}));
  // khi bấm login thì sẽ vào router này , nó 
  // sẽ kết hợp với passport để xác minh google 
  // mình đã tạo tài khoản chưa , hợp lệ hay chưa 
  // kèm theo trả về 1 response  ở callbackURL




// router này dùng đê hứng response trả về 
router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', 
  // nhân được null và profile ở đây
  (error: any, profile: any) => {
    req.user = profile;
    next()

  })(req, res, next)
}, (req, res) => {
  res.redirect(`http://127.0.0.1:5173/login-success/${(req?.user as any)?.id }`)
})




router.get('/facebook',
  passport.authenticate('/facebook',{ session:false, scope:['email'],prompt: 'select_account'}));
  // khi bấm login thì sẽ vào router này , nó 
  // sẽ kết hợp với passport để xác minh google 
  // mình đã tạo tài khoản chưa , hợp lệ hay chưa 
  // kèm theo trả về 1 response  ở callbackURL

// router này dùng đê hứng response trả về 
router.get('/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook', 
  // nhân được null và profile ở đây
  (error: any, profile: any) => {
    req.user = profile;
    next()

  })(req, res, next)
}
, (req, res) => {
  res.redirect(`http://127.0.0.1:5173/login-success/${(req?.user as any)?.id }`)
 }
 )
router.post('/login-success',usersController.oauthGoogle)



export default router
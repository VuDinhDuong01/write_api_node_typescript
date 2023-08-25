import { Router } from "express";
import { usersController } from "~/controllers/users.controllers";
import { validationChangePassowrd, validationForgotPassword, validationLogin, validationRefreshToken, validationRegister, validationResetPassword, validationVerifyEmail, validationVerifyForgotPassword, validitionAccessToken } from "~/utils/validate";

const router = Router()

router.post('/register', validationRegister, usersController.register)
router.post('/login', validationLogin, usersController.login)
router.post('/logout', validitionAccessToken, validationRefreshToken, usersController.logout)
router.post('/refresh_token', validationRefreshToken, usersController.refresh_token)
router.post('/verify_email', validationVerifyEmail, usersController.verify_email)
router.post('/forgot_password', validationForgotPassword, usersController.forgot_password)
router.post('/verify_forgot_password', validationVerifyForgotPassword, usersController.verifyForgotPassword)
router.post('/reset_password', validationResetPassword, usersController.resetPassword)
router.get('/me', validitionAccessToken, usersController.getMe)
router.get('/profile/:id', validitionAccessToken, usersController.getProfile)
router.post('/follower/:id', validitionAccessToken, usersController.follower)
router.put('/change_password',validitionAccessToken,validationChangePassowrd,usersController.changePassword)

export default router
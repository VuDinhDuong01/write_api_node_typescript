import { Router } from "express";
import { usersController } from "~/controllers/users.controllers";
import { validationAccount, validationChangePassowrd, validationForgotPassword, validationLogin, validationRefreshToken, validationRegister, validationResetPassword, validationVerifyEmail, validationVerifyForgotPassword, validitionAccessToken } from "~/utils/validate";
import { handleAsync } from "~/contants/handleAsync";
const router = Router()

router.post('/register', validationRegister, handleAsync(usersController.register))
router.post('/login', validationLogin, handleAsync(usersController.login))
router.post('/logout', validitionAccessToken, validationRefreshToken, handleAsync(usersController.logout))
router.post('/refresh_token', validationRefreshToken, handleAsync(usersController.refresh_token))
router.post('/verify_email', validationVerifyEmail, handleAsync(usersController.verify_email))
router.post('/forgot_password', validationForgotPassword, handleAsync(usersController.forgot_password))
router.post('/verify_forgot_password', validationVerifyForgotPassword, handleAsync(usersController.verifyForgotPassword))
router.post('/reset_password', validationResetPassword, handleAsync(usersController.resetPassword))
router.get('/me', validitionAccessToken, handleAsync(usersController.getMe))
router.get('/profile/:id', validitionAccessToken, handleAsync(usersController.getProfile))
router.post('/follower/:id', validitionAccessToken, handleAsync(usersController.follower))
router.put('/change_password', validitionAccessToken, validationChangePassowrd, handleAsync(usersController.changePassword))
router.put('/change_account', validitionAccessToken, validationAccount, handleAsync(usersController.changeAccount))

export default router
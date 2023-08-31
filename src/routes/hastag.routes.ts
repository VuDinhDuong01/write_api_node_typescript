import { Router } from "express";
import { HastagController } from "~/controllers/Hastag.controllers";
import { validationHastag } from "~/middlewares/hastagValidation.middleware";
import { validitionAccessToken } from "~/utils/validate";

const router = Router()
router.post('/', validitionAccessToken, validationHastag, HastagController.createHastag)
export default router
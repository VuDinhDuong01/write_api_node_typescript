import { Router } from "express";
import { likeController } from "~/controllers/like.controllers";

import { validitionAccessToken } from "~/utils/validate";

const router = Router()
router.post('/:post_id', validitionAccessToken, likeController.like)
router.post('/:post_id', validitionAccessToken, likeController.unLike)
export default router

import { Router } from "express";
import { mediaController } from "~/controllers/Media.controllers";

const router = Router()
router.post('/upload_image', mediaController.uploadImage)
router.get('/get_image/:name', mediaController.getImage)

router.post('/upload_video', mediaController.uploadVideo)
router.get('/get_video/:name', mediaController.staticVideo)


export default router
import { Router } from "express";
import { bookmarkController } from "~/controllers/bookmark.controllers";
import { validationBookmark } from "~/middlewares/bookmarkValidation.middlewares";
import { validitionAccessToken } from "~/utils/validate";

const router = Router()
router.post('/:bookmark_id', validitionAccessToken, validationBookmark, bookmarkController.createBookMark)
router.get('/', validitionAccessToken, bookmarkController.getBookMark)
router.delete('/:bookmark_id', validitionAccessToken, validationBookmark, bookmarkController.unBookMark)
export default router
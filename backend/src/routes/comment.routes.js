import { Router } from "express";
import {createComment,
    getVideoComments,updateComment,deleteComment} from "../controllers/comment.controller.js"
import {verifyJwt} from "../middlewares/auth.middleware.js"
const router=Router()
router.use(verifyJwt)

router.route("/v/:videoId").post(createComment).get(getVideoComments)
router.route("/:commentId").patch(updateComment).delete(deleteComment)

export default router

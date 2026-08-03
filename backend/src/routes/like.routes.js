import { Router } from "express";
import {
  getLikedVideos,
  toggleVideoLike,
  toggleTweetLike,
  getVideoLikeStatus,
} from "../controllers/like.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJwt);

router.route("/toggle/v/:videoId").post(toggleVideoLike);

router.route("/status/v/:videoId").get(getVideoLikeStatus);

router.route("/toggle/t/:tweetId").post(toggleTweetLike);

router.route("/videos").get(getLikedVideos);

export default router;

import { Router } from "express";
import {
    deleteVideo,
    getAllVideos,
    getVideoById,
    publishAVideo,
    togglePublishStatus,
    updateVideo,
    incrementVideoView,
} from "../controllers/video.controller.js";

import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/")
    .get(getAllVideos);


router.route("/:videoId")
    .get(getVideoById);



router.route("/")
    .post(
        verifyJwt,
        upload.fields([
            {
                name: "videoFile",
                maxCount: 1,
            },
            {
                name: "thumbnail",
                maxCount: 1,
            },
        ]),
        publishAVideo
    );


router.route("/:videoId")
    .patch(
        verifyJwt,
        upload.single("thumbnail"),
        updateVideo
    );

router.route("/:videoId/view")
    .post(
        verifyJwt, incrementVideoView
    );


router.route("/:videoId")
    .delete(
        verifyJwt,
        deleteVideo
    );


router.route("/toggle/publish/:videoId")
    .patch(
        verifyJwt,
        togglePublishStatus
    );

export default router;
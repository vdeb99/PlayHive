import { Router } from "express";

import {
    createPlaylist,
    getMyPlaylists,
    getPlaylistById,
    updatePlaylist,
    deletePlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
} from "../controllers/playlist.controller.js";

import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJwt);


router
    .route("/")
    .get(getMyPlaylists)
    .post(createPlaylist);


router
    .route("/:playlistId")
    .get(getPlaylistById)
    .patch(updatePlaylist)
    .delete(deletePlaylist);


router
    .route("/:playlistId/video/:videoId")
    .post(addVideoToPlaylist)
    .delete(removeVideoFromPlaylist);

export default router;
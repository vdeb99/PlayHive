import { Router } from "express";

import {
    addToHistory,
    getHistory,
    removeFromHistory,
    clearHistory,
} from "../controllers/history.controller.js";

import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJwt);

router.get("/", getHistory);

router.post("/:videoId", addToHistory);

router.delete("/:videoId", removeFromHistory);

router.delete("/", clearHistory);

export default router;
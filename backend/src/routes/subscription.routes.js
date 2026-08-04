import { Router } from "express";
import {
  getSubscribedChannels,
  getUserChannelSubscribers,
  toggleSubscription,
} from "../controllers/subscription.controller.js";

import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJwt);


router.get("/", getSubscribedChannels);


router.post("/c/:channelId", toggleSubscription);


router.get("/u/:channelId", getUserChannelSubscribers);

export default router;
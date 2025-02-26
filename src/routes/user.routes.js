import { Router } from "express";
import {verifyJwt} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"
import  {registerUser,loginUser,logoutUser,refreshToken, changeCurrentPassword, getCurrentUser,
     updateAccountDetails, updateUserAvatar, updateUserCoverImage,
      getUserChannelProfile, getWatchHistory}  
      from "../controllers/user.controller.js";
const router=Router();
router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJwt,logoutUser)
router.route("/refresh-token").post(refreshToken)
router.route("/change-password").post(verifyJwt,changeCurrentPassword)
router.route("/current-user").get(verifyJwt,getCurrentUser)
router.route("/update-account").patch(verifyJwt,updateAccountDetails)
router.route("/update-avatar").patch(verifyJwt,upload.single("avatar"),updateUserAvatar)
router.route("/update-cover-image").patch(verifyJwt,upload.single("coverImage"),updateUserCoverImage)
router.route("/c/:username").get(verifyJwt,getUserChannelProfile)
router.route("/watch-history").get(verifyJwt,getWatchHistory)
export default router;
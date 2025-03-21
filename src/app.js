import  express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app=express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "../src/routes/user.routes.js";
import tweetRouter from "../src/routes/tweet.routes.js";
import videoRouter from "../src/routes/video.routes.js";
import playlistRouter from "../src/routes/playlist.routes.js";
import subscriptionRouter from "../src/routes/subscription.routes.js";
import likeRouter from "../src/routes/like.routes.js";
app.use("/api/v1/subscriptions",subscriptionRouter)
app.use("/api/v1/users",userRouter)
app.use("/api/v1/tweets",tweetRouter)
app.use("/api/v1/videos",videoRouter)
app.use("/api/v1/playlists",playlistRouter)
app.use("/api/v1/likes",likeRouter)
export default app;
import dotenv from "dotenv";
dotenv.config();

import  express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app=express();
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : [];

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "PlayHive API is running",
  });
});

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
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
import commentRouter from "../src/routes/comment.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import historyRouter from "./routes/history.routes.js";
app.use("/api/v1/subscriptions",subscriptionRouter)
app.use("/api/v1/users",userRouter)
app.use("/api/v1/tweets",tweetRouter)
app.use("/api/v1/videos",videoRouter)
app.use("/api/v1/playlists",playlistRouter)
app.use("/api/v1/likes",likeRouter)
app.use("/api/v1/comments",commentRouter)
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/history", historyRouter);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});
export default app;
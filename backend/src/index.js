import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import  connectDB  from "./db/db.js";
connectDB()
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT || 8000, () => {
      console.log(`🚀 Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed", error);
  });
import app from "./app.js";
import dotenv from "dotenv";
import  connectDB  from "./db/db.js";
dotenv.config({path:"../.env"})
connectDB()

.then((req,res)=>{
    res.send("Hello from server")
    res.json({message:"Hello from server"})
    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`Server is running on port ${process.env.PORT || 8000}`)
    })
})
.catch((error)=>{
    console.log("MongoDb connection failed ",error)
})
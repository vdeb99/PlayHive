import asyncHandler from "../utils/asyncHandler.js";
const registerUser=asyncHandler(async(req,res)=>{
    console.log("User registered successfully")
     res.status(200).json({
         message:"User registered successfully"
    })
})
export default registerUser;
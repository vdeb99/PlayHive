import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import {User} from "../models/user.model.js";
import uploadToCloudinary from "../utils/cloudinary.js";
import apiResponse from "../utils/apiResponse.js";
const registerUser=asyncHandler(async(req,res)=>{
    const {username,email,fullName,password}=req.body;
    if([fullName,email,username,password].some((field)=>
        field?.trim()===""
    )){
        throw new apiError(400,"All fields are compulsory or required")
    }
    const userExist=await User.findOne({$or:[{email},{username}]})
    if(userExist){
        throw new apiError(400,"User already exist")
    }
    const avatarLocalPath=req.files?.avatar?.[0]?.path
    //const coverImageLocalPath=req.files?.coverImage?.[0]?.path
    let coverImageLocalPath
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    if(!avatarLocalPath){
        throw new apiError(400,"Avatar is required")
    }
    const avatar=await uploadToCloudinary(avatarLocalPath)
    const coverImage = await uploadToCloudinary(coverImageLocalPath) ;

    if(!avatar){
        throw new apiError(400,"Error uploading avatar")
    }
    const user=await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()

    })
    const userCreated=await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!userCreated){
        throw new apiError(500,"Error creating user")
    }
    res.status(200).json(new apiResponse(200,userCreated,"User created successfully"))
    
})

export default registerUser;
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import {User} from "../models/user.model.js";
import uploadToCloudinary from "../utils/cloudinary.js";
import apiResponse from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
const generateAccessAndRefreshToken=async(userId)=>{
    try{
        const user=await User.findById(userId)
        if(!user){
            throw new apiError(400,"User not found")
        }
        const userRefreshToken=user.generateRefreshToken()
        const userAccessToken=user.generateAccessToken()
        user.refreshToken=userRefreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken:userAccessToken,refreshToken:userRefreshToken}
    }
    catch(error){
       throw new apiError(500,"Error generating token")
    }
}
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
const loginUser=asyncHandler(async(req,res)=>{
    //req.body
    //username,email,password
    //find user by username or email
    //compare password
    //generate token
    //pass token through cookies
    const {username,email,password}=req.body
    if(!username && !email){
        throw new apiError(400,"Username or email is required")
    }
    const user=await User.findOne({$or:[{username},{email}]})
    if(!user){
        throw new apiError(400,"User not found")
    }
    const isPasswordCorrect=await user.isPasswordCorrect(password)
    if(!isPasswordCorrect){
        throw new apiError(400,"Invalid password")
    }
    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)
    const userLoggedIn=await User.findById(user._id).select(
        "-password -refreshToken"
    )
    const option={
        httpOnly:true,
        secure:true
    }
    return res
    .status(200)
    .cookie("accessToken",accessToken,option)
    .cookie("refreshToken",refreshToken,option)
    .json(new apiResponse(200,
        {
             user:userLoggedIn,
                accessToken,
                refreshToken
    },
        "User logged in successfully"))
})

const logoutUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(req.user._id,{$set:{refreshToken:null}},{new:true})
    const option={
        httpOnly:true,
        secure:true
    }
    return res
    .status(200)
    .clearCookie("accessToken",option)
    .clearCookie("refreshToken",option)
    .json(new apiResponse(200,{},"User logged out successfully"))
})

const refreshToken=asyncHandler(async(req,res)=>{
    const incomingRefreshToken=req.cookies.refreshToken || req.body.refreshToken
    if(!incomingRefreshToken){
        throw new apiError(400,"Refresh token is required")
    }
    try {
        const decodedToken=jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
        const user=await User.findById(decodedToken?._id)
        if(!user){
            throw new apiError(400,"Invalid refresh token")
        }
        if(user?.refreshToken!==incomingRefreshToken){
            throw new apiError(400,"Expired refresh token")
        }
        const option={
            httpOnly:true,
            secure:true
        }
        const {accessToken,newRefreshToken}=await generateAccessAndRefreshToken(user._id)
        return res
                .status(200)
                .cookie("accessToken",accessToken,option)
                .cookie("refreshToken",newRefreshToken,option)
                .json(new apiResponse(200,{accessToken,newRefreshToken},"Token refreshed successfully"))
    } catch (error) {
        throw new apiError(400,error?.message || "Invalid refresh token")
    }

})
export {registerUser,loginUser,logoutUser,refreshToken};
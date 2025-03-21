import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import apiError from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    if(!isValidObjectId(videoId)){
        throw new apiError(400,"Invalid videoId")
    }
    const userId=req.user._id
    const like =await Like.findOne({video:videoId,LikedBy:userId})
    if(like){
        await Like.findByIdAndDelete(like._id)
    }
    if(!like){
        await Like.create({video:videoId,LikedBy:userId})
    }
    res.status(200).json(new apiResponse(200,{message:"Like toggled"}))
    
})



const toggleTweetLike = asyncHandler(async (req, res) => {
    
    const {tweetId} = req.params
    if(!mongoose.Types.ObjectId.isValid(tweetId)){
        throw new apiError(400,"Invalid tweetId")
    }
    const userId=req.user._id
    const tweetLike =await Like.findOne({tweet:tweetId,LikedBy:userId})
    if(tweetLike){
        await Like.findByIdAndDelete(tweetLike._id)
        res.status(200).json(new apiResponse(200,{message:"Disliked"}))
    }
    if(!tweetLike){
        await Like.create({tweet:tweetId,LikedBy:userId})
        res.status(200).json(new apiResponse(200,{message:"Liked"}))
    }
    
    
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    
    const userId=req.user._id
    const likedVideos=await Like.find({LikedBy:userId}).populate("video")
    res.status(200).json(new apiResponse(200,{likedVideos}))

})

export {
    
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}
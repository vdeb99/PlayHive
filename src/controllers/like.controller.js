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
    const like =await Like.findOne({video:videoId,user:userId})
    if(like){
        await Like.findByIdAndDelete(like._id)
    }
    if(!like){
        await Like.create({video:videoId,user:userId})
    }
    res.status(200).json(new apiResponse(200,{message:"Like toggled"}))
    //TODO: toggle like on video
})



const toggleTweetLike = asyncHandler(async (req, res) => {
    //TODO: toggle like on tweet
    const {tweetId} = req.params
    if(!isValidObjectId(tweetId)){
        throw new apiError(400,"Invalid tweetId")
    }
    const userId=req.user._id
    const tweetLike =await Like.findOne({tweet:tweetId,user:userId})
    if(tweetLike){
        await Like.findByIdAndDelete(tweetLike._id)
    }
    if(!tweetLike){
        await Like.create({tweet:tweetId,user:userId})
    }
    res.status(200).json(new apiResponse(200,{message:"Like toggled"}))
    
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    const userId=req.user._id
    const likedVideos=await Like.find({user:userId}).populate("video")
    res.status(200).json(new apiResponse(200,{likedVideos}))

})

export {
    
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}
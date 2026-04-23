import { Comment } from "../models/comment.model.js";
import { Video } from "../models/video.model.js";
import apiError from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"


const createComment=asyncHandler(async(req,res)=>{
    const {content}=req.body
    if(!content || content.trim()===""){
        throw new apiError(400,"Content is required")
    }
    const videoId=req.params.videoId
    const video=await Video.findById(videoId)
    if(!video){
        throw new apiError(404,"Video not found")
    }
    const comment=await Comment.create({
        content,
        owner:req.user._id,
        video:videoId
    })
    res.status(201).json(new apiResponse(201,{comment}))
})

const getVideoComments=asyncHandler(async(req,res)=>{
    const videoId=req.params.videoId
    const video=await Video.findById(videoId)
    if(!video){
        throw new apiError(404,"Video not found")
    }
    const comments=await Comment.find({video:videoId}).populate("owner","fullName email")
    res.status(200).json(new apiResponse(200,{comments}))
})

export {
    createComment,
    getVideoComments
}

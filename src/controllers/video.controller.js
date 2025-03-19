import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import apiError from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import uploadToCloudinary from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query = "", sortBy = "createdAt", sortType = "desc", userId } = req.query;

    const matchStage = {};

    
    if (query) {
        matchStage.$or = [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } }
        ];
    }

    
    if (userId && isValidObjectId(userId)) {
        matchStage.userId = new mongoose.Types.ObjectId(userId);
    }

    const sortStage = {};
    sortStage[sortBy] = sortType === "asc" ? 1 : -1;

    const videosPipeline = [
        { $match: matchStage },  // Apply filtering conditions
        { $sort: sortStage },    // Sort results
        { $skip: (page - 1) * limit }, // Pagination: Skip previous pages
        { $limit: parseInt(limit) },   // Limit results per page
        {
            $project: {
                _id: 1,
                title: 1,
                description: 1,
                thumbnail: 1,
                videoFile: 1,
                duration: 1,
                isPublished: 1,
                createdAt: 1,
                updatedAt: 1
            }
        }
    ];

    // Run the aggregation pipeline
    const videos = await Video.aggregate(videosPipeline);

    // Get the total count of videos matching the filter
    const totalVideos = await Video.countDocuments(matchStage);

    res.status(200).json(new apiResponse(200, { videos, totalVideos, page, limit }));
});


const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    if(!title || !description){
        throw new apiError(400,"Title and description are required")
    }
    const thumbnailLocalPath=req.files?.thumbnail[0]?.path
    const videoFileLocalPath=req.files?.videoFile[0]?.path
    if(!thumbnailLocalPath || !videoFileLocalPath){
        throw new apiError(500,"Error uploading video")
    }
    const thumbnail=await uploadToCloudinary(thumbnailLocalPath)
    const videoFile=await uploadToCloudinary(videoFileLocalPath)
    if(!thumbnail || !videoFile){
        throw new apiError(500,"Error uploading video")
    }
    const videoExist=await Video.findOne({$and:[{title},{description}]})
    if(videoExist){
        throw new apiError(400,"Video already exists")
    }
    const videoUploaded=await Video.create({
        title,
        description,
        thumbnail:thumbnail.url,
        videoFile:videoFile.url,
        duration:videoFile.duration,

    })
    if(!videoUploaded){
        throw new apiError(500,"Error uploading video")
    }
    
    console.log("videoUploaded successfully")
    res.status(201).json(new apiResponse(201,{videoUploaded}))
    
    

})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if(!isValidObjectId(videoId)){
        throw new apiError(400,"Invalid videoId")
    }
    const video=await Video.findById(videoId)
    if(!video){
        throw new apiError(404,"Video not found")
    }
    res.status(200).json(new apiResponse(200,{video}))
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if(!isValidObjectId(videoId)){
        throw new apiError(400,"Invalid videoId")
    }
    const {updatedTitle,updatedDescription}=req.body//later try to update thumbnail and videoFile
    if(!(updatedTitle || updatedDescription )){
        throw new apiError(400,"Atleast one field is required")
    }
    
    const videoUpdated=await Video.findByIdAndUpdate(videoId,{title:updatedTitle,description:updatedDescription},{new:true})
    if(!videoUpdated){
        throw new apiError(500,"Error updating video")
    }
    res.status(200).json(new apiResponse(200,{videoUpdated}))


})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if(!isValidObjectId(videoId)){
        throw new apiError(400,"Invalid videoId")
    }
    await Video.deleteOne({_id:videoId})
    res.status(200).json(new apiResponse(200,{message:"Video deleted successfully"}))
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    
    if(!isValidObjectId(videoId)){
        throw new apiError(400,"Invalid videoId")
    }
    const video=await Video.findById(videoId)
    const videoUpdated=await Video.findByIdAndUpdate(videoId,{isPublished:!video.isPublished},{new:true})
    if(!videoUpdated){
        throw new apiError(500,"Error updating video")
    }
    res.status(200).json(new apiResponse(200,{videoUpdated}))
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
import mongoose from "mongoose";

import { Video } from "../models/video.model.js";
import { Like } from "../models/like.model.js";
import { Comment } from "../models/comment.model.js";

import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";

const getChannelStats = asyncHandler(async (req, res) => {

    const owner = req.user._id;

    const videos = await Video.find({ owner });

    const totalVideos = videos.length;

    let totalViews = 0;

    videos.forEach(video => {
        totalViews += video.views;
    });

    const videoIds = videos.map(video => video._id);

    const totalLikes = await Like.countDocuments({
        video: { $in: videoIds }
    });

    const totalComments = await Comment.countDocuments({
        video: { $in: videoIds }
    });

    return res.status(200).json(
        new apiResponse(
            200,
            {
                totalVideos,
                totalViews,
                totalLikes,
                totalComments,
            },
            "Dashboard stats fetched successfully"
        )
    );

});

const getChannelVideos = asyncHandler(async (req, res) => {

    const owner = req.user._id;

    const videos = await Video.find({ owner })
        .sort({
            createdAt: -1,
        });

    return res.status(200).json(
        new apiResponse(
            200,
            videos,
            "Videos fetched successfully"
        )
    );

});

export {
    getChannelStats,
    getChannelVideos,
};
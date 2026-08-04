import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";

import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";

const addToHistory = asyncHandler(async (req, res) => {

    const { videoId } = req.params;

    const video = await Video.findById(videoId);

    if (!video) {
        throw new apiError(404, "Video not found");
    }

    const user = await User.findById(req.user._id);

    
    user.watchHistory = user.watchHistory.filter(
        id => id.toString() !== videoId
    );

    
    user.watchHistory.unshift(videoId);

    await user.save();

    return res.status(200).json(
        new apiResponse(
            200,
            {},
            "History updated"
        )
    );

});

const getHistory = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)
        .populate({
            path: "watchHistory",
            populate: {
                path: "owner",
                select: "username avatar fullName",
            },
        });

    return res.status(200).json(
        new apiResponse(
            200,
            user.watchHistory
        )
    );

});

const removeFromHistory = asyncHandler(async (req, res) => {

    const { videoId } = req.params;

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $pull: {
                watchHistory: videoId,
            },
        }
    );

    return res.status(200).json(
        new apiResponse(
            200,
            {},
            "Removed from history"
        )
    );

});

const clearHistory = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            watchHistory: [],
        }
    );

    return res.status(200).json(
        new apiResponse(
            200,
            {},
            "History cleared"
        )
    );

});

export {
    addToHistory,
    getHistory,
    removeFromHistory,
    clearHistory,
};
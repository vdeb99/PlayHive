import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadToCloudinary from "../utils/cloudinary.js";
import { Like } from "../models/like.model.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    query = "",
    sortBy = "createdAt",
    sortType = "desc",
    userId,
  } = req.query;

  const matchStage = {
    isPublished: true,
  };

  if (query) {
    matchStage.$or = [
      {
        title: {
          $regex: query,
          $options: "i",
        },
      },
      {
        description: {
          $regex: query,
          $options: "i",
        },
      },
    ];
  }

  if (userId && isValidObjectId(userId)) {
    matchStage.owner = new mongoose.Types.ObjectId(userId);
  }

  const sortStage = {};
  sortStage[sortBy] = sortType === "asc" ? 1 : -1;

  const videos = await Video.aggregate([
    {
      $match: matchStage,
    },

    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
      },
    },

    {
      $unwind: "$owner",
    },

    {
      $project: {
        title: 1,
        description: 1,
        thumbnail: 1,
        videoFile: 1,
        duration: 1,
        createdAt: 1,
        updatedAt: 1,
        views: 1,
        isPublished: 1,

        owner: {
          _id: "$owner._id",
          username: "$owner.username",
          fullName: "$owner.fullName",
          avatar: "$owner.avatar",
        },
      },
    },

    {
      $sort: sortStage,
    },

    {
      $skip: (page - 1) * Number(limit),
    },

    {
      $limit: Number(limit),
    },
  ]);

  const totalVideos = await Video.countDocuments(matchStage);

  return res.status(200).json(
    new apiResponse(
      200,
      {
        videos,
        totalVideos,
        page: Number(page),
        limit: Number(limit),
        hasMore: Number(page) * Number(limit) < totalVideos,
      },
      "Videos fetched successfully",
    ),
  );
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    throw new apiError(400, "Title and description are required");
  }
  const thumbnailLocalPath = req.files?.thumbnail[0]?.path;
  const videoFileLocalPath = req.files?.videoFile[0]?.path;
  if (!thumbnailLocalPath || !videoFileLocalPath) {
    throw new apiError(500, "Error uploading video");
  }
  const thumbnail = await uploadToCloudinary(thumbnailLocalPath);
  const videoFile = await uploadToCloudinary(videoFileLocalPath);
  if (!thumbnail || !videoFile) {
    throw new apiError(500, "Error uploading video");
  }
  const videoExist = await Video.findOne({
    $and: [{ title }, { description }],
  });
  if (videoExist) {
    throw new apiError(400, "Video already exists");
  }
  const videoUploaded = await Video.create({
    title,
    description,
    thumbnail: thumbnail.url,
    videoFile: videoFile.url,
    duration: videoFile.duration,

    owner: req.user._id,

    isPublished: true,

    views: 0,
  });
  if (!videoUploaded) {
    throw new apiError(500, "Error uploading video");
  }

  console.log("videoUploaded successfully");
  res.status(201).json(new apiResponse(201, { videoUploaded }));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new apiError(400, "Invalid videoId");
  }

  const video = await Video.findById(videoId).populate(
    "owner",
    "fullName username avatar coverImage email"
  );

  if (!video) {
    throw new apiError(404, "Video not found");
  }

  const likeCount = await Like.countDocuments({
    video: videoId,
  });

  let isLiked = false;

  if (req.user) {
    const existingLike = await Like.findOne({
      video: videoId,
      LikedBy: req.user._id,
    });

    isLiked = !!existingLike;
  }

  return res.status(200).json(
    new apiResponse(
      200,
      {
        video,
        likeCount,
        isLiked,
      },
      "Video fetched successfully"
    )
  );
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new apiError(400, "Invalid videoId");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new apiError(404, "Video not found");
  }

  if (video.owner.toString() !== req.user._id.toString()) {
    throw new apiError(403, "You are not authorized to update this video");
  }

  const { title, description } = req.body;

  if (title) {
    video.title = title;
  }

  if (description) {
    video.description = description;
  }

  if (req.file?.path) {
    const thumbnail = await uploadToCloudinary(req.file.path);

    if (!thumbnail) {
      throw new apiError(500, "Thumbnail upload failed");
    }

    video.thumbnail = thumbnail.url;
  }

  await video.save();

  return res.status(200).json(
    new apiResponse(
      200,
      {
        video,
      },
      "Video updated successfully",
    ),
  );
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!isValidObjectId(videoId)) {
    throw new apiError(400, "Invalid videoId");
  }
  await Video.deleteOne({ _id: videoId });
  res
    .status(200)
    .json(new apiResponse(200, { message: "Video deleted successfully" }));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new apiError(400, "Invalid videoId");
  }
  const video = await Video.findById(videoId);
  const videoUpdated = await Video.findByIdAndUpdate(
    videoId,
    { isPublished: !video.isPublished },
    { new: true },
  );
  if (!videoUpdated) {
    throw new apiError(500, "Error updating video");
  }
  res.status(200).json(new apiResponse(200, { videoUpdated }));
});

const incrementVideoView = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new apiError(400, "Invalid videoId");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new apiError(404, "Video not found");
  }

  
  if (
    req.user &&
    video.owner.toString() === req.user._id.toString()
  ) {
    return res.status(200).json(
      new apiResponse(
        200,
        {
          views: video.views,
        },
        "Owner view not counted"
      )
    );
  }

  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    {
      $inc: {
        views: 1,
      },
    },
    {
      new: true,
    }
  );

  return res.status(200).json(
    new apiResponse(
      200,
      {
        views: updatedVideo.views,
      },
      "View recorded successfully"
    )
  );
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
  incrementVideoView,
};

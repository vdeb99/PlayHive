import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import uploadToCloudinary from "../utils/cloudinary.js";
import apiResponse from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite:
    process.env.NODE_ENV === "production"
      ? "none"
      : "lax",
};

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new apiError(400, "User not found");
    }
    const userRefreshToken = user.generateRefreshToken();
    const userAccessToken = user.generateAccessToken();
    user.refreshToken = userRefreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken: userAccessToken, refreshToken: userRefreshToken };
  } catch (error) {
    throw new apiError(500, "Error generating token");
  }
};
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullName, password } = req.body;
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new apiError(400, "All fields are compulsory or required");
  }
  const userExist = await User.findOne({ $or: [{ email }, { username }] });
  if (userExist) {
    throw new apiError(400, "User already exist");
  }
  const avatarLocalPath = req.files?.avatar?.[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }
  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar is required");
  }
  const avatar = await uploadToCloudinary(avatarLocalPath);
  const coverImage = await uploadToCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new apiError(400, "Error uploading avatar");
  }
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  const userCreated = await User.findById(user._id).select(
    "-password -refreshToken",
  );
  if (!userCreated) {
    throw new apiError(500, "Error creating user");
  }
  res
    .status(200)
    .json(new apiResponse(200, userCreated, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username && !email) {
    throw new apiError(400, "Username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new apiError(400, "User not found");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new apiError(400, "Invalid password");
  }

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshToken(user._id);

  const userLoggedIn = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new apiResponse(
        200,
        {
          user: userLoggedIn,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: null,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(
      new apiResponse(
        200,
        {},
        "User logged out successfully"
      )
    );
});

const refreshToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new apiError(400, "Refresh token is required");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new apiError(400, "Invalid refresh token");
    }

    if (user.refreshToken !== incomingRefreshToken) {
      throw new apiError(400, "Refresh token has expired or is invalid");
    }

    const { accessToken, refreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new apiResponse(
          200,
          {
            accessToken,
            refreshToken,
          },
          "Access token refreshed successfully"
        )
      );
  } catch (error) {
    throw new apiError(
      401,
      error?.message || "Invalid refresh token"
    );
  }
});
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new apiError(400, "User not found");
  }
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new apiError(400, "Invalid password");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new apiResponse(200, {}, "Password changed successfully"));
});
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -refreshToken",
  );

  if (!user) {
    throw new apiError(404, "User not found");
  }

  const videoCount = await Video.countDocuments({
    owner: user._id,
  });

  const subscriberCount = await Subscription.countDocuments({
    channel: user._id,
  });

  const subscribedCount = await Subscription.countDocuments({
    subscriber: user._id,
  });

  return res.status(200).json(
    new apiResponse(
      200,
      {
        ...user.toObject(),

        videoCount,

        subscriberCount,

        subscribedCount,
      },
      "User fetched successfully",
    ),
  );
});
const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;
  if (!fullName && !email) {
    throw new apiError(400, "Full name or email is required");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { fullName, email } },
    { new: true },
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new apiResponse(200, user, "User updated successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar is required");
  }
  const avatar = await uploadToCloudinary(avatarLocalPath);
  if (!avatar.url) {
    throw new apiError(400, "Error uploading avatar");
  }
  const user = await User.findByIdAndUpdate(req.user?._id, {
    $set: { avatar: avatar.url },
  }).select("-password -refreshToken");
});
const updateUserCoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req.file?.path;
  if (!coverImageLocalPath) {
    throw new apiError(400, "Cover image is required");
  }
  const coverImage = await uploadToCloudinary(coverImageLocalPath);
  if (!coverImage.url) {
    throw new apiError(400, "Error uploading avatar");
  }
  const user = await User.findByIdAndUpdate(req.user?._id, {
    $set: { coverImage: coverImage.url },
  }).select("-password -refreshToken");
  return res
    .status(200)
    .json(new apiResponse(200, user, "Cover image updated successfully"));
});
const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;
  if (!username?.trim()) {
    throw new apiError(400, "Username is required");
  }
  const channel = await User.aggregate([
    {
      $match: {
        username: username?.toLowerCase(),
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribedTo",
      },
    },
    {
      $addFields: {
        subscribersCount: {
          $size: "$subscribers",
        },
        subscribesToCount: {
          $size: "$subscribedTo",
        },
        isSubscribed: {
          $cond: {
            if: {
              $in: [req.user?._id, "$subscribers.subscriber"],
            },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        fullName: 1,
        username: 1,
        subscribersCount: 1,
        subscribesToCount: 1,
        isSubscribed: 1,
        avatar: 1,
        coverImage: 1,
        email: 1,
      },
    },
  ]);
  if (!channel?.length) {
    throw new apiError(404, "Channel not found");
  }
  return res
    .status(200)
    .json(new apiResponse(200, channel[0], "Channel fetched successfully"));
});
const getWatchHistory = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(req.user?._id) },
    },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistory",
      },
    },
    {
      $unwind: { path: "$watchHistory", preserveNullAndEmptyArrays: true },
    },
    {
      $lookup: {
        from: "users",
        localField: "watchHistory.owner",
        foreignField: "_id",
        as: "watchHistory.owner",
      },
    },
    {
      $addFields: {
        "watchHistory.owner": { $first: "$watchHistory.owner" },
      },
    },
    {
      $project: {
        "watchHistory._id": 1,
        "watchHistory.title": 1,
        "watchHistory.thumbnail": 1,
        "watchHistory.owner.fullName": 1,
        "watchHistory.owner.username": 1,
        "watchHistory.owner.avatar": 1,
      },
    },
    {
      $group: {
        _id: "$_id",
        watchHistory: { $push: "$watchHistory" },
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        user[0]?.watchHistory || [],
        "Watch history fetched successfully",
      ),
    );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getWatchHistory,
  getUserChannelProfile,
};

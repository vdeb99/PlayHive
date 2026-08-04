import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";

import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params;

    if (!isValidObjectId(channelId)) {
        throw new apiError(400, "Invalid channel id");
    }

    if (channelId === req.user._id.toString()) {
        throw new apiError(400, "You cannot subscribe to yourself");
    }

    const channel = await User.findById(channelId);

    if (!channel) {
        throw new apiError(404, "Channel not found");
    }

    const existingSubscription = await Subscription.findOne({
        channel: channelId,
        subscriber: req.user._id,
    });

    if (existingSubscription) {
        await Subscription.findByIdAndDelete(existingSubscription._id);

        return res.status(200).json(
            new apiResponse(
                200,
                {
                    subscribed: false,
                },
                "Unsubscribed successfully"
            )
        );
    }

    await Subscription.create({
        channel: channelId,
        subscriber: req.user._id,
    });

    return res.status(200).json(
        new apiResponse(
            200,
            {
                subscribed: true,
            },
            "Subscribed successfully"
        )
    );
});

const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params;

    if (!isValidObjectId(channelId)) {
        throw new apiError(400, "Invalid channel id");
    }

    const subscribers = await Subscription.find({
        channel: channelId,
    }).populate(
        "subscriber",
        "fullName username email avatar"
    );

    
    let isSubscribed = false;

    if (req.user) {
        const existingSubscription = await Subscription.findOne({
            channel: channelId,
            subscriber: req.user._id,
        });

        isSubscribed = !!existingSubscription;
    }

    return res.status(200).json(
        new apiResponse(
            200,
            {
                subscribers,
                count: subscribers.length,
                isSubscribed,
            },
            "Subscribers fetched successfully"
        )
    );
});


const getSubscribedChannels = asyncHandler(async (req, res) => {

    const subscribedChannels = await Subscription.find({
        subscriber: req.user._id,
    }).populate(
        "channel",
        "fullName username email avatar coverImage"
    );

    return res.status(200).json(
        new apiResponse(
            200,
            {
                subscribedChannel: subscribedChannels,
                count: subscribedChannels.length,
            },
            "Subscribed channels fetched successfully"
        )
    );
});

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels,
};
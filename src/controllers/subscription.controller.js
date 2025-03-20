import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import apiError from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params;

    console.log("Received channelId:", channelId); // Debugging log

    if (!mongoose.Types.ObjectId.isValid(channelId)) {
        throw new apiError(400, "Invalid channel id format");
    }

    const channel = await User.findById(channelId);
    if (!channel) {
        throw new apiError(404, "Channel not found");
    }

    const subscriberId = req.user._id;
    const existingSubscription = await Subscription.findOne({ channel: channelId, subscriber: subscriberId });

    if (existingSubscription) {
        await Subscription.findByIdAndDelete(existingSubscription._id);
        return res.status(200).json(new apiResponse(200, { message: "Unsubscribed successfully" }));
    } else {
        await Subscription.create({ channel: channelId, subscriber: subscriberId });
        return res.status(200).json(new apiResponse(200, { message: "Subscribed successfully" }));
    }
});


// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    console.log("Full Request Params:", req.params); // Log request params

    const { channelId } = req.params;

    if (!channelId) {
        return res.status(400).json({ error: "channelId is missing in request parameters" });
    }

    console.log("Extracted channelId:", channelId); // Debugging log

    if (!mongoose.Types.ObjectId.isValid(channelId)) {
        console.error("Invalid channelId format:", channelId); // Log invalid ID
        throw new apiError(400, "Invalid channel id format");
    }

    const channel = await User.findById(channelId);
    if (!channel) {
        throw new apiError(404, "Channel not found");
    }

    const subscribers = await Subscription.find({ channel: channelId }).populate("subscriber", "name email");

    res.status(200).json(new apiResponse(200, { subscribers }));
});



// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const  subscriberId  = req.user._id
    if(!isValidObjectId(subscriberId)){
        throw new apiError(400,"Invalid subscriber id")
    }
    const subscribedChannel=await Subscription.find({subscriber:subscriberId}).populate("channel","name email")
    res.status(200).json(new apiResponse(200,{subscribedChannel}))
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}
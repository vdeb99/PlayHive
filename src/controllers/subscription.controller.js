import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import apiError from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    // TODO: toggle subscription
    if(!isValidObjectId(channelId)){
        throw new apiError(400,"Invalid channel id")
    }
    const channel =await User.findById(channelId)
    if(!channel){
        throw new apiError(404,"Channel not found")
    }
    const subscriberId=req.user._id
    const subscription=await Subscription.findOne({channel:channelId,subscriber:subscriberId})
    if(subscription){
        await Subscription.findByIdAndDelete(subscription._id)
    }
    if(!subscription){
        await Subscription.create({channel:channelId,subscriber:subscriberId})
    }
    res.status(200).json(new apiResponse(200,{message:"Subscription toggled"}))
    
        

})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    if(!isValidObjectId(channelId)){
        throw new apiError(400,"Invalid channel id")
    }
    const channel=await User.findById(_id===channelId)
    if(!channel){
        throw new apiError(404,"Channel not found")
    }
    const subscribers=await Subscription.find(channelId).populate("subscriber","name email")
    res.status(200).json(new apiResponse(200,{subscribers}))
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params
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
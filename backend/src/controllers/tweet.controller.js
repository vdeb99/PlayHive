import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import apiError from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    const {title,content}=req.body
    if([title,content].some((field)=>
        field?.trim()===""
    )){
        throw new apiError(400,"Title and content are required")
    }
    if(!isValidObjectId(req.user._id)){
        throw new apiError(400,"Invalid user id")
    }
    const tweetExist=await Tweet.findOne({$and:[{title},{content}]})
    if(tweetExist){
        throw new apiError(400,"Tweet already exists")
    }
    const tweet=await Tweet.create({title,content,owner:req.user._id})
    res.
    status(201).
    json(
        new apiResponse(201,{tweet})
    )

})

const getUserTweets = asyncHandler(async (req, res) => {
    const userId=req.params.userId
    if(!isValidObjectId(userId)){
        throw new apiError(400,"Invalid user id")
    }
    const tweets=await Tweet.find({owner:userId}).populate("owner","name email")
    res.status(200).json(new apiResponse(200,{tweets}))
})

const updateTweet = asyncHandler(async (req, res) => {
    const {title,content}=req.body
    if(!title && !content){
        throw new apiError(400,"Title or content is required")
    }
    const tweetId=req.params.tweetId
    if(!isValidObjectId(tweetId)){
        throw new apiError(400,"Tweet does not exist")
    }
    const updatedTweet=await Tweet.findByIdAndUpdate(tweetId,{title,content})
    res.status(200).json(new apiResponse(200,{updatedTweet}))
})

const deleteTweet = asyncHandler(async (req, res) => {
    await Tweet.findByIdAndDelete(req.params.tweetId)
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}
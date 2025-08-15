import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import apiError from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body
    if(!name){
        throw new apiError(400,"Name is required")
    }
    const playListExists=await Playlist.findOne({name,owner:req.user._id})
    if(playListExists){
        throw new apiError(400,"Playlist already exists")
    }
    const playlist=await Playlist.create({name,description:description||'',owner:req.user._id})
    if(!playlist){
        throw new apiError(500,"Error creating playlist")
    }
    return res.status(201).json(new apiResponse(201,{playlist}))
    
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    if(!isValidObjectId(userId)){
        throw new apiError(400,"Invalid userId")
    }
    const playlist=await Playlist.find({owner:userId})
    res.status(200).json(new apiResponse(200,{playlist}))
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    if(!mongoose.Types.ObjectId.isValid(playlistId)){
        throw new apiError(400,"Invalid playlistId")
    }
    const playlist=await Playlist.findById(playlistId)
    if(!playlist){
        throw new apiError(404,"Playlist not found")
    }
    return res.status(200).json(new apiResponse(200,{playlist}))
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    if(!isValidObjectId(playlistId) || !isValidObjectId(videoId)){
        throw new apiError(400,"Invalid playlistId or videoId")
    }
    const playlist=await Playlist.findById(playlistId)
    if(!playlist){
        throw new apiError(404,"Playlist not found")
    }
    const videoExists=playlist.videos.includes(videoId)
    if(videoExists){
        throw new apiError(400,"Video already exists in playlist")
    }
    playlist.videos.push(videoId)
    await playlist.save()
    return res.status(200).json(new apiResponse(200,{playlist}))
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    if(!isValidObjectId(playlistId) || !isValidObjectId(videoId)){
        throw new apiError(400,"Invalid playlistId or videoId")
    }
    const playlist=await Playlist.findById(playlistId)
    const videoIndex=playlist.videos.indexOf(videoId)
    if(videoIndex===-1){
        throw new apiError(404,"Video not found in playlist")
    }
    playlist.videos.splice(videoIndex,1)
    await playlist.save()
    return res.status(200).json(new apiResponse(200,{playlist}))


})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    if(!isValidObjectId(playlistId)){
        throw new apiError(400,"Invalid playlistId")
    }
    const playlistDelete=await Playlist.findByIdAndDelete(playlistId)
    if(!playlistDelete){
        throw new apiError(404,"Playlist not found")
    }
    return res.status(200).json(new apiResponse(200,{playlistDelete}))

})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    if(!isValidObjectId(playlistId)){
        throw new apiError(400,"Invalid playlistId")
    }
    if(!(name || description)){
        throw new apiError(400,"Name or description is required")
    }
    const updatePlaylist=await Playlist.findByIdAndUpdate(playlistId,{name,description},{new:true})
    return res.status(200).json(new apiResponse(200,{updatePlaylist}))
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}
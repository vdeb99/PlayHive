import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.model.js";

import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if (!name) {
        throw new apiError(400, "Playlist name is required");
    }

    const exists = await Playlist.findOne({
        owner: req.user._id,
        name,
    });

    if (exists) {
        throw new apiError(400, "Playlist already exists");
    }

    const playlist = await Playlist.create({
        name,
        description: description || "",
        owner: req.user._id,
    });

    return res.status(201).json(
        new apiResponse(
            201,
            playlist,
            "Playlist created successfully"
        )
    );
});


const getMyPlaylists = asyncHandler(async (req, res) => {
    const playlists = await Playlist.find({
        owner: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json(
        new apiResponse(
            200,
            playlists,
            "Playlists fetched successfully"
        )
    );
});


const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;

    if (!isValidObjectId(playlistId)) {
        throw new apiError(400, "Invalid playlist id");
    }

    const playlist = await Playlist.findById(playlistId)
        .populate("videos");

    if (!playlist) {
        throw new apiError(404, "Playlist not found");
    }

    return res.status(200).json(
        new apiResponse(
            200,
            playlist,
            "Playlist fetched successfully"
        )
    );
});


const updatePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const { name, description } = req.body;

    if (!isValidObjectId(playlistId)) {
        throw new apiError(400, "Invalid playlist id");
    }

    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            name,
            description,
        },
        {
            new: true,
        }
    );

    if (!playlist) {
        throw new apiError(404, "Playlist not found");
    }

    return res.status(200).json(
        new apiResponse(
            200,
            playlist,
            "Playlist updated successfully"
        )
    );
});


const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;

    if (!isValidObjectId(playlistId)) {
        throw new apiError(400, "Invalid playlist id");
    }

    await Playlist.findByIdAndDelete(playlistId);

    return res.status(200).json(
        new apiResponse(
            200,
            {},
            "Playlist deleted successfully"
        )
    );
});


const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;

    if (
        !isValidObjectId(playlistId) ||
        !isValidObjectId(videoId)
    ) {
        throw new apiError(400, "Invalid ids");
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
        throw new apiError(404, "Playlist not found");
    }

    const alreadyExists = playlist.videos.some(
        (id) => id.toString() === videoId
    );

    if (alreadyExists) {
        throw new apiError(
            400,
            "Video already exists in playlist"
        );
    }

    playlist.videos.push(videoId);

    await playlist.save();

    return res.status(200).json(
        new apiResponse(
            200,
            playlist,
            "Video added successfully"
        )
    );
});


const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;

    if (
        !isValidObjectId(playlistId) ||
        !isValidObjectId(videoId)
    ) {
        throw new apiError(400, "Invalid ids");
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
        throw new apiError(404, "Playlist not found");
    }

    playlist.videos = playlist.videos.filter(
        (id) => id.toString() !== videoId
    );

    await playlist.save();

    return res.status(200).json(
        new apiResponse(
            200,
            playlist,
            "Video removed successfully"
        )
    );
});

export {
    createPlaylist,
    getMyPlaylists,
    getPlaylistById,
    updatePlaylist,
    deletePlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
};
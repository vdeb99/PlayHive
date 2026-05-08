import app from "./index.service.js"

const createVideo=async(videoData)=>{
    return await app.post("/videos",videoData)
}

const deleteVideo=async(videoId)=>{
    return await app.delete(`/videos/${videoId}`)
}

const getUserVideos=async(userId)=>{
    return await app.get(`/videos/user/${userId}`)
}

const getVideoById=async(videoId)=>{
    return await app.get(`/videos/${videoId}`)
}

const updateVideo=async(videoId,videoData)=>{
    return await app.patch(`/videos/${videoId}`,videoData)
}

const getAllVideos=async()=>{
    return await app.get("/videos")
}

export {
    createVideo,
    deleteVideo,
    getUserVideos,
    getVideoById,
    updateVideo,
    getAllVideos
}
import api from "./index.service.js"

const toggleVideoLike=async(videoId)=>{
    return await api.post(`/likes/toggle/v/${videoId}`)
}

const toggleCommentLike=async(commentId)=>{
    return await api.post(`/likes/toggle/t/${commentId}`)
}

const getUserLikedVideos=async(userId)=>{
    return await api.get(`/likes/${userId}`)
}

export {
    toggleVideoLike,
    toggleCommentLike,
    getUserLikedVideos
}
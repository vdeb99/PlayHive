import api from "./index.service.js"

const getVideoComments = async(videoId)=>{
    return await api.get(`/comments/v/${videoId}`)
}

const addComment = async(commentData)=>{
    return await api.post("/comments",commentData)
}

const updateComment = async(commentData)=>{
    return await api.patch("/comments",commentData)
}

const deleteComment = async(commentId)=>{
    return await api.delete(`/comments/${commentId}`)
}

export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
}
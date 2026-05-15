import app from "./index.service.js"

const createPlaylist=async(playlistData)=>{
    return await app.post("/playlists",playlistData)
}

const deletePlaylist=async(playlistId)=>{
    return await app.delete(`/playlists/${playlistId}`)
}

const getUserPlaylists=async(userId)=>{
    return await app.get(`/playlists/user/${userId}`)
}

const getPlaylistById=async(playlistId)=>{
    return await app.get(`/playlists/${playlistId}`)
}

const addVideoToPlaylist=async(playlistId,videoId)=>{
    return await app.post(`/playlists/${playlistId}/video/${videoId}`)
}

const removeVideoFromPlaylist=async(playlistId,videoId)=>{
    return await app.delete(`/playlists/${playlistId}/video/${videoId}`)
}

export {
    createPlaylist,
    deletePlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist
}
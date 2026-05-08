import api from "./api"

const registerUser=async(userData)=>{
    return await api.post("/users/register",userData)
}

const loginUser=async(userData)=>{
    return await api.post("/users/login",userData)
}

const logoutUser=async(refreshToken)=>{
    return await api.post("/users/logout",refreshToken)
}

const refreshAccessToken=async(refreshToken)=>{
    return await api.post("/users/refresh-token",refreshToken)
}

const changeUserPassword=async(passwordData)=>{
    return await api.post("/users/change-password",passwordData)
}

const getCurrentUser=async()=>{
    return await api.get("/users/current-user")
}

const updateUserAccountDetails=async(updateData)=>{
    return await api.patch('/user/update-account',updateData)
}

const getChannelProfile=async(username)=>{
    return await api.get(`/users/c/${username}`)
}

const watchHistory=async()=>{
    return await api.get('/user/watch-history')
}

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeUserPassword,
    getCurrentUser,
    updateUserAccountDetails,
    getChannelProfile,
    watchHistory
}
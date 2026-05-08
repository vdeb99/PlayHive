import api from "./index.service.js"

const toggleSubscription=async(channelId)=>{
    return await api.post(`/subscriptions/${channelId}`)
}

const getUserSubscriptions=async(userId)=>{
    return await api.get(`/subscriptions/user/${userId}`)
}

const getSubscribedChannels=async(userId)=>{
    return await api.get(`/subscriptions/channel/${userId}`)
}

export {
    toggleSubscription,
    getUserSubscriptions,
    getSubscribedChannels
}
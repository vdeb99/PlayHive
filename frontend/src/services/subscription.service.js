import api from "./api";


export const toggleSubscription = (channelId) => {
    return api.post(`/subscriptions/c/${channelId}`);
};


export const getSubscribers = (channelId) => {
    return api.get(`/subscriptions/c/${channelId}`);
};


export const getSubscribedChannels = () => {
    return api.get("/subscriptions");
};
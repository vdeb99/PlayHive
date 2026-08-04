import api from "./api";


export const getChannelProfile = (username) => {
    return api.get(`/users/c/${username}`);
};


export const getChannelVideos = (userId) => {
    return api.get("/videos", {
        params: {
            userId,
        },
    });
};
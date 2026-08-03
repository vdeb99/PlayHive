import api from "./api";

export const toggleVideoLike = (videoId) => {
    return api.post(`/likes/toggle/v/${videoId}`);
};

export const getVideoLikeStatus = (videoId) => {
    return api.get(`/likes/status/v/${videoId}`);
};

export const getLikedVideos = () => {
    return api.get("/likes/videos");
};
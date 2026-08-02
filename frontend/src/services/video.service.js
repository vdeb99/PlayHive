import api from "./api";

export const getAllVideos = (params) => {
    return api.get("/videos", { params });
};

export const getVideoById = (videoId) => {
    return api.get(`/videos/${videoId}`);
};

export const uploadVideo = (formData) => {
    return api.post("/videos", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const deleteVideo = (videoId) => {
    return api.delete(`/videos/${videoId}`);
};
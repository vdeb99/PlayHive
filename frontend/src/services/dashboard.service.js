import api from "./api";

export const getDashboardStats = () => {
  return api.get("/dashboard/stats");
};

export const getDashboardVideos = () => {
  return api.get("/dashboard/videos");
};

export const deleteVideo = (videoId) => {
  return api.delete(`/videos/${videoId}`);
};

export const togglePublish = (videoId) => {
  return api.patch(`/videos/toggle/publish/${videoId}`);
};

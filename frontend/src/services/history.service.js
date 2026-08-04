import api from "./api";

export const getHistory = () =>
  api.get("/history");

export const addToHistory = (videoId) =>
  api.post(`/history/${videoId}`);

export const removeFromHistory = (videoId) =>
  api.delete(`/history/${videoId}`);

export const clearHistory = () =>
  api.delete("/history");
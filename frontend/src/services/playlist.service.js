import api from "./api";

export const getPlaylists = () => {
  return api.get("/playlists");
};

export const getPlaylist = (playlistId) => {
  return api.get(`/playlists/${playlistId}`);
};

export const createPlaylist = (data) => {
  return api.post("/playlists", data);
};

export const deletePlaylist = (playlistId) => {
  return api.delete(`/playlists/${playlistId}`);
};

export const addVideoToPlaylist = (playlistId, videoId) => {
  return api.post(`/playlists/${playlistId}/video/${videoId}`);
};

export const removeVideoFromPlaylist = (playlistId, videoId) => {
  return api.delete(`/playlists/${playlistId}/video/${videoId}`);
};

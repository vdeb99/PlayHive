import api from "./api";

export const getComments = (videoId) => {
  return api.get(`/comments/v/${videoId}`);
};

export const addComment = (videoId, content) => {
  return api.post(`/comments/v/${videoId}`, {
    content,
  });
};

export const updateComment = (commentId, content) => {
  return api.patch(`/comments/${commentId}`, {
    content,
  });
};

export const deleteComment = (commentId) => {
  return api.delete(`/comments/${commentId}`);
};

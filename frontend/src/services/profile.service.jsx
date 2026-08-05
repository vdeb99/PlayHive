import api from "./api";

export const getCurrentUser = () => {
  return api.get("/users/current-user");
};

export const updateProfile = (data) => {
  return api.patch("/users/update-account", data);
};

export const updateAvatar = (formData) => {
  return api.patch("/users/update-avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateCoverImage = (formData) => {
  return api.patch("/users/update-cover-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const changePassword = (data) => {
  return api.post("/users/change-password", data);
};

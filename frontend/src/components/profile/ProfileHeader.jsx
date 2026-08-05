import toast from "react-hot-toast";
import ImageUploader from "./ImageUploader";

import { updateAvatar, updateCoverImage } from "../../services/profile.service";

function ProfileHeader({ user, onEdit, onRefresh, onChangePassword }) {
  const uploadAvatar = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const formData = new FormData();

      formData.append("avatar", file);

      await updateAvatar(formData);

      toast.success("Avatar Updated Successfully");

      onRefresh();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to update avatar");
    }
  };

  const uploadCover = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const formData = new FormData();

      formData.append("coverImage", file);

      await updateCoverImage(formData);

      toast.success("Cover Image Updated Successfully");

      onRefresh();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to update cover image",
      );
    }
  };

  return (
    <div>
      <div className="relative h-72 rounded-2xl overflow-hidden bg-zinc-800">
        <img
          src={
            user.coverImage ||
            "https://via.placeholder.com/1500x400?text=No+Cover+Image"
          }
          alt="Cover"
          className="w-full h-full object-cover"
        />

        <div className="absolute top-4 right-4">
          <ImageUploader label="Change Cover" onChange={uploadCover} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mt-8">
        <div className="flex flex-col items-center">
          <img
            src={user.avatar || "https://via.placeholder.com/150?text=Avatar"}
            alt={user.username}
            className="w-36 h-36 rounded-full border-4 border-zinc-800 object-cover"
          />

          <div className="mt-4">
            <ImageUploader label="Change Avatar" onChange={uploadAvatar} />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-bold">{user.fullName}</h1>

          <p className="text-zinc-400 mt-2">@{user.username}</p>

          <p className="mt-2 text-zinc-300">{user.email}</p>

          <button
            onClick={onEdit}
            className="mt-6 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition"
          >
            Edit Profile
          </button>
          <div className="flex gap-4 mt-6">
            <button
              onClick={onChangePassword}
              className="bg-zinc-700 hover:bg-zinc-600 px-6 py-3 rounded-lg transition"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;

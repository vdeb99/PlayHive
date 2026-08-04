import { useState } from "react";
import { useSelector } from "react-redux";

import {
  User,
  Image,
  Lock,
  LogOut,
} from "lucide-react";

import EditProfileModal from "../../components/profile/EditProfileModal";
import ChangePasswordModal from "../../components/channel/ChangePasswordModal";
import ImageUploader from "../../components/profile/ImageUploader";

import {
  updateAvatar,
  updateCoverImage,
} from "../../services/profile.service";

import { logoutUser } from "../../services/auth.service";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

function Settings() {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showEdit, setShowEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleAvatar = async (file) => {
    try {
      await updateAvatar(file);
      toast.success("Avatar updated");
      window.location.reload();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed"
      );
    }
  };

  const handleCover = async (file) => {
    try {
      await updateCoverImage(file);
      toast.success("Cover updated");
      window.location.reload();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed"
      );
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();

      dispatch(logout());

      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-10">
        Settings
      </h1>

      {/* Profile Card */}

      <div className="bg-zinc-900 rounded-2xl p-8 flex items-center gap-8">

        <img
          src={user.avatar}
          alt={user.fullName}
          className="w-32 h-32 rounded-full object-cover border-4 border-zinc-700"
        />

        <div>

          <h2 className="text-3xl font-bold">
            {user.fullName}
          </h2>

          <p className="text-zinc-400 mt-2">
            @{user.username}
          </p>

          <p className="text-zinc-500 mt-1">
            {user.email}
          </p>

        </div>

      </div>

      {/* Settings */}

      <div className="bg-zinc-900 rounded-2xl mt-10 p-8">

        <h2 className="text-2xl font-semibold mb-8">
          Account
        </h2>

        <div className="space-y-5">

          <button
            onClick={() => setShowEdit(true)}
            className="w-full flex items-center gap-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl px-5 py-4 transition"
          >
            <User size={22} />
            Edit Profile
          </button>

          <ImageUploader
            label="Change Avatar"
            icon={<Image size={22} />}
            onUpload={handleAvatar}
          />

          <ImageUploader
            label="Change Cover Image"
            icon={<Image size={22} />}
            onUpload={handleCover}
          />

          <button
            onClick={() => setShowPassword(true)}
            className="w-full flex items-center gap-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl px-5 py-4 transition"
          >
            <Lock size={22} />
            Change Password
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 bg-red-600 hover:bg-red-700 rounded-xl px-5 py-4 transition"
          >
            <LogOut size={22} />
            Logout
          </button>

        </div>

      </div>

      {showEdit && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEdit(false)}
          onSuccess={() => window.location.reload()}
        />
      )}

      {showPassword && (
        <ChangePasswordModal
          onClose={() => setShowPassword(false)}
        />
      )}

    </div>
  );
}

export default Settings;
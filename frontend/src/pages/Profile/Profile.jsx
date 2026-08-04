import { useEffect, useState } from "react";

import { getCurrentUser } from "../../services/profile.service";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileStats from "../../components/profile/ProfileStats";
import EditProfileModal from "../../components/profile/EditProfileModal";
import ChangePasswordModal from "../../components/channel/ChangePasswordModal";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showEdit, setShowEdit] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [stats, setStats] = useState({
    videos: 0,
    subscribers: 0,
    following: 0,
  });

  const refreshProfile = async () => {
    try {
      const response = await getCurrentUser();

      const data = response.data.data;

      setUser(data);

      setStats({
        videos: data.videoCount || 0,
        subscribers: data.subscriberCount || 0,
        following: data.subscribedCount || 0,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await getCurrentUser();

        const data = response.data.data;

        setUser(data);

        setStats({
          videos: data.videoCount || 0,
          subscribers: data.subscriberCount || 0,
          following: data.subscribedCount || 0,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading Profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl">
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">

      <ProfileHeader
        user={user}
        onEdit={() => setShowEdit(true)}
        onRefresh={refreshProfile}
        onChangePassword={() => setShowPasswordModal(true)}
      />

      <ProfileStats stats={stats} />

      {showEdit && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEdit(false)}
          onSuccess={refreshProfile}
        />
      )}

      {showPasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowPasswordModal(false)}
        />
      )}

    </div>
  );
}

export default Profile;
import { useEffect, useState } from "react";

import { getCurrentUser } from "../../services/profile.service";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileStats from "../../components/profile/ProfileStats";
import EditProfileModal from "../../components/profile/EditProfileModal";
import ChangePasswordModal from "../../components/profile/ChangePasswordModal";

function Profile() {
  const [user, setUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const refreshProfile = async () => {
    try {
      const response = await getCurrentUser();
      setUser(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await getCurrentUser();

        setUser(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="text-center mt-20">Loading Profile...</div>;
  }

  if (!user) {
    return (
      <div className="text-center mt-20 text-red-500">
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

      <ProfileStats user={user} />
      {showEdit && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEdit(false)}
          onSuccess={refreshProfile}
        />
      )}

      {showPasswordModal && (
        <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
    </div>
  );
}

export default Profile;

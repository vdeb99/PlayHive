import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import AddToPlaylistModal from "../playlist/AddToPlaylistModal";

import {
  toggleVideoLike,
  getVideoLikeStatus,
} from "../../services/like.service";

function VideoActions({ video }) {
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  useEffect(() => {
    if (!video?._id) return;

    const loadStatus = async () => {
      try {
        const response = await getVideoLikeStatus(video._id);

        setLiked(response.data.data.liked);
        setLikes(response.data.data.likeCount);
      } catch (error) {
        console.error(error);
      }
    };

    loadStatus();
  }, [video]);

  const handleLike = async () => {
    if (!video?._id) return;

    if (!isAuthenticated) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const response = await toggleVideoLike(video._id);

      setLiked(response.data.data.liked);
      setLikes(response.data.data.likeCount);

      toast.success(response.data.data.liked ? "Video liked" : "Like removed");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Unable to like video.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!isAuthenticated) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    setShowPlaylist(true);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: video.title,
          text: video.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);

        toast.success("Video link copied!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-4 mt-6">
        <button
          onClick={handleLike}
          disabled={loading}
          className={`px-5 py-2 rounded-lg transition font-medium ${
            liked
              ? "bg-red-600 hover:bg-red-700"
              : "bg-zinc-800 hover:bg-zinc-700"
          }`}
        >
          {loading ? "Loading..." : liked ? `❤️ ${likes}` : `🤍 ${likes}`}
        </button>

        <button
          onClick={handleSave}
          className="px-5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition font-medium"
        >
          💾 Save
        </button>

        <button
          onClick={handleShare}
          className="px-5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition font-medium"
        >
          🔗 Share
        </button>
      </div>

      {showPlaylist && (
        <AddToPlaylistModal
          videoId={video._id}
          onClose={() => setShowPlaylist(false)}
        />
      )}
    </>
  );
}

export default VideoActions;

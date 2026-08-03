import { useEffect, useState } from "react";
import {
    toggleVideoLike,
    getVideoLikeStatus,
} from "../../services/like.service";

function VideoActions({ video }) {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    if (!video) return;

    async function loadStatus() {
        try {
            const response = await getVideoLikeStatus(video._id);

            setLiked(response.data.data.liked);
            setLikes(response.data.data.likeCount);
        } catch (error) {
            console.error(error);
        }
    }

    loadStatus();
}, [video]);

    const handleLike = async () => {
        if (!video?._id) return;

        try {
            setLoading(true);

            const response = await toggleVideoLike(video._id);

            console.log(response.data);

            setLiked(response.data.data.liked);
            setLikes(response.data.data.likeCount);

        } catch (error) {
            console.error("Like Error:", error);
            alert(
                error.response?.data?.message ||
                "Unable to like video."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert("Video link copied!");
        } catch (error) {
            console.error(error);
            alert("Unable to copy link.");
        }
    };

    return (
        <div className="flex items-center gap-4 mt-6">

            <button
                onClick={handleLike}
                disabled={loading}
                className={`px-5 py-2 rounded-lg transition font-medium ${
                    liked
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-zinc-800 hover:bg-zinc-700"
                }`}
            >
                {loading
                    ? "..."
                    : liked
                    ? `❤️ ${likes} Likes`
                    : `🤍 ${likes} Likes`}
            </button>

            <button
                onClick={handleShare}
                className="px-5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition font-medium"
            >
                🔗 Share
            </button>

        </div>
    );
}

export default VideoActions;
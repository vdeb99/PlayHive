import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";

import {
  getSubscribers,
  toggleSubscription,
} from "../../services/subscription.service";

import toast from "react-hot-toast";

function VideoInfo({ video }) {
  const navigate = useNavigate();

  const [subscriberCount, setSubscriberCount] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!video?.owner?._id) return;

    async function loadSubscribers() {
      try {
        const response = await getSubscribers(video.owner._id);

        setSubscriberCount(response.data.data.count || 0);
        setSubscribed(response.data.data.isSubscribed || false);
      } catch (error) {
        console.error(error);
      }
    }

    loadSubscribers();
  }, [video]);

  const handleSubscribe = async () => {
    try {
      setLoading(true);

      const response = await toggleSubscription(video.owner._id);

      const isSubscribed = response.data.data.subscribed;

      setSubscribed(isSubscribed);

      if (isSubscribed) {
        setSubscriberCount((prev) => prev + 1);
        toast.success("Subscribed");
      } else {
        setSubscriberCount((prev) =>
          Math.max(prev - 1, 0)
        );
        toast.success("Unsubscribed");
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to subscribe"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!video) return null;

  return (
    <div className="mt-5">

      <h1 className="text-3xl font-bold text-white">
        {video.title}
      </h1>

      <div className="text-zinc-400 mt-2">
        {video.views} views •{" "}
        {video.createdAt
          ? new Date(video.createdAt).toLocaleDateString()
          : ""}
      </div>

      

      <div className="flex justify-between items-center mt-8 border-b border-zinc-800 pb-6">

        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() =>
            navigate(`/channel/${video.owner.username}`)
          }
        >
          <img
            src={video.owner.avatar || "/default-avatar.png"}
            alt={video.owner.fullName}
            className="w-14 h-14 rounded-full object-cover"
          />

          <div>

            <h2 className="text-lg font-semibold">
              {video.owner.fullName}
            </h2>

            <div className="flex items-center gap-2 text-zinc-400 text-sm">

              <Users size={16} />

              {subscriberCount} Subscribers

            </div>

          </div>

        </div>

        <button
          onClick={handleSubscribe}
          disabled={loading}
          className={`px-6 py-3 rounded-full font-semibold transition ${
            subscribed
              ? "bg-zinc-700 hover:bg-zinc-600"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading
            ? "..."
            : subscribed
            ? "Subscribed"
            : "Subscribe"}
        </button>

      </div>

      

      <div className="bg-zinc-900 rounded-xl p-5 mt-6">

        <h2 className="font-semibold mb-3">
          Description
        </h2>

        <p className="text-zinc-300 whitespace-pre-line">
          {video.description}
        </p>

      </div>

    </div>
  );
}

export default VideoInfo;
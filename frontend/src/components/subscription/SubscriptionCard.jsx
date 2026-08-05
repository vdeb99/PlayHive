import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { toggleSubscription } from "../../services/subscription.service";

function SubscriptionCard({ channel, refresh }) {
  const handleUnsubscribe = async () => {
    try {
      await toggleSubscription(channel._id);

      toast.success("Unsubscribed");

      refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed");
    }
  };

  return (
    <div className="bg-zinc-900 rounded-xl p-6 flex items-center justify-between">
      <Link
        to={`/channel/${channel.username}`}
        className="flex items-center gap-4"
      >
        <img
          src={channel.avatar}
          alt={channel.username}
          className="w-16 h-16 rounded-full object-cover"
        />

        <div>
          <h2 className="text-xl font-semibold">{channel.fullName}</h2>

          <p className="text-zinc-400">@{channel.username}</p>
        </div>
      </Link>

      <button
        onClick={handleUnsubscribe}
        className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
      >
        Unsubscribe
      </button>
    </div>
  );
}

export default SubscriptionCard;

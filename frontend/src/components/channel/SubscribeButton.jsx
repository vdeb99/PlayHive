import { useState } from "react";
import { toggleSubscription } from "../../services/subscription.service";

function SubscribeButton({ channelId, initialSubscribed }) {
  const [subscribed, setSubscribed] = useState(initialSubscribed);

  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    try {
      setLoading(true);

      await toggleSubscription(channelId);

      setSubscribed(!subscribed);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={handleSubscribe}
      className={`px-6 py-3 rounded-full font-semibold transition
                ${
                  subscribed
                    ? "bg-zinc-700 hover:bg-zinc-600"
                    : "bg-red-600 hover:bg-red-700"
                }`}
    >
      {loading ? "Loading..." : subscribed ? "Subscribed" : "Subscribe"}
    </button>
  );
}

export default SubscribeButton;

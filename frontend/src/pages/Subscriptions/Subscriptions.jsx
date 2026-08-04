import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getSubscribedChannels } from "../../services/subscription.service";

import SubscriptionList from "../../components/subscription/SubscriptionList";

function Subscriptions() {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSubscriptions = async () => {
    try {
      const response = await getSubscribedChannels();

      setChannels(response.data.data.subscribedChannel || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load subscriptions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubscriptions();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      <h1 className="text-4xl font-bold mb-10">
        Subscriptions
      </h1>

      <SubscriptionList
        channels={channels}
        refresh={loadSubscriptions}
      />

    </div>
  );
}

export default Subscriptions;
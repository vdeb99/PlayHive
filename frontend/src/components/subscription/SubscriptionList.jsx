import SubscriptionCard from "./SubscriptionCard";

function SubscriptionList({
  channels,
  refresh,
}) {
  if (channels.length === 0) {
    return (
      <div className="text-center text-zinc-500 mt-20">
        You haven't subscribed to any channels.
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {channels.map((channel) => (
        <SubscriptionCard
          key={channel._id}
          channel={channel.channel}
          refresh={refresh}
        />
      ))}

    </div>
  );
}

export default SubscriptionList;
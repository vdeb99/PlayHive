import SubscribeButton from "./SubscribeButton";

function ChannelHeader({ channel }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-8 mt-8">
      <img
        src={channel.avatar}
        alt={channel.username}
        className="w-36 h-36 rounded-full object-cover border-4 border-zinc-700"
      />

      <div className="flex-1">
        <h1 className="text-4xl font-bold">{channel.fullName}</h1>

        <p className="text-zinc-400 mt-2">@{channel.username}</p>

        <div className="flex gap-6 mt-4 text-zinc-300">
          <span>{channel.subscribersCount} Subscribers</span>

          <span>{channel.subscribesToCount} Following</span>
        </div>
      </div>

      <SubscribeButton
        channelId={channel._id}
        initialSubscribed={channel.isSubscribed}
      />
    </div>
  );
}

export default ChannelHeader;

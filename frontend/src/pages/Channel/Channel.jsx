import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getChannelProfile,
  getChannelVideos,
} from "../../services/channel.service";

import ChannelTabs from "../../components/channel/ChannelTabs";
import ChannelBanner from "../../components/channel/ChannelBanner";
import ChannelHeader from "../../components/channel/ChannelHeader";
import ChannelVideos from "../../components/channel/ChannelVideos";

function Channel() {
  const { username } = useParams();

  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChannel() {
      try {
        const profile = await getChannelProfile(username);

        const channelData = profile.data.data;

        setChannel(channelData);

        const videosResponse = await getChannelVideos(channelData._id);

        setVideos(videosResponse.data.data.videos || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadChannel();
  }, [username]);

  if (loading) {
    return (
      <div className="text-white text-center mt-20">Loading channel...</div>
    );
  }

  if (!channel) {
    return (
      <div className="text-red-500 text-center mt-20">Channel not found</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <ChannelBanner coverImage={channel.coverImage} />

      <ChannelHeader channel={channel} />

      <ChannelTabs channel={channel} videos={videos} />
    </div>
  );
}

export default Channel;

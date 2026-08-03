import { useEffect, useState } from "react";
import { getAllVideos } from "../../services/video.service";
import VideoCard from "./VideoCard";

function RelatedVideos({ currentVideoId }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getAllVideos();

        const allVideos = response.data.data.videos || [];

        const relatedVideos = allVideos
          .filter((video) => video._id !== currentVideoId)
          .slice(0, 8);

        setVideos(relatedVideos);
      } catch (error) {
        console.error("Error fetching related videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [currentVideoId]);

  if (loading) {
    return <div className="text-white">Loading related videos...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white">Related Videos</h2>

      <div className="space-y-5">
        {videos.length === 0 ? (
          <p className="text-zinc-400">No related videos found.</p>
        ) : (
          videos.map((video) => (
            <VideoCard key={video._id} video={video} variant="list" />
          ))
        )}
      </div>
    </div>
  );
}

export default RelatedVideos;

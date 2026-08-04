import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import VideoGrid from "../../components/video/VideoGrid";
import VideoCardSkeleton from "../../components/skeleton/VideoCardSkeleton";

import { getAllVideos } from "../../services/video.service";

function Home() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [hasMore, setHasMore] = useState(true);

  const [error, setError] = useState("");

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const fetchVideos = async (currentPage) => {
    try {
      if (currentPage === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await getAllVideos({
        page: currentPage,
        limit: 10,
      });

      console.log("API Response:", response.data);

      const newVideos = response.data.data.videos || [];

      if (currentPage === 1) {
        setVideos(newVideos);
      } else {
        setVideos((prev) => [...prev, ...newVideos]);
      }

      setHasMore(response.data.data.hasMore);
    } catch (err) {
      console.error(err);

      if (err.response) {
        setError(err.response.data?.message || "Failed to fetch videos");
      } else {
        setError("Unable to connect to the server");
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchVideos(1);
  }, []);

  useEffect(() => {
    if (inView && hasMore && !loadingMore && !loading) {
      const nextPage = page + 1;

      setPage(nextPage);

      fetchVideos(nextPage);
    }
  }, [inView]);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-white mb-8">Latest Videos</h1>

        <div className="grid md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <VideoCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-red-500 text-2xl">{error}</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Latest Videos</h1>

      <VideoGrid videos={videos} />

      {loadingMore && (
        <div className="grid md:grid-cols-4 gap-6 mt-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <VideoCardSkeleton key={i} />
          ))}
        </div>
      )}

      {hasMore && <div ref={ref} className="h-10" />}

      {!hasMore && videos.length > 0 && (
        <div className="text-center text-zinc-500 py-10">
          🎉 You've reached the end.
        </div>
      )}
    </div>
  );
}

export default Home;

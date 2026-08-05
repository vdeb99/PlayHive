import VideoCard from "./VideoCard";

function VideoGrid({ videos }) {
  if (!videos.length) {
    return (
      <div className="flex justify-center mt-20">
        <h1 className="text-white text-2xl">No Videos Found</h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} variant="grid" />
      ))}
    </div>
  );
}

export default VideoGrid;

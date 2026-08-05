import VideoGrid from "../video/VideoGrid";

function ChannelVideos({ videos }) {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-8">Uploads</h2>

      <VideoGrid videos={videos} />
    </div>
  );
}

export default ChannelVideos;

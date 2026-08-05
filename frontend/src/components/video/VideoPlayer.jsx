function VideoPlayer({ video }) {
  if (!video) return null;

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden bg-black">
      <video controls className="w-full h-full object-cover">
        <source src={video.videoFile} type="video/mp4" />
      </video>
    </div>
  );
}

export default VideoPlayer;

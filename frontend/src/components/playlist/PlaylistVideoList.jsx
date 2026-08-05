import toast from "react-hot-toast";

import { removeVideoFromPlaylist } from "../../services/playlist.service";

function PlaylistVideoList({ playlist, refresh }) {
  const removeVideo = async (videoId) => {
    try {
      await removeVideoFromPlaylist(playlist._id, videoId);

      toast.success("Removed");

      refresh();
    } catch (error) {
      console.error(error);

      toast.error("Failed");
    }
  };

  if (playlist.videos.length === 0) {
    return (
      <div className="text-center mt-20 text-zinc-500">
        No videos in playlist.
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-6">
      {playlist.videos.map((video) => (
        <div key={video._id} className="flex gap-5 bg-zinc-900 rounded-xl p-4">
          <img src={video.thumbnail} className="w-52 rounded-lg" />

          <div className="flex-1">
            <h2 className="text-xl font-semibold">{video.title}</h2>

            <p className="text-zinc-400 mt-2">{video.description}</p>
          </div>

          <button
            onClick={() => removeVideo(video._id)}
            className="bg-red-600 h-fit px-4 py-2 rounded"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default PlaylistVideoList;

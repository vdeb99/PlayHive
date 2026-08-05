import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { removeFromHistory } from "../../services/history.service";

function HistoryCard({ video, refresh }) {
  const handleRemove = async () => {
    try {
      await removeFromHistory(video._id);

      toast.success("Removed");

      refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed");
    }
  };

  return (
    <div className="bg-zinc-900 rounded-xl p-4 flex gap-6">
      <Link to={`/watch/${video._id}`}>
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-72 h-40 object-cover rounded-lg"
        />
      </Link>

      <div className="flex-1">
        <Link to={`/watch/${video._id}`}>
          <h2 className="text-2xl font-semibold hover:text-red-500">
            {video.title}
          </h2>
        </Link>

        <p className="text-zinc-400 mt-3">{video.description}</p>

        <p className="mt-4 text-sm text-zinc-500">{video.views} views</p>
      </div>

      <button
        onClick={handleRemove}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 h-fit rounded-lg"
      >
        Remove
      </button>
    </div>
  );
}

export default HistoryCard;

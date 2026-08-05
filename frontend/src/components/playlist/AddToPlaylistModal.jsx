import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getPlaylists,
  addVideoToPlaylist,
} from "../../services/playlist.service";

function AddToPlaylistModal({ videoId, onClose }) {
  const [playlists, setPlaylists] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadPlaylists() {
      try {
        const response = await getPlaylists();

        setPlaylists(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadPlaylists();
  }, []);

  const handleAdd = async (playlistId) => {
    try {
      setLoading(true);

      await addVideoToPlaylist(playlistId, videoId);

      toast.success("Video added successfully");

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-zinc-900 rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Save to Playlist</h2>

        <div className="space-y-4">
          {playlists.map((playlist) => (
            <button
              key={playlist._id}
              disabled={loading}
              onClick={() => handleAdd(playlist._id)}
              className="w-full text-left bg-zinc-800 hover:bg-zinc-700 rounded-lg px-5 py-4 transition"
            >
              <div className="font-semibold">{playlist.name}</div>

              <div className="text-zinc-400 text-sm">
                {playlist.videos.length} Videos
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full bg-red-600 py-3 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default AddToPlaylistModal;

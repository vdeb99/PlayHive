import { useState } from "react";
import toast from "react-hot-toast";

import { createPlaylist } from "../../services/playlist.service";

function CreatePlaylistModal({ onClose, refresh }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return toast.error("Playlist name is required");
    }

    try {
      setLoading(true);

      await createPlaylist({
        name,
        description,
      });

      toast.success("Playlist Created");

      refresh();

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to create playlist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-zinc-900 rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Create Playlist</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Playlist Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded bg-zinc-800"
          />

          <textarea
            rows={5}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded bg-zinc-800"
          />

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-zinc-700 px-5 py-2 rounded"
            >
              Cancel
            </button>

            <button disabled={loading} className="bg-red-600 px-5 py-2 rounded">
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePlaylistModal;

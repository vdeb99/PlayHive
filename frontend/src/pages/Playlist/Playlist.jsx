import { useEffect, useState } from "react";

import { getPlaylists } from "../../services/playlist.service";

import PlaylistGrid from "../../components/playlist/PlaylistGrid";
import CreatePlaylistModal from "../../components/playlist/CreatePlaylistModal";

function Playlist() {
  const [playlists, setPlaylists] = useState([]);

  const [showCreate, setShowCreate] = useState(false);

  const loadPlaylists = async () => {
    try {
      const response = await getPlaylists();

      setPlaylists(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadPlaylists();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">My Playlists</h1>

        <button
          onClick={() => setShowCreate(true)}
          className="bg-red-600 px-6 py-3 rounded-lg"
        >
          New Playlist
        </button>
      </div>

      <PlaylistGrid playlists={playlists} />

      {showCreate && (
        <CreatePlaylistModal
          onClose={() => setShowCreate(false)}
          refresh={loadPlaylists}
        />
      )}
    </div>
  );
}

export default Playlist;

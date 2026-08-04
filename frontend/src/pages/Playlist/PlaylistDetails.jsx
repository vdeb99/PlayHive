import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPlaylist } from "../../services/playlist.service";

import PlaylistVideoList from "../../components/playlist/PlaylistVideoList";

function PlaylistDetails() {

    const { playlistId } = useParams();

    const [playlist, setPlaylist] = useState(null);

    const loadPlaylist = async () => {

        try {

            const response =
                await getPlaylist(playlistId);

            setPlaylist(response.data.data);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        loadPlaylist();

    }, [playlistId]);

    if (!playlist) {

        return (
            <div className="text-center mt-20">
                Loading...
            </div>
        );

    }

    return (

        <div className="max-w-6xl mx-auto px-6 py-8">

            <h1 className="text-4xl font-bold">

                {playlist.name}

            </h1>

            <p className="text-zinc-400 mt-3">

                {playlist.description}

            </p>

            <PlaylistVideoList
                playlist={playlist}
                refresh={loadPlaylist}
            />

        </div>

    );

}

export default PlaylistDetails;
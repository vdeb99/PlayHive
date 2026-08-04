import PlaylistCard from "./PlaylistCard";

function PlaylistGrid({ playlists }) {

    if (playlists.length === 0) {

        return (

            <div className="text-center mt-20 text-zinc-400">

                No playlists yet.

            </div>

        );

    }

    return (

        <div className="grid md:grid-cols-3 gap-8 mt-10">

            {
                playlists.map((playlist) => (

                    <PlaylistCard
                        key={playlist._id}
                        playlist={playlist}
                    />

                ))
            }

        </div>

    );

}

export default PlaylistGrid;
import { useNavigate } from "react-router-dom";

function PlaylistCard({ playlist }) {

    const navigate = useNavigate();

    return (

        <div
            onClick={() =>
                navigate(
                    `/playlist/${playlist._id}`
                )
            }
            className="cursor-pointer bg-zinc-900 rounded-xl p-6 hover:bg-zinc-800 transition"
        >

            <h2 className="text-2xl font-bold">

                {playlist.name}

            </h2>

            <p className="mt-3 text-zinc-400">

                {playlist.description}

            </p>

            <p className="mt-5">

                {playlist.videos.length} Videos

            </p>

        </div>

    );

}

export default PlaylistCard;
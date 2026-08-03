import { useNavigate } from "react-router-dom";

function VideoCard({ video, variant = "grid" }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/watch/${video._id}`);
    };

    if (variant === "list") {
        return (
            <div
                onClick={handleClick}
                className="flex gap-3 cursor-pointer hover:bg-zinc-900 p-2 rounded-xl transition"
            >
                {/* Thumbnail */}
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-44 h-24 object-cover rounded-lg flex-shrink-0"
                />

                {/* Content */}
                <div className="flex flex-col justify-between">

                    <h3 className="text-white font-semibold line-clamp-2">
                        {video.title}
                    </h3>

                    <p className="text-zinc-400 text-sm line-clamp-2">
                        {video.description}
                    </p>

                    <div className="text-zinc-500 text-xs">
                        {video.views || 0} views
                    </div>

                </div>
            </div>
        );
    }

    return (
        <div
            onClick={handleClick}
            className="cursor-pointer hover:scale-[1.02] transition"
        >
            {/* Thumbnail */}
            <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-52 object-cover rounded-xl"
            />

            {/* Content */}
            <div className="mt-3">

                <h2 className="text-white font-semibold line-clamp-2">
                    {video.title}
                </h2>

                <p className="text-zinc-400 text-sm mt-2 line-clamp-2">
                    {video.description}
                </p>

                <div className="flex justify-between text-zinc-500 text-sm mt-3">

                    <span>{video.views || 0} views</span>

                    <span>
                        {video.createdAt
                            ? new Date(video.createdAt).toLocaleDateString()
                            : ""}
                    </span>

                </div>

            </div>
        </div>
    );
}

export default VideoCard;
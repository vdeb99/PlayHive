import { useNavigate } from "react-router-dom";

function VideoCard({ video }) {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer"
      onClick={() => navigate(`/watch/${video._id}`)}
    >
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full aspect-video rounded-xl object-cover"
      />

      <div className="flex gap-3 mt-3">
        <img
          src={video.owner?.avatar}
          alt={video.owner?.fullName}
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/channel/${video.owner.username}`);
          }}
        />

        <div className="flex-1">

          <h3 className="font-semibold text-white line-clamp-2">
            {video.title}
          </h3>

          <p
            className="text-zinc-400 text-sm cursor-pointer hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/channel/${video.owner.username}`);
            }}
          >
            {video.owner.fullName}
          </p>

          <p className="text-zinc-500 text-sm">
            {video.views} views •{" "}
            {new Date(video.createdAt).toLocaleDateString()}
          </p>

        </div>
      </div>
    </div>
  );
}

export default VideoCard;
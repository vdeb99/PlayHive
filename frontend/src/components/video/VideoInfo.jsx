function VideoInfo({ video }) {
    if (!video) return null;

    return (
        <div className="mt-5">

            <h1 className="text-3xl font-bold text-white">
                {video.title}
            </h1>

            <div className="mt-2 text-zinc-400">

                {video.duration} sec

                {" • "}

                {video.createdAt
                    ? new Date(video.createdAt).toLocaleDateString()
                    : ""}

            </div>

            <div className="bg-zinc-900 mt-6 rounded-xl p-5">

                <h2 className="font-semibold mb-3">
                    Description
                </h2>

                <p className="text-zinc-300">
                    {video.description}
                </p>

            </div>

        </div>
    );
}

export default VideoInfo;
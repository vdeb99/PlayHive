function VideoPlayer({ video }) {
    if (!video) return null;

    return (
        <div className="w-full bg-black rounded-xl overflow-hidden">

            <video
                controls
                className="w-full"
                poster={video.thumbnail}
            >
                <source
                    src={video.videoFile}
                    type="video/mp4"
                />

                Your browser does not support HTML5 video.
            </video>

        </div>
    );
}

export default VideoPlayer;
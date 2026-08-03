import { useEffect, useState } from "react";
import VideoGrid from "../../components/video/VideoGrid";
import { getAllVideos } from "../../services/video.service";

function Home() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await getAllVideos();

                console.log("API Response:", response.data);

                setVideos(response.data.data.videos || []);
            } catch (err) {
                console.error("Fetch Videos Error:", err);

                if (err.response) {
                    console.error("Status:", err.response.status);
                    console.error("Response:", err.response.data);

                    setError(
                        err.response.data?.message ||
                        "Failed to fetch videos"
                    );
                } else {
                    setError("Unable to connect to the server");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-white text-xl">
                Loading videos...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen">
                <h1 className="text-red-500 text-2xl">
                    {error}
                </h1>
            </div>
        );
    }

    return (
    <div className="p-6">
        <h1 className="text-3xl font-bold text-white mb-8">
            Latest Videos
        </h1>

        <VideoGrid videos={videos} />
    </div>
);
}

export default Home;
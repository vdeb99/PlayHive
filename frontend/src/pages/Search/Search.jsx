import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import VideoGrid from "../../components/video/VideoGrid";
import { getAllVideos } from "../../services/video.service";

function Search() {

    const [searchParams] = useSearchParams();

    const query = searchParams.get("query");

    const [videos, setVideos] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function searchVideos() {

            try {

                const response = await getAllVideos({
                    query,
                });

                setVideos(response.data.data.videos);

            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);

            }

        }

        searchVideos();

    }, [query]);

    if (loading)
        return (
            <h1 className="text-white">
                Searching...
            </h1>
        );

    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">
                Search Results
            </h1>

            <VideoGrid videos={videos} />

        </div>
    );
}

export default Search;
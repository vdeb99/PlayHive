import { useState } from "react";
import toast from "react-hot-toast";
import { publishVideo } from "../../services/video.service";

function UploadForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [video, setVideo] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);

    const [videoPreview, setVideoPreview] = useState("");
    const [thumbnailPreview, setThumbnailPreview] = useState("");

    const [loading, setLoading] = useState(false);

    const handleVideo = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setVideo(file);
        setVideoPreview(URL.createObjectURL(file));
    };

    const handleThumbnail = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setThumbnail(file);
        setThumbnailPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !title ||
            !description ||
            !video ||
            !thumbnail
        ) {
            toast.error("Fill all fields");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("title", title);
            formData.append("description", description);
            formData.append("videoFile", video);
            formData.append("thumbnail", thumbnail);

            await publishVideo(formData);

            toast.success("Video Uploaded Successfully");

            setTitle("");
            setDescription("");

            setVideo(null);
            setThumbnail(null);

            setVideoPreview("");
            setThumbnailPreview("");

        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Upload Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto space-y-6"
        >
            <input
                type="text"
                placeholder="Video Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-zinc-800 rounded-lg p-4"
            />

            <textarea
                placeholder="Description"
                rows={5}
                value={description}
                onChange={(e) =>
                    setDescription(e.target.value)
                }
                className="w-full bg-zinc-800 rounded-lg p-4"
            />

            <div>
                <label className="font-semibold">
                    Select Video
                </label>

                <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideo}
                />

                {videoPreview && (
                    <video
                        src={videoPreview}
                        controls
                        className="mt-4 rounded-xl w-full"
                    />
                )}
            </div>

            <div>
                <label className="font-semibold">
                    Thumbnail
                </label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnail}
                />

                {thumbnailPreview && (
                    <img
                        src={thumbnailPreview}
                        alt="Thumbnail"
                        className="mt-4 rounded-xl w-full h-72 object-cover"
                    />
                )}
            </div>

            <button
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-xl"
            >
                {loading
                    ? "Uploading..."
                    : "Upload Video"}
            </button>
        </form>
    );
}

export default UploadForm;
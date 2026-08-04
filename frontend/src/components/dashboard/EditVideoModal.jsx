import { useState } from "react";
import toast from "react-hot-toast";

import { updateVideo } from "../../services/video.service";

function EditVideoModal({
    video,
    onClose,
    refresh,
}) {

    const [title, setTitle] = useState(video.title);
    const [description, setDescription] = useState(video.description);
    const [thumbnail, setThumbnail] = useState(null);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("title", title);
            formData.append("description", description);

            if (thumbnail) {
                formData.append("thumbnail", thumbnail);
            }

            await updateVideo(video._id, formData);

            toast.success("Video Updated");

            refresh();

            onClose();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Update Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

            <div className="bg-zinc-900 rounded-xl p-8 w-full max-w-xl">

                <h2 className="text-2xl font-bold mb-6">
                    Edit Video
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        className="w-full p-3 rounded bg-zinc-800"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                    />

                    <textarea
                        rows={5}
                        className="w-full p-3 rounded bg-zinc-800"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e)=>
                            setThumbnail(e.target.files[0])
                        }
                    />

                    <div className="flex justify-end gap-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 bg-zinc-700 rounded"
                        >
                            Cancel
                        </button>

                        <button
                            disabled={loading}
                            className="px-5 py-2 bg-red-600 rounded"
                        >
                            {
                                loading
                                ? "Saving..."
                                : "Save"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditVideoModal;
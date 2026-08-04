import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { togglePublish } from "../../services/dashboard.service";

import EditVideoModal from "./EditVideoModal";
import DeleteVideoModal from "./DeleteVideoModal";

function VideoRow({ video, refresh }) {
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const handlePublish = async () => {
        try {
            await togglePublish(video._id);

            toast.success("Status Updated");

            refresh();
        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to update status"
            );
        }
    };

    return (
        <>
            <tr className="border-b border-zinc-800 hover:bg-zinc-900 transition">

                <td className="p-4">
                    <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-40 h-24 rounded-lg object-cover"
                    />
                </td>

                <td className="font-medium">
                    {video.title}
                </td>

                <td>
                    {video.views}
                </td>

                <td>
                    <button
                        onClick={handlePublish}
                        className={`px-4 py-2 rounded-lg transition ${
                            video.isPublished
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-yellow-600 hover:bg-yellow-700"
                        }`}
                    >
                        {video.isPublished
                            ? "Published"
                            : "Private"}
                    </button>
                </td>

                <td>
                    {new Date(
                        video.createdAt
                    ).toLocaleDateString()}
                </td>

                <td>
                    <div className="flex items-center gap-4">

                        <button
                            onClick={() => setShowEdit(true)}
                            className="text-blue-400 hover:text-blue-500 transition"
                        >
                            <Pencil size={20} />
                        </button>

                        <button
                            onClick={() => setShowDelete(true)}
                            className="text-red-500 hover:text-red-600 transition"
                        >
                            <Trash2 size={20} />
                        </button>

                    </div>
                </td>

            </tr>

            {showEdit && (
                <EditVideoModal
                    video={video}
                    refresh={refresh}
                    onClose={() => setShowEdit(false)}
                />
            )}

            {showDelete && (
                <DeleteVideoModal
                    video={video}
                    refresh={refresh}
                    onClose={() => setShowDelete(false)}
                />
            )}
        </>
    );
}

export default VideoRow;
import toast from "react-hot-toast";

import { deleteVideo } from "../../services/dashboard.service";

function DeleteVideoModal({
    video,
    onClose,
    refresh,
}) {

    const handleDelete = async () => {

        try {

            await deleteVideo(video._id);

            toast.success("Video Deleted");

            refresh();

            onClose();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Delete Failed"
            );

        }

    };

    return (

        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

            <div className="bg-zinc-900 rounded-xl p-8 w-full max-w-md">

                <h2 className="text-2xl font-bold">
                    Delete Video
                </h2>

                <p className="mt-4 text-zinc-400">
                    Are you sure you want to delete
                    <span className="font-semibold text-white">
                        {" "}
                        "{video.title}"
                    </span>
                    ?
                </p>

                <p className="mt-2 text-red-400">
                    This action cannot be undone.
                </p>

                <div className="flex justify-end gap-4 mt-8">

                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteVideoModal;
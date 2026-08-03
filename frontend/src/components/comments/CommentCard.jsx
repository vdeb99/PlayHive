import { useState } from "react";
import { useSelector } from "react-redux";

import {
    updateComment,
    deleteComment,
} from "../../services/comment.service";

function CommentCard({ comment, refreshComments }) {

    const { user } = useSelector((state) => state.auth);

    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState(comment.content);

    const isOwner =
        user?._id === comment.owner?._id;

    const handleUpdate = async () => {
        try {
            await updateComment(comment._id, content);

            setEditing(false);

            refreshComments();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteComment(comment._id);

            refreshComments();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="border-b border-zinc-800 py-5">

            <div className="flex justify-between">

                <div>

                    <h3 className="font-semibold">
                        {comment.owner?.fullName}
                    </h3>

                    <p className="text-zinc-400 text-sm">
                        @{comment.owner?.username}
                    </p>

                </div>

                {isOwner && (
                    <div className="flex gap-3">

                        <button
                            onClick={() =>
                                setEditing(!editing)
                            }
                            className="text-yellow-400"
                        >
                            Edit
                        </button>

                        <button
                            onClick={handleDelete}
                            className="text-red-500"
                        >
                            Delete
                        </button>

                    </div>
                )}

            </div>

            {editing ? (

                <div className="mt-4">

                    <textarea
                        value={content}
                        onChange={(e) =>
                            setContent(e.target.value)
                        }
                        className="w-full bg-zinc-900 rounded-lg p-3"
                    />

                    <button
                        onClick={handleUpdate}
                        className="mt-3 bg-red-600 px-4 py-2 rounded"
                    >
                        Save
                    </button>

                </div>

            ) : (

                <p className="mt-3">
                    {comment.content}
                </p>

            )}

        </div>
    );
}

export default CommentCard;
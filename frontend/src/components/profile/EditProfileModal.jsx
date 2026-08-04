import { useState } from "react";
import toast from "react-hot-toast";

import { updateProfile } from "../../services/profile.service";

function EditProfileModal({
    user,
    onClose,
    onSuccess,
}) {

    const [fullName, setFullName] = useState(user.fullName);
    const [email, setEmail] = useState(user.email);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await updateProfile({
                fullName,
                email,
            });

            toast.success("Profile Updated");

            onSuccess();

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

            <div className="bg-zinc-900 rounded-xl p-8 w-full max-w-lg">

                <h2 className="text-2xl font-bold mb-6">

                    Edit Profile

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        value={fullName}
                        onChange={(e) =>
                            setFullName(e.target.value)
                        }
                        className="w-full p-3 rounded bg-zinc-800"
                        placeholder="Full Name"
                    />

                    <input
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="w-full p-3 rounded bg-zinc-800"
                        placeholder="Email"
                    />

                    <div className="flex justify-end gap-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded bg-zinc-700"
                        >
                            Cancel
                        </button>

                        <button
                            disabled={loading}
                            className="px-5 py-2 rounded bg-red-600"
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

export default EditProfileModal;
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../../services/auth.service";

function SignupForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
    });

    const [avatar, setAvatar] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    const [avatarPreview, setAvatarPreview] = useState("");
    const [coverPreview, setCoverPreview] = useState("");

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAvatar = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setAvatar(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const handleCover = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setCoverImage(file);
        setCoverPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.fullName ||
            !formData.username ||
            !formData.email ||
            !formData.password ||
            !avatar
        ) {
            toast.error("Please fill all required fields.");
            return;
        }

        try {
            setLoading(true);

            const data = new FormData();

            data.append("fullName", formData.fullName);
            data.append("username", formData.username);
            data.append("email", formData.email);
            data.append("password", formData.password);

            data.append("avatar", avatar);

            if (coverImage) {
                data.append("coverImage", coverImage);
            }

            const response = await registerUser(data);

            console.log(response.data);

            toast.success("Registration Successful!");

            navigate("/login");

        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Registration Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-lg bg-zinc-900 rounded-2xl p-8 shadow-lg">

            <h1 className="text-3xl font-bold text-center mb-8">
                Create Account
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-zinc-800 outline-none"
                />

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-zinc-800 outline-none"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-zinc-800 outline-none"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-zinc-800 outline-none"
                />

                <div>
                    <label className="block mb-2">
                        Avatar *
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatar}
                    />

                    {avatarPreview && (
                        <img
                            src={avatarPreview}
                            alt="Avatar Preview"
                            className="w-24 h-24 rounded-full mt-3 object-cover"
                        />
                    )}
                </div>

                <div>
                    <label className="block mb-2">
                        Cover Image (Optional)
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleCover}
                    />

                    {coverPreview && (
                        <img
                            src={coverPreview}
                            alt="Cover Preview"
                            className="w-full h-36 rounded-lg mt-3 object-cover"
                        />
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold transition"
                >
                    {loading ? "Creating Account..." : "Sign Up"}
                </button>

            </form>

            <p className="text-center mt-6 text-zinc-400">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-red-500 hover:underline"
                >
                    Login
                </Link>
            </p>

        </div>
    );
}

export default SignupForm;
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { loginUser } from "../../services/auth.service";
import { loginSuccess } from "../../redux/slices/authSlice";

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        login: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.login || !formData.password) {
            toast.error("Please fill all fields.");
            return;
        }

        try {
            setLoading(true);

            const response = await loginUser({
                username: formData.login,
                email: formData.login,
                password: formData.password,
            });

            dispatch(loginSuccess(response.data.data.user));

            toast.success("Login Successful!");

            navigate("/");
        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Login Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-8 shadow-lg">

            <h1 className="text-3xl font-bold text-center mb-8">
                Login
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <input
                    type="text"
                    name="login"
                    placeholder="Email or Username"
                    value={formData.login}
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

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold transition"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

            </form>

            <p className="text-center mt-6 text-zinc-400">
                Don't have an account?{" "}
                <Link
                    to="/signup"
                    className="text-red-500 hover:underline"
                >
                    Sign Up
                </Link>
            </p>

        </div>
    );
}

export default LoginForm;
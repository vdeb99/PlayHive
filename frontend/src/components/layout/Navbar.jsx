import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../../services/auth.service";
import { logout } from "../../redux/slices/authSlice";

function Navbar() {
    const [search, setSearch] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isAuthenticated } = useSelector(
        (state) => state.auth
    );

    const handleSearch = (e) => {
        e.preventDefault();

        if (!search.trim()) return;

        navigate(`/search?query=${search.trim()}`);

        setSearch("");
    };

    const handleLogout = async () => {
        try {
            await logoutUser();

            dispatch(logout());

            navigate("/login");
        } catch (error) {
            console.error("Logout Failed:", error);
        }
    };

    return (
        <nav className="sticky top-0 z-50 h-16 bg-zinc-900 border-b border-zinc-800 px-6 flex items-center justify-between">

            {/* Logo */}
            <div
                onClick={() => navigate("/")}
                className="cursor-pointer"
            >
                <h1 className="text-3xl font-bold text-red-600">
                    PlayHive
                </h1>
            </div>

            {/* Search */}
            <form
                onSubmit={handleSearch}
                className="flex-1 max-w-xl mx-10"
            >
                <input
                    type="text"
                    placeholder="Search videos..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-5 py-2 rounded-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-400 outline-none focus:ring-2 focus:ring-red-500"
                />
            </form>

            {/* Right Side */}
            {isAuthenticated ? (
                <div className="flex items-center gap-4">

                    <button
                        onClick={() => navigate("/upload")}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                    >
                        Upload
                    </button>

                    <img
                        src={
                            user?.avatar ||
                            "https://placehold.co/40x40?text=U"
                        }
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                    />

                    <div className="hidden md:block">
                        <p className="text-white font-medium">
                            {user?.fullName || user?.username}
                        </p>

                        <p className="text-zinc-400 text-sm">
                            @{user?.username}
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition"
                    >
                        Logout
                    </button>

                </div>
            ) : (
                <div className="flex gap-3">

                    <button
                        onClick={() => navigate("/login")}
                        className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition"
                    >
                        Login
                    </button>

                    <button
                        onClick={() => navigate("/signup")}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                    >
                        Sign Up
                    </button>

                </div>
            )}

        </nav>
    );
}

export default Navbar;
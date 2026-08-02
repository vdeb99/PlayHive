import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../../services/auth.service";
import { logout } from "../../redux/slices/authSlice";

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isAuthenticated } = useSelector(
        (state) => state.auth
    );

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
        <nav className="h-16 border-b border-zinc-800 bg-zinc-900 flex items-center justify-between px-6">

            {/* Logo */}
            <div
                className="cursor-pointer"
                onClick={() => navigate("/")}
            >
                <h1 className="text-2xl font-bold text-red-600">
                    PlayHive
                </h1>
            </div>

            {/* Search */}
            <input
                type="text"
                placeholder="Search..."
                className="w-96 bg-zinc-800 rounded-lg px-4 py-2 outline-none text-white"
            />

            {/* Right Section */}
            {isAuthenticated ? (
                <div className="flex items-center gap-4">

                    <img
                        src={user?.avatar}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                    />

                    <span className="font-medium">
                        {user?.username}
                    </span>

                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                    >
                        Logout
                    </button>

                </div>
            ) : (
                <button
                    onClick={() => navigate("/login")}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                >
                    Login
                </button>
            )}
        </nav>
    );
}

export default Navbar;
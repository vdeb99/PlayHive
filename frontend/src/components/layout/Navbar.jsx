import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Menu } from "@headlessui/react";
import {
  User,
  LayoutDashboard,
  Settings,
  History,
  ListVideo,
  Tv,
  LogOut,
  Upload,
  Users,
  ChevronDown,
} from "lucide-react";

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

      

      <div
        onClick={() => navigate("/")}
        className="cursor-pointer"
      >
        <h1 className="text-3xl font-bold text-red-600">
          PlayHive
        </h1>
      </div>

      

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

      {isAuthenticated ? (
        <div className="flex items-center gap-4">

          

          <button
            onClick={() => navigate("/upload")}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition flex items-center gap-2"
          >
            <Upload size={18} />
            Upload
          </button>

          {/* Dropdown */}

          <Menu as="div" className="relative">

            <Menu.Button className="flex items-center gap-3 outline-none">

              <img
                src={
                  user?.avatar ||
                  "https://placehold.co/40x40?text=U"
                }
                alt="Avatar"
                className="w-11 h-11 rounded-full object-cover border-2 border-zinc-700 hover:border-red-600 transition"
              />

              <ChevronDown
                size={18}
                className="text-zinc-400"
              />

            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-3 w-72 rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden z-50 focus:outline-none">

              

              <div className="px-5 py-5 border-b border-zinc-800">

                <img
                  src={
                    user?.avatar ||
                    "https://placehold.co/60x60?text=U"
                  }
                  alt=""
                  className="w-16 h-16 rounded-full object-cover mb-3"
                />

                <h2 className="font-bold text-lg">
                  {user?.fullName}
                </h2>

                <p className="text-zinc-400">
                  @{user?.username}
                </p>

              </div>

              

              <Menu.Item>
                {() => (
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-zinc-800"
                  >
                    <User size={18} />
                    My Profile
                  </button>
                )}
              </Menu.Item>

              

              <Menu.Item>
                {() => (
                  <button
                    onClick={() =>
                      navigate(`/channel/${user.username}`)
                    }
                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-zinc-800"
                  >
                    <Tv size={18} />
                    My Channel
                  </button>
                )}
              </Menu.Item>

              

              <Menu.Item>
                {() => (
                  <button
                    onClick={() =>
                      navigate("/dashboard")
                    }
                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-zinc-800"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </button>
                )}
              </Menu.Item>

              

              <Menu.Item>
                {() => (
                  <button
                    onClick={() =>
                      navigate("/playlist")
                    }
                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-zinc-800"
                  >
                    <ListVideo size={18} />
                    Playlists
                  </button>
                )}
              </Menu.Item>

              

              <Menu.Item>
                {() => (
                  <button
                    onClick={() =>
                      navigate("/history")
                    }
                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-zinc-800"
                  >
                    <History size={18} />
                    Watch History
                  </button>
                )}
              </Menu.Item>

              

              <Menu.Item>
                {() => (
                  <button
                    onClick={() =>
                      navigate("/subscriptions")
                    }
                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-zinc-800"
                  >
                    <Users size={18} />
                    Subscriptions
                  </button>
                )}
              </Menu.Item>

              

              <Menu.Item>
                {() => (
                  <button
                    onClick={() =>
                      navigate("/settings")
                    }
                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-zinc-800"
                  >
                    <Settings size={18} />
                    Settings
                  </button>
                )}
              </Menu.Item>

              <div className="border-t border-zinc-800">

                <Menu.Item>
                  {() => (
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-5 py-3 text-red-500 hover:bg-zinc-800"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  )}
                </Menu.Item>

              </div>

            </Menu.Items>

          </Menu>

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
import { NavLink } from "react-router-dom";

function Sidebar() {

    const links = [
        { name: "Home", path: "/" },
        { name: "History", path: "/history" },
        { name: "Playlists", path: "/playlist" },
        { name: "Dashboard", path: "/dashboard" },
        { name: "Upload", path: "/upload" }
    ];

    return (
        <aside className="w-64 h-[calc(100vh-64px)] border-r border-zinc-800 bg-zinc-900">

            <div className="flex flex-col p-4 gap-3">

                {links.map((link) => (

                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            `rounded-lg px-4 py-3 ${
                                isActive
                                    ? "bg-red-600"
                                    : "hover:bg-zinc-800"
                            }`
                        }
                    >
                        {link.name}
                    </NavLink>

                ))}

            </div>

        </aside>
    );
}

export default Sidebar;
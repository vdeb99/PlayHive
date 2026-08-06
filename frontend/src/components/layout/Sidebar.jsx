import { useSelector } from "react-redux";

import {
  Home,
  Users,
  History,
  ListVideo,
  Upload,
  LayoutDashboard,
  User,
  Settings,
} from "lucide-react";

import SidebarItem from "./SidebarItem";

function Sidebar() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <aside
      className="
        hidden
        lg:block
        w-64
        h-[calc(100vh-64px)]
        sticky
        top-16
        bg-zinc-900
        border-r
        border-zinc-800
        p-4
    "
    >
      <div className="space-y-2">
        <SidebarItem to="/" icon={Home} title="Home" />

        {isAuthenticated && (
          <>
            <SidebarItem
              to="/subscriptions"
              icon={Users}
              title="Subscriptions"
            />

            <SidebarItem to="/history" icon={History} title="History" />

            <SidebarItem to="/playlist" icon={ListVideo} title="Playlists" />

            <SidebarItem to="/upload" icon={Upload} title="Upload" />

            <SidebarItem
              to="/dashboard"
              icon={LayoutDashboard}
              title="Dashboard"
            />
          </>
        )}
      </div>

      {isAuthenticated && (
        <>
          <div className="border-t border-zinc-800 my-6"></div>

          <div className="space-y-2">
            <SidebarItem to="/profile" icon={User} title="My Profile" />

            <SidebarItem to="/settings" icon={Settings} title="Settings" />
          </div>
        </>
      )}
    </aside>
  );
}

export default Sidebar;

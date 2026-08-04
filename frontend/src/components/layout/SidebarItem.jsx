import { NavLink } from "react-router-dom";

function SidebarItem({ to, icon: Icon, title }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 rounded-xl transition ${
          isActive
            ? "bg-red-600 text-white"
            : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
        }`
      }
    >
      <Icon size={22} />
      <span className="font-medium">{title}</span>
    </NavLink>
  );
}

export default SidebarItem;
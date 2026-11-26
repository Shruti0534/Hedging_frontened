import { NavLink } from "react-router-dom";
import { Home, FileText, User } from "lucide-react";

export default function BuyerSidebar() {
  const links = [
    { name: "Dashboard", path: "/buyer", icon: <Home size={20} /> },
    { name: "Orders", path: "/buyer/orders", icon: <FileText size={20} /> },
    { name: "Profile", path: "/buyer/profile", icon: <User size={20} /> },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-muted border-r p-4">
      <div className="mb-6 font-bold text-xl">Buyer Panel</div>
      <nav className="flex flex-col gap-2">
        {links.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded hover:bg-secondary ${isActive ? "bg-border font-semibold" : ""}`
            }
          >
            {link.icon} {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

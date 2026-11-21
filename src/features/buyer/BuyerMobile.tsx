import { Home, FileText, User, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function BuyerMobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md p-3 flex justify-around md:hidden z-50">

      {/* Dashboard */}
      <NavLink
        to="/buyer"
        className={({ isActive }) =>
          "flex flex-col items-center " + (isActive ? "text-primary" : "text-gray-500")
        }
      >
        <Home className="w-6 h-6" />
        <span className="text-xs">Dashboard</span>
      </NavLink>

      {/* Orders */}
      <NavLink
        to="/buyer/orders"
        className={({ isActive }) =>
          "flex flex-col items-center " + (isActive ? "text-primary" : "text-gray-500")
        }
      >
        <FileText className="w-6 h-6" />
        <span className="text-xs">Orders</span>
      </NavLink>

      {/* Profile */}
      <NavLink
        to="/buyer/profile"
        className={({ isActive }) =>
          "flex flex-col items-center " + (isActive ? "text-primary" : "text-gray-500")
        }
      >
        <User className="w-6 h-6" />
        <span className="text-xs">Profile</span>
      </NavLink>

      {/* Mode (optional) */}
      

      {/* Logout */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          "flex flex-col items-center " + (isActive ? "text-primary" : "text-gray-500")
        }
      >
        <LogOut className="w-6 h-6" />
        <span className="text-xs">Logout</span>
      </NavLink>

    </nav>
  );
}

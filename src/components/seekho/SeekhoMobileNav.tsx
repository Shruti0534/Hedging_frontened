import { Home, BookOpen, Award } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function SeekhoMobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md p-3 flex justify-around md:hidden z-50">
      
      <NavLink
        to="/app/dashboard"
        className={({ isActive }) =>
          "flex flex-col items-center " + (isActive ? "text-primary" : "text-gray-500")
        }
      >
        <Home className="w-6 h-6" />
        <span className="text-xs">Home</span>
      </NavLink>

      <NavLink
        to="/seekho"
        className={({ isActive }) =>
          "flex flex-col items-center " + (isActive ? "text-primary" : "text-gray-500")
        }
      >
        <BookOpen className="w-6 h-6" />
        <span className="text-xs">Learn</span>
      </NavLink>

      <NavLink
        to="/app/profile"
        className={({ isActive }) =>
          "flex flex-col items-center " + (isActive ? "text-primary" : "text-gray-500")
        }
      >
        <Award className="w-6 h-6" />
        <span className="text-xs">Profile</span>
      </NavLink>

    </nav>
  );
}

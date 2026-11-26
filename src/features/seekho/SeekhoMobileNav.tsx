import { Home, BookOpen, Award } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Sliders, LogOut } from "lucide-react";

export default function SeekhoMobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-md p-3 flex justify-around md:hidden z-50">
      
      <NavLink
        to="/app/dashboard"
        className={({ isActive }) =>
          "flex flex-col items-center " + (isActive ? "text-primary" : "text-muted-foreground")
        }
      >
        <Home className="w-6 h-6" />
        <span className="text-xs">Home</span>
      </NavLink>

      <NavLink
        to="/seekho"
        className={({ isActive }) =>
          "flex flex-col items-center " + (isActive ? "text-primary" : "text-muted-foreground")
        }
      >
        <BookOpen className="w-6 h-6" />
        <span className="text-xs">Learn</span>
      </NavLink>

      <NavLink
        to="/app/dashboard"
        className={({ isActive }) =>
          "flex flex-col items-center " + (isActive ? "text-primary" : "text-muted-foreground")
        }
      >
        <Award className="w-6 h-6" />
        <span className="text-xs">Profile</span>
      </NavLink>
      <NavLink
  to="/mode"
  className={({ isActive }) =>
    "flex flex-col items-center " + (isActive ? "text-primary" : "text-muted-foreground")
  }
>
  <Sliders className="w-6 h-6" />
  <span className="text-xs">Mode</span>
</NavLink>
<NavLink
  to="/"
  className={({ isActive }) =>
    "flex flex-col items-center " + (isActive ? "text-primary" : "text-muted-foreground")
  }
>
  <LogOut className="w-6 h-6" />
  <span className="text-xs">Logout</span>
</NavLink>



    </nav>
  );
}

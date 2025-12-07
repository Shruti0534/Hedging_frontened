// 1. CHANGE THIS IMPORT
import { Link, useLocation } from "react-router-dom";
import { Home, TrendingUp, Shield, FileText, BookOpen, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function MobileNav() {
  // 2. FIX HOOK: react-router-dom returns an object
  const location = useLocation();
  const pathname = location.pathname;
  
  const { t } = useLanguage();

  const navItems = [
    // 3. FIX URLS: Removed '/app' prefix to match your AppSidebar and Router
    { title: t("dashboard"), url: "/app/dashboard", icon: Home },
    { title: t("markets"), url: "/app/markets", icon: TrendingUp },
    { title: t("hedge"), url: "/app/hedge", icon: Shield },
    { title: t("contracts"), url: "/app/contracts", icon: FileText },
    { title: t("profile"), url: "/app/profile", icon: User },
  ];

  return (
<nav
  className="
    fixed bottom-0 left-1/2 -translate-x-1/2
    z-50 bg-background border-t
    w-full max-w-[430px]  /* responsive width */
  "
>
  <div className="flex items-center justify-around h-16 px-2">
    {navItems.map((item) => {
      const isActive = pathname === item.url;
      const Icon = item.icon;

      return (
        <Link
          key={item.url}
          to={item.url}
          className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
            isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon className="h-5 w-5" />
          <span className="text-xs font-medium">{item.title}</span>
        </Link>
      );
    })}
  </div>
</nav>

  )
}

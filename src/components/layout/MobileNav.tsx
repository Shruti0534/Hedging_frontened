// 1. CHANGE THIS IMPORT
import { Link, useLocation } from "react-router-dom";
import { Home, TrendingUp, Shield, FileText, BookOpen } from "lucide-react";
import { Sliders, LogOut } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function MobileNav() {
  const location = useLocation();
  const pathname = location.pathname;

  const { t } = useLanguage();

  const navItems = [
  { key: "dashboard", url: "/app/dashboard", icon: Home },
  { key: "markets", url: "/app/markets", icon: TrendingUp },
  { key: "hedge", url: "/app/hedge", icon: Shield },
  { key: "contracts", url: "/app/contracts", icon: FileText },
  { key: "learn", url: "/seekho", icon: BookOpen },
  { key: "mode", url: "/mode", icon: Sliders },
  { key: "logout", url: "/", icon: LogOut },
];


  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.url;
          const Icon = item.icon;

          return (
            <Link
              key={item.url}
              to={item.url}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid={`mobile-nav-${item.url.slice(1) || "dashboard"}`}
              aria-label={t(item.key as any)}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span className="text-xs font-medium">{t(item.key as any)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

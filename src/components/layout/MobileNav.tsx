import { Link, useLocation } from "wouter";
import { Home, TrendingUp, Shield, FileText, Bell, BookOpen, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function MobileNav() {
  const [location] = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { title: t("dashboard"), url: "/", icon: Home },
    { title: t("markets"), url: "/markets", icon: TrendingUp },
    { title: t("hedge"), url: "/hedge", icon: Shield },
    { title: t("contracts"), url: "/contracts", icon: FileText },
    { title: t("learn"), url: "/learn", icon: BookOpen },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = location === item.url;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.url}
              href={item.url}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              data-testid={`mobile-nav-${item.url.slice(1) || 'dashboard'}`}
              aria-label={item.title}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span className="text-xs font-medium">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

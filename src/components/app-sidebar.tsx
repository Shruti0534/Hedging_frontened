import {
  Home,
  TrendingUp,
  Shield,
  FileText,
  User,
} from "lucide-react";
// 1. CHANGE THIS IMPORT: Use react-router-dom instead of wouter
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLanguage } from "@/contexts/LanguageContext";

 function AppSidebar() {
  // 2. FIX HOOK: react-router-dom returns an object, not an array
  const location = useLocation();
  const pathname = location.pathname;

  const { t } = useLanguage();

  const menuItems = [
    { title: t("dashboard"), url: "/app/dashboard", icon: Home },
    { title: t("markets"), url: "/app/markets", icon: TrendingUp },
    { title: t("hedge"), url: "/app/hedge", icon: Shield },
    { title: t("contracts"), url: "/app/contracts", icon: FileText },
    { title: t("profile"), url: "/app/profile", icon: User },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold px-4 py-3">
            KrishiHedge
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    // 3. FIX LOGIC: Compare with pathname
                    isActive={pathname === item.url}
                    data-testid={`nav-${item.url.slice(1) || "dashboard"}`}
                  >
                    {/* 4. FIX LINK: Change 'href' to 'to' */}
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
export default AppSidebar;
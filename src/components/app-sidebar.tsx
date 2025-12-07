import {
  Home,
  TrendingUp,
  Shield,
  FileText,
  User,
} from "lucide-react";

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

export default function AppSidebar() {
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
                    isActive={pathname === item.url}
                    data-testid={`nav-${item.url.slice(1)}`}
                  >
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

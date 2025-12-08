import {
  Home,
  BookOpen,
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
import { Sliders, LogOut } from "lucide-react";

function SeekhoSidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  const { t } = useLanguage();

  const menuItems = [
    { title: t("dashboard"), url: "/app/profile", icon: Home },
    { title: t("learn"), url: "/seekho", icon: BookOpen },
    { title: t("profile"), url: "/app/profile", icon: User },
     { title: t("Mode"), url: "/mode", icon: Sliders },
  { title: t("Logout"), url: "/", icon: LogOut },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold px-4 py-3">
            Seekho
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
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

export default SeekhoSidebar;

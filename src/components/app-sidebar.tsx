import { Home, TrendingUp, Shield, FileText, Bell, BookOpen, User } from "lucide-react";
import { Link, useLocation } from "wouter";
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

export function AppSidebar() {
  const [location] = useLocation();
  const { t } = useLanguage();

  const menuItems = [
    {
      title: t("dashboard"),
      url: "/",
      icon: Home,
    },
    {
      title: t("markets"),
      url: "/markets",
      icon: TrendingUp,
    },
    {
      title: t("hedge"),
      url: "/hedge",
      icon: Shield,
    },
    {
      title: t("contracts"),
      url: "/contracts",
      icon: FileText,
    },
    {
      title: t("alerts"),
      url: "/alerts",
      icon: Bell,
    },
    {
      title: t("learn"),
      url: "/learn",
      icon: BookOpen,
    },
    {
      title: t("profile"),
      url: "/profile",
      icon: User,
    },
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
                  <SidebarMenuButton asChild isActive={location === item.url} data-testid={`nav-${item.url.slice(1) || 'dashboard'}`}>
                    <Link href={item.url}>
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

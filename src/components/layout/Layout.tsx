import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../app-sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageToggle } from "@/components/common/LanguageToggle";

export default function AppLayout() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />

        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger />
            <LanguageToggle />
          </header>

          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
            <div className="max-w-7xl mx-auto">
              <Outlet /> {/* Renders child pages */}
            </div>
          </main>
        </div>
      </div>

      <MobileNav />
    </SidebarProvider>
  );
}

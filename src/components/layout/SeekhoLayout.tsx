

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SeekhoSidebar from "@/components/layout/SeekhoSidebar";
import SeekhoMobileNav from "@/components/seekho/SeekhoMobileNav";
import { LanguageToggle } from "@/components/common/LanguageToggle"; 
import { Outlet } from "react-router-dom";

export default function SeekhoLayout() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">

        {/* LEFT SIDEBAR */}
        <SeekhoSidebar />

        {/* MAIN CONTENT */}
        <div className="flex flex-col flex-1">

          {/* HEADER */}
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger />
            <LanguageToggle />
          </header>

          {/* PAGE CONTENT */}
          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      {/* MOBILE NAV */}
      <SeekhoMobileNav />
    </SidebarProvider>
  );
}

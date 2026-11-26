import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import BuyerSidebar from "./buyerSidebar.tsx";
import BuyerMobileNav from "./BuyerMobile.tsx";

import { LanguageToggle } from "@/components/common/LanguageToggle"; 
import { Outlet } from "react-router-dom";

export default function BuyerLayout() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        {/* LEFT SIDEBAR */}
        <BuyerSidebar />

        {/* MAIN CONTENT */}
        <div className="flex flex-col flex-1 min-h-0">
          {/* HEADER */}
          <header className="flex-shrink-0 flex items-center justify-between p-4 pr-16 border-b bg-card z-10">
            <SidebarTrigger />
            <LanguageToggle />
          </header>

          {/* PAGE CONTENT */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      {/* MOBILE NAV */}
      <BuyerMobileNav />
    </SidebarProvider>
  );
}

import { Outlet } from "react-router-dom";
import { SidebarTrigger, SidebarProvider } from "@/components/ui/sidebar";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import { MobileNav } from "@/components/layout/MobileNav";
import AppSidebar from "../app-sidebar";
import MobileFrame from "@/components/layout/MobileFrame";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <div className="relative h-screen w-full overflow-hidden flex">

        {/* SIDEBAR AS OVERLAY (prevents pushing layout) */}
        <AppSidebar className="fixed left-0 top-0 h-full z-50" />

        {/* CENTER MOBILE FRAME */}
        <div className="flex flex-1 flex-col items-center justify-start bg-neutral-100 overflow-hidden">

          {/* TOP BAR INSIDE THE PHONE */}
          <header className="w-full max-w-[430px] bg-white border-b p-4 flex items-center justify-between">
            <SidebarTrigger />
            <LanguageToggle />
          </header>

          {/* PHONE BODY */}
          <MobileFrame>
            <Outlet />
          </MobileFrame>

          {/* MOBILE NAV */}
          <div className="w-full max-w-[430px] fixed bottom-0 z-50">
            <MobileNav />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

import { Outlet } from "react-router-dom";
import { MobileNav } from "@/components/layout/MobileNav";
import { LanguageToggle } from "@/components/common/LanguageToggle";

export default function AppLayout() {
  return (
    <div className="flex h-screen w-full flex-col">
      
      {/* HEADER */}
      <header className="flex items-center justify-end p-4 border-b">
        <LanguageToggle />
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* ALWAYS SHOW MOBILE NAV */}
      <MobileNav />
    </div>
  );
}

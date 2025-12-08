import React from "react";
import { GrLanguage } from "react-icons/gr";
import { IoIosNotificationsOutline } from "react-icons/io";

export default function MobileFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex justify-center bg-neutral-100 min-h-screen">
      <div className="w-[430px] bg-white min-h-screen shadow-lg border-x relative">

        {/* Modern Header */}
        <div className="w-full bg-white text-black p-3 flex items-center justify-between sticky top-0 z-10 shadow-md">
          
          {/* LEFT SECTION */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center -space-y-1 gap-3">
              <img
                src="/farmer.jpeg"
                alt="Kisan Vyapaar Logo"
                className="w-10 h-10 rounded-full border border-gray-300"
              />

              <p className="text-xs font-semibold text-gray-800 mt-1">
                Kisan Vyapaar
              </p>
            </div>
          </div>

          {/* CENTER EMPTY */}
          <div className="flex-grow" />

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-4">
            <IoIosNotificationsOutline
              className="w-8 h-8 text-black cursor-pointer hover:text-gray-600"
              title="Notifications"
            />
            <GrLanguage
              className="w-6 h-6 text-black cursor-pointer hover:text-gray-600"
              title="Select Language"
            />
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="pb-20 bg-white">{children}</div>

      </div>
    </div>
  );
}

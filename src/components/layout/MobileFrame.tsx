import React from "react";
import { GrLanguage } from "react-icons/gr";
import { IoIosNotificationsOutline } from "react-icons/io";

export default function MobileFrame({ children }: { children: React.ReactNode }) {
 

  return (
    <div className="w-full flex justify-center bg-gray-100 min-h-screen">
      <div className="w-[430px] bg-white min-h-screen shadow-lg border-x relative">
        
        {/* Modern White Header (for a clean look) */}
        <div className="w-full bg-white text-black p-3 flex items-center justify-between sticky top-0 z-10 shadow-md">
          
          {/* LEFT SECTION: Logo (Kisan Vyapaar) + Text */}
          {/* Using a flex column structure for the image and text */}
          <div className="flex items-center">
             <div className="flex  items-center justify-center  -space-y-1 "> 
                {/* Logo: Kisan Vyapaar Image */}
                <img
                  src="/logoo.png" 
                  alt="Kisan Vyapaar Logo"
                  className="w-24 h-15 rounded-full " // Adjusted size for better fit
                />
                
                {/* Text: Kisan Vyapaar */}
                <p className="text-2xl font-semibold text-gray-800 mt-1">
                  Trade Seekho
                </p>
             </div>
          </div>

          {/* CENTER SECTION: Empty for space management */}
          <div className="flex-grow">
            {/* Optional: Current Page Title can be added here */}
          </div>

          {/* RIGHT SECTION: Language + Notification Icons */}
          <div className="flex items-center gap-4">
            
            {/* Notification Icon */}
            <IoIosNotificationsOutline  
              className="w-8 h-8 text-black cursor-pointer hover:text-gray-600" 
              title="Notifications" 
            />

            {/* Language Icon (Moved to the right as requested) */}
            <GrLanguage 
              className="w-6 h-6 text-black cursor-pointer hover:text-gray-600" 
              title="Select Language" 
            />
          </div>
        </div>

        {/* Page Content */}
        <div className="pb-20 bg-white">
          {children}
        </div>

      </div>
    </div>
  );
}

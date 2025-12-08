import React, { useState } from "react";
import { GrLanguage } from "react-icons/gr";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useLanguage } from "../../contexts/LanguageContext";

export default function MobileFrame({ children }: { children: React.ReactNode }) {
  const { t, language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex justify-center bg-gray-100 min-h-screen">
      <div className="w-[430px] bg-white min-h-screen shadow-lg border-x relative">

        {/* Header */}
        <div className="w-full bg-white text-black p-3 flex items-center justify-between sticky top-0 z-10 shadow-md">
          
          {/* LEFT: Logo + Text */}
          <div className="flex items-center">
            <div className="flex items-center">
              <img
                src="/logoo.png"
                alt="Kisan Vyapaar Logo"
                className="w-14 h-14 rounded-full"
              />
              <p className="text-2xl font-semibold text-gray-800 ml-2">
                {t("TradeSeekho")}
              </p>
            </div>
          </div>

          {/* RIGHT: Icons */}
          <div className="relative flex items-center gap-4">

            {/* Notifications */}
            <IoIosNotificationsOutline
              className="w-7 h-7 text-black cursor-pointer hover:text-gray-600"
            />

            {/* Language Icon */}
            <GrLanguage
              className="w-6 h-6 text-black cursor-pointer hover:text-gray-600"
              onClick={() => setOpen(!open)}
              title="Select Language"
            />

            {/* Language Dropdown */}
            {open && (
              <div className="absolute right-0 top-10 bg-white shadow-xl rounded-lg border p-2 w-32">
                <button
                  className={`w-full text-left px-2 py-1 hover:bg-gray-100 rounded ${
                    language === "en" ? "font-bold" : ""
                  }`}
                  onClick={() => { setLanguage("en"); setOpen(false); }}
                >
                  English
                </button>

                <button
                  className={`w-full text-left px-2 py-1 hover:bg-gray-100 rounded ${
                    language === "hi" ? "font-bold" : ""
                  }`}
                  onClick={() => { setLanguage("hi"); setOpen(false); }}
                >
                  हिन्दी
                </button>

                
              </div>
            )}
          </div>
        </div>

        {/* Page Content */}
        <div className="pb-20 bg-white">{children}</div>

      </div>
    </div>
  );
}

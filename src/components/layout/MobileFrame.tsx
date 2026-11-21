import React, { useState } from "react";
import { GrLanguage } from "react-icons/gr";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useLanguage } from "../../contexts/LanguageContext";

export default function MobileFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t, language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    // Outer Background (Desktop view centering)
    <>
      {/* Outer Background (center on desktop, full height) */}
      <div className="w-full flex justify-center bg-gray-100 min-h-screen overflow-x-hidden">
        {/* Mobile Container */}
        <div className="w-[430px] bg-white min-h-screen shadow-2xl relative flex flex-col">
          {/* Header */}
          <div
            className="sticky top-0  w-full bg-white/95 backdrop-blur-sm 
                     text-gray-900 px-4 pr-16 py-3 flex  justify-between
                     shadow-sm border-b border-gray-100"
          >
            {/* LEFT: Logo + Title */}
            <div className="flex items-center ">
              <img
                src="/logoo.png"
                alt="Kisan Vyapaar Logo"
                className="w-10 h-10 rounded-full object-cover shadow-sm"
              />
              <h1 className="text-xl font-bold text-gray-800 tracking-tight">
                {t("TradeSeekho")}
              </h1>
            </div>

            {/* RIGHT: Icons */}
            <div className="relative flex  gap-3">
              {/* Notifications */}
              <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                <IoIosNotificationsOutline className="w-6 h-6 text-gray-700" />
              </button>

              {/* Language Icon */}
              <button
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => setOpen(!open)}
              >
                <GrLanguage className="w-5 h-5 text-gray-700" />
              </button>

              {/* Dropdown */}
              {open && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-[60]"
                    onClick={() => setOpen(false)}
                  />

                  {/* Menu */}
                  <div
                    className="absolute right-0 top-full mt-2 w-36 bg-white shadow-xl 
                             rounded-xl border border-gray-100 z-[70] overflow-hidden 
                             animate-in fade-in zoom-in-95 duration-200"
                  >
                    <div className="py-1">
                      {/* English */}
                      <button
                        className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between
                                  hover:bg-gray-50 transition-colors ${
                                    language === "en"
                                      ? "text-green-600 font-semibold bg-green-50"
                                      : "text-gray-700"
                                  }`}
                        onClick={() => {
                          setLanguage("en");
                          setOpen(false);
                        }}
                      >
                        English
                        {language === "en" && (
                          <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                        )}
                      </button>

                      {/* Hindi */}
                      <button
                        className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between
                                  hover:bg-gray-50 transition-colors ${
                                    language === "hi"
                                      ? "text-green-600 font-semibold bg-green-50"
                                      : "text-gray-700"
                                  }`}
                        onClick={() => {
                          setLanguage("hi");
                          setOpen(false);
                        }}
                      >
                        हिन्दी
                        {language === "hi" && (
                          <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Page Content */}
          <main className="flex-1 bg-white pb-24">{children}</main>
        </div>
      </div>
    </>
  );
}

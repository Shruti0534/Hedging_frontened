import React from "react";


import { FiSearch, FiHeart, FiPlus, FiHome, FiUser, FiShoppingCart } from "react-icons/fi";

export default function Dashboard() {
  const { t } = useLanguage();

  return (
    <div className="w-full min-h-screen bg-white text-black max-w-[430px] mx-auto pb-24 relative">

      {/* Header */}
      <div className="w-full bg-black text-white py-5 px-5 rounded-b-3xl shadow">
        <h1 className="text-xl font-semibold text-center">{t("dashboard") || "Buyer Dashboard"}</h1>
      </div>

      {/* Search */}
      <div className="px-5 mt-4">
        <div className="flex items-center gap-2 bg-gray-200 rounded-xl px-4 py-2">
          <FiSearch className="text-gray-600" />
          <input
            type="text"
            placeholder="Browse Crops"
            className="bg-transparent outline-none text-black w-full"
          />
        </div>
      </div>

      {/* Filter buttons */}
      <div className="px-5 mt-4 flex gap-3">
        <button className="px-5 py-2 bg-black text-white rounded-full text-sm font-semibold">
          Organic
        </button>
        <button className="px-5 py-2 border border-black rounded-full text-sm font-semibold">
          Bulk
        </button>
      </div>

      {/* Live bids */}
      <div className="px-5 mt-5">
        <div className="w-full bg-gray-100 border border-gray-300 p-4 rounded-xl">
          <p className="font-semibold text-black">Live Bids Ticker</p>
          <p className="text-sm text-gray-600 mt-1">
            Real-time updates • Latest bids • Price movements
          </p>
        </div>
      </div>

      {/* Browse Crops */}
      <div className="px-5 mt-6 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Browse Crops</h2>
        <button className="text-sm underline">View All</button>
      </div>

      {/* Crop cards carousel */}
      <div className="px-5 mt-4 flex gap-4 overflow-x-auto pb-7 no-scrollbar">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="min-w-[160px] bg-gray-100 border border-gray-300 rounded-2xl p-4 relative"
          >
            <FiHeart className="absolute top-3 right-3" />

            {/* Image Placeholder */}
            <div className="w-full h-24 bg-gray-300 rounded-xl" />

            <p className="mt-3 font-semibold">Tomato</p>
            <p className="text-sm text-gray-600">Fresh & Organic</p>

            <button className="mt-3 text-sm underline">Tap for Details</button>
          </div>
        ))}
      </div>

      {/* Floating Add button */}
      <button className="fixed bottom-24 right-5 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-xl">
        <FiPlus size={26} />
      </button>

      {/* Bottom Navbar */}
      <div className="fixed bottom-0 w-full max-w-[430px] bg-white border-t border-gray-300 py-2 flex justify-around">
        <div className="flex flex-col items-center">
          <FiHome size={22} />
          <span className="text-xs mt-1">Home</span>
        </div>

        <div className="flex flex-col items-center">
          <FiShoppingCart size={24} />
          <span className="text-xs mt-1">Trade</span>
        </div>

        <div className="flex flex-col items-center">
          <FiUser size={22} />
          <span className="text-xs mt-1">Profile</span>
        </div>
      </div>

    </div>
  );
}

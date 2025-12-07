import React, { useState } from "react";
import { BsBook } from "react-icons/bs";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Mode = () => {
  const [isTrading, setIsTrading] = useState(false); 
  const navigate = useNavigate();

  const handleToggle = () => {
    const newState = !isTrading;
    setIsTrading(newState);

    setTimeout(() => {
      if (newState) {
        navigate("/app/dashboard"); // VYAPAAR
      } else {
        navigate("/app/learn"); // SEEKHO
      }
    }, 350);
  };

  return (
    <div className="w-full h-[100dvh] flex items-center justify-center bg-white p-4">

      <div className="w-full max-w-md p-6 rounded-3xl bg-white shadow-2xl border border-gray-200">
        
        <h1 className="text-center text-2xl font-bold mb-6 text-gray-800 tracking-wide">
          Choose Your Mode
        </h1>

        {/* Mode Cards */}
        <div className="relative w-full h-44 rounded-3xl flex overflow-hidden shadow-inner bg-gray-100">

          {/* SEEKHO MODE */}
          <div
            className={`flex-1 flex flex-col items-center justify-center transition-all duration-500 ${
              !isTrading ? "bg-green-400 text-black" : "bg-gray-200 text-gray-600"
            }`}
          >
            <BsBook size={40} />
            <p className="font-semibold mt-2">SEEKHO MODE</p>
            <p className="text-xs">(Safe Learning)</p>
          </div>

          {/* VYAPAAR MODE */}
          <div
            className={`flex-1 flex flex-col items-center justify-center transition-all duration-500 ${
              isTrading ? "bg-blue-900 text-white" : "bg-gray-300 text-gray-600"
            }`}
          >
            <RiMoneyRupeeCircleLine size={40} />
            <p className="font-semibold mt-2">VYAPAAR MODE</p>
            <p className="text-xs">(Real Trading)</p>
          </div>

          {/* CENTERED TOGGLE BUTTON */}
          <button
            onClick={handleToggle}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
              w-24 h-12 rounded-full flex items-center px-1 transition-all duration-300 shadow-xl
              ${isTrading ? "bg-blue-700 justify-end" : "bg-green-600 justify-start"}`}
          >
            <span className="w-10 h-10 bg-white rounded-full shadow-md"></span>
          </button>
        </div>

        {/* Ask Kisan AI Button */}
        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 mt-6 rounded-2xl shadow-lg transition-all"
        >
          Ask Kisan AI
        </button>

      </div>
    </div>
  );
};

export default Mode;

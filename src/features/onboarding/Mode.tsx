import { useState } from "react";
import { BsBook } from "react-icons/bs";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import MobileFrame from "../../components/layout/MobileFrame";
import { useLanguage } from "../../contexts/LanguageContext";


const Mode = () => {
 const [isTrading, setIsTrading] = useState(false); // false = SEEKHO, true = VYAPAAR
const navigate = useNavigate();
const { mode, setMode } = useLanguage(); 

const handleToggle = () => {
   const newMode = mode === "seekho" ? "vyapaar" : "seekho";
   setMode(newMode); 
 
   setIsTrading((prev) => !prev);

setTimeout(() => {
  if (!isTrading) {
    navigate("/app/dashboard"); // VYAPAAR
  } else {
    navigate("/mode"); // SEEKHO
  }
}, 350);


};

return (
    <MobileFrame>

     <div className="w-full min-h-[100dvh] flex items-center justify-center bg-white p-4"> <div className="w-full max-w-md p-6 rounded-3xl bg-gray-100 shadow-2xl border border-gray-300">


    <h1 className="text-center text-2xl font-bold mb-6 text-black tracking-wide">
      Choose Your Mode
    </h1>

    {/* Mode Cards */}
    <div className="relative w-full h-44 rounded-3xl flex overflow-hidden shadow-inner bg-gray-200">

      {/* SEEKHO MODE */}
      <div
        className={`flex-1 flex flex-col items-center justify-center transition-all duration-500 ${
          !isTrading ? "bg-white text-black" : "bg-gray-300 text-gray-600"
        }`}
      >
        <BsBook size={40} />
        <p className="font-semibold mt-2">SEEKHO MODE</p>
        <p className="text-xs">(Safe Learning)</p>
      </div>

      {/* VYAPAAR MODE */}
      <div
        className={`flex-1 flex flex-col items-center justify-center transition-all duration-500 ${
          isTrading ? "bg-gray-800 text-white" : "bg-gray-300 text-gray-600"
        }`}
      >
        <RiMoneyRupeeCircleLine size={40} />
        <p className="font-semibold mt-2">VYAPAAR MODE</p>
        <p className="text-xs">(Real Trading)</p>
      </div>

      {/* Centered Toggle */}
      <button
        onClick={handleToggle}
        className={`absolute left-1/2 top-[80%]
 -translate-x-1/2 -translate-y-1/2 
          w-24 h-12 rounded-full flex items-center px-1 transition-all duration-300 shadow-xl
          ${isTrading ? "bg-gray-800 justify-end" : "bg-black justify-start"}`}
      >
        <span className="w-10 h-10 bg-white rounded-full shadow-md"></span>
      </button>
    </div>

    {/* Ask Kisan AI Button */}
    <button onClick={() => !isTrading ? navigate("/seekho") : navigate("/app/dashboard") } className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 mt-6 rounded-2xl shadow-lg transition-all" > Continue with {!isTrading ? "Seekho" : "Vyapaar"} mode </button>
 

  </div>
</div>
    </MobileFrame>


);
};

export default Mode;

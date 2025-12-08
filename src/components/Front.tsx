import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MobileFrame from "./layout/MobileFrame";

const Front = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/language");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <MobileFrame>

    <div className="w-full h-[100dvh] bg-white flex items-center justify-center px-6">
      <div className="flex flex-col items-center text-center">

        {/* Logo Box */}
        <div className="bg-white p-6 rounded-3xl shadow-xl mb-6">
          <img
            src="/project2.png"
            alt="Kisan Vyapaar Logo"
            className="w-30 h-30"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800">
          Trade Seekho
        </h1>

        <p className="text-gray-600 text-sm mt-1 opacity-90">
          Empowering Farmers, Connecting Markets
        </p>
      </div>
    </div>
            </MobileFrame>
  );
};

export default Front;

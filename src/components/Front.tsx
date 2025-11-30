import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Front = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/language");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-full h-[100dvh] bg-gradient-to-b from-green-300 via-green-400 to-blue-500 flex items-center justify-center px-6">
      <div className="flex flex-col items-center text-center">

        {/* Logo Box */}
        <div className="bg-white p-6 rounded-3xl shadow-xl mb-6">
          <img
            src="/kisan-logo.png"
            alt="Kisan Vyapaar Logo"
            className="w-20 h-20"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white">
          Kisan Vyapaar
        </h1>

        <p className="text-white text-sm mt-1 opacity-90">
          Empowering Farmers, Connecting Markets
        </p>
      </div>
    </div>
  );
};

export default Front;

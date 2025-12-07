import { useNavigate } from "react-router-dom";
import MobileFrame from "./layout/MobileFrame";


const Language = () => {
  const navigate = useNavigate();

  const handleSelect = (lang: string) => {
    navigate("/login");
  };

  return (
    <MobileFrame>

    <div className="w-full h-[100dvh] bg-white flex items-center justify-center px-5">

      {/* Outer Soft Color Box */}
      <div className="bg-white w-full max-w-xs rounded-3xl shadow-lg p-6">

        {/* Heading */}
        <h1 className="text-xl font-bold text-gray-800 text-center">
          Choose Your Language
        </h1>
        <p className="text-gray-600 text-sm text-center mt-1">
          अपनी भाषा चुनें
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 mt-6">

          {/* English */}
          <button
            onClick={() => handleSelect("en")}
            className="flex flex-col items-center justify-center border rounded-2xl py-4  active:scale-95"
          >
            <span className="text-3xl">🌐</span>
            <span className="text-sm font-semibold mt-1">English</span>
          </button>

          {/* Hindi */}
          <button
            onClick={() => handleSelect("hi")}
            className="flex flex-col items-center justify-center border rounded-2xl py-4 bg-white active:scale-95"
          >
            <span className="text-3xl">हिं</span>
            <span className="text-sm font-semibold mt-1">हिन्दी</span>
          </button>

          {/* Marathi */}
          <button
            onClick={() => handleSelect("mr")}
            className="flex flex-col items-center justify-center border rounded-2xl py-4 bg-white active:scale-95"
          >
            <span className="text-3xl">🏠</span>
            <span className="text-sm font-semibold mt-1">मराठी</span>
          </button>

          {/* More */}
          <button
            onClick={() => handleSelect("more")}
            className="flex flex-col items-center justify-center border rounded-2xl py-4 bg-white active:scale-95"
          >
            <span className="text-3xl">⋯</span>
            <span className="text-sm font-semibold mt-1">More</span>
          </button>

        </div>
      </div>
    </div>
    </MobileFrame>

  );
};

export default Language;

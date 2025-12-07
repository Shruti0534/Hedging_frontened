import { useNavigate } from "react-router-dom";
import { FaTractor } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";

const Selection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    navigate("/signup", { state: { role } });
  };

  return (
    <div className="w-full h-[100dvh] bg-gradient-to-b from-blue-200 to-green-200 flex justify-center items-start p-4">
      <div className="w-full max-w-md bg-white rounded-[30px] mt-10 p-6 shadow-xl">

        <h1 className="text-xl font-bold text-center">Select Your Role</h1>
        <p className="text-center text-sm text-gray-600 mb-6">अपनी भूमिका चुनें</p>

        {/* Farmer */}
        <button
          onClick={() => handleRoleSelect("Farmer")}
          className="w-full bg-green-700 text-white py-4 rounded-2xl mb-4 flex items-center justify-center gap-3 text-lg font-semibold"
        >
          <FaTractor size={24} />
          Farmer (किसान)
        </button>

        {/* Buyer */}
        <button
          onClick={() => handleRoleSelect("Buyer")}
          className="w-full bg-blue-700 text-white py-4 rounded-2xl mb-4 flex items-center justify-center gap-3 text-lg font-semibold"
        >
          <FaShoppingCart size={24} />
          Buyer (खरीदार)
        </button>

        {/* Admin */}
        <button
          onClick={() => handleRoleSelect("Admin")}
          className="w-full bg-[#8B5A2B] text-white py-4 rounded-2xl flex items-center justify-center gap-3 text-lg font-semibold"
        >
          <FaUserCog size={24} />
          Admin (प्रशासक)
        </button>

      </div>
    </div>
  );
};

export default Selection;

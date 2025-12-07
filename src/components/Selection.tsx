import { useNavigate, useLocation } from "react-router-dom";
import { FaTractor } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaUsersCog } from "react-icons/fa"; // FPO icon

const Selection = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
 

  const handleRoleSelect = (role: string) => {
    navigate("/signup", { state: { role, phone: state?.phone } });

  };

  return (
    <div className="w-full h-[100dvh] bg-white flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-[30px] mt-10 p-6 shadow-xl">

        <h1 className="text-xl font-bold text-center">Select Your Role</h1>
        <p className="text-center text-sm text-gray-600 mb-6">अपनी भूमिका चुनें</p>

        {/* Farmer */}
        <button
          onClick={() => handleRoleSelect("farmer")}
          className="w-full bg-green-700 text-white py-4 rounded-2xl mb-4 flex items-center justify-center gap-3 text-lg font-semibold"
        >
          <FaTractor size={24} />
          Farmer (किसान)
        </button>

        {/* Buyer */}
        <button
          onClick={() => handleRoleSelect("buyer")}
          className="w-full bg-blue-700 text-white py-4 rounded-2xl mb-4 flex items-center justify-center gap-3 text-lg font-semibold"
        >
          <FaShoppingCart size={24} />
          Buyer (खरीदार)
        </button>

        {/* FPO */}
        <button
          onClick={() => handleRoleSelect("fpo")}
          className="w-full bg-purple-700 text-white py-4 rounded-2xl flex items-center justify-center gap-3 text-lg font-semibold"
        >
          <FaUsersCog size={24} />
          FPO (एफ़पीओ)
        </button>

      </div>
    </div>
  );
};

export default Selection;

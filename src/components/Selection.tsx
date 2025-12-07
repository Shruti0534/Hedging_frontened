import { useNavigate, useLocation } from "react-router-dom";
import { FaTractor } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaUsersCog } from "react-icons/fa"; // FPO icon
import MobileFrame from "./layout/MobileFrame";


const Selection = () => {
const navigate = useNavigate();
const { state } = useLocation();

const handleRoleSelect = (role: string) => {
navigate("/signup", { state: { role, phone: state?.phone } });
};

return (
  <MobileFrame>

   <div className="w-full min-h-[100dvh] bg-white flex justify-center items-center p-4"> <div className="w-full max-w-md bg-gray-100 rounded-[30px] p-6 shadow-lg">


    <h1 className="text-xl font-bold text-center text-black">Select Your Role</h1>
    <p className="text-center text-sm text-gray-600 mb-6">अपनी भूमिका चुनें</p>

    {/* Farmer */}
    <button
      onClick={() => handleRoleSelect("farmer")}
      className="w-full bg-white text-black border border-gray-400 py-4 rounded-2xl mb-4 flex items-center justify-center gap-3 text-lg font-semibold hover:bg-gray-200 transition"
    >
      <FaTractor size={24} />
      Farmer (किसान)
    </button>

    {/* Buyer */}
    <button
      onClick={() => handleRoleSelect("buyer")}
      className="w-full bg-white text-black border border-gray-400 py-4 rounded-2xl mb-4 flex items-center justify-center gap-3 text-lg font-semibold hover:bg-gray-200 transition"
    >
      <FaShoppingCart size={24} />
      Buyer (खरीदार)
    </button>

    {/* FPO */}
    <button
      onClick={() => handleRoleSelect("fpo")}
      className="w-full bg-white text-black border border-gray-400 py-4 rounded-2xl flex items-center justify-center gap-3 text-lg font-semibold hover:bg-gray-200 transition"
    >
      <FaUsersCog size={24} />
      FPO (एफ़पीओ)
    </button>

  </div>
</div>
  </MobileFrame>

);
};

export default Selection;

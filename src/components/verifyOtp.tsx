import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const OTP = () => {
  const { state } = useLocation();
  const phone = state?.phone;
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/verify-otp`,
        {
          phoneNumber: phone,
          otp,
        }
      );

      if (res.data.success === true) {
        navigate("/selection", { state: { phone } });
      } else {
        alert("Invalid or expired OTP");
      }
    } catch (err) {
      alert("Error verifying OTP");
    }
  };

  return (
    <div className="w-full h-[100dvh] bg-white flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl border border-gray-200">
        
        <h1 className="text-2xl font-bold text-center mb-5 text-gray-800">
          Verify OTP
        </h1>

        <input
          type="text"
          maxLength={6}
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none text-lg tracking-widest text-center"
        />

        <button
          onClick={handleVerifyOtp}
          className="w-full mt-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md active:scale-95 transition"
        >
          Verify OTP
        </button>

      </div>
    </div>
  );
};

export default OTP;

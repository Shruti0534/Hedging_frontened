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
    <div className="p-6 w-full h-[100dvh] flex items-center justify-center bg-blue-100">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Verify OTP</h1>

        <input
          type="text"
          maxLength={6}
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 outline-none"
        />

        <button
          onClick={handleVerifyOtp}
          className="w-full mt-4 py-3 bg-green-500 text-white rounded-xl"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default OTP;

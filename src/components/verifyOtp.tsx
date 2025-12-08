import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import MobileFrame from "./layout/MobileFrame";
import { useLanguage } from "../contexts/LanguageContext";

const OTP = () => {
  const { t } = useLanguage(); // language context
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
        alert(t("Invalid or expired OTP"));
      }
    } catch (err) {
      console.log(err);
      alert(t("Error verifying OTP"));
    }
  };

  return (
    <MobileFrame>
      <div className="w-full h-full bg-white flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl border border-gray-200">

          <h1 className="text-2xl font-bold text-center mb-5 text-gray-800">
            {t("Verify OTP")}
          </h1>

          <input
            type="text"
            maxLength={6}
            placeholder={t("Enter OTP")}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none text-lg tracking-widest text-center"
          />

          <button
            onClick={handleVerifyOtp}
            className="w-full mt-5 py-3 bg-black hover:bg-background hover:text-black text-white rounded-xl shadow-md active:scale-95 transition"
          >
            {t("Verify OTP")}
          </button>

        </div>
      </div>
    </MobileFrame>
  );
};

export default OTP;

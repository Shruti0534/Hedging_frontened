import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import MobileFrame from "./layout/MobileFrame";
import { useLanguage } from "../contexts/LanguageContext";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useLanguage(); // use translations
  const [phone, setPhone] = useState("");

  // send OTP
  const handleSendOtp = async () => {
    const formattedPhone = phone.replace(/ /g, "");

    if (formattedPhone.length < 10) {
      alert(t("Please enter a valid phone number")); // translated
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/send-otp`,
        { phoneNumber: formattedPhone }
      );

      if (res.data.success) {
        navigate("/otp", { state: { phone: formattedPhone } });
      }
    } catch (err) {
      alert(t("Something went wrong while sending OTP")); // translated
    }
  };

  return (
    <MobileFrame>
      <div className="w-full h-[100dvh] bg-white flex justify-center items-center p-4">
        <div className="w-full max-w-md bg-white rounded-[30px] p-6 shadow-xl border border-gray-200">

          {/* Title */}
          <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
            {t("Login to Trade Seekho")}
          </h1>

          {/* Phone Input */}
          <label className="text-sm font-semibold text-gray-700">
            {t("Phone number")}
          </label>
          <div className="mt-2">
            <PhoneInput
              country={"in"}
              value={phone}
              onChange={setPhone}
              inputStyle={{
                width: "100%",
                borderRadius: "12px",
                height: "45px",
              }}
              buttonStyle={{
                borderRadius: "12px 0 0 12px",
              }}
            />
          </div>

          {/* GET OTP Button */}
          <button
            onClick={handleSendOtp}
            className="w-full mt-5 py-3 bg-black hover:bg-background hover:text-black text-white rounded-xl shadow-md active:scale-95 transition"
          >
            {t("Get OTP")}
          </button>

        </div>
      </div>
    </MobileFrame>
  );
};

export default Login;

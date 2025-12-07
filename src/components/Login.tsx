import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  // send OTP
  const handleSendOtp = async () => {
    const formattedPhone = phone.replace(/ /g, "");

    if (formattedPhone.length < 10) {
      alert("Please enter a valid phone number");
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
      alert("Something went wrong while sending OTP");
    }
  };

  return (
    <div className="w-full h-[100dvh] bg-white flex justify-center items-center p-4">

      <div className="w-full max-w-md bg-white rounded-[30px] p-6 shadow-xl border border-gray-200">

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Login to Kisan Vyapaar
        </h1>

        {/* Phone Input */}
        <label className="text-sm font-semibold text-gray-700">Phone number</label>
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
          className="w-full mt-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md active:scale-95 transition"
        >
          Get OTP
        </button>

      </div>
    </div>
  );
};

export default Login;

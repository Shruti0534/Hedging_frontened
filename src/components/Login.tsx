import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [pan, setPan] = useState("");
  const [documents, setDocuments] = useState<File[]>([]);

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

  const handleFileUpload = (e: any) => {
    setDocuments([...documents, ...Array.from(e.target.files)]);
  };

  return (
    <div className="w-full h-[100dvh] bg-gradient-to-b from-blue-200 to-green-200 flex justify-center items-start p-4">
      <div className="w-full max-w-md bg-white rounded-[30px] mt-8 p-6 shadow-xl">

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-4">
          Login to Kisan Vyapaar
        </h1>

        {/* Phone Input */}
        <label className="text-sm font-semibold">Phone number</label>
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
          className="w-full mt-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl shadow-md active:scale-95 transition"
        >
          Get OTP
        </button>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/signup-kyc")}
            className="text-blue-700 font-medium underline"
          >
            New User? Verify KYC
          </button>
        </div>

        <div className="flex items-center mt-6 mb-4">
          <div className="flex-1 border-t"></div>
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <div className="flex-1 border-t"></div>
        </div>

        {/* Aadhaar Input */}
        <label className="text-sm font-semibold">Aadhaar Number</label>
        <input
          type="text"
          value={aadhar}
          maxLength={12}
          onChange={(e) => setAadhar(e.target.value.replace(/\D/g, ""))}
          className="w-full border rounded-xl px-4 py-3 mt-1 outline-none shadow-sm"
          placeholder="Enter Aadhaar Number"
        />

        {/* PAN Input */}
        <label className="text-sm font-semibold mt-4 block">
          PAN Card (Optional)
        </label>
        <input
          type="text"
          value={pan}
          maxLength={10}
          onChange={(e) => setPan(e.target.value.toUpperCase())}
          className="w-full border rounded-xl px-4 py-3 mt-1 outline-none shadow-sm"
          placeholder="PAN Number"
        />

        {/* Upload Documents */}
        <label className="text-sm font-semibold mt-4 block">
          Upload Documents
        </label>

        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="w-full mt-2 border rounded-xl px-4 py-3 shadow-sm"
        />

        {documents.length > 0 && (
          <div className="mt-3 text-sm text-gray-600">
            {documents.length} file(s) selected
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";

const Login = () => {
  const [phone, setPhone] = useState("");

  return (
    <div className="w-full h-[100dvh] bg-gradient-to-b from-blue-200 to-green-200 flex justify-center px-4 pt-6">
      
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-xl">

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Login to Kisan Vyapaar
        </h1>

        {/* Phone Label */}
        <label className="text-sm font-semibold text-gray-700">
          Phone number
        </label>

        {/* Phone Input */}
        <div className="flex items-center gap-2 border rounded-xl mt-1 px-3 py-2">
          <span className="text-xl">🇮🇳</span>
          <input
            type="tel"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            className="w-full outline-none text-gray-800"
          />
          <span className="text-xl text-gray-500 cursor-pointer">🎤</span>
        </div>

        {/* Get OTP Button */}
        <button className="w-full mt-4 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-green-500 to-blue-500 shadow">
          Get OTP
        </button>

        {/* KYC Button */}
        <button className="w-full mt-3 py-3 rounded-xl text-blue-600 font-semibold border border-blue-400">
          New User? Verify KYC
        </button>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-[1px] bg-gray-300"></div>
          <span className="px-2 text-gray-600 font-medium">OR</span>
          <div className="flex-grow h-[1px] bg-gray-300"></div>
        </div>

        {/* Aadhaar Number */}
        <label className="text-sm font-semibold text-gray-700">Aadhaar Number</label>
        <input
          type="text"
          maxLength={12}
          placeholder="Aadhaar Number"
          className="w-full border rounded-xl px-3 py-2 mt-1 mb-3 outline-none"
        />

        {/* PAN Number */}
        <label className="text-sm font-semibold text-gray-700">Pan Card (Optional)</label>
        <input
          type="text"
          placeholder="Pan Card (Optional)"
          className="w-full border rounded-xl px-3 py-2 mt-1 mb-3 outline-none"
        />

        {/* Upload Documents */}
        <label className="text-sm font-semibold text-gray-700">
          Upload Documents
        </label>

        <div className="border rounded-xl px-3 py-3 mt-2 cursor-pointer text-gray-600">
          Upload Document
        </div>

      </div>
    </div>
  );
};

export default Login;

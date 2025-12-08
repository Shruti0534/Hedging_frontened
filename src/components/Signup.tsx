import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import MobileFrame from "./layout/MobileFrame";

const Signup = () => {
  const { state } = useLocation();
  const phone = state?.phone;
  const roleFromSelection = state?.role;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: roleFromSelection || "farmer",
    line1: "",
    line2: "",
    state: "",
    district: "",
    pincode:""
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValid = () => {
    if (!form.firstName) return "First name is required";
    if (!form.lastName) return "Last name is required";
    if (!form.line1) return "Address Line 1 is required";
    if (!form.state) return "State is required";
    if (!form.district) return "District is required";
    if (!phone) return "Phone number missing";
    return null;
  };

  const handleSignup = async () => {
    const error = isValid();
    if (error) {
      alert(error);
      return;
    }

    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        phoneNumber: phone,
        email: form.email,
        role: form.role,
        addressDetail: {
          line1: form.line1,
          line2: form.line2,
          state: form.state,
          district: form.district,
          pincode: form.pincode,
        },
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/create-user`,
        payload
      );

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        alert("Signup successful!");

        // ⭐ UPDATED ROUTING LOGIC
        if (form.role === "buyer") {
          navigate("/app/profile");   // BUYER → PROFILE PAGE
        } else {
          navigate("/mode");          // FARMER or FPO
        }
      }
    } catch (err: any) {
      alert("Signup failed: " + err?.response?.data?.message);
    }
  };

  return (
    <MobileFrame>
<div className="p-6 w-full h-[100dvh] bg-white flex justify-center items-center">
  <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow">
    <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>

    {/* First & Last Name */}
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="block text-sm font-medium text-gray-700">First Name *</label>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Last Name *</label>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
        />
      </div>
    </div>

    {/* Email Optional */}
    <label className="block text-sm font-medium text-gray-700 mt-3">Email (Optional)</label>
    <input
      type="email"
      name="email"
      placeholder="Enter email"
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg p-2 mt-1"
    />

    {/* Address Line 1 */}
    <label className="block text-sm font-medium text-gray-700 mt-3">Address Line 1 *</label>
    <input
      type="text"
      name="line1"
      placeholder="House no., Street, Building"
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg p-2 mt-1"
    />

    {/* Address Line 2 */}
    <label className="block text-sm font-medium text-gray-700 mt-3">Address Line 2 (Optional)</label>
    <input
      type="text"
      name="line2"
      placeholder="Landmark, Area"
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg p-2 mt-1"
    />

    {/* District & Pincode in same line */}
    <div className="grid grid-cols-2 gap-3 mt-3">
      <div>
        <label className="block text-sm font-medium text-gray-700">District *</label>
        <input
          type="text"
          name="district"
          placeholder="District"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Pincode *</label>
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
        />
      </div>
    </div>

    {/* State at last */}
    <label className="block text-sm font-medium text-gray-700 mt-3">State *</label>
    <input
      type="text"
      name="state"
      placeholder="State"
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg p-2 mt-1"
    />

    {/* Submit btn */}
    <button
      onClick={handleSignup}
      className="w-full mt-5 py-3 bg-black hover:bg-white hover:text-black text-white border border-black rounded-xl font-semibold transition"
    >
      Create Account
    </button>
  </div>
</div>


    </MobileFrame>
  );
};

export default Signup;

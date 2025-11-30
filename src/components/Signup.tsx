import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const { state } = useLocation();
  const phone = state?.phone;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "farmer",
    line1: "",
    line2: "",
    state: "",
    district: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
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
        },
      };

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/create-user`, payload);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        alert("Signup successful!");
        navigate("/dashboard"); // or home screen
      }
    } catch (err: any) {
      alert("Signup failed: " + err?.response?.data?.message);
    }
  };

  return (
    <div className="p-6 w-full h-[100dvh] bg-gray-100 flex justify-center items-start">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow">

        <h1 className="text-2xl font-bold mb-4">Create Account</h1>

        <input type="text" name="firstName" placeholder="First Name"
          onChange={handleChange} className="input" />

        <input type="text" name="lastName" placeholder="Last Name"
          onChange={handleChange} className="input" />

        <input type="email" name="email" placeholder="Email"
          onChange={handleChange} className="input" />

        {/* Role dropdown */}
        <select name="role" onChange={handleChange} className="input">
          <option value="farmer">Farmer</option>
          <option value="fpo">FPO</option>
          <option value="buyer">Buyer</option>
        </select>

        <input type="text" name="line1" placeholder="Address Line 1"
          onChange={handleChange} className="input" />

        <input type="text" name="line2" placeholder="Address Line 2"
          onChange={handleChange} className="input" />

        <input type="text" name="state" placeholder="State"
          onChange={handleChange} className="input" />

        <input type="text" name="district" placeholder="District"
          onChange={handleChange} className="input" />

        <button
          onClick={handleSignup}
          className="w-full mt-4 py-3 bg-green-600 text-white rounded-xl"
        >
          Create Account
        </button>

      </div>
    </div>
  );
};

export default Signup;

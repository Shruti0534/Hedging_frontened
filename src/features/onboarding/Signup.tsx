import { useState, type ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendApiUrl } from "../../api/backendUrl";

type Crop = { cropName: string; cropType: string };

const Signup = () => {
  const { state: routeState } = useLocation();
  const locationState: unknown = routeState;
  const state =
    typeof locationState === "object" && locationState !== null ? locationState : {};
  const phone = "phone" in state && typeof state.phone === "string" ? state.phone : undefined;
  const roleFromSelection =
    "role" in state && typeof state.role === "string" ? state.role : undefined;
  const navigate = useNavigate();
  const [cropInput, setCropInput] = useState({ cropName: "", cropType: "" });
  const [crops, setCrops] = useState<Crop[]>([]);

  const addCrop = () => {
  if (!cropInput.cropName) return alert("Enter crop name");
  setCrops([...crops, cropInput]);
  setCropInput({ cropName: "", cropType: "" });
};


  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: roleFromSelection || "farmer",
    line1: "",
    line2: "",
    state: "",
    district: "",
    pincode:"",
    totalLandHolding: "",
    hedgingExperience: "none",
    educationLevel: "primary",
    digitalLiteracy: "medium",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
        farmerProfile: {         // ⭐ new section for backend
        totalLandHolding: form.totalLandHolding,
        hedgingExperience: form.hedgingExperience,
        educationLevel: form.educationLevel,
        digitalLiteracy: form.digitalLiteracy,
        crops,
       },
      };

      const res = await axios.post(
        backendApiUrl("auth/create-user"),
        payload
      );

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        alert("Signup successful!");
       
        // ⭐ UPDATED ROUTING LOGIC
        if (form.role === "buyer") {
          navigate("/buyer/");   // BUYER → PROFILE PAGE
        } else {
          navigate("/mode");          // FARMER or FPO
        }
      }
    } catch (err: unknown) {
      const responseMessage =
        axios.isAxiosError(err) && typeof err.response?.data?.message === "string"
          ? err.response.data.message
          : null;
      const errorMessage =
        responseMessage ?? (err instanceof Error ? err.message : "Unexpected error");
      alert("Signup failed: " + errorMessage);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5f7ef] text-slate-900">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute -bottom-48 right-0 h-[34rem] w-[34rem] rounded-full bg-amber-100/70 blur-3xl" />
      </div>

      <div className="relative mx-auto grid min-h-screen w-full max-w-7xl items-start gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-center lg:gap-12 lg:px-12">
        <section className="text-center lg:text-left">
          <div className="inline-flex items-center gap-3 rounded-full border border-emerald-900/10 bg-white/80 px-4 py-2 shadow-sm">
            <img src="/logoo.png" alt="" className="h-10 w-10 object-contain" />
            <span className="text-sm font-bold tracking-wide text-emerald-950">
              Kisan Vyapaar
            </span>
          </div>
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">
            Join the community
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            Create your account
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-8 text-slate-600 lg:mx-0">
            Set up your profile to connect with farmers, buyers, and agricultural markets.
          </p>
        </section>

        <section className="w-full rounded-3xl border border-white bg-white p-6 shadow-xl shadow-emerald-950/10 sm:p-9">
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

   {form.role === "farmer" && (
  <>
    {/* Total Land Holding */}
    <label className="block text-sm font-medium text-gray-700 mt-3">Total Land Holding (Acres) *</label>
    <input
      type="number"
      name="totalLandHolding"
      placeholder="Ex: 5 acres"
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg p-2 mt-1"
    />

    {/* Hedging + Education in same row */}
    <div className="grid grid-cols-2 gap-3 mt-3">
      <div>
        <label className="block text-sm font-medium text-gray-700">Hedging Experience *</label>
        <select
          name="hedgingExperience"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
        >
          <option value="none">None</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Education Level *</label>
        <select
          name="educationLevel"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 mt-1"
        >
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
          <option value="graduate">Graduate</option>
          <option value="postgraduate">Post Graduate</option>
        </select>
      </div>
    </div>

    {/* Crops Section */}
    <h2 className="text-lg font-semibold mt-6">Crops</h2>

    <div className="flex flex-wrap gap-2 mb-3">
      {crops.map((crop, index) => (
        <span key={index} className="bg-black text-white px-3 py-1 rounded-lg text-sm">
          {crop.cropType}
        </span>
      ))}
    </div>

    {/* Add crop dropdown only */}
    <div className="mt-1">
      <select
        value={cropInput.cropType}
        onChange={(e) => setCropInput({ cropName: e.target.value, cropType: e.target.value })}
        className="w-full border border-gray-300 rounded-lg p-2"
      >
        <option value="">Select Crop</option>
        <option value="soybean">Soybean</option>
        <option value="groundnut">Groundnut</option>
        <option value="sunflower">Sunflower</option>
        <option value="mustard">Mustard</option>
        <option value="sesame">Sesame</option>
        <option value="safflower">Safflower</option>
        <option value="other">Other</option>
      </select>

      <button
        className="w-full bg-gray-800 text-white font-semibold mt-3 py-2 rounded-xl"
        onClick={addCrop}
      >
        Add Crop
      </button>
    </div>
  </>
)}



    {/* Submit btn */}
    <button
      onClick={handleSignup}
      className="w-full mt-5 py-3 bg-black hover:bg-white hover:text-black text-white border border-black rounded-xl font-semibold transition"
    >
      Create Account
    </button>
        </section>
      </div>
    </main>
  );
};

export default Signup;

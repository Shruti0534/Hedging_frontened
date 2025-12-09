import { useState } from "react";
import { getPredictionFromBackend } from "../api/forecast";
import type { PredictionResponse } from "../api/forecast";

// 1. DATA EXTRACTION FROM IMAGE
// Structured as: State -> District -> [Mandi List]
const LOCATION_DATA: Record<string, Record<string, string[]>> = {
  Gujarat: {
    Banaskanta: ["Dhanera Mandi", "Palanpur APMC"],
    Bhavnagar: ["Mahuva Mandi", "Sihor APMC"],
    Junagadh: ["Mangrol Mandi", "Vanthali Mandi"],
    Rajkot: ["Gondal APMC", "Rajkot Grain Market"],
    Surat: ["Bardoli APMC", "Surat APMC"],
  },
  Karnataka: {
    Ballari: ["Ballari APMC", "Hosapete APMC"],
    Belagavi: ["APMC Belagavi", "Udyambag Market"],
    Bijapur: ["Basavana Bagewadi", "Bijapur APMC"],
    Dharwad: ["Dharwad APMC", "Hubballi Cotton Market"],
    Raichur: ["Raichur APMC", "Sindhanur APMC"],
  },
  "Madhya Pradesh": {
    Bhopal: ["Berasia Mandi", "Bhopal APMC"],
    Dewas: ["Bagli Mandi", "Sonkatch Mandi"],
    Indore: ["Chokhi Mandi", "Laxmibai Nagar Mandi"],
    Ujjain: ["Dewasgate Mandi", "Ghattiya Mandi"],
    Vidisha: ["Ganj Basoda Mandi", "Vidisha Mandi"],
  },
  Maharashtra: {
    Amravati: ["Morshi APMC", "Warud APMC"],
    Aurangabad: ["Aurangabad APMC", "Paithan Mandi"],
    Nagpur: ["Kalamna Mandi", "Narkhed Mandi"],
    Nashik: ["Lasalgaon APMC", "Pimpalgaon Mandi"],
    Pune: ["Khadki Market", "Pune Market Yard"],
  },
  Rajasthan: {
    Alwar: ["Alwar Grain Mandi", "Behror Mandi"],
    Bharatpur: ["Bharatpur Mandi", "Deeg Mandi"],
    Jaipur: ["Chandpole Mandi", "Muhana Mandi"],
    Kota: ["Kota Anaj Mandi", "Ramganj Mandi"],
    Sriganganagar: ["Anupgarh Mandi", "Gajsinghpur Mandi"],
  },
  Telangana: {
    Hyderabad: ["Bowenpally Market", "Gaddiannaram Market"],
    Karimnagar: ["Jammikunta Mandi", "Karimnagar APMC"],
    Khammam: ["Khammam APMC", "Madhira Market"],
    Nalgonda: ["Miryalaguda Mandi", "Nalgonda Market Yard"],
    Warangal: ["Enumamula Market", "Kesamudram Market"],
  },
  "Uttar Pradesh": {
    Agra: ["Kiraoli Mandi", "Naveen Mandi Agra"],
    Bareilly: ["Bareilly APMC", "Nawabganj Mandi"],
    Kanpur: ["Chakeri Mandi", "Kalyanpur Mandi"],
    Mathura: ["Govardhan Mandi", "Sonkh Road Mandi"],
    Meerut: ["Pallavpuram Market", "Partapur Mandi"],
  },
};

const CROPS = ["Soybean", "Mustard", "Groundnut", "Sesame", "Castor", "Sunflower"];

export default function Predictor() {
  // State for form selection
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedMandi, setSelectedMandi] = useState<string>("");
  const [selectedCrop, setSelectedCrop] = useState<string>("");

  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Derived lists based on selection
  const districtOptions = selectedState ? Object.keys(LOCATION_DATA[selectedState] || {}) : [];
  const mandiOptions = (selectedState && selectedDistrict) 
    ? LOCATION_DATA[selectedState][selectedDistrict] || [] 
    : [];

  const handlePredict = async () => {
    if (!selectedState || !selectedDistrict || !selectedMandi || !selectedCrop) {
      setError("Please select all fields.");
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const data = await getPredictionFromBackend({
        state: selectedState,
        district: selectedDistrict,
        mandi: selectedMandi,
        crop: selectedCrop,
      });
      console.log("API RESPONSE:", data);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  // --- UI COMPONENTS ---
  
  // Reusable Label Component
  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block text-gray-700">
      {children}
    </label>
  );

  // Reusable Select Styling (mimicking shadcn Select)
  const selectClass = "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all";

  return (
    <div className="flex  p-4 font-sans">
      <div className="w-full max-w-lg space-y-6 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Oilseed Price Forecast
          </h1>
          <p className="text-sm text-gray-500">
            Select your region and crop to generate AI-driven price predictions.
          </p>
        </div>

        {/* Form Grid */}
        <div className="space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            {/* STATE DROPDOWN */}
            <div className="space-y-1">
              <Label>State</Label>
              <select
                className={selectClass}
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedDistrict(""); // Reset downstream
                  setSelectedMandi("");
                }}
              >
                <option value="" disabled>Select State</option>
                {Object.keys(LOCATION_DATA).map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* DISTRICT DROPDOWN */}
            <div className="space-y-1">
              <Label>District</Label>
              <select
                className={selectClass}
                value={selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  setSelectedMandi(""); // Reset downstream
                }}
                disabled={!selectedState}
              >
                <option value="" disabled>
                  {selectedState ? "Select District" : "Select State First"}
                </option>
                {districtOptions.map((dist) => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>
          </div>

          {/* MANDI DROPDOWN */}
          <div className="space-y-1">
            <Label>Mandi (Market)</Label>
            <select
              className={selectClass}
              value={selectedMandi}
              onChange={(e) => setSelectedMandi(e.target.value)}
              disabled={!selectedDistrict}
            >
              <option value="" disabled>
                {selectedDistrict ? "Select Mandi" : "Select District First"}
              </option>
              {mandiOptions.map((mandi) => (
                <option key={mandi} value={mandi}>{mandi}</option>
              ))}
            </select>
          </div>

          {/* CROP DROPDOWN */}
          <div className="space-y-1">
            <Label>Crop Commodity</Label>
            <select
              className={selectClass}
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
            >
              <option value="" disabled>Select Crop</option>
              {CROPS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* PREDICT BUTTON (Black) */}
          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 mt-4"
          >
            {loading ? (
              <>
                <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing...
              </>
            ) : (
              "Predict Prices"
            )}
          </button>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-500 border border-red-200">
            {error}
          </div>
        )}

        {/* RESULTS CARD */}
        {result && (
          <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Forecast Results</h3>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-green-100 text-green-800">
                AI Confidence: High
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide">7 Days</p>
                <p className="text-2xl font-bold text-gray-900">₹{result.predicted_7_day_price}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide">15 Days</p>
                <p className="text-2xl font-bold text-gray-900">₹{result.predicted_15_day_price}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
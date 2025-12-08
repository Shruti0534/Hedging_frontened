import { useState } from "react";
import { getPredictionFromBackend } from "../../api/forecast"
import type { PredictionResponse } from "../../api/forecast"

// DEFAULTS (used internally)
const DEFAULT_STATE = "Rajasthan";
const DEFAULT_DISTRICT = "Jaipur";
const DEFAULT_MANDI = "Chandpole Mandi";

const CROPS = ["Soybean", "Mustard", "Groundnut", "Sesame", "Castor", "Sunflower"];

export default function Crop_Predictor() {
  const [selectedCrop, setSelectedCrop] = useState<string>("");

  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!selectedCrop) {
      setError("Please select a crop.");
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const data = await getPredictionFromBackend({
        state: DEFAULT_STATE,
        district: DEFAULT_DISTRICT,
        mandi: DEFAULT_MANDI,
        crop: selectedCrop,
      });

      setResult(data);
    } catch (err: any) {
      setError(err.message || "Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="text-sm font-medium mb-2 block text-gray-700">{children}</label>
  );

  const selectClass =
    "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="w-full max-w-lg space-y-6 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">

        
        <div className="flex items-end gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Predictor</h1>
  {/* CROP FIELD */}
  <div className="flex-1 space-y-1">
    
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

  {/* BUTTON */}
  <button
    onClick={handlePredict}
    disabled={loading}
    className="h-10 whitespace-nowrap rounded-md bg-black px-4 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
  >
    {loading ? "..." : "Predict"}
  </button>
</div>

        {/* ERROR */}
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-500 border border-red-200">
            {error}
          </div>
        )}

        {/* RESULT CARD */}
        {result && (
          <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Forecast Results</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg border text-center">
                <p className="text-xs text-gray-500 uppercase">7 Days</p>
                <p className="text-2xl font-bold text-gray-900">₹{result.predicted_7_day_price}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border text-center">
                <p className="text-xs text-gray-500 uppercase">15 Days</p>
                <p className="text-2xl font-bold text-gray-900">₹{result.predicted_15_day_price}</p>
              </div>
            </div>

           
          </div>
        )}

      </div>
    </div>
  );
}

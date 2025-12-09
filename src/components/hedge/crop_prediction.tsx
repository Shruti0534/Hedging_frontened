import { useState } from "react";
import { getPredictionFromBackend } from "../../api/forecast";
import type { PredictionResponse } from "../../api/forecast";
import { useMarketPrices } from "@/contexts/MarketPriceContext";

const DEFAULT_STATE = "Rajasthan";
const DEFAULT_DISTRICT = "Jaipur";
const DEFAULT_MANDI = "Chandpole Mandi";

const CROPS = ["Soybean", "Mustard", "Groundnut", "Sesame", "Castor", "Sunflower"];

export default function Crop_Predictor() {
  const [selectedCrop, setSelectedCrop] = useState<string>("");
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { prices } = useMarketPrices();
  // Safe access to price, defaulting to null if not found
  const currentPrice = selectedCrop ? prices[selectedCrop.toUpperCase()] || null : null;

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

  // Helper to return JSX instead of strings so we can bold text
  function getHedgeAdvice(current: number | null, p7: number, p15: number) {
    if (!current) return <span>Current price not available.</span>;

    const avgFuture = (p7 + p15) / 2;

    if (avgFuture > current * 1.03) {
      return (
        <span>
          Prices expected to rise → Take a <strong className="font-bold">LONG hedge</strong> (buy futures).
        </span>
      );
    }
    if (avgFuture < current * 0.97) {
      return (
        <span>
          Prices expected to fall → Take a <strong className="font-bold">SHORT hedge</strong> (sell futures).
        </span>
      );
    }
    return (
      <span>
        Market stable → <strong className="font-bold">Hold / partial hedge</strong> suggested.
      </span>
    );
  }

  const selectClass =
    "flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm shadow-sm hover:border-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-black/40";

  return (
    <div className="w-full max-w-xl">
      {/* --- HORIZONTAL MINI BAR --- */}
      <div className="flex items-center gap-3 bg-white">
        {/* Dropdown */}
        <select
          className={`${selectClass} w-[230px]`}
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
        >
          <option value="" disabled>
            Select Crop
          </option>
          {CROPS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Button */}
        <button
          onClick={handlePredict}
          disabled={loading}
          className="h-10 rounded-lg bg-black px-6 text-sm font-medium text-white shadow hover:bg-gray-800 active:scale-[.98] transition disabled:opacity-50"
        >
          {loading ? "…" : "Predict"}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
          {error}
        </div>
      )}

      {/* Results Card */}
      {result && (
        <div className="mt-5 w-full max-w-md rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Forecast Results</h3>
          
          {/* Current Price Block */}
          <div className="mb-4 p-4 bg-gray-50 border border-gray-100 rounded-xl flex flex-col justify-center">
            <p className="text-sm text-gray-500">Current Market Price</p>
            <p className="text-2xl font-bold text-gray-900">₹{currentPrice || "—"}</p>
          </div>

          {/* Grid for Future Prices */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center shadow-sm">
              <p className="text-xs text-gray-500 uppercase tracking-wide">7 Days</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{result.predicted_7_day_price}
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center shadow-sm">
              <p className="text-xs text-gray-500 uppercase tracking-wide">15 Days</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{result.predicted_15_day_price}
              </p>
            </div>
          </div>

          {/* Hedging Suggestion (Full Width) */}
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <p className="font-semibold text-gray-800 mb-1">Hedging Suggestion</p>
            <p className="text-gray-700 text-sm">
              {getHedgeAdvice(
                currentPrice,
                result.predicted_7_day_price,
                result.predicted_15_day_price
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
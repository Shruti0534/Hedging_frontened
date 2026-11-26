import { useState } from "react";
import { getTraderPrediction, type TraderInput, type TraderResponse } from "../../../api/trader";

// Ensure these match your CSV exactly (case doesn't matter anymore, backend handles it)
const CROPS = ["Soybean", "Mustard", "Groundnut", "Sesame", "Castor"];

export default function TraderPredictor() {
  const [form, setForm] = useState<TraderInput>({
    state: "Maharashtra",       
    district: "Pune",           
    mandi: "Pune Market Yard",  
    crop: "",                   
  });

  const [result, setResult] = useState<TraderResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (value: string) => {
    setForm((prev) => ({ ...prev, crop: value }));
  };

  const handlePredict = async () => {
    if (!form.crop) {
      setError("Please select a crop.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      console.log("Sending Request:", form); // Debug log
      const data = await getTraderPrediction(form);
      setResult(data);
    } catch (err: any) {
      // Clean up the error message from "Error: ..."
      const msg = err.message || "Prediction failed.";
      setError(msg.replace("Error: ", ""));
    } finally {
      setLoading(false);
    }
  };

  // --- STYLES ---
  const selectStyle = "flex h-10 w-full items-center justify-between rounded-md border border-input bg-card px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all";
  const labelStyle = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block text-foreground";

  return (
    <div className="flex p-6 font-sans">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-border bg-card p-8 shadow-sm">
        
        {/* HEADER */}
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
           Commodity Prices 
          </h1>
          
        </div>

        {/* INPUT SECTION */}
        <div className="space-y-4">
          <div>
            <label className={labelStyle}>Select Commodity</label>
            <select 
              className={selectStyle} 
              value={form.crop} 
              onChange={(e) => handleChange(e.target.value)}
            >
              <option value="" disabled>Select Crop</option>
              {CROPS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Analyzing..." : "Get Price Forecast"}
          </button>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mt-4 p-3 rounded-md bg-red-50 border border-red-200 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* RESULTS CARD */}
        {result && (
          <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 border-b pb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Forecast Results</h3>
                  <p className="text-xs text-muted-foreground">
                    Latest Data: {result.data_date || "Live"}
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground">
                  ✓
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center rounded-lg bg-background p-4 border border-border">
                  <span className="text-xs font-medium uppercase text-muted-foreground">7-Day Price</span>
                  <span className="mt-1 text-2xl font-bold text-foreground">₹{result.predicted_7_day_price}</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-lg bg-background p-4 border border-border">
                  <span className="text-xs font-medium uppercase text-muted-foreground">15-Day Price</span>
                  <span className="mt-1 text-2xl font-bold text-foreground">₹{result.predicted_15_day_price}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
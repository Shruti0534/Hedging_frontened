import axios from "axios";
const API_URL = import.meta.env.VITE_ML_URL;
// ---------- Types ----------
export interface FormDataInput {
  state: string;
  district: string;
  mandi: string;
  crop: string;
}

export interface PredictionResponse {
  predicted_7_day_price: number;
  predicted_15_day_price: number;
}

export async function getPredictionFromBackend(
  formData: FormDataInput
): Promise<PredictionResponse> {
  
  // MERGE User Input with Simulation Data
  const payload = {
    ...formData, 
    
    // --- Hardcoded Simulation Data ---
    // In a real app, these should be fetched from historical DB or weather API
    modal_price: 5200,
    min_price: 5000,
    max_price: 5400,
    arrivals: 1200,
    lag_7: 5100,
    lag_14: 4900,
    lag_30: 4800,
    temperature: 28,
    humidity: 55,
    rainfall: 0,
    day_of_year: 180,
    festival_flag: 0,
    harvest_season_flag: 1
  };

  try {
    const res = await axios.post<PredictionResponse>(
      `${API_URL}/predict`, 
      payload
    );

    return res.data;
  } catch (err: any) {
    console.error("API Error:", err.response?.data);
    throw new Error(err.response?.data?.detail || err.message);
  }
}
// src/api/trader.ts

// 1. Define the Input Type (Must match your Python Request Model)
export interface TraderInput {
    state: string;
    district: string;
    mandi: string;
    crop: string;
  }
  
  // 2. Define the Output Type (Must match your Python Return Dictionary)
  export interface TraderResponse {
    predicted_7_day_price: number;
    predicted_15_day_price: number;
    data_date?: string;
    error?: string;
  }
  
  // 3. The Fetch Function
  const API_URL = "http://localhost:8000"; // Ensure this matches your FastAPI port
  
  export const getTraderPrediction = async (input: TraderInput): Promise<TraderResponse> => {
    const response = await fetch(`${API_URL}/predict_trade_price`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch prediction");
    }
  
    // Handle case where backend returns 200 OK but with a logical error message
    if (data.error) {
      throw new Error(data.error);
    }
  
    return data;
  };
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/common/PageHeader";

import { PriceChart } from "@/components/markets/PriceChart";
import { StatCard } from "@/components/common/StatCard";
import { 
   Sprout, ShoppingBag, 
  Wallet, History 
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";


// ---------------------------------------------------------
// MOCK PROFILE DATA
// ---------------------------------------------------------


const mockBuyerProfile = {
  name: "Fresh Mandi Traders",
  contactPerson: "Vikram Singh",
  phone: "+91 99887 76655",
  location: "Azadpur Mandi, Delhi",
  userType: "buyer",
  details: { gst: "07AABCT3518Q1Z", businessType: "Wholesaler" },
  portfolio: [
    { item: "mustard", quantity: 500, metric: "kg", value: 3425000, status: "Completed" },
    { item: "wheat", quantity: 1200, metric: "kg", value: 2800000, status: "Processing" },
  ],
};


// ---------------------------------------------------------
// MARKETS SIMULATION (LIGHT VERSION)
// ---------------------------------------------------------
interface HistoryEntry { ts: number; price: number }
interface MarketItem {
  symbol: string;
  name: string;
  current: number;
  history: HistoryEntry[];
  change: number;
  percentChange: number;
}
interface ChartDataPoint { date: string; price: number }

// Only mustard for dashboard chart
const initMustard = (): MarketItem => ({
  symbol: "MUSTARD",
  name: "Mustard",
  current: 6200,
  change: 0,
  percentChange: 0,
  history: [{ ts: Date.now(), price: 6200 }],
});

function simulateStep(item: MarketItem) {
  const maxStep = item.current * 0.004;
  const next = Math.round(item.current + (Math.random() * 2 - 1) * maxStep);

  item.change = next - 6200;
  item.percentChange = ((next - 6200) / 6200) * 100;
  item.current = next;
  item.history.push({ ts: Date.now(), price: next });
  if (item.history.length > 40) item.history.shift();
}


// ---------------------------------------------------------
// DASHBOARD COMPONENT
// ---------------------------------------------------------
export default function Profile() {
  const { t } = useLanguage();
  
  // Toggle profile manually for testing
  const currentUser = mockBuyerProfile; 
  const isFarmer = currentUser.userType === "farmer";

  // Stats for profile section
  const stat1 = isFarmer 
    ? { title: "Total Land", value: `${currentUser.details.landSize} ha`, icon: Sprout, footer: "Under cultivation" }
    : { title: "Total Orders", value: "124", icon: ShoppingBag, footer: "Lifetime orders" };

  const stat2 = isFarmer
    ? { title: "Expected Yield", value: "12,500 kg", icon: Sprout, footer: "This season" }
    : { title: "Active Deals", value: "3", icon: History, footer: "In transit" };

  const stat3 = isFarmer
    ? { title: "Est. Value", value: "₹6.8L", icon: Wallet, footer: "At current prices" }
    : { title: "Total Spend", value: "₹45.2L", icon: Wallet, footer: "Last year" };

  // Market State (only Mustard)
  const [mustard, setMustard] = useState<MarketItem>(initMustard);

  useEffect(() => {
    const interval = setInterval(() => {
      setMustard(prev => {
        const clone = { ...prev, history: [...prev.history] };
        simulateStep(clone);
        return clone;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const chartData: ChartDataPoint[] = mustard.history.map(h => ({
    date: new Date(h.ts).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit"
    }),
    price: h.price
  }));

  
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <PageHeader 
        title="Dashboard"
        description="Farmer + Buyer unified analytics panel"
      />

      {/* ────────────────────────────────────────────────────── */}
      {/* 1) PROFILE STATS (3-COLUMN START) */}
      {/* ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard {...stat1} />
        <StatCard {...stat2} />
        <StatCard {...stat3} />
      </div>




      {/* ────────────────────────────────────────────────────── */}
      {/* 2) LIVE MARKET STATS (3-COLUMN START) */}
      {/* ────────────────────────────────────────────────────── */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Live Market Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard 
            title="Mustard Price"
            value={`₹${mustard.current}`}
            icon={Wallet}
            footer={`Updated now`}
          />

          <StatCard 
            title="Change"
            value={`${mustard.change} (${mustard.percentChange.toFixed(2)}%)`}
            icon={History}
            footer="Since open"
          />

          <StatCard 
            title="Market Trend"
            value={mustard.percentChange > 0 ? "Bullish" : "Bearish"}
            icon={Sprout}
            footer="Live movement"
          />
        </div>
      </div>




      {/* ────────────────────────────────────────────────────── */}
      {/* 3) PRICE CHART (FULL WIDTH) */}
      {/* ────────────────────────────────────────────────────── */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Mustard Price Trend</h2>

        <PriceChart 
          title="Live Price Chart"
          data={chartData}
          crop="mustard"
        />
      </div>

    </div>
  );
}

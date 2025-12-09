import { useState, useEffect } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { PriceTable } from "@/components/markets/PriceTable";
import { PriceChart } from "@/components/markets/PriceChart";
import { StatCard } from "@/components/common/StatCard";
// Assuming these are unused based on the provided snippet, but keeping imports if needed
// import { StatCardSkeleton, ChartSkeleton, TableSkeleton } from "@/components/common/LoadingSkeleton";
// import { ErrorState } from "@/components/common/ErrorState";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMarketPrices } from "@/contexts/MarketPriceContext";

// ---------------------------------------------------------
// 1) Types & Interfaces
// ---------------------------------------------------------

interface CommodityConfig {
  symbol: string;
  name: string;
  basePrice: number;
  maxDailyMovePct: number;
  maxStepMovePct: number;
}

interface HistoryEntry {
  ts: number;
  price: number;
}

interface MarketItem {
  symbol: string;
  name: string;
  open: number;
  current: number;
  high: number;
  low: number;
  change: number;
  percentChange: number;
  history: HistoryEntry[];
}

interface MarketState {
  [key: string]: MarketItem;
}

interface ChartDataPoint {
  date: string;
  price: number;
}

// ---------------------------------------------------------
// 2) Commodity Config
// ---------------------------------------------------------
const COMMODITIES: CommodityConfig[] = [
  { symbol: "SOYBEAN", name: "Soybean", basePrice: 5000, maxDailyMovePct: 5, maxStepMovePct: 0.8 },
  { symbol: "MUSTARD", name: "Mustard (RMSEED)", basePrice: 6200, maxDailyMovePct: 5, maxStepMovePct: 0.8 },
  { symbol: "GROUNDNUT", name: "Groundnut", basePrice: 5500, maxDailyMovePct: 4, maxStepMovePct: 0.6 },
  { symbol: "SUNFLOWER", name: "Sunflower", basePrice: 6800, maxDailyMovePct: 6, maxStepMovePct: 1.0 },
  { symbol: "SESAME", name: "Sesame", basePrice: 7400, maxDailyMovePct: 6, maxStepMovePct: 1.0 }
];

// ---------------------------------------------------------
// 3) Helper Functions
// ---------------------------------------------------------
function initMarketDay(): MarketState {
  const items: MarketState = {};

  COMMODITIES.forEach(c => {
    const open = c.basePrice;
    items[c.symbol] = {
      symbol: c.symbol,
      name: c.name,
      open,
      current: open,
      high: open,
      low: open,
      change: 0,
      percentChange: 0,
      history: [{ ts: Date.now(), price: open }]
    };
  });

  return items;
}

function stepCommodity(item: MarketItem, config: CommodityConfig): void {
  const { maxDailyMovePct, maxStepMovePct } = config;

  const open = item.open;
  const curr = item.current;

  const maxStepAbs = (curr * maxStepMovePct) / 100;
  const randomFactor = Math.random() * 2 - 1; // -1 to 1
  let newPrice = curr + randomFactor * maxStepAbs;

  const maxDailyAbs = (open * maxDailyMovePct) / 100;
  const changeFromOpen = newPrice - open;

  if (changeFromOpen > maxDailyAbs) newPrice = open + maxDailyAbs;
  if (changeFromOpen < -maxDailyAbs) newPrice = open - maxDailyAbs;
  if (newPrice < 100) newPrice = 100;

  newPrice = Math.round(newPrice);

  item.current = newPrice;
  item.high = Math.max(item.high, newPrice);
  item.low = Math.min(item.low, newPrice);
  item.change = newPrice - open;
  item.percentChange = (item.change / open) * 100;

  item.history.push({ ts: Date.now(), price: newPrice });
  if (item.history.length > 50) item.history.shift();
}

function stepMarket(items: MarketState): MarketState {
  // Create a shallow copy to trigger React re-render, 
  // though we are mutating the nested objects directly (which works but isn't pure Redux style)
  const newItems = { ...items }; 
  COMMODITIES.forEach(c => {
    if (newItems[c.symbol]) {
        stepCommodity(newItems[c.symbol], c);
    }
  });
  return newItems;
}

function getTopMoves(items: MarketState): { topGainer: MarketItem; topLoser: MarketItem } {
  const list = Object.values(items);
  // Fallback if list is empty, though unlikely given init logic
  if (list.length === 0) {
      // Return a dummy object if empty to satisfy Typescript
      const dummy = initMarketDay()["SOYBEAN"];
      return { topGainer: dummy, topLoser: dummy };
  }

  let topGainer = list[0];
  let topLoser = list[0];

  list.forEach(i => {
    if (i.percentChange > topGainer.percentChange) topGainer = i;
    if (i.percentChange < topLoser.percentChange) topLoser = i;
  });

  return { topGainer, topLoser };
}

function generate30DayHistory(basePrice: number): ChartDataPoint[] {
  let prev = basePrice;
  const arr: ChartDataPoint[] = [];

  for (let i = 30; i >= 0; i--) {
    const fluct = prev * (Math.random() * 0.02 - 0.01);
    const price = Math.round(prev + fluct);

    arr.push({
      date: new Date(Date.now() - i * 86400000).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric"
      }),
      price
    });

    prev = price;
  }

  return arr;
}

const loadMarket = (): MarketState => {
  if (typeof window === "undefined") return initMarketDay(); // SSR check
  
  const saved = localStorage.getItem("marketData");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return parsed;
    } catch {
      return initMarketDay();
    }
  }
  return initMarketDay();
};

// ---------------------------------------------------------
// 4) React Component
// ---------------------------------------------------------
export default function Markets() {
  const { t } = useLanguage();
  const [market, setMarket] = useState<MarketState>(() => loadMarket());
  const { setPrices } = useMarketPrices();
  useEffect(() => {
    const interval = setInterval(() => {
      setMarket(prev => {
        const updated = stepMarket(prev);
  
        // push latest current prices to global store
        const priceMap: any = {};
        Object.values(updated).forEach(item => {
          priceMap[item.symbol] = item.current;
        });
        setPrices(priceMap);
  
        return updated;
      });
    }, 10000);
  
    return () => clearInterval(interval);
  }, []);
  
  // Note: isLoading was unused in original logic, removed for cleanup unless needed for async fetching later.
  // const [isLoading] = useState(false);

  // Run simulation every 10s
 

  // Calculate stats
  const { topGainer, topLoser } = getTopMoves(market);

  // Prepare Table Data
  const tableData = Object.values(market).map(item => ({
    crop: item.symbol.toLowerCase(),
    currentPrice: item.current,
    change24h: Math.round(item.change),
    high24h: item.high,
    low24h: item.low,
    volume: item.history.length * 900 // fake volume
  }));

  // Prepare Chart Data
  const mustard = market["MUSTARD"];
  const chartData: ChartDataPoint[] = mustard
    ? mustard.history.map(h => ({
        date: new Date(h.ts).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit"
        }),
        price: h.price
      }))
    : generate30DayHistory(6200);

  return (
    <div className="space-y-6 ">
      <PageHeader
        title={t("markets")}
        description="Live oilseed market prices and analytics"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
       
        <StatCard
          title="Top Gainer"
          value={`${topGainer.name} +${topGainer.percentChange.toFixed(2)}%`}
          icon={TrendingUp}
          footer={topGainer.symbol}
        />
        <StatCard
          title="Top Loser"
          value={`${topLoser.name} ${topLoser.percentChange.toFixed(2)}%`}
          icon={TrendingDown}
          footer={topLoser.symbol}
        />
      </div>

      {/* Price Table */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Price Overview</h2>
        <PriceTable data={tableData} />
      </div>

      {/* Chart */}
      <div className="w-full">
        <PriceChart title="Mustard Price Trend (Live)" data={chartData} crop="mustard" />
      </div>
    </div>
  );
}
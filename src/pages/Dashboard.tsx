import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { PriceCard } from "@/components/dashboard/PriceCard";
import { ForecastWidget } from "@/components/dashboard/ForecastWidget";
import { StatCardSkeleton, PriceCardSkeleton, ChartSkeleton } from "@/components/common/LoadingSkeleton";
import { ErrorState } from "@/components/common/ErrorState";
import { TrendingUp, DollarSign, Shield, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock data - will be replaced with real API data
const mockPriceData = [
  { crop: "mustard" as const, currentPrice: 6850, change24h: 125, volume: 45000 },
  { crop: "groundnut" as const, currentPrice: 5420, change24h: -80, volume: 32000 },
  { crop: "soybean" as const, currentPrice: 4890, change24h: 200, volume: 58000 },
  { crop: "sunflower" as const, currentPrice: 6200, change24h: 50, volume: 28000 },
];

const generateMockHistoricalData = (basePrice: number, days: number) => {
  const data = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const randomVariation = (Math.random() - 0.5) * 200;
    data.push({
      date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      price: Math.round(basePrice + randomVariation),
    });
  }
  
  return data;
};

const generateMockForecastData = (basePrice: number, days: number) => {
  const data = [];
  const today = new Date();
  
  for (let i = 1; i <= days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const trend = i * 15;
    data.push({
      date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      price: 0,
      predicted: Math.round(basePrice + trend + (Math.random() - 0.5) * 100),
    });
  }
  
  return data;
};

export default function Dashboard() {
  const { t } = useLanguage();
  
  // Placeholder React Query structure - will be replaced with actual useQuery hooks
  const [isLoading] = useState(false);
  const [error] = useState<Error | null>(null);
  const data = {
    prices: mockPriceData,
    historicalData: generateMockHistoricalData(6850, 30),
    forecast7d: generateMockForecastData(6850, 7),
    forecast14d: generateMockForecastData(6850, 14),
    forecast30d: generateMockForecastData(6850, 30),
  };

  if (error) {
    return <ErrorState title="Failed to load dashboard" message={error.message} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title={t("dashboard")}
        description="Monitor market prices, forecasts, and your portfolio"
      />

      {/* Key Metrics */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <StatCardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Portfolio Value"
            value="₹4.2L"
            icon={DollarSign}
            trend={{ value: 5.2, isPositive: true }}
            footer="Total crop value"
          />
          <StatCard
            title="Active Hedges"
            value="3"
            icon={Shield}
            footer="Open positions"
          />
          <StatCard
            title="Active Contracts"
            value="2"
            icon={FileText}
            footer="Forward contracts"
          />
          <StatCard
            title="Price Alerts"
            value="5"
            icon={TrendingUp}
            footer="Monitoring crops"
          />
        </div>
      )}

      {/* Current Market Prices */}
      {isLoading ? (
        <>
          <h2 className="text-2xl font-semibold text-foreground">Market Prices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => <PriceCardSkeleton key={i} />)}
          </div>
        </>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Live Market Prices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.prices.map((price) => (
              <PriceCard key={price.crop} {...price} />
            ))}
          </div>
        </div>
      )}

      {/* AI Forecast Widget */}
      {isLoading ? (
        <ChartSkeleton />
      ) : (
        <ForecastWidget
          crop="mustard"
          historicalData={data.historicalData}
          forecast7d={data.forecast7d}
          forecast14d={data.forecast14d}
          forecast30d={data.forecast30d}
          confidence={78}
          analysis="Based on seasonal trends and current market conditions, mustard prices are expected to rise over the next 30 days. Factors include: reduced supply from key producing regions, increased export demand, and favorable weather conditions for consumption."
        />
      )}
    </div>
  );
}

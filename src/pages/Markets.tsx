import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { PriceTable } from "@/components/markets/PriceTable";
import { PriceChart } from "@/components/markets/PriceChart";
import { StatCard } from "@/components/common/StatCard";
import { StatCardSkeleton, ChartSkeleton, TableSkeleton } from "@/components/common/LoadingSkeleton";
import { ErrorState } from "@/components/common/ErrorState";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock data
const mockMarketData = [
  {
    crop: "mustard" as const,
    currentPrice: 6850,
    change24h: 125,
    high24h: 6920,
    low24h: 6730,
    volume: 45000,
  },
  {
    crop: "groundnut" as const,
    currentPrice: 5420,
    change24h: -80,
    high24h: 5500,
    low24h: 5380,
    volume: 32000,
  },
  {
    crop: "soybean" as const,
    currentPrice: 4890,
    change24h: 200,
    high24h: 4950,
    low24h: 4680,
    volume: 58000,
  },
  {
    crop: "sunflower" as const,
    currentPrice: 6200,
    change24h: 50,
    high24h: 6250,
    low24h: 6120,
    volume: 28000,
  },
];

const generateChartData = (basePrice: number) => {
  const data = [];
  const today = new Date();

  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      price: Math.round(basePrice + (Math.random() - 0.5) * 300),
    });
  }

  return data;
};

export default function Markets() {
  const { t } = useLanguage();

  // Placeholder React Query structure - will be replaced with actual useQuery hooks
  const [isLoading] = useState(false);
  const [error] = useState<Error | null>(null);
  const data = {
    marketData: mockMarketData,
    chartData: generateChartData(6850),
  };

  if (error) {
    return <ErrorState title="Failed to load market data" message={error.message} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("markets")}
        description="Live oilseed market prices and analytics"
      />

      {/* Market Overview Stats */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <StatCardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Market Cap"
            value="₹2,450Cr"
            icon={Activity}
            footer="Total market size"
          />
          <StatCard
            title="Top Gainer"
            value="Soybean +4.1%"
            icon={TrendingUp}
            footer="Best performing crop"
          />
          <StatCard
            title="Top Loser"
            value="Groundnut -1.5%"
            icon={TrendingDown}
            footer="Worst performing crop"
          />
        </div>
      )}

      {/* Price Table */}
      {isLoading ? (
        <>
          <h2 className="text-2xl font-semibold text-foreground">Price Overview</h2>
          <TableSkeleton rows={4} />
        </>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Price Overview
          </h2>
          <PriceTable data={data.marketData} />
        </div>
      )}

      {/* Price Chart */}
      {isLoading ? (
        <ChartSkeleton />
      ) : (
        <PriceChart
          title="Mustard Price Trend (30 Days)"
          data={data.chartData}
          crop="mustard"
        />
      )}
    </div>
  );
}

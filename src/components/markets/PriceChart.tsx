import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CandlestickChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

interface ChartDataPoint {
  date: string;
  price: number;
}

interface PriceChartProps {
  title: string;
  data: ChartDataPoint[];
  cropColor?: string;
}

export function PriceChart({ title, data, cropColor = "hsl(var(--chart-1))" }: PriceChartProps) {
  const [timeRange, setTimeRange] = useState<"1D" | "1W" | "1M" | "3M" | "1Y">("1M");

  const filterDataByRange = (range: typeof timeRange) => {
    const days = {
      "1D": 1,
      "1W": 7,
      "1M": 30,
      "3M": 90,
      "1Y": 365,
    }[range];

    return data.slice(-days);
  };

  return (
    <Card data-testid="card-price-chart">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Historical price trends</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as typeof timeRange)}>
            <TabsList>
              <TabsTrigger value="1D" data-testid="tab-range-1d">1D</TabsTrigger>
              <TabsTrigger value="1W" data-testid="tab-range-1w">1W</TabsTrigger>
              <TabsTrigger value="1M" data-testid="tab-range-1m">1M</TabsTrigger>
              <TabsTrigger value="3M" data-testid="tab-range-3m">3M</TabsTrigger>
              <TabsTrigger value="1Y" data-testid="tab-range-1y">1Y</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filterDataByRange(timeRange)}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                }}
                formatter={(value: number) => [`₹${value}`, 'Price']}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={cropColor}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

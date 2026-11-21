import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp, Sparkles } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ForecastData {
  date: string;
  price: number;
  predicted?: number;
}

interface ForecastWidgetProps {
  crop: "mustard" | "groundnut" | "soybean" | "sunflower";
  historicalData: ForecastData[];
  forecast7d: ForecastData[];
  forecast14d: ForecastData[];
  forecast30d: ForecastData[];
  confidence: number;
  analysis: string;
}

export function ForecastWidget({
  crop,
  historicalData,
  forecast7d,
  forecast14d,
  forecast30d,
  confidence,
  analysis,
}: ForecastWidgetProps) {
  const [selectedCrop, setSelectedCrop] = useState<string>(crop);
  const { t } = useLanguage();

  return (
    <Card data-testid="card-forecast-widget">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              {t("aiForecast")}
            </CardTitle>
            <CardDescription className="mt-1">
              AI-powered price prediction with confidence analysis
            </CardDescription>
          </div>
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger className="w-full md:w-[180px]" data-testid="select-forecast-crop">
              <SelectValue placeholder="Select crop" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mustard" data-testid="option-crop-mustard">{t("mustard")}</SelectItem>
              <SelectItem value="groundnut" data-testid="option-crop-groundnut">{t("groundnut")}</SelectItem>
              <SelectItem value="soybean" data-testid="option-crop-soybean">{t("soybean")}</SelectItem>
              <SelectItem value="sunflower" data-testid="option-crop-sunflower">{t("sunflower")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="7d" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="7d" data-testid="tab-forecast-7d">7 {t("days")}</TabsTrigger>
            <TabsTrigger value="14d" data-testid="tab-forecast-14d">14 {t("days")}</TabsTrigger>
            <TabsTrigger value="30d" data-testid="tab-forecast-30d">30 {t("days")}</TabsTrigger>
          </TabsList>

          <TabsContent value="7d" className="space-y-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[...historicalData.slice(-7), ...forecast7d]}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                      borderRadius: '6px'
                    }}
                    formatter={(value: number) => [`₹${value}`, 'Price']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="hsl(var(--chart-1))" 
                    fill="url(#colorPrice)"
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="hsl(var(--chart-2))" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: 'hsl(var(--chart-2))' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {t("confidence")}: {confidence}%
                </Badge>
              </div>
              <Button variant="outline" size="sm" data-testid="button-view-analysis">
                View Analysis
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="14d" className="space-y-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[...historicalData.slice(-14), ...forecast14d]}>
                  <defs>
                    <linearGradient id="colorPrice14" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `₹${value}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '6px' }}
                    formatter={(value: number) => [`₹${value}`, 'Price']}
                  />
                  <Area type="monotone" dataKey="price" stroke="hsl(var(--chart-1))" fill="url(#colorPrice14)" strokeWidth={2} />
                  <Line type="monotone" dataKey="predicted" stroke="hsl(var(--chart-2))" strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="30d" className="space-y-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[...historicalData.slice(-30), ...forecast30d]}>
                  <defs>
                    <linearGradient id="colorPrice30" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `₹${value}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '6px' }}
                    formatter={(value: number) => [`₹${value}`, 'Price']}
                  />
                  <Area type="monotone" dataKey="price" stroke="hsl(var(--chart-1))" fill="url(#colorPrice30)" strokeWidth={2} />
                  <Line type="monotone" dataKey="predicted" stroke="hsl(var(--chart-2))" strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>

        {analysis && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">{analysis}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

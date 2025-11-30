
import { Card,CardContent, CardHeader, CardTitle  } from "../ui/card";
import { CropBadge } from "../common/CropBadge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

interface PriceCardProps {
  crop: "mustard" | "groundnut" | "soybean" | "sunflower";
  currentPrice: number;
  change24h: number;
  volume?: number;
}

export function PriceCard({ crop, currentPrice, change24h, volume }: PriceCardProps) {
  const { t } = useLanguage();
  const isPositive = change24h >= 0;

  return (
    <Card className="hover-elevate" data-testid={`card-price-${crop}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium">
          <CropBadge crop={crop} />
        </CardTitle>
        {isPositive ? (
          <TrendingUp className="h-4 w-4 text-chart-1" data-testid={`icon-trend-up-${crop}`} />
        ) : (
          <TrendingDown className="h-4 w-4 text-destructive" data-testid={`icon-trend-down-${crop}`} />
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="text-2xl md:text-3xl font-bold text-foreground" data-testid={`text-price-${crop}`}>
            ₹{currentPrice.toLocaleString('en-IN')}
            <span className="text-sm text-muted-foreground ml-1">/kg</span>
          </div>
          <div className={`text-sm font-medium flex items-center gap-1 ${isPositive ? 'text-chart-1' : 'text-destructive'}`} data-testid={`text-change-${crop}`}>
            {isPositive ? '↑' : '↓'} ₹{Math.abs(change24h).toFixed(2)}
            <span className="text-muted-foreground">
              ({isPositive ? '+' : ''}{((change24h / currentPrice) * 100).toFixed(2)}%)
            </span>
          </div>
          {volume && (
            <div className="text-xs text-muted-foreground pt-1" data-testid={`text-volume-${crop}`}>
              {t("loading").includes("...") ? "Volume" : "मात्रा"}: {volume.toLocaleString('en-IN')} kg
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

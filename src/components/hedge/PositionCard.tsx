import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CropBadge } from "@/components/common/CropBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface PositionCardProps {
  id: string;
  crop: "mustard" | "groundnut" | "soybean" | "sunflower";
  positionType: "long" | "short";
  instrumentType: "futures" | "options";
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  status: "open" | "closed";
  onClose: (id: string) => void;
}

export function PositionCard({
  id,
  crop,
  positionType,
  instrumentType,
  quantity,
  entryPrice,
  currentPrice,
  status,
  onClose,
}: PositionCardProps) {
  const profitLoss = positionType === "long"
    ? (currentPrice - entryPrice) * quantity
    : (entryPrice - currentPrice) * quantity;
  
  const profitLossPercentage = ((profitLoss / (entryPrice * quantity)) * 100);
  const isProfit = profitLoss >= 0;

  return (
    <Card className="hover-elevate" data-testid={`card-position-${id}`}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="space-y-1">
          <CardTitle className="text-lg flex items-center gap-2">
            {positionType === "long" ? (
              <ArrowUpRight className="h-4 w-4 text-chart-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-destructive" />
            )}
            {positionType === "long" ? "Long" : "Short"} {instrumentType}
          </CardTitle>
          <div className="flex items-center gap-2">
            <CropBadge crop={crop} />
            <StatusBadge status={status} />
          </div>
        </div>
        <Badge variant={isProfit ? "default" : "destructive"} className="text-xs">
          {isProfit ? "+" : ""}₹{Math.abs(profitLoss).toLocaleString('en-IN')}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="space-y-1">
            <div className="text-muted-foreground">Quantity</div>
            <div className="font-semibold">{quantity} kg</div>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground">Entry</div>
            <div className="font-semibold">₹{entryPrice}</div>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground">Current</div>
            <div className="font-semibold">₹{currentPrice}</div>
          </div>
        </div>

        <div className="pt-3 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">P&L</span>
            <div className="flex items-center gap-2">
              {isProfit ? (
                <TrendingUp className="h-4 w-4 text-chart-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span className={`text-lg font-bold ${isProfit ? 'text-chart-1' : 'text-destructive'}`}>
                {isProfit ? "+" : ""}₹{Math.abs(profitLoss).toLocaleString('en-IN')}
              </span>
              <span className={`text-sm ${isProfit ? 'text-chart-1' : 'text-destructive'}`}>
                ({profitLossPercentage >= 0 ? "+" : ""}{profitLossPercentage.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      {status === "open" && (
        <CardFooter className="pt-4 border-t">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => onClose(id)}
            data-testid={`button-close-position-${id}`}
          >
            Close Position
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { PositionCard } from "@/components/hedge/PositionCard";
import { TradeForm } from "@/components/hedge/TradeForm";
import { StatCard } from "@/components/common/StatCard";
import { EmptyState } from "@/components/common/EmptyState";
import { StatCardSkeleton } from "@/components/common/LoadingSkeleton";
import { ErrorState } from "@/components/common/ErrorState";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Shield, TrendingUp, TrendingDown, DollarSign, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock data
const mockPositions = [
  {
    id: "1",
    crop: "mustard" as const,
    positionType: "long" as const,
    instrumentType: "futures" as const,
    quantity: 1000,
    entryPrice: 6500,
    currentPrice: 6850,
    status: "open" as const,
  },
  {
    id: "2",
    crop: "soybean" as const,
    positionType: "short" as const,
    instrumentType: "options" as const,
    quantity: 500,
    entryPrice: 5000,
    currentPrice: 4890,
    status: "open" as const,
  },
];

export default function Hedge() {
  const { t } = useLanguage();

  // Placeholder React Query structure - will be replaced with actual useQuery hooks
  const [isLoading] = useState(false);
  const [error] = useState<Error | null>(null);
  const [positions, setPositions] = useState(mockPositions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const totalProfitLoss = positions.reduce((acc, pos) => {
    const pl = pos.positionType === "long"
      ? (pos.currentPrice - pos.entryPrice) * pos.quantity
      : (pos.entryPrice - pos.currentPrice) * pos.quantity;
    return acc + pl;
  }, 0);

  const openPositions = positions.filter(p => p.status === "open").length;

  const handleClosePosition = (id: string) => {
    setPositions(positions.map(pos =>
      pos.id === id ? { ...pos, status: "closed" as const } : pos
    ));
  };

  const handleExecuteTrade = (values: any) => {
    const newPosition = {
      id: Date.now().toString(),
      crop: values.cropType,
      positionType: values.positionType,
      instrumentType: values.instrumentType,
      quantity: parseInt(values.quantity),
      entryPrice: parseFloat(values.entryPrice),
      currentPrice: parseFloat(values.entryPrice),
      status: "open" as const,
    };
    setPositions([...positions, newPosition]);
    setIsDialogOpen(false);
  };

  if (error) {
    return <ErrorState title="Failed to load hedge positions" message={error.message} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("hedge")}
        description="Practice futures and options trading risk-free"
        action={
          <Button onClick={() => setIsDialogOpen(true)} data-testid="button-open-new-position">
            <Plus className="h-4 w-4 mr-2" />
            New Position
          </Button>
        }
      />

      {/* Portfolio Summary */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <StatCardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Total P&L"
            value={`₹${Math.abs(totalProfitLoss).toLocaleString('en-IN')}`}
            icon={totalProfitLoss >= 0 ? TrendingUp : TrendingDown}
            trend={{ value: Math.abs((totalProfitLoss / 100000) * 100), isPositive: totalProfitLoss >= 0 }}
            footer="Virtual portfolio"
          />
          <StatCard
            title="Open Positions"
            value={openPositions.toString()}
            icon={Shield}
            footer="Active hedges"
          />
          <StatCard
            title="Portfolio Value"
            value="₹1.2L"
            icon={DollarSign}
            footer="Virtual capital"
          />
        </div>
      )}

      {/* Positions */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Your Positions
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <StatCardSkeleton key={i} />)}
          </div>
        ) : positions.length === 0 ? (
          <EmptyState
            icon={Shield}
            title="No hedging positions yet"
            description="Practice futures and options trading to learn risk management strategies without real money"
            action={{
              label: "Open Position",
              onClick: () => setIsDialogOpen(true),
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {positions.map((position) => (
              <PositionCard
                key={position.id}
                {...position}
                onClose={handleClosePosition}
              />
            ))}
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl" data-testid="dialog-new-position">
          <DialogHeader>
            <DialogTitle>Open New Position</DialogTitle>
            <DialogDescription>
              Create a virtual hedging position to practice trading without real money
            </DialogDescription>
          </DialogHeader>
          <TradeForm
            onSubmit={handleExecuteTrade}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

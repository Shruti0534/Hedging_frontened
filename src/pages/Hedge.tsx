import { useEffect, useState } from "react";
import axios from "axios";

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
import Crop_Predictor from "../components/hedge/crop_prediction";


export default function Hedge() {
  const { t } = useLanguage();

  const [positions, setPositions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch existing hedges from backend
  const fetchPositions = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/hedge/get-hedges`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      // Process initial values
      setPositions(
        res.data.hedges.map((pos: any) => {
          // If backend had price movement, use it
          // Otherwise start at entry + 20
          const basePrice =
            pos.currentPrice && pos.currentPrice !== pos.entryPrice
              ? pos.currentPrice
              : pos.entryPrice + 20;

          const profitLoss =
            pos.positionType === "long"
              ? (basePrice - pos.entryPrice) * pos.quantity
              : (pos.entryPrice - basePrice) * pos.quantity;

          return {
            ...pos,
            currentPrice: basePrice,
            profitLoss,
          };
        })
      );
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();

    // Price fluctuation every 1 min
    const interval = setInterval(() => {
      setPositions((prev) =>
        prev.map((pos) => {
          if (pos.status === "closed") return pos;

          const randomChange = Math.floor(Math.random() * 20) - 10; // -10 to +10
          const updatedPrice = Math.max(0, pos.currentPrice + randomChange);

          const profitLoss =
            pos.positionType === "long"
              ? (updatedPrice - pos.entryPrice) * pos.quantity
              : (pos.entryPrice - updatedPrice) * pos.quantity;

          return {
            ...pos,
            currentPrice: updatedPrice,
            profitLoss,
          };
        })
      );
    }, 60000); // 1 minute

    return () => clearInterval(interval);
  }, []);

  // Create new hedge
  const handleExecuteTrade = async (values: any) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/hedge/create-hedge`,
        {
          crop: values.cropType,
          positionType: values.positionType,
          instrumentType: values.instrumentType,
          quantity: values.quantity,
          entryPrice: values.entryPrice,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setIsDialogOpen(false);
      fetchPositions();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to create hedge");
    }
  };

  // Close hedge and lock profit/loss
  const handleClosePosition = async (id: string, profitLoss: number) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/hedge/close-hedge/${id}`,
        { profitLoss },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      fetchPositions();
    } catch (err: any) {
      console.log(err)
      alert("Failed to close position");
    }
  };

  const totalProfitLoss = positions.reduce((acc, pos: any) => acc + pos.profitLoss, 0);
  const openPositions = positions.filter((p) => p.status === "open").length;

  if (error) {
    return <ErrorState title="Failed to load hedges" message={error.message} />;
  }

    const closedPL = positions
    .filter((pos: any) => pos.status === "closed")
    .reduce((acc: number, pos: any) => acc + pos.profitLoss, 0);


  return (
    <div className="space-y-6">
      <PageHeader
        title={t("hedge")}
        description="Practice futures and options trading risk-free"
        action={
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Position
          </Button>
        }
      />
      <Crop_Predictor/>
      {/* Stats */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Total P&L"
            value={`₹${totalProfitLoss.toLocaleString("en-IN")}`}
            icon={totalProfitLoss >= 0 ? TrendingUp : TrendingDown}
            trend={{ value: totalProfitLoss, isPositive: totalProfitLoss >= 0 }}
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
  value={`₹${closedPL.toLocaleString("en-IN")}`}
  icon={DollarSign}
  footer="Realized P&L"
/>

        </div>
      )}

      {/* Positions List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Positions</h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>
        ) : positions.length === 0 ? (
          <EmptyState
            icon={Shield}
            title="No hedging positions"
            description="Open a virtual hedge to learn trading safely"
            action={{ label: "Open Position", onClick: () => setIsDialogOpen(true) }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {positions.map((pos) => (
              <PositionCard
                key={pos._id}
                {...pos}
                onClose={(profitLoss:any) => handleClosePosition(pos._id, profitLoss)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Open New Position</DialogTitle>
            <DialogDescription>Create a virtual hedging position</DialogDescription>
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

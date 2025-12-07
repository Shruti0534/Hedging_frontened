import { AlertCard } from "./AlertCard";
import { StatCardSkeleton } from "@/components/common/LoadingSkeleton";
import { ErrorState } from "@/components/common/ErrorState";
import { EmptyState } from "@/components/common/EmptyState";
import { Bell } from "lucide-react";

interface Alert {
  id: string;
  crop: "mustard" | "groundnut" | "soybean" | "sunflower";
  targetPrice: number;
  condition: "above" | "below" | "equals";
  isActive: boolean;
  triggered: boolean;
}

interface AlertListProps {
  alerts: Alert[];
  isLoading: boolean;
  error: Error | null;
  onToggle: (id: string, active: boolean) => void;
  onDelete: (id: string) => void;
  onRetry?: () => void;
  onCreateNew: () => void;
}

export function AlertList({ 
  alerts, 
  isLoading, 
  error, 
  onToggle, 
  onDelete,
  onRetry,
  onCreateNew 
}: AlertListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 ">
        {[1, 2, 3].map((i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load alerts"
        message={error.message}
        onRetry={onRetry}
      />
    );
  }

  if (alerts.length === 0) {
    return (
      <EmptyState
        icon={Bell}
        title="No price alerts set"
        description="Create your first price alert to monitor market prices and get notified when your target is reached"
        action={{
          label: "Create Alert",
          onClick: onCreateNew,
        }}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 ">
      {alerts.map((alert) => (
        <AlertCard
          key={alert.id}
          {...alert}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

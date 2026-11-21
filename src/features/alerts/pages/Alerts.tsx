import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { AlertForm } from "@/features/alerts/AlertForm";
import { AlertList } from "@/features/alerts/AlertList";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock data
const mockAlerts = [
  {
    id: "1",
    crop: "mustard" as const,
    targetPrice: 7000,
    condition: "above" as const,
    isActive: true,
    triggered: false,
  },
  {
    id: "2",
    crop: "soybean" as const,
    targetPrice: 4500,
    condition: "below" as const,
    isActive: true,
    triggered: true,
  },
  {
    id: "3",
    crop: "groundnut" as const,
    targetPrice: 5500,
    condition: "above" as const,
    isActive: false,
    triggered: false,
  },
];

export default function Alerts() {
  const { t } = useLanguage();
  const [alerts, setAlerts] = useState(mockAlerts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading] = useState(false);
  const [error] = useState<Error | null>(null);

  const handleToggle = (id: string, active: boolean) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, isActive: active } : alert
    ));
  };

  const handleDelete = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const handleCreateAlert = (values: any) => {
    const newAlert = {
      id: Date.now().toString(),
      crop: values.cropType,
      targetPrice: parseFloat(values.targetPrice),
      condition: values.condition,
      isActive: true,
      triggered: false,
    };
    setAlerts([...alerts, newAlert]);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("alerts")}
        description="Configure price alerts for your crops"
        action={
          <Button onClick={() => setIsDialogOpen(true)} data-testid="button-create-alert">
            <Plus className="h-4 w-4 mr-2" />
            Create Alert
          </Button>
        }
      />

      <AlertList
        alerts={alerts}
        isLoading={isLoading}
        error={error}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onCreateNew={() => setIsDialogOpen(true)}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent data-testid="dialog-create-alert">
          <DialogHeader>
            <DialogTitle>Create Price Alert</DialogTitle>
            <DialogDescription>
              Set up a new price alert to monitor market prices for your crops
            </DialogDescription>
          </DialogHeader>
          <AlertForm
            onSubmit={handleCreateAlert}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
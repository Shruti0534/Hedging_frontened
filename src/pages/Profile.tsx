import { useState } from "react";

import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/common/StatCard";
import { CropBadge } from "@/components/common/CropBadge";

import { User, MapPin, Phone, Sprout, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import { AlertForm } from "@/components/alerts/AlertForm";
import { AlertList } from "@/components/alerts/AlertList";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// -------------------------
// Mock Data
// -------------------------

const mockUserProfile = {
  name: "Rajesh Kumar",
  phone: "+91 98765 43210",
  location: "Punjab, India",
  userType: "farmer",
  crops: [
    { crop: "mustard" as const, area: 5.5, expectedYield: 8000 },
    { crop: "soybean" as const, area: 3.2, expectedYield: 4500 },
  ],
};

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

// -------------------------
// COMBINED COMPONENT
// -------------------------

export default function Profile() {
  const { t } = useLanguage();

  // ---- Profile calculations ----
  const totalArea = mockUserProfile.crops.reduce((acc, c) => acc + c.area, 0);
  const totalValue = mockUserProfile.crops.reduce((acc, c) => {
    const price = c.crop === "mustard" ? 6850 : 4890;
    return acc + c.expectedYield * price;
  }, 0);

  // ---- Alerts State ----
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
    <div className="w-full max-w-[430px] mx-auto flex flex-col space-y-10 px-4 pb-20">


      {/* ---------------- PROFILE HEADER ---------------- */}
      <PageHeader
        title={t("profile")}
        description="Manage your profile, crops and price alerts"
      />

      {/* ---------------- PROFILE SUMMARY ---------------- */}
      <div className="grid grid-cols-1 ">
        <StatCard
          title="Total Land"
          value={`${totalArea} ha`}
          icon={Sprout}
          footer="Under cultivation"
        />
        <StatCard
          title="Expected Yield"
          value="12,500 kg"
          icon={Sprout}
          footer="This season"
        />
        <StatCard
          title="Estimated Value"
          value={`₹${(totalValue / 100000).toFixed(1)}L`}
          icon={Sprout}
          footer="At current prices"
        />
      </div>

      {/* ---------------- PROFILE DETAILS + CROPS ---------------- */}
      <div className="grid grid-cols-1 ">

        {/* USER INFORMATION */}
        <Card data-testid="card-profile-info">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Name</div>
                <div className="font-medium">{mockUserProfile.name}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Phone</div>
                <div className="font-medium">{mockUserProfile.phone}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Location</div>
                <div className="font-medium">{mockUserProfile.location}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CROP PORTFOLIO */}
        <Card data-testid="card-crop-portfolio">
          <CardHeader>
            <CardTitle>Crop Portfolio</CardTitle>
            <CardDescription>Your current crops under cultivation</CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            {mockUserProfile.crops.map((cropData, index) => (
              <div
                key={index}
                className="p-4 bg-muted rounded-lg space-y-2"
                data-testid={`crop-portfolio-${cropData.crop}`}
              >
                <div className="flex items-center justify-between">
                  <CropBadge crop={cropData.crop} />
                  <span className="text-sm text-muted-foreground">
                    {cropData.area} hectares
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Expected Yield</span>
                  <span className="font-medium">
                    {cropData.expectedYield.toLocaleString("en-IN")} kg
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Est. Value</span>
                  <span className="font-semibold text-primary">
                    ₹{(
                      (cropData.expectedYield *
                        (cropData.crop === "mustard" ? 6850 : 4890)) /
                      100000
                    ).toFixed(2)}
                    L
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ---------------- PRICE ALERTS SECTION ---------------- */}
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

      {/* ----- CREATE ALERT DIALOG ----- */}
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

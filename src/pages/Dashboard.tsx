import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/common/StatCard";
import { CropBadge } from "@/components/common/CropBadge";
import { User, MapPin, Phone, Sprout } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock data
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

export default function Profile() {
  const { t } = useLanguage();

  const totalArea = mockUserProfile.crops.reduce((acc, c) => acc + c.area, 0);
  const totalValue = mockUserProfile.crops.reduce((acc, c) => {
    const price = c.crop === "mustard" ? 6850 : 4890;
    return acc + (c.expectedYield * price);
  }, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("profile")}
        description="Manage your profile and crop portfolio"
      />

      {/* Profile Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Information */}
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

        {/* Crop Portfolio */}
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
                    {cropData.expectedYield.toLocaleString('en-IN')} kg
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Est. Value</span>
                  <span className="font-semibold text-primary">
                    ₹{((cropData.expectedYield * (cropData.crop === "mustard" ? 6850 : 4890)) / 100000).toFixed(2)}L
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import axios from "axios";

import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/common/StatCard";
import { CropBadge } from "@/components/common/CropBadge";
import { User, MapPin, Phone, Sprout } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { backendApiUrl } from "../../../api/backendUrl";

export default function Dashboard() {
  const { t } = useLanguage();

  const [farmer, setFarmer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          backendApiUrl("farmer/get-farmer-info"),
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );

        setFarmer(res.data.farmer);
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading || !farmer) {
    return <p className="text-center p-10 font-medium">Loading profile...</p>;
  }

  // Calculations
  const totalArea = farmer.totalLandHolding;
  const crops = farmer.crops;

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("profile")}
        description="Manage your profile and crop portfolio"
      />

      {/* Profile Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Land"
          value={totalArea == null ? "Not provided" : `${totalArea} acres`}
          icon={Sprout}
          footer="Under cultivation"
        />
        <StatCard
          title="Active Contracts"
          value={farmer.activeContracts}
          icon={Sprout}
          footer="Currently trading"
        />
        <StatCard
          title="Wallet Balance"
          value={`₹${farmer.walletBalance}`}
          icon={Sprout}
          footer="Available funds"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Name</div>
                <div className="font-medium">{farmer.user.firstName} {farmer.user.lastName}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Phone</div>
                <div className="font-medium">{farmer.user.phoneNumber || "Not provided"}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Location</div>
                <div className="font-medium">
                  {farmer.user.addressDetail
                    ? `${farmer.user.addressDetail.district}, ${farmer.user.addressDetail.state}`
                    : "Not provided"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Crop Portfolio */}
        <Card>
          <CardHeader>
            <CardTitle>Crop Portfolio</CardTitle>
            <CardDescription>Your crops under cultivation</CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            {crops.map((c: any, index: number) => (
              <div
                key={index}
                className="p-4 bg-muted rounded-lg space-y-2"
              >
                <div className="flex items-center justify-between">
                  <CropBadge crop={c.cropType} />
                  <span className="text-sm text-muted-foreground">Active Crop</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

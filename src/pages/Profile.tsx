import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/common/StatCard";
import { CropBadge } from "@/components/common/CropBadge";
import { 
  User, 
  MapPin, 
  Phone, 
  Sprout, 
  ShoppingBag, 
  Building2, 
  Wallet, 
  History 
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// --- MOCK DATA ---

// 1. Farmer Profile Data
const mockFarmerProfile = {
  name: "Rajesh Kumar",
  phone: "+91 98765 43210",
  location: "Punjab, India",
  userType: "farmer",
  details: {
    landSize: 8.7,
    experience: "15 Years"
  },
  portfolio: [
    { item: "mustard", quantity: 5.5, metric: "ha", value: 8000, price: 6850 }, // Value here is Yield
    { item: "soybean", quantity: 3.2, metric: "ha", value: 4500, price: 4890 },
  ],
};

// 2. Buyer Profile Data
const mockBuyerProfile = {
  name: "Fresh Mandi Traders", // Business Name
  contactPerson: "Vikram Singh",
  phone: "+91 99887 76655",
  location: "Azadpur Mandi, Delhi",
  userType: "buyer",
  details: {
    gst: "07AABCT3518Q1Z",
    businessType: "Wholesaler"
  },
  portfolio: [
    { item: "mustard", quantity: 500, metric: "kg", value: 3425000, status: "Completed" }, // Value here is Total Amount
    { item: "wheat", quantity: 1200, metric: "kg", value: 2800000, status: "Processing" },
  ],
};

export default function Profile() {
  const { t } = useLanguage();
  
  // TOGGLE THIS VARIABLE TO TEST ('farmer' or 'buyer')
  // In a real app, this comes from your AuthContext or API
  const currentUser = mockBuyerProfile; 

  const isFarmer = currentUser.userType === "farmer";

  // Calculation Logic based on Role
  const stat1 = isFarmer 
    ? { title: "Total Land", value: `${currentUser.details.landSize || 0} ha`, icon: Sprout, footer: "Under cultivation" }
    : { title: "Total Orders", value: "124", icon: ShoppingBag, footer: "Lifetime orders" };

  const stat2 = isFarmer
    ? { title: "Expected Yield", value: "12,500 kg", icon: Sprout, footer: "This season" }
    : { title: "Active Deals", value: "3", icon: History, footer: "In transit" };

  const stat3 = isFarmer
    ? { title: "Est. Value", value: "₹6.8L", icon: Wallet, footer: "At current prices" }
    : { title: "Total Spend", value: "₹45.2L", icon: Wallet, footer: "Last financial year" };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("profile")}
        description={isFarmer ? "Manage your farm and crops" : "Manage your business and orders"}
      />

      {/* 1. Dynamic Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title={stat1.title} value={stat1.value} icon={stat1.icon} footer={stat1.footer} />
        <StatCard title={stat2.title} value={stat2.value} icon={stat2.icon} footer={stat2.footer} />
        <StatCard title={stat3.title} value={stat3.value} icon={stat3.icon} footer={stat3.footer} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 2. Personal Information (Shared Structure) */}
        <Card data-testid="card-profile-info">
          <CardHeader>
            <CardTitle>{isFarmer ? "Personal Information" : "Business Details"}</CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {/* Name / Company Name */}
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              {isFarmer ? <User className="h-5 w-5 text-muted-foreground" /> : <Building2 className="h-5 w-5 text-muted-foreground" />}
              <div>
                <div className="text-sm text-muted-foreground">{isFarmer ? "Name" : "Business Name"}</div>
                <div className="font-medium">{currentUser.name}</div>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Phone</div>
                <div className="font-medium">{currentUser.phone}</div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">Location</div>
                <div className="font-medium">{currentUser.location}</div>
              </div>
            </div>

            {/* Extra Field: GST for Buyer / Experience for Farmer */}
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              {isFarmer ? <Sprout className="h-5 w-5 text-muted-foreground" /> : <Wallet className="h-5 w-5 text-muted-foreground" />}
              <div>
                <div className="text-sm text-muted-foreground">{isFarmer ? "Experience" : "GST Number"}</div>
                <div className="font-medium">{isFarmer ? currentUser.details.experience : currentUser.details.gst}</div>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* 3. Conditional List: Crop Portfolio (Farmer) OR Recent Orders (Buyer) */}
        <Card data-testid="card-dynamic-portfolio">
          <CardHeader>
            <CardTitle>{isFarmer ? "Crop Portfolio" : "Recent Orders"}</CardTitle>
            <CardDescription>
                {isFarmer ? "Your current crops under cultivation" : "Your recent purchase history"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentUser.portfolio.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-muted rounded-lg space-y-2"
              >
                <div className="flex items-center justify-between">
                  {/* Reuse CropBadge for the item name */}
                  <CropBadge crop={item.item as any} /> 
                  <span className="text-sm text-muted-foreground">
                    {item.quantity} {item.metric}
                  </span>
                </div>

                {/* Farmer View: Yield Calculation */}
                {isFarmer && (
                  <>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Expected Yield</span>
                      <span className="font-medium">{item.value.toLocaleString('en-IN')} kg</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Est. Value</span>
                      <span className="font-semibold text-primary">
                        ₹{((item.value * (item.price || 0)) / 100000).toFixed(2)}L
                      </span>
                    </div>
                  </>
                )}

                {/* Buyer View: Order Status and Cost */}
                {!isFarmer && (
                  <>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total Cost</span>
                      <span className="font-medium">₹{(item.value / 100000).toFixed(2)} Lakhs</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Status</span>
                      <span className={`font-semibold ${item.status === 'Completed' ? 'text-green-600' : 'text-orange-600'}`}>
                        {item.status}
                      </span>
                    </div>
                  </>
                )}

              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
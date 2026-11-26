import type React from 'react';
import type { FC } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CreditCard, History, Settings, ChevronRight } from 'lucide-react'; // Lucide icons

// --- 1. Reusable Profile Link Item Component ---

interface ProfileLinkProps {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
}

const ProfileLink: FC<ProfileLinkProps> = ({ icon, label, onClick }) => {
    return (
        // Tailwind classes for hover effect and flexible alignment
        <div 
            className="flex items-center justify-between p-3 cursor-pointer hover:bg-background transition-colors duration-150 rounded-lg"
            onClick={onClick}
        >
            <div className="flex items-center space-x-4">
                <div className="text-muted-foreground">
                    {icon} {/* The Lucide icon */}
                </div>
                <span className="text-base font-medium text-foreground">{label}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
    );
};

// --- 2. Main Profile Component ---

const BuyerProfile: FC = () => {
    // Mock user data
    const userName = "Yoper Ghotus Plumlees";
    const userInitials = "YG";

    return (
        <div className="max-w-xl mx-auto p-4 sm:p-6 bg-background min-h-screen">
            
            {/* --- Profile Header Card --- */}
            <Card className="mb-6 shadow-md">
                <CardContent className="flex items-center p-6 space-x-4">
                    
                    {/* Avatar */}
                    <Avatar className="h-16 w-16 bg-primary/10">
                        {/* Avatar Image goes here if available */}
                        <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">{userInitials}</AvatarFallback>
                    </Avatar>

                    {/* User Info */}
                    <div>
                        <h1 className="text-xl font-bold text-foreground">My Profile</h1>
                        <p className="text-sm text-muted-foreground">{userName}</p>
                    </div>
                </CardContent>
            </Card>

            {/* --- Personal Details Section --- */}
            <Card className="mb-6 shadow-md">
                <CardContent className="p-6 space-y-3">
                    <h2 className="text-lg font-semibold mb-3">Personal Details</h2>
                    
                    {/* Detail Items based on image */}
                    <div className="text-sm text-muted-foreground space-y-1">
                        <p><strong>Name:</strong> Malomar Bestals</p>
                        <p>Poisesvsservenest dsiosa</p>
                        <p>Rhmosjir rbtblids</p>
                        <p>Dslnmss: 9X€650</p>
                    </div>
                </CardContent>
            </Card>

            {/* --- Actions/Menu Section --- */}
            <Card className="shadow-md">
                <CardContent className="p-2 divide-y divide-gray-100">
                    
                    {/* Payment Methods */}
                    <ProfileLink 
                        icon={<CreditCard className="h-6 w-6" />}
                        label="Payment Methods"
                        onClick={() => console.log("Navigate to Payment Methods")}
                    />

                    {/* Transaction History */}
                    <ProfileLink 
                        icon={<History className="h-6 w-6" />}
                        label="Transaction History"
                        onClick={() => console.log("Navigate to Transaction History")}
                    />

                    {/* Settings */}
                    <ProfileLink 
                        icon={<Settings className="h-6 w-6" />}
                        label="Settings"
                        onClick={() => console.log("Navigate to Settings")}
                    />
                    
                </CardContent>
            </Card>

            {/* Optional: Logout Button */}
            
            
        </div>
    );
};

export default BuyerProfile;
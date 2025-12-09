import React, { FC } from 'react';
import { Button } from "@/components/ui/button";

import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, CreditCard, History, Settings, ChevronRight } from 'lucide-react'; // Lucide icons

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
            className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors duration-150 rounded-lg"
            onClick={onClick}
        >
            <div className="flex items-center space-x-4">
                <div className="text-gray-600">
                    {icon} {/* The Lucide icon */}
                </div>
                <span className="text-base font-medium text-gray-800">{label}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>
    );
};

// --- 2. Main Profile Component ---

const BuyerProfile: FC = () => {
    // Mock user data
    const userName = "Yoper Ghotus Plumlees";
    const userInitials = "YG";

    return (
        <div className="max-w-xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
            
            {/* --- Profile Header Card --- */}
            <Card className="mb-6 shadow-md">
                <CardContent className="flex items-center p-6 space-x-4">
                    
                    {/* Avatar */}
                    <Avatar className="h-16 w-16 bg-primary/10">
                        {/* Avatar Image goes here if available */}
                        <AvatarFallback className="bg-primary text-white text-xl font-bold">{userInitials}</AvatarFallback>
                    </Avatar>

                    {/* User Info */}
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">My Profile</h1>
                        <p className="text-sm text-muted-foreground">{userName}</p>
                    </div>
                </CardContent>
            </Card>

            {/* --- Personal Details Section --- */}
            <Card className="mb-6 shadow-md">
                <CardContent className="p-6 space-y-3">
                    <h2 className="text-lg font-semibold mb-3">Personal Details</h2>
                    
                    {/* Detail Items based on image */}
                    <div className="text-sm text-gray-600 space-y-1">
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
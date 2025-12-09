import React, { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';

// --- 1. Contract Data Structure ---

interface ContractData {
  id: string;
  crop: string;
  quantity: number;
  agreedPrice: number;
  buyerName: string;
  status: 'Active' | 'Draft' | 'Completed';
  deliveryDate: string;
}

const mockContracts: ContractData[] = [
  { id: '1', crop: 'Mustard', quantity: 5000, agreedPrice: 6500, buyerName: 'Agro Traders Ltd', status: 'Active', deliveryDate: '2025-03-15' },
  { id: '2', crop: 'Soybean', quantity: 3000, agreedPrice: 4800, buyerName: 'Farmers Cooperative', status: 'Draft', deliveryDate: '2025-02-28' },
  { id: '3', crop: 'Corn', quantity: 7000, agreedPrice: 7200, buyerName: 'GreenFields', status: 'Completed', deliveryDate: '2025-01-30' },
];

// --- 2. Contract Card Component ---

const ContractCard: FC<{ contract: ContractData; onViewDetails?: (id: string) => void }> = ({ contract, onViewDetails }) => {
  // Badge styling based on status
  let badgeVariant: 'default' | 'secondary' | 'destructive' = 'default';
  if (contract.status === 'Draft') badgeVariant = 'secondary';
  if (contract.status === 'Completed') badgeVariant = 'destructive';

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-bold">{contract.crop}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Buyer: {contract.buyerName} | Qty: {contract.quantity} units
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <p>Agreed Price: ₹{contract.agreedPrice}</p>
        <p>Delivery Date: {new Date(contract.deliveryDate).toDateString()}</p>
        <div className="flex justify-between items-center mt-2">
          <Badge variant={badgeVariant}>{contract.status}</Badge>
          <Button variant="outline" size="sm" onClick={() => onViewDetails?.(contract.id)}>
            View Details <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// --- 3. Main Contracts List (formerly Past Bids) ---

const ContractList: FC = () => {
  const handleViewDetails = (id: string) => {
    console.log('View contract details:', id);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">The past contracts</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockContracts.map(contract => (
          <ContractCard key={contract.id} contract={contract} onViewDetails={handleViewDetails} />
        ))}
      </div>
    </div>
  );
};

export default ContractList;

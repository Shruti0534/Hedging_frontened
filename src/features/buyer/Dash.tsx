import { type FC, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Search, ChevronRight, Bell, Plus } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

// --- Mock Contract Data ---
interface ContractData {
  id: string;
  crop: string;
  quantity: number;
  agreedPrice: number;
  buyerName: string;
  status: 'Active' | 'Draft';
  deliveryDate: Date;
}

const mockContracts: ContractData[] = [
  { id: '1', crop: 'Mustard', quantity: 5000, agreedPrice: 6500, buyerName: 'Agro Traders Ltd', status: 'Active', deliveryDate: new Date('2025-03-15') },
  { id: '2', crop: 'Soybean', quantity: 3000, agreedPrice: 4800, buyerName: 'Farmers Cooperative', status: 'Draft', deliveryDate: new Date('2025-02-28') },
];

// --- Contract Card ---
const ContractCard: FC<{ contract: ContractData; onViewDetails?: (id: string) => void }> = ({ contract, onViewDetails }) => (
  <Card className="hover:shadow-lg transition-shadow duration-300">
    <CardHeader className="p-4">
      <CardTitle className="text-lg font-bold">{contract.crop}</CardTitle>
      <CardDescription className="text-sm text-muted-foreground">
        Buyer: {contract.buyerName} | Qty: {contract.quantity} units
      </CardDescription>
    </CardHeader>
    <CardContent className="p-4 space-y-2">
      <p>Agreed Price: ₹{contract.agreedPrice}</p>
      <p>Delivery Date: {contract.deliveryDate.toDateString()}</p>
      <div className="flex justify-between items-center mt-2">
        <Badge variant={contract.status === 'Active' ? 'default' : 'secondary'}>
          {contract.status}
        </Badge>
        <Button variant="outline" size="sm" onClick={() => onViewDetails?.(contract.id)}>
          View Details <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

// --- Main Buyer Dashboard ---
const BuyerDash: FC = () => {
  const contracts = mockContracts;
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewDetails = (id: string) => {
    console.log('View contract details:', id);
  };

  const filteredContracts = contracts.filter(c => c.crop.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">

      {/* Page Header with Filter Buttons */}
      <PageHeader
        title="Buyer Dashboard"
        description="Manage forward contracts and track your crop deals"
        action={
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" className="text-sm px-4 py-2 h-auto flex items-center" onClick={() => setIsDialogOpen(true)}>
              Organic <Plus className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="text-sm px-4 py-2 h-auto flex items-center" onClick={() => setIsDialogOpen(true)}>
              Bulk <Plus className="ml-2 h-4 w-4" />
            </Button>
          </div>
        }
      />

      {/* Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-6 rounded-lg shadow-md mb-6">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search Contracts..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 h-10 w-full"
          />
        </div>
      </div>

      {/* Live Bids Ticker */}
      <div className="flex items-center p-4 bg-gold border-l-4 border-gold-foreground rounded-lg text-sm mb-6 shadow-sm">
        <Bell className="h-5 w-5 text-gold-foreground mr-3" />
        <span className="font-bold text-gold-foreground mr-2">Live Bids Ticker:</span>
        <span className="text-gold-foreground">Real-time status | Sec-time status | Price bid</span>
      </div>

      <Separator className="my-6" />

      {/* Contracts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredContracts.map(contract => (
          <ContractCard key={contract.id} contract={contract} onViewDetails={handleViewDetails} />
        ))}
        {filteredContracts.length === 0 && <p className="text-center col-span-full text-muted-foreground">No contracts found.</p>}
      </div>

      {/* Dialog for creating contract */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Contract</DialogTitle>
            <DialogDescription>
              Add a new forward contract to track your crop sales
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Crop Name" />
            <Input placeholder="Quantity" type="number" />
            <Input placeholder="Agreed Price" type="number" />
            <Input placeholder="Buyer Name" />
            <Button className="w-full mt-2" onClick={() => setIsDialogOpen(false)}>Create</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BuyerDash;

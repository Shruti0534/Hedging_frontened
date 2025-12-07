import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { ContractCard } from "@/components/contracts/ContractCard";
import { ContractForm } from "@/components/contracts/ContractForm";
import { BlockchainLedger } from "@/components/contracts/BlockchainLedger";
import { EmptyState } from "@/components/common/EmptyState";
import { StatCardSkeleton } from "@/components/common/LoadingSkeleton";
import { ErrorState } from "@/components/common/ErrorState";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock data
const mockContracts = [
  {
    id: "1",
    crop: "mustard" as const,
    quantity: 5000,
    agreedPrice: 6500,
    buyerName: "Agro Traders Ltd",
    deliveryDate: new Date("2025-03-15"),
    status: "active" as const,
    blockchainHash: "0x8f7e2c3a9b1d5e4f6c8a2b3d9e1f5a6c7b8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3",
  },
  {
    id: "2",
    crop: "soybean" as const,
    quantity: 3000,
    agreedPrice: 4800,
    buyerName: "Farmers Cooperative",
    deliveryDate: new Date("2025-02-28"),
    status: "draft" as const,
  },
];

const mockBlockchainTxs = [
  {
    id: "tx1",
    transactionHash: "0x8f7e2c3a9b1d5e4f6c8a2b3d9e1f5a6c7b8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3",
    previousHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
    blockNumber: 12547,
    timestamp: new Date("2025-01-15T10:30:00"),
    data: { action: "contract_created", contractId: "1", status: "draft" },
  },
  {
    id: "tx2",
    transactionHash: "0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b",
    previousHash: "0x8f7e2c3a9b1d5e4f6c8a2b3d9e1f5a6c7b8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3",
    blockNumber: 12548,
    timestamp: new Date("2025-01-16T14:20:00"),
    data: { action: "contract_activated", contractId: "1", status: "active" },
  },
];

export default function Contracts() {
  const { t } = useLanguage();

  // Placeholder React Query structure - will be replaced with actual useQuery hooks
  const [isLoading] = useState(false);
  const [error] = useState<Error | null>(null);
  const [contracts, setContracts] = useState(mockContracts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateContract = (values: any) => {
    const newContract = {
      id: Date.now().toString(),
      crop: values.cropType,
      quantity: parseInt(values.quantity),
      agreedPrice: parseFloat(values.agreedPrice),
      buyerName: values.buyerName,
      deliveryDate: values.deliveryDate,
      status: "draft" as const,
    };
    setContracts([...contracts, newContract]);
    setIsDialogOpen(false);
  };

  const handleViewDetails = (id: string) => {
    console.log("View contract details:", id);
  };

  if (error) {
    return <ErrorState title="Failed to load contracts" message={error.message} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("contracts")}
        description="Manage forward contracts and blockchain ledger"
        action={
          <Button onClick={() => setIsDialogOpen(true)} data-testid="button-create-contract">
            <Plus className="h-4 w-4 mr-2" />
            New Contract
          </Button>
        }
      />

      <Tabs defaultValue="contracts" className="w-full">
        <TabsList>
          <TabsTrigger value="contracts" data-testid="tab-contracts-list">Contracts</TabsTrigger>
          <TabsTrigger value="ledger" data-testid="tab-blockchain-ledger">Blockchain Ledger</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="mt-6">
          {isLoading ? (
            <div className="grid grid-cols-1 ">
              {[1, 2, 3].map(i => <StatCardSkeleton key={i} />)}
            </div>
          ) : contracts.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No contracts yet"
              description="Create your first forward contract to lock in prices and secure your crop sales"
              action={{
                label: "Create Contract",
                onClick: () => setIsDialogOpen(true),
              }}
            />
          ) : (
            <div className="grid grid-cols-1 ">
              {contracts.map((contract) => (
                <ContractCard
                  key={contract.id}
                  {...contract}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="ledger" className="mt-6">
          <BlockchainLedger contractId="1" transactions={mockBlockchainTxs} />
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl" data-testid="dialog-create-contract">
          <DialogHeader>
            <DialogTitle>Create Forward Contract</DialogTitle>
            <DialogDescription>
              Create a new forward contract to lock in prices for your crop sales
            </DialogDescription>
          </DialogHeader>
          <ContractForm
            onSubmit={handleCreateContract}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

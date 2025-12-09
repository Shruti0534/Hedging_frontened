import { useEffect, useState } from "react";
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
import Predictor from "./Predictor";
import TraderPredictor from "./Trade";
import axios from "axios";


export default function Contracts() {
  const { t } = useLanguage();

  // Placeholder React Query structure - will be replaced with actual useQuery hooks
  const [isLoading, setIsLoading] = useState(false);
  const [error] = useState<Error | null>(null);
  const [contracts, setContracts] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [ledger, setLedger] = useState<any[]>([]);
  const [loadingLedger, setLoadingLedger] = useState(false);


const handleCreateContract = async (values: any) => {
  try {
    setIsLoading(true)
    const payload = {
      crop: values.cropType,
      quantity: Number(values.quantity),
      agreedPrice: Number(values.agreedPrice),
      marginAmount: values.marginAmount.toString(),
    };

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/contracts/create-contract`,
      payload,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );

    setContracts((prev:any) => [...prev, res.data]);
    setIsDialogOpen(false);
    alert("Trade created on blockchain successfully!");

  } catch (error: any) {
    console.error(error);
    alert(error.response?.data?.error || "Failed to create blockchain contract");
  }
  finally{
    setIsLoading(false)
  }
};

  useEffect(() => {
    const loadContracts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/contracts/get-contract`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setContracts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    loadContracts();
  }, []);

  const fetchLedger = async () => {
  try {
    setLoadingLedger(true);
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/contracts/ledger`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    setLedger(res.data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoadingLedger(false);
  }
};

useEffect(() => {
  fetchLedger();
}, []);



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
  <div className="flex flex-col lg:flex-row items-center justify-center gap-6 p-2 lg:p-4">
  <div className="w-full lg:w-1/2">
    <Predictor />
  </div>

  <div className="w-full lg:w-1/2">
    <TraderPredictor />
  </div>
</div>

      
      <Tabs defaultValue="contracts" className="w-full">
        <TabsList>
          <TabsTrigger value="contracts" data-testid="tab-contracts-list">Contracts</TabsTrigger>
          <TabsTrigger value="ledger" data-testid="tab-blockchain-ledger">Blockchain Ledger</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="mt-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <BlockchainLedger contractId="all" transactions={ledger} isLoading={loadingLedger} />
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
            isLoading={isLoading}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
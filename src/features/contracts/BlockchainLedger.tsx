import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Hash, Check, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendApiUrl } from "../../api/backendUrl";

interface BlockchainLedgerProps {
  contractId: string;
}

export function BlockchainLedger({ contractId }: BlockchainLedgerProps) {
  const [ledger, setLedger] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLedger = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        backendApiUrl("contracts/ledger"),
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setLedger(res.data);
    } catch (err) {
      console.error("Ledger error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLedger();
  }, []);

  return (
    <Card data-testid={`blockchain-ledger-${contractId}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hash className="h-5 w-5 text-primary" />
          Blockchain Ledger
        </CardTitle>
        <CardDescription>Real blockchain events for this contract</CardDescription>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-8 w-8 mx-auto mb-2 animate-spin opacity-50" />
            <p className="text-sm">Loading ledger...</p>
          </div>
        ) : ledger.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No blockchain transactions yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {ledger.map((tx: any, index: number) => (
              <div
                key={index}
                className="relative pl-6 pb-4 border-l-2 border-border last:border-0"
                data-testid={`blockchain-tx-${tx.id}`}
              >
                <div className="absolute left-0 top-0 -translate-x-1/2 bg-primary rounded-full p-1">
                  <Check className="h-3 w-3 text-primary-foreground" />
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs">
                    {tx.event}
                  </Badge>
                  <span className="text-xs text-muted-foreground">ID: {tx.id}</span>
                </div>

                <div className="text-xs text-muted-foreground">
                  Commodity: <strong>{tx.commodity}</strong>
                </div>

                <code className="text-xs block bg-muted px-2 py-1 rounded font-mono break-all mt-2">
                  {tx.txHash}
                </code>

                {tx.margin && (
                  <p className="text-xs mt-1 text-muted-foreground">
                    Margin: {tx.margin}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

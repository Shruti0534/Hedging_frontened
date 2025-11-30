import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Hash, Check, Clock } from "lucide-react";
import { format } from "date-fns";

interface BlockchainTransaction {
  id: string;
  transactionHash: string;
  previousHash?: string;
  blockNumber: number;
  timestamp: Date;
  data: any;
}

interface BlockchainLedgerProps {
  contractId: string;
  transactions: BlockchainTransaction[];
}

export function BlockchainLedger({ contractId, transactions }: BlockchainLedgerProps) {
  return (
    <Card data-testid={`blockchain-ledger-${contractId}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hash className="h-5 w-5 text-primary" />
          Blockchain Ledger
        </CardTitle>
        <CardDescription>
          Immutable transaction history for this contract
        </CardDescription>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No blockchain transactions yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((tx, index) => (
              <div 
                key={tx.id} 
                className="relative pl-6 pb-4 border-l-2 border-border last:border-0"
                data-testid={`blockchain-tx-${tx.id}`}
              >
                <div className="absolute left-0 top-0 -translate-x-1/2 bg-primary rounded-full p-1">
                  <Check className="h-3 w-3 text-primary-foreground" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          Block #{tx.blockNumber}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {format(tx.timestamp, 'PPp')}
                        </span>
                      </div>
                      
                      <div className="text-sm">
                        <code className="text-xs bg-muted px-2 py-1 rounded font-mono break-all" data-testid={`text-tx-hash-${tx.id}`}>
                          {tx.transactionHash}
                        </code>
                      </div>
                      
                      {tx.previousHash && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Previous: <code className="font-mono">{tx.previousHash.substring(0, 16)}...</code>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 rounded p-2 text-xs">
                    <pre className="whitespace-pre-wrap text-muted-foreground">
                      {JSON.stringify(tx.data, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CropBadge } from "@/components/common/CropBadge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Hash, Calendar, User, Package } from "lucide-react";
import { format } from "date-fns";

interface ContractCardProps {
  id: string;
  crop: "mustard" | "groundnut" | "soybean" | "sunflower";
  quantity: number;
  agreedPrice: number;
  buyerName: string;
  deliveryDate: Date;
  status: "draft" | "active" | "completed" | "expired";
  blockchainHash?: string;
  onViewDetails: (id: string) => void;
}

export function ContractCard({
  id,
  crop,
  quantity,
  agreedPrice,
  buyerName,
  deliveryDate,
  status,
  blockchainHash,
  onViewDetails,
}: ContractCardProps) {
  const totalValue = quantity * agreedPrice;

  return (
    <Card className="hover-elevate" data-testid={`card-contract-${id}`}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="space-y-1">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            Forward Contract
          </CardTitle>
          <div className="flex items-center gap-2">
            <CropBadge crop={crop} />
            <StatusBadge status={status} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="space-y-1">
            <div className="text-muted-foreground flex items-center gap-1">
              <Package className="h-3 w-3" />
              Quantity
            </div>
            <div className="font-semibold">{quantity.toLocaleString('en-IN')} kg</div>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground">Price/kg</div>
            <div className="font-semibold">₹{agreedPrice.toLocaleString('en-IN')}</div>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground flex items-center gap-1">
              <User className="h-3 w-3" />
              Buyer
            </div>
            <div className="font-medium truncate">{buyerName}</div>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Delivery
            </div>
            <div className="font-medium">{format(deliveryDate, 'dd MMM yyyy')}</div>
          </div>
        </div>

        <div className="pt-3 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Value</span>
            <span className="text-xl font-bold text-primary">
              ₹{totalValue.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {blockchainHash && (
          <div className="pt-2 border-t">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Hash className="h-3 w-3" />
              <code className="flex-1 truncate font-mono bg-muted px-2 py-1 rounded">
                {blockchainHash}
              </code>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => onViewDetails(id)}
          data-testid={`button-view-contract-${id}`}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

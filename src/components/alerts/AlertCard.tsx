import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CropBadge } from "@/components/common/CropBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Bell, Trash2 } from "lucide-react";

interface AlertCardProps {
  id: string;
  crop: "mustard" | "groundnut" | "soybean" | "sunflower";
  targetPrice: number;
  condition: "above" | "below" | "equals";
  isActive: boolean;
  triggered: boolean;
  onToggle: (id: string, active: boolean) => void;
  onDelete: (id: string) => void;
}

const conditionLabels = {
  above: "goes above",
  below: "goes below",
  equals: "equals",
};

export function AlertCard({
  id,
  crop,
  targetPrice,
  condition,
  isActive,
  triggered,
  onToggle,
  onDelete,
}: AlertCardProps) {
  return (
    <Card className={triggered ? "border-primary" : ""} data-testid={`card-alert-${id}`}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Bell className={`h-4 w-4 ${triggered ? 'text-primary' : 'text-muted-foreground'}`} />
          <CropBadge crop={crop} />
        </div>
        {triggered && (
          <Badge variant="default" className="bg-primary">
            Triggered
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-lg font-semibold text-foreground">
            Notify when price {conditionLabels[condition]}
          </div>
          <div className="text-3xl font-bold text-primary">
            ₹{targetPrice.toLocaleString('en-IN')}
            <span className="text-sm text-muted-foreground ml-1">/kg</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-2">
          <Switch
            checked={isActive}
            onCheckedChange={(checked) => onToggle(id, checked)}
            data-testid={`switch-alert-${id}`}
          />
          <span className="text-sm text-muted-foreground">
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(id)}
          className="text-destructive hover:text-destructive"
          data-testid={`button-delete-alert-${id}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

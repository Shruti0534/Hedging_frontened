import { Badge } from "../ui/badge";
import { Sprout } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

interface CropBadgeProps {
  crop: "mustard" | "groundnut" | "soybean" | "sunflower";
  className?: string;
}

const cropColors = {
  mustard: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  groundnut: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  soybean: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  sunflower: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
};

export function CropBadge({ crop, className }: CropBadgeProps) {
  const { t } = useLanguage();
  
  return (
    <Badge 
      variant="secondary" 
      className={`${cropColors[crop]} ${className}`}
      data-testid={`badge-crop-${crop}`}
    >
      <Sprout className="h-3 w-3 mr-1" />
      {t(crop as any)}
    </Badge>
  );
}

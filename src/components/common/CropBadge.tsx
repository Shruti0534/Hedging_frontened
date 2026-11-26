import { Badge } from "../ui/badge";
import { Sprout } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

interface CropBadgeProps {
  crop: string;
  className?: string;
}

const cropColors: Readonly<Record<string, string>> = {
  mustard: "bg-gold text-gold-foreground",
  groundnut: "bg-gold text-gold-foreground",
  soybean: "bg-accent text-accent-foreground",
  sunflower: "bg-gold text-gold-foreground",
};

export function CropBadge({ crop, className }: CropBadgeProps) {
  const { t } = useLanguage();
  
  return (
    <Badge 
      variant="secondary" 
      className={[Object.hasOwn(cropColors, crop) ? cropColors[crop] : "", className].filter(Boolean).join(" ")}
      data-testid={`badge-crop-${crop}`}
    >
      <Sprout className="h-3 w-3 mr-1" />
      {t(crop)}
    </Badge>
  );
}

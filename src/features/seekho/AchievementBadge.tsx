import { cn } from "@/lib/utils";

interface AchievementBadgeProps {
  title: string;
  icon: React.ReactNode;
  isUnlocked: boolean;
  description: string;
}

export function AchievementBadge({ title, icon, isUnlocked, description }: AchievementBadgeProps) {
  return (
    <div className="group relative">
      <div
        className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300",
          isUnlocked 
            ? "gradient-gold shadow-lg hover:scale-110 cursor-pointer" 
            : "bg-muted opacity-50"
        )}
      >
        <div className={cn(
          "text-2xl",
          isUnlocked ? "grayscale-0" : "grayscale"
        )}>
          {icon}
        </div>
      </div>
      
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
        <div className="bg-foreground text-background text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
          <p className="font-semibold">{title}</p>
          <p className="text-background/70 text-[10px]">{description}</p>
        </div>
      </div>
    </div>
  );
}

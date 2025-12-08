import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Lock, CheckCircle2, Play, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  lessons: number;
  completedLessons: number;
  xpReward: number;
  isLocked?: boolean;
  isCompleted?: boolean;
  index: number;
}

export function ModuleCard({
  id,
  title,
  description,
  icon,
  progress,
  lessons,
  completedLessons,
  xpReward,
  isLocked = false,
  isCompleted = false,
  index,
}: ModuleCardProps) {
  const navigate = useNavigate();
  return (
    <div
      className={cn(
        "relative bg-card border-2 rounded-2xl p-6 card-hover animate-slide-up",
        isLocked && "opacity-60 cursor-not-allowed",
        isCompleted && "border-success/50 bg-success/5",
        !isLocked && !isCompleted && "border-border hover:border-primary/50"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {isCompleted && (
        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-success flex items-center justify-center shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-success-foreground" />
        </div>
      )}

      {isLocked && (
        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-muted flex items-center justify-center shadow-lg">
          <Lock className="w-4 h-4 text-muted-foreground" />
        </div>
      )}

      <div className="flex items-start gap-4 mb-4">
        <div className={cn(
          "w-14 h-14 rounded-xl flex items-center justify-center",
          isCompleted ? "bg-success/20" : "bg-secondary"
        )}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-display font-bold text-lg text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">
            {completedLessons} / {lessons} lessons
          </span>
          <span className="font-semibold text-foreground">{progress}%</span>
        </div>
        <Progress 
          value={progress} 
          className="h-2"
          indicatorClassName={isCompleted ? "bg-success" : "bg-primary"}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xp">
          <Star className="w-4 h-4 fill-current" />
          <span className="font-semibold text-sm">+{xpReward} XP</span>
        </div>
        
        <Button 
          size="sm" 
          disabled={isLocked}
          variant={isCompleted ? "outline" : "default"}
          onClick={() => !isLocked && navigate(`/lesson/${id}`)}
        >
          {isLocked ? (
            <>
              <Lock className="w-4 h-4" />
              Locked
            </>
          ) : isCompleted ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Review
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Continue
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

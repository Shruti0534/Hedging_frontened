import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Gift, Zap } from "lucide-react";

export function DailyChallenge() {
  return (
    <div className="bg-gradient-to-br from-primary/5 via-background to-accent/10 border-2 border-primary/20 rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center animate-bounce-subtle">
            <Gift className="w-5 h-5 text-foreground" />
          </div>
          <div>
            <h3 className="font-display font-bold text-foreground">Daily Challenge</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>Resets in 8h 23m</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Complete today's hedging quiz to earn bonus XP and maintain your streak!
        </p>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold text-foreground">2/3 completed</span>
          </div>
          <Progress value={66} indicatorClassName="gradient-gold" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xp">
            <Zap className="w-4 h-4" />
            <span className="font-bold">+150 XP Bonus</span>
          </div>
          <Button size="sm">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

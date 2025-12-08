import { Flame, Zap, Trophy } from "lucide-react";

interface UserStatsProps {
  xp: number;
  level: number;
  streak: number;
}

export function UserStats({ xp, level, streak }: UserStatsProps) {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2">
        <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center">
          <Zap className="w-4 h-4 text-foreground" />
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">XP</p>
          <p className="font-display font-bold text-foreground">{xp.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2">
        <div className="w-8 h-8 rounded-full gradient-emerald flex items-center justify-center">
          <Trophy className="w-4 h-4 text-success-foreground" />
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Level</p>
          <p className="font-display font-bold text-foreground">{level}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2">
        <div className="w-8 h-8 rounded-full bg-streak flex items-center justify-center animate-pulse-glow">
          <Flame className="w-4 h-4 text-success-foreground" />
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Streak</p>
          <p className="font-display font-bold text-foreground">{streak} days</p>
        </div>
      </div>
    </div>
  );
}

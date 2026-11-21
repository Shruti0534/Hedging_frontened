import { UserStats } from "./UserStats";
import { Wheat } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between pr-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Wheat className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg text-foreground">OilSeed Academy</h1>
            <p className="text-xs text-muted-foreground">Master Hedging Strategies</p>
          </div>
        </div>
        
        <UserStats xp={2450} level={7} streak={12} />
      </div>
    </header>
  );
}

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Gift, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function DailyChallenge() {
const navigate = useNavigate();

const handleContinue = () => {
navigate("/daily-quiz");
};

return ( <div className="bg-gradient-to-br from-primary/5 via-background to-accent/10 border-2 border-primary/20 rounded-2xl p-6 relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"> <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />


  <div className="relative z-10">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center animate-bounce-subtle shadow-md">
        <Gift className="w-6 h-6 text-foreground" />
      </div>
      <div>
        <h3 className="font-display font-bold text-foreground text-lg">Daily Challenge</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
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
      <Progress value={66} indicatorClassName="gradient-gold h-3 rounded-full" />
    </div>

    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center gap-1 text-xp font-semibold">
        <Zap className="w-5 h-5" />
        <span>+150 XP Bonus</span>
      </div>
      <Button size="md" onClick={handleContinue} className="hover:scale-105 transition-transform">
        Continue Quiz
      </Button>
    </div>
  </div>
</div>


);
}

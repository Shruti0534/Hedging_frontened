import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Lock } from "lucide-react";

export interface PathNode {
  id: number;
  title: string;
  status: "completed" | "current" | "locked";
}

interface LearningPathProps {
  nodes: PathNode[];
}

export function LearningPath({ nodes }: LearningPathProps) {
  return (
    <div className="relative py-8">
      <div className="absolute left-8 top-0 bottom-0 w-1 bg-border rounded-full" />
      
      <div className="space-y-6">
        {nodes.map((node, index) => (
          <div key={node.id} className="relative flex items-center gap-4">
            <div
              className={cn(
                "relative z-10 w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-300",
                node.status === "completed" && "bg-success border-success",
                node.status === "current" && "bg-background border-primary animate-pulse-glow",
                node.status === "locked" && "bg-muted border-border"
              )}
            >
              {node.status === "completed" && (
                <CheckCircle2 className="w-7 h-7 text-success-foreground" />
              )}
              {node.status === "current" && (
                <Circle className="w-7 h-7 text-primary fill-primary/20" />
              )}
              {node.status === "locked" && (
                <Lock className="w-6 h-6 text-muted-foreground" />
              )}
            </div>
            
            <div
              className={cn(
                "flex-1 bg-card border-2 rounded-xl p-4 transition-all duration-300",
                node.status === "completed" && "border-success/30",
                node.status === "current" && "border-primary shadow-lg",
                node.status === "locked" && "border-border opacity-60"
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Step {index + 1}
                  </p>
                  <h4 className="font-display font-semibold text-foreground">{node.title}</h4>
                </div>
                {node.status === "current" && (
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    In Progress
                  </span>
                )}
                {node.status === "completed" && (
                  <span className="px-3 py-1 bg-success/20 text-success text-xs font-semibold rounded-full">
                    Completed
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: "draft" | "active" | "completed" | "expired" | "open" | "closed";
  className?: string;
}

const statusColors = {
  draft: "bg-muted text-foreground",
  active: "bg-accent text-accent-foreground",
  completed: "bg-secondary text-secondary-foreground",
  expired: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  open: "bg-accent text-accent-foreground",
  closed: "bg-muted text-foreground",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge 
      variant="secondary" 
      className={`${statusColors[status]} ${className}`}
      data-testid={`badge-status-${status}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

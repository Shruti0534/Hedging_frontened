
import { CardContent,Card ,CardHeader,CardTitle} from "../ui/card";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  footer?: ReactNode;
  className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, footer, className }: StatCardProps) {
  return (
    <Card className={className} data-testid={`card-stat-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground" data-testid={`text-stat-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {title}
        </CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" data-testid={`icon-stat-${title.toLowerCase().replace(/\s+/g, '-')}`} />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl md:text-3xl font-bold text-foreground" data-testid={`text-stat-value-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {value}
        </div>
        {trend && (
          <p className={`text-xs ${trend.isPositive ? 'text-chart-1' : 'text-destructive'} mt-1`} data-testid={`text-stat-trend-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </p>
        )}
        {footer && <div className="mt-2 text-sm text-muted-foreground" data-testid={`text-stat-footer-${title.toLowerCase().replace(/\s+/g, '-')}`}>{footer}</div>}
      </CardContent>
    </Card>
  );
}

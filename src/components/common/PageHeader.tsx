import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="text-page-title">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground mt-1" data-testid="text-page-description">
            {description}
          </p>
        )}
      </div>
      {action && <div className="flex gap-2">{action}</div>}
    </div>
  );
}

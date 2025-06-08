import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react'; // Example icons

interface KPIWidgetProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

const KPIWidget: React.FC<KPIWidgetProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className,
}) => {
  console.log("Rendering KPIWidget:", title);

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-muted-foreground';

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && trendValue && (
          <div className="flex items-center text-xs mt-1">
            <TrendIcon className={cn("h-3 w-3 mr-1", trendColor)} />
            <span className={cn(trendColor)}>{trendValue}</span>
            <span className="text-muted-foreground ml-1">from last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KPIWidget;
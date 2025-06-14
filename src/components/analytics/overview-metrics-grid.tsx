// src/components/analytics/overview-metrics-grid.tsx
// High-level KPI dashboard showing cross-division performance summary with animated counters

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Users, Briefcase, Package, ArrowUpRight } from 'lucide-react';
import { DashboardData } from '@/types/analytics';

interface OverviewMetricsGridProps {
  data: DashboardData;
  className?: string;
}

interface MetricCardProps {
  title: string;
  value: number;
  format?: 'currency' | 'number' | 'percentage';
  trend?: number;
  icon: React.ReactNode;
  description?: string;
}

// Purpose: Display key performance indicators with trend analysis and animated value presentation
function MetricCard({ title, value, format = 'number', trend, icon, description }: MetricCardProps) {
  const formatValue = (num: number) => {
    switch (format) {
      case 'currency':
        if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
        return `$${num.toLocaleString()}`;
      case 'percentage':
        return `${num}%`;
      default:
        return num.toLocaleString();
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-md border border-border/50 hover:border-border hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            {icon}
          </div>
          {trend !== undefined && (
            <Badge variant={trend > 0 ? "default" : "secondary"} className="text-xs">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              {trend > 0 ? '+' : ''}{trend}%
            </Badge>
          )}
        </div>
        
        <div className="space-y-1">
          <div className="text-2xl font-bold text-foreground">
            {formatValue(value)}
          </div>
          <div className="text-sm text-muted-foreground">{title}</div>
          {description && (
            <div className="text-xs text-muted-foreground/80">{description}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function OverviewMetricsGrid({ data, className }: OverviewMetricsGridProps) {
  const metrics = [
    {
      title: 'Total Revenue',
      value: data.totalRevenue,
      format: 'currency' as const,
      trend: data.totalGrowth,
      icon: <DollarSign className="h-5 w-5 text-primary" />,
      description: 'Across all divisions'
    },
    {
      title: 'Active Customers',
      value: data.totalCustomers,
      format: 'number' as const,
      trend: 34,
      icon: <Users className="h-5 w-5 text-blue-500" />,
      description: 'Enterprise & SMB clients'
    },
    {
      title: 'Projects Delivered',
      value: data.totalProjects,
      format: 'number' as const,
      trend: 45,
      icon: <Briefcase className="h-5 w-5 text-green-500" />,
      description: 'Consulting & services'
    },
    {
      title: 'Products Sold',
      value: data.totalProductsSold,
      format: 'number' as const,
      trend: 234,
      icon: <Package className="h-5 w-5 text-purple-500" />,
      description: 'SaaS & digital products'
    },
    {
      title: 'Average Growth',
      value: data.totalGrowth,
      format: 'percentage' as const,
      trend: 23,
      icon: <TrendingUp className="h-5 w-5 text-orange-500" />,
      description: 'Quarter-over-quarter'
    },
    {
      title: 'Cross-Division Referrals',
      value: data.crossDivisionReferrals,
      format: 'number' as const,
      trend: 67,
      icon: <ArrowUpRight className="h-5 w-5 text-cyan-500" />,
      description: '25% of total projects'
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          format={metric.format}
          trend={metric.trend}
          icon={metric.icon}
          description={metric.description}
        />
      ))}
    </div>
  );
}
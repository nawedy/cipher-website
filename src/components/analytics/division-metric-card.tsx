// src/components/analytics/division-metric-card.tsx
// Interactive division performance display card with glassmorphism effects and hover animations

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, Briefcase, Target, Package } from "lucide-react";
import { DivisionMetrics } from "@/types/analytics";
import { cn } from "@/lib/utils";

interface DivisionMetricCardProps {
  division: DivisionMetrics;
  onClick?: () => void;
  className?: string;
}

// Purpose: Display comprehensive division metrics with interactive hover states and category-specific visualizations
export function DivisionMetricCard({ division, onClick, className }: DivisionMetricCardProps) {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const getTrendIcon = () => {
    if (division.growthRate > 0) {
      return <TrendingUp className="h-4 w-4 text-green-400" />;
    } else if (division.growthRate < 0) {
      return <TrendingDown className="h-4 w-4 text-red-400" />;
    }
    return null;
  };

  const getTrendColor = () => {
    if (division.growthRate > 0) return "text-green-400";
    if (division.growthRate < 0) return "text-red-400";
    return "text-gray-400";
  };

  const getCategoryIcon = () => {
    switch (division.category) {
      case 'products':
        return <Package className="h-4 w-4" />;
      case 'consulting':
        return <Briefcase className="h-4 w-4" />;
      case 'services':
        return <Target className="h-4 w-4" />;
      default:
        return <Briefcase className="h-4 w-4" />;
    }
  };

  return (
    <Card 
      className={cn(
        "relative overflow-hidden bg-card/50 backdrop-blur-md border border-border/50",
        "hover:border-border hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1",
        "transition-all duration-300 cursor-pointer group",
        className
      )}
      onClick={onClick}
      style={{
        background: `linear-gradient(135deg, ${division.color}15, ${division.accentColor}08)`,
        borderColor: `${division.accentColor}30`
      }}
    >
      {/* Accent glow effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${division.accentColor}10, transparent)`,
        }}
      />
      
      <CardContent className="p-6 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {getCategoryIcon()}
              <h3 className="text-lg font-semibold text-foreground">{division.name}</h3>
            </div>
            <Badge 
              variant="secondary" 
              className="text-xs"
              style={{ 
                backgroundColor: `${division.accentColor}20`,
                color: division.accentColor,
                borderColor: `${division.accentColor}40`
              }}
            >
              Q1 2024
            </Badge>
          </div>
          
          <div className={cn("flex items-center", getTrendColor())}>
            {getTrendIcon()}
            <span className="text-sm font-medium ml-1">
              {division.growthRate > 0 ? '+' : ''}{division.growthRate}%
            </span>
          </div>
        </div>

        {/* Revenue */}
        <div className="mb-4">
          <div className="text-3xl font-bold text-foreground">
            {formatCurrency(division.revenue)}
          </div>
          <p className="text-sm text-muted-foreground">Revenue</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-lg font-semibold text-foreground">
              {division.projectCount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {division.category === 'products' ? 'Products' : 'Projects'}
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-lg font-semibold text-foreground">
              {division.customerCount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Customers</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Target className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-lg font-semibold text-foreground">
              {division.conversionRate.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Conv. Rate</p>
          </div>
        </div>

        {/* Products specific metric */}
        {division.productsSold && (
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Products Sold</span>
              <span className="text-lg font-semibold text-foreground">
                {division.productsSold.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
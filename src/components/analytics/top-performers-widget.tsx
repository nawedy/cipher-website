// src/components/analytics/top-performers-widget.tsx
// Showcase highest performing divisions with ranking and comparative metrics

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui-new/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, Medal, Award } from 'lucide-react';
import { DivisionMetrics } from '@/types/analytics';

interface TopPerformersWidgetProps {
  performers: DivisionMetrics[];
  className?: string;
}

// Purpose: Display top performing divisions with ranking indicators and growth metrics
export function TopPerformersWidget({ performers, className }: TopPerformersWidgetProps) {
  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 2:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{index + 1}</div>;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return 'from-yellow-500/20 to-yellow-600/10';
      case 1:
        return 'from-gray-400/20 to-gray-500/10';
      case 2:
        return 'from-amber-600/20 to-amber-700/10';
      default:
        return 'from-muted/20 to-muted/10';
    }
  };

  const formatRevenue = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <CardTitle className="text-xl font-semibold">Top Performers</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Highest growth divisions this quarter
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {performers.map((division, index) => (
          <div
            key={division.id}
            className={`relative p-4 rounded-lg bg-gradient-to-r ${getRankColor(index)} border border-border/50 hover:border-border transition-all duration-300`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getRankIcon(index)}
                <div>
                  <h3 className="font-semibold text-foreground">{division.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge 
                      variant="secondary" 
                      className="text-xs"
                      style={{ 
                        backgroundColor: `${division.accentColor}20`,
                        color: division.accentColor,
                        borderColor: `${division.accentColor}40`
                      }}
                    >
                      {division.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {formatRevenue(division.revenue)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-1 text-green-400">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-lg font-bold">+{division.growthRate}%</span>
                </div>
                <p className="text-xs text-muted-foreground">growth</p>
              </div>
            </div>
            
            {/* Performance bar */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Performance Score</span>
                <span>{Math.min(100, division.growthRate + division.conversionRate * 10).toFixed(0)}/100</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-1000"
                  style={{ 
                    width: `${Math.min(100, division.growthRate + division.conversionRate * 10)}%`,
                    background: `linear-gradient(to right, ${division.accentColor}, ${division.accentColor}80)`
                  }}
                />
              </div>
            </div>
          </div>
        ))}
        
        {/* Summary insight */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="font-medium text-foreground">Growth Insight</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Product divisions are showing exceptional growth, with Cipher AI leading at +{performers[0]?.growthRate || 0}% 
            driven by high-value enterprise AI implementations.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
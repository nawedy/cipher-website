// src/components/analytics/conversion-funnel-chart.tsx
// Interactive conversion funnel visualization showing customer journey across all touchpoints

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui-new/card";
import { Badge } from "@/components/ui/badge";
import { ConversionFunnelStep } from '@/types/analytics';
import { ChevronDown } from 'lucide-react';

interface ConversionFunnelChartProps {
  data: ConversionFunnelStep[];
  className?: string;
}

// Purpose: Visualize customer conversion journey with interactive funnel stages and performance metrics
export function ConversionFunnelChart({ data, className }: ConversionFunnelChartProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  };

  const maxVisitors = Math.max(...data.map(step => step.visitors));

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Conversion Funnel</CardTitle>
          <Badge variant="secondary" className="text-xs">
            Q1 2024
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {data.map((step, index) => {
          const width = (step.visitors / maxVisitors) * 100;
          const isLast = index === data.length - 1;
          
          return (
            <div key={step.stage} className="relative">
              {/* Funnel Stage */}
              <div className="relative group">
                <div 
                  className="h-16 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg border border-primary/20 
                             hover:from-primary/30 hover:to-primary/20 transition-all duration-300
                             flex items-center justify-between px-6 cursor-pointer"
                  style={{ width: `${width}%`, minWidth: '280px' }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-lg font-semibold text-foreground">
                      {step.stage}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {step.conversionRate.toFixed(1)}%
                    </Badge>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground">
                      {formatNumber(step.visitors)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      visitors
                    </div>
                  </div>
                </div>

                {/* Revenue indicator for stages that generate value */}
                {step.value > 0 && (
                  <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 translate-x-full">
                    <div className="bg-green-500/20 border border-green-500/30 rounded-md px-3 py-1 text-green-400 text-sm font-medium">
                      {formatCurrency(step.value)}
                    </div>
                  </div>
                )}
              </div>

              {/* Arrow connector */}
              {!isLast && (
                <div className="flex justify-center my-2">
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
            </div>
          );
        })}
        
        {/* Summary Stats */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-foreground">
                {formatNumber(data[0]?.visitors || 0)}
              </div>
              <div className="text-xs text-muted-foreground">Total Reach</div>
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">
                {formatNumber(data[data.length - 1]?.visitors || 0)}
              </div>
              <div className="text-xs text-muted-foreground">Conversions</div>
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">
                {((data[data.length - 1]?.visitors || 0) / (data[0]?.visitors || 1) * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Overall Rate</div>
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">
                {formatCurrency(data.reduce((sum, step) => sum + step.value, 0))}
              </div>
              <div className="text-xs text-muted-foreground">Total Value</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
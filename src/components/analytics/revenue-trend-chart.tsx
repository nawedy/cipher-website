// src/components/analytics/revenue-trend-chart.tsx
// Interactive revenue timeline visualization with division filtering and responsive design

"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RevenueDataPoint } from '@/types/analytics';
import { divisionConfig } from '@/lib/analytics-data';
import { useState } from 'react';

interface RevenueTrendChartProps {
  data: RevenueDataPoint[];
  className?: string;
}

// Purpose: Visualize revenue trends across all divisions with interactive filtering and smooth animations
export function RevenueTrendChart({ data, className }: RevenueTrendChartProps) {
  const [selectedDivisions, setSelectedDivisions] = useState<string[]>(
    Object.keys(divisionConfig)
  );

  // Transform data for chart consumption
  const chartData = data.reduce((acc, item) => {
    const existing = acc.find(d => d.date === item.date);
    if (existing) {
      existing[item.division] = item.revenue / 1000000; // Convert to millions
    } else {
      acc.push({
        date: item.date,
        [item.division]: item.revenue / 1000000
      });
    }
    return acc;
  }, [] as any[]);

  // Sort by date for proper line chart display
  chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const toggleDivision = (division: string) => {
    setSelectedDivisions(prev => 
      prev.includes(division) 
        ? prev.filter(d => d !== division)
        : [...prev, division]
    );
  };

  const formatTooltipValue = (value: number) => {
    return [`$${value.toFixed(1)}M`, 'Revenue'];
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Revenue Trends</CardTitle>
          <Badge variant="secondary" className="text-xs">
            Q1 2024
          </Badge>
        </div>
        
        {/* Division Toggle Buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          {Object.entries(divisionConfig).map(([key, config]) => (
            <Button
              key={key}
              variant={selectedDivisions.includes(key) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleDivision(key)}
              className="text-xs"
              style={selectedDivisions.includes(key) ? {
                backgroundColor: config.accent + '20',
                borderColor: config.accent + '50',
                color: config.accent
              } : {}}
            >
              {key.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                className="text-muted-foreground"
              />
              <YAxis 
                tickFormatter={(value) => `$${value}M`}
                className="text-muted-foreground"
              />
              <Tooltip 
                labelFormatter={(label) => formatDate(label)}
                formatter={formatTooltipValue}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Legend />
              
              {Object.entries(divisionConfig).map(([division, config]) => (
                selectedDivisions.includes(division) && (
                  <Line
                    key={division}
                    type="monotone"
                    dataKey={division}
                    stroke={config.accent}
                    strokeWidth={2}
                    dot={{ fill: config.accent, strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: config.accent, strokeWidth: 2 }}
                    name={division.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  />
                )
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
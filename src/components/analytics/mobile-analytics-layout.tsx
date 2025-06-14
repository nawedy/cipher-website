// src/components/analytics/mobile-analytics-layout.tsx
// Mobile-first responsive layout component optimizing analytics dashboard for small screens

"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Menu, 
  TrendingUp, 
  Users, 
  Briefcase, 
  Target, 
  BarChart3, 
  PieChart, 
  Activity,
  Filter,
  Download,
  RefreshCw,
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { DashboardData, DivisionMetrics } from '@/types/analytics';
import { divisionConfig } from '@/lib/analytics-data';
import { RealtimeIndicator } from './realtime-indicator';
import { ExportDialog } from './export-dialog';
import { cn } from '@/lib/utils';

interface MobileAnalyticsLayoutProps {
  data: DashboardData;
  loading?: boolean;
  onRefresh?: () => void;
  onDivisionSelect?: (division: DivisionMetrics) => void;
}

interface TabConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

// Purpose: Provide optimized mobile analytics experience with touch-friendly interface and condensed data visualization
export function MobileAnalyticsLayout({ 
  data, 
  loading = false, 
  onRefresh, 
  onDivisionSelect 
}: MobileAnalyticsLayoutProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [menuOpen, setMenuOpen] = useState(false);
  const [visibleMetrics, setVisibleMetrics] = useState<Set<string>>(new Set(['revenue', 'growth', 'customers']));
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (onRefresh) {
      setRefreshing(true);
      await onRefresh();
      setRefreshing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const toggleMetricVisibility = (metric: string) => {
    setVisibleMetrics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(metric)) {
        newSet.delete(metric);
      } else {
        newSet.add(metric);
      }
      return newSet;
    });
  };

  // Metric cards for overview
  const MetricCard = ({ 
    title, 
    value, 
    change, 
    icon, 
    color = '#3b82f6',
    metricKey
  }: {
    title: string;
    value: string;
    change?: string;
    icon: React.ReactNode;
    color?: string;
    metricKey: string;
  }) => {
    const isVisible = visibleMetrics.has(metricKey);
    
    return (
      <Card 
        className={cn(
          "relative transition-all duration-300",
          isVisible ? "opacity-100" : "opacity-60 scale-95"
        )}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}20` }}>
              <div style={{ color }}>{icon}</div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => toggleMetricVisibility(metricKey)}
            >
              {isVisible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
            </Button>
          </div>
          <div>
            <div className="text-xl font-bold">{value}</div>
            <div className="text-xs text-muted-foreground">{title}</div>
            {change && (
              <div className="text-xs text-green-500 mt-1">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                {change}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  // Compact division card for mobile
  const CompactDivisionCard = ({ division }: { division: DivisionMetrics }) => {
    const config = divisionConfig[division.slug as keyof typeof divisionConfig];
    
    return (
      <Card 
        className="cursor-pointer hover:shadow-lg transition-all duration-300"
        onClick={() => onDivisionSelect?.(division)}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: config?.accent || '#3b82f6' }}
              />
              <div>
                <div className="font-medium text-sm">{division.name}</div>
                <div className="text-xs text-muted-foreground">{division.category}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold">{formatCurrency(division.revenue)}</div>
              <div className="text-xs text-green-500">+{division.growthRate}%</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  };

  // Mini chart component for mobile
  const MiniChart = ({ data, type = 'line', color = '#3b82f6' }: {
    data: any[];
    type?: 'line' | 'area' | 'bar';
    color?: string;
  }) => (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        {type === 'area' ? (
          <AreaChart data={data}>
            <Area
              type="monotone"
              dataKey="revenue"
              stroke={color}
              fill={`${color}20`}
              strokeWidth={2}
            />
          </AreaChart>
        ) : type === 'bar' ? (
          <BarChart data={data}>
            <Bar dataKey="revenue" fill={color} />
          </BarChart>
        ) : (
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="revenue"
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );

  const tabs: TabConfig[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <BarChart3 className="h-4 w-4" />,
      component: (
        <div className="space-y-4">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <MetricCard
              title="Revenue"
              value={formatCurrency(data.totalRevenue)}
              change={`+${data.totalGrowth}%`}
              icon={<TrendingUp className="h-4 w-4" />}
              color="#3b82f6"
              metricKey="growth"
            />
            <MetricCard
              title="Customers"
              value={formatNumber(data.totalCustomers)}
              change="+34%"
              icon={<Users className="h-4 w-4" />}
              color="#8b5cf6"
              metricKey="customers"
            />
            <MetricCard
              title="Projects"
              value={formatNumber(data.totalProjects)}
              change="+45%"
              icon={<Briefcase className="h-4 w-4" />}
              color="#f59e0b"
              metricKey="projects"
            />
          </div>

          {/* Quick Revenue Trend */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Revenue Trend (Last 3 Months)</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <MiniChart 
                data={data.revenueTimeline.slice(-3).map(point => ({
                  ...point,
                  revenue: point.revenue / 1000000
                }))}
                type="area"
                color="#10b981"
              />
            </CardContent>
          </Card>

          {/* Top Performers Quick View */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Target className="h-4 w-4" />
                Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-2">
                {data.topPerformers.slice(0, 3).map((division, index) => (
                  <div key={division.id} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="w-6 h-6 p-0 flex items-center justify-center text-xs">
                        {index + 1}
                      </Badge>
                      <span className="text-sm font-medium">{division.name}</span>
                    </div>
                    <span className="text-sm text-green-500">+{division.growthRate}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'divisions',
      label: 'Divisions',
      icon: <PieChart className="h-4 w-4" />,
      component: (
        <div className="space-y-4">
          {/* Division Performance Cards */}
          <div className="space-y-3">
            {data.divisionMetrics.map((division) => (
              <CompactDivisionCard key={division.id} division={division} />
            ))}
          </div>

          {/* Revenue Distribution Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Revenue Distribution</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={data.divisionMetrics.map(div => ({
                        name: div.name.split(' ').pop(), // Last word only for mobile
                        value: div.revenue,
                        color: divisionConfig[div.slug as keyof typeof divisionConfig]?.accent || '#3b82f6'
                      }))}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {data.divisionMetrics.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={divisionConfig[entry.slug as keyof typeof divisionConfig]?.accent || '#3b82f6'} 
                        />
                      ))}
                    </Pie>
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                {data.divisionMetrics.slice(0, 6).map((division) => (
                  <div key={division.id} className="flex items-center gap-2 text-xs">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ 
                        backgroundColor: divisionConfig[division.slug as keyof typeof divisionConfig]?.accent || '#3b82f6' 
                      }}
                    />
                    <span className="truncate">{division.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'trends',
      label: 'Trends',
      icon: <Activity className="h-4 w-4" />,
      component: (
        <div className="space-y-4">
          {/* Conversion Funnel */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-3">
                {data.conversionFunnel.map((step, index) => {
                  const width = (step.visitors / data.conversionFunnel[0].visitors) * 100;
                  return (
                    <div key={step.stage} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium">{step.stage}</span>
                        <span className="text-muted-foreground">
                          {formatNumber(step.visitors)} ({step.conversionRate.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-1000 rounded-full"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Growth Comparison */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Division Growth Comparison</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-3">
                {data.topPerformers.map((division) => {
                  const config = divisionConfig[division.slug as keyof typeof divisionConfig];
                  return (
                    <div key={division.id} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium">{division.name}</span>
                        <span className="text-green-500">+{division.growthRate}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full transition-all duration-1000 rounded-full"
                          style={{ 
                            width: `${Math.min(division.growthRate, 200)}%`,
                            backgroundColor: config?.accent || '#3b82f6'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Revenue Trend */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Monthly Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <MiniChart 
                data={data.revenueTimeline.slice(-6).map(point => ({
                  month: point.date.split('-')[1],
                  revenue: point.revenue / 1000000
                }))}
                type="line"
                color="#10b981"
              />
            </CardContent>
          </Card>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Analytics Menu</SheetTitle>
                  <SheetDescription>
                    Navigate through different analytics views
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {tabs.map((tab) => (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => {
                        setActiveTab(tab.id);
                        setMenuOpen(false);
                      }}
                    >
                      {tab.icon}
                      <span className="ml-2">{tab.label}</span>
                    </Button>
                  ))}
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Quick Actions</h4>
                    <ExportDialog 
                      data={data}
                      trigger={
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Download className="h-4 w-4 mr-2" />
                          Export Report
                        </Button>
                      }
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={handleRefresh}
                      disabled={refreshing}
                    >
                      <RefreshCw className={cn("h-4 w-4 mr-2", refreshing && "animate-spin")} />
                      Refresh Data
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <RealtimeIndicator showDetails={true} />
                </div>
              </SheetContent>
            </Sheet>
            
            <div>
              <h1 className="text-lg font-semibold">Analytics</h1>
              <p className="text-xs text-muted-foreground">Q1 2024</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <RealtimeIndicator />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 pb-2">
          <ScrollArea className="w-full">
            <div className="flex space-x-2">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  size="sm"
                  className="flex-shrink-0"
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0">
              {tab.component}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Floating Action Button for Export */}
      <div className="fixed bottom-6 right-6 z-40">
        <ExportDialog 
          data={data}
          trigger={
            <Button size="lg" className="rounded-full shadow-lg">
              <Download className="h-5 w-5" />
            </Button>
          }
        />
      </div>
    </div>
  );
}
// src/app/analytics/page.tsx
// Enhanced main analytics dashboard integrating real-time updates, advanced filtering, mobile optimization, and export functionality

"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "../../hooks/use-media-query";
import { CalendarDays, Download, RefreshCw, Filter, BarChart3, TrendingUp, Eye } from 'lucide-react';
import { DashboardData, AnalyticsFilters } from '@/types/analytics';
import { getDashboardData } from '@/lib/analytics-data';
import { realtimeAnalytics, RealtimeUpdate } from '@/lib/realtime-analytics';
import { OverviewMetricsGrid } from '@/components/analytics/overview-metrics-grid';
import { DivisionMetricCard } from '@/components/analytics/division-metric-card';
import { RevenueTrendChart } from '@/components/analytics/revenue-trend-chart';
import { ConversionFunnelChart } from '@/components/analytics/conversion-funnel-chart';
import { TopPerformersWidget } from '@/components/analytics/top-performers-widget';
import { RealtimeIndicator } from '@/components/analytics/realtime-indicator';
import { ExportDialog } from '@/components/analytics/export-dialog';
import { AdvancedFilterPanel } from '@/components/analytics/advanced-filter-panel';
import { MobileAnalyticsLayout } from '@/components/analytics/mobile-analytics-layout';

// Purpose: Comprehensive analytics dashboard with real-time updates, responsive design, and advanced filtering capabilities
export default function AnalyticsDashboard() {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const [data, setData] = useState<DashboardData | null>(null);
  const [filteredData, setFilteredData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [realtimeUpdates, setRealtimeUpdates] = useState<RealtimeUpdate[]>([]);
  type FilterState = {
    dateRange?: { start: Date; end: Date };
    divisions: string[];
    metric: 'revenue' | 'growth' | 'projects' | 'customers' | 'products';
    period: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  };
  
  const [filters, setFilters] = useState<FilterState>({
    dateRange: undefined,
    divisions: [],
    metric: 'revenue',
    period: 'monthly'
  });

  useEffect(() => {
    loadDashboardData();
    setupRealtimeSubscriptions();

    return () => {
      realtimeAnalytics.disconnect();
    };
  }, []);

  // Apply filters when data or filters change
  useEffect(() => {
    if (data) {
      applyFilters();
    }
  }, [data, filters]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const dashboardData = await getDashboardData();
      setData(dashboardData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscriptions = () => {
    // Subscribe to real-time updates
    const unsubscribe = realtimeAnalytics.onUpdate((update) => {
      setRealtimeUpdates(prev => [update, ...prev.slice(0, 9)]);
      
      // Apply real-time updates to data
      if (update.type === 'metric_update' && data) {
        updateDataWithRealtimeChanges(update);
      }
    });

    // Subscribe to all divisions
    realtimeAnalytics.subscribeToMetrics();

    return unsubscribe;
  };

  const updateDataWithRealtimeChanges = (update: RealtimeUpdate) => {
    if (!data || !update.data?.new) return;

    setData(prevData => {
      if (!prevData) return prevData;

      const updatedMetrics = prevData.divisionMetrics.map(division => {
        if (division.slug === update.division) {
          return {
            ...division,
            revenue: update.data.new.revenue || division.revenue,
            growthRate: update.data.new.growth_rate || division.growthRate,
            conversionRate: update.data.new.conversion_rate || division.conversionRate
          };
        }
        return division;
      });

      // Recalculate totals
      const totalRevenue = updatedMetrics.reduce((sum, div) => sum + div.revenue, 0);
      const avgGrowth = Math.round(updatedMetrics.reduce((sum, div) => sum + div.growthRate, 0) / updatedMetrics.length);

      return {
        ...prevData,
        divisionMetrics: updatedMetrics,
        totalRevenue,
        totalGrowth: avgGrowth,
        topPerformers: updatedMetrics
          .sort((a, b) => b.growthRate - a.growthRate)
          .slice(0, 3)
      };
    });
  };

  const applyFilters = () => {
    if (!data) return;

    let filtered = { ...data };

    // Filter by divisions
    if (filters.divisions && filters.divisions.length > 0) {
      filtered.divisionMetrics = filtered.divisionMetrics.filter(
        division => filters.divisions!.includes(division.slug)
      );
      
      filtered.revenueTimeline = filtered.revenueTimeline.filter(
        point => filters.divisions!.includes(point.division)
      );
      
      filtered.topPerformers = filtered.topPerformers.filter(
        division => filters.divisions!.includes(division.slug)
      );
    }

    // Filter by date range
    if (filters.dateRange) {
      const { start, end } = filters.dateRange;
      filtered.revenueTimeline = filtered.revenueTimeline.filter(point => {
        const pointDate = new Date(point.date + '-01');
        return pointDate >= start && pointDate <= end;
      });
    }

    // Recalculate totals based on filtered data
    filtered.totalRevenue = filtered.divisionMetrics.reduce((sum, div) => sum + div.revenue, 0);
    filtered.totalProjects = filtered.divisionMetrics.reduce((sum, div) => sum + div.projectCount, 0);
    filtered.totalCustomers = filtered.divisionMetrics.reduce((sum, div) => sum + div.customerCount, 0);
    filtered.totalProductsSold = filtered.divisionMetrics.reduce((sum, div) => sum + (div.productsSold || 0), 0);
    filtered.totalGrowth = filtered.divisionMetrics.length 
      ? Math.round(filtered.divisionMetrics.reduce((sum, div) => sum + div.growthRate, 0) / filtered.divisionMetrics.length)
      : 0;

    setFilteredData(filtered);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const handleFiltersChange = (newFilters: AnalyticsFilters) => {
    setFilters(newFilters);
  };

  const handleDivisionClick = (division: any) => {
    router.push(`/analytics/divisions/${division.slug}`);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.dateRange) count++;
    if (filters.divisions && filters.divisions.length > 0) count++;
    if (filters.metric && filters.metric !== 'revenue') count++;
    return count;
  };

  // Show mobile layout on small screens
  if (isMobile) {
    return (
      <MobileAnalyticsLayout
        data={filteredData || data || {
          totalRevenue: 0,
          totalGrowth: 0,
          totalProjects: 0,
          totalCustomers: 0,
          totalProductsSold: 0,
          divisionMetrics: [],
          conversionFunnel: [],
          revenueTimeline: [],
          topPerformers: [],
          productMetrics: [],
          crossDivisionReferrals: 0
        }}
        loading={loading}
        onRefresh={handleRefresh}
        onDivisionSelect={handleDivisionClick}
      />
    );
  }

  // Desktop layout
  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
          
          {/* Metrics Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
          
          {/* Charts Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">Failed to load dashboard data</p>
            <Button onClick={loadDashboardData} className="mt-4">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const displayData = filteredData || data;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  <CalendarDays className="h-3 w-3 mr-1" />
                  Q1 2024
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Last updated: {new Date().toLocaleTimeString()}
                </Badge>
                {getActiveFiltersCount() > 0 && (
                  <Badge variant="default" className="text-xs">
                    <Filter className="h-3 w-3 mr-1" />
                    {getActiveFiltersCount()} filter{getActiveFiltersCount() === 1 ? '' : 's'}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <RealtimeIndicator />
              
              <AdvancedFilterPanel
                filters={filters as AnalyticsFilters}
                onFiltersChange={handleFiltersChange}
                onApply={applyFilters}
              />
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              
              <ExportDialog data={displayData} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Performance Overview */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Performance Overview</h2>
            <Button variant="ghost" size="sm" onClick={() => router.push('/analytics/overview')}>
              <Eye className="h-4 w-4 mr-2" />
              Detailed View
            </Button>
          </div>
          <OverviewMetricsGrid data={displayData} />
        </section>

        {/* Charts Section */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Revenue & Conversion Analytics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RevenueTrendChart 
              data={displayData.revenueTimeline} 
              className="lg:col-span-2" 
            />
            <ConversionFunnelChart 
              data={displayData.conversionFunnel}
            />
          </div>
        </section>

        {/* Division Performance */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Division Performance</h2>
            <div className="flex items-center gap-2">
              {filters.divisions && filters.divisions.length > 0 && (
                <Badge variant="outline" className="text-xs">
                  Showing {filters.divisions.length} of {data.divisionMetrics.length} divisions
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={() => router.push('/analytics/divisions')}>
                <BarChart3 className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayData.divisionMetrics.map((division) => (
              <DivisionMetricCard
                key={division.id}
                division={division}
                onClick={() => handleDivisionClick(division)}
              />
            ))}
          </div>
        </section>

        {/* Performance Insights */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Performance Insights</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopPerformersWidget performers={displayData.topPerformers} />
            
            {/* Real-time Activity Feed */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Live Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {realtimeUpdates.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-muted-foreground text-sm">
                      No recent activity
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {realtimeUpdates.slice(0, 5).map((update, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <div className="flex-1">
                          <span className="font-medium">
                            {update.type === 'metric_update' ? 'Metrics updated' :
                             update.type === 'new_conversion' ? 'New conversion' :
                             update.type === 'revenue_change' ? 'Revenue change' :
                             update.type === 'user_activity' ? 'User activity' :
                             'Data updated'}
                          </span>
                          {update.division && (
                            <span className="text-muted-foreground ml-2">
                              for {update.division}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(update.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 pt-8 pb-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>
              Cipher Intelligence Analytics Dashboard • Real-time data • Last updated: {new Date().toLocaleString()}
            </div>
            <div className="flex items-center gap-4">
              <span>Total Records: {displayData.divisionMetrics.length} divisions</span>
              <Separator orientation="vertical" className="h-4" />
              <span>Data Range: Q1 2024</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
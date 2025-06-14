// src/types/analytics.ts
// Comprehensive type definitions for cross-division analytics dashboard data structures

export interface DivisionMetrics {
    id: string;
    name: string;
    slug: string;
    revenue: number;
    growthRate: number;
    projectCount: number;
    customerCount: number;
    conversionRate: number;
    productsSold?: number; // For Products division
    period: 'month' | 'quarter' | 'year';
    color: string;
    accentColor: string;
    category: 'consulting' | 'products' | 'services';
  }
  
  export interface ConversionFunnelStep {
    stage: string;
    visitors: number;
    conversionRate: number;
    division?: string;
    value: number; // Revenue generated at this stage
  }
  
  export interface RevenueDataPoint {
    date: string;
    division: string;
    revenue: number;
    projects: number;
    customers: number;
    products?: number; // For tracking product sales
  }
  
  export interface ProductMetrics {
    id: string;
    name: string;
    category: string;
    division: string;
    revenue: number;
    units: number;
    conversionRate: number;
    avgPrice: number;
    trials: number;
  }
  
  export interface AnalyticsFilters {
    dateRange: {
      start: Date;
      end: Date;
    };
    divisions: string[];
    metric: 'revenue' | 'growth' | 'projects' | 'customers' | 'products';
    period: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  }
  
  export interface DashboardData {
    totalRevenue: number;
    totalGrowth: number;
    totalProjects: number;
    totalCustomers: number;
    totalProductsSold: number;
    divisionMetrics: DivisionMetrics[];
    conversionFunnel: ConversionFunnelStep[];
    revenueTimeline: RevenueDataPoint[];
    topPerformers: DivisionMetrics[];
    productMetrics: ProductMetrics[];
    crossDivisionReferrals: number;
  }
  
  export interface ChartConfig {
    [key: string]: {
      label: string;
      color: string;
    };
  }
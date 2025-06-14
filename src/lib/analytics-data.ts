// src/lib/analytics-data.ts
// Mock data service with realistic analytics data matching Cipher Intelligence's division structure

import { DivisionMetrics, ConversionFunnelStep, RevenueDataPoint, DashboardData, ProductMetrics } from '@/types/analytics';

export const divisionConfig = {
  'cipher-intelligence': { 
    bg: '#1a1b2e', 
    accent: '#FFD700',
    category: 'consulting' as const
  },
  'cipher-strategy': { 
    bg: '#073C32', 
    accent: '#00FFE7',
    category: 'consulting' as const
  },
  'cipher-digitalworks': { 
    bg: '#088B8B', 
    accent: '#2FE4FF',
    category: 'services' as const
  },
  'cipher-labs': { 
    bg: '#00BFFF', 
    accent: '#64FFDA',
    category: 'consulting' as const
  },
  'cipher-studio': { 
    bg: '#4B5665', 
    accent: '#C0C0C0',
    category: 'services' as const
  },
  'cipher-ai': { 
    bg: '#222328', 
    accent: '#FF6B35',
    category: 'products' as const
  },
  'cipher-products': {
    bg: '#2a1b3d',
    accent: '#8b5cf6',
    category: 'products' as const
  }
};

export const mockDivisionMetrics: DivisionMetrics[] = [
  {
    id: '1',
    name: 'Cipher Strategy',
    slug: 'cipher-strategy',
    revenue: 1200000,
    growthRate: 23,
    projectCount: 45,
    customerCount: 28,
    conversionRate: 4.2,
    period: 'quarter',
    color: divisionConfig['cipher-strategy'].bg,
    accentColor: divisionConfig['cipher-strategy'].accent,
    category: divisionConfig['cipher-strategy'].category
  },
  {
    id: '2',
    name: 'Cipher DigitalWorks',
    slug: 'cipher-digitalworks',
    revenue: 890000,
    growthRate: 67,
    projectCount: 156,
    customerCount: 89,
    conversionRate: 3.8,
    period: 'quarter',
    color: divisionConfig['cipher-digitalworks'].bg,
    accentColor: divisionConfig['cipher-digitalworks'].accent,
    category: divisionConfig['cipher-digitalworks'].category
  },
  {
    id: '3',
    name: 'Cipher Labs',
    slug: 'cipher-labs',
    revenue: 2100000,
    growthRate: 145,
    projectCount: 23,
    customerCount: 12,
    conversionRate: 5.6,
    period: 'quarter',
    color: divisionConfig['cipher-labs'].bg,
    accentColor: divisionConfig['cipher-labs'].accent,
    category: divisionConfig['cipher-labs'].category
  },
  {
    id: '4',
    name: 'Cipher Studio',
    slug: 'cipher-studio',
    revenue: 670000,
    growthRate: 34,
    projectCount: 78,
    customerCount: 45,
    conversionRate: 3.2,
    period: 'quarter',
    color: divisionConfig['cipher-studio'].bg,
    accentColor: divisionConfig['cipher-studio'].accent,
    category: divisionConfig['cipher-studio'].category
  },
  {
    id: '5',
    name: 'Cipher AI',
    slug: 'cipher-ai',
    revenue: 3200000,
    growthRate: 189,
    projectCount: 34,
    customerCount: 18,
    conversionRate: 7.1,
    period: 'quarter',
    color: divisionConfig['cipher-ai'].bg,
    accentColor: divisionConfig['cipher-ai'].accent,
    category: divisionConfig['cipher-ai'].category
  },
  {
    id: '6',
    name: 'Cipher Intelligence',
    slug: 'cipher-intelligence',
    revenue: 1500000,
    growthRate: 45,
    projectCount: 67,
    customerCount: 34,
    conversionRate: 4.8,
    period: 'quarter',
    color: divisionConfig['cipher-intelligence'].bg,
    accentColor: divisionConfig['cipher-intelligence'].accent,
    category: divisionConfig['cipher-intelligence'].category
  },
  {
    id: '7',
    name: 'Cipher Products',
    slug: 'cipher-products',
    revenue: 2800000,
    growthRate: 234,
    projectCount: 0,
    customerCount: 1567,
    productsSold: 4523,
    conversionRate: 12.4,
    period: 'quarter',
    color: divisionConfig['cipher-products'].bg,
    accentColor: divisionConfig['cipher-products'].accent,
    category: divisionConfig['cipher-products'].category
  }
];

export const mockProductMetrics: ProductMetrics[] = [
  {
    id: '1',
    name: 'AI Chatbot Platform',
    category: 'SaaS',
    division: 'cipher-ai',
    revenue: 450000,
    units: 1890,
    conversionRate: 15.2,
    avgPrice: 238,
    trials: 12456
  },
  {
    id: '2',
    name: 'SaaS Starter Kit',
    category: 'Template',
    division: 'cipher-studio',
    revenue: 89000,
    units: 445,
    conversionRate: 8.9,
    avgPrice: 200,
    trials: 5003
  },
  {
    id: '3',
    name: 'Analytics Dashboard Pro',
    category: 'SaaS',
    division: 'cipher-digitalworks',
    revenue: 320000,
    units: 890,
    conversionRate: 11.3,
    avgPrice: 359,
    trials: 7876
  }
];

export const mockConversionFunnel: ConversionFunnelStep[] = [
  { stage: 'Awareness', visitors: 45000, conversionRate: 100, value: 0 },
  { stage: 'Interest', visitors: 12000, conversionRate: 26.7, value: 0 },
  { stage: 'Consideration', visitors: 3400, conversionRate: 28.3, value: 450000 },
  { stage: 'Purchase', visitors: 890, conversionRate: 26.2, value: 12460000 }
];

export const mockRevenueTimeline: RevenueDataPoint[] = [
  { date: '2024-01', division: 'cipher-strategy', revenue: 980000, projects: 38, customers: 22 },
  { date: '2024-02', division: 'cipher-strategy', revenue: 1100000, projects: 42, customers: 25 },
  { date: '2024-03', division: 'cipher-strategy', revenue: 1200000, projects: 45, customers: 28 },
  { date: '2024-01', division: 'cipher-digitalworks', revenue: 650000, projects: 134, customers: 76 },
  { date: '2024-02', division: 'cipher-digitalworks', revenue: 750000, projects: 145, customers: 82 },
  { date: '2024-03', division: 'cipher-digitalworks', revenue: 890000, projects: 156, customers: 89 },
  { date: '2024-01', division: 'cipher-labs', revenue: 1800000, projects: 19, customers: 9 },
  { date: '2024-02', division: 'cipher-labs', revenue: 1950000, projects: 21, customers: 11 },
  { date: '2024-03', division: 'cipher-labs', revenue: 2100000, projects: 23, customers: 12 },
  { date: '2024-01', division: 'cipher-ai', revenue: 2800000, projects: 29, customers: 14 },
  { date: '2024-02', division: 'cipher-ai', revenue: 3000000, projects: 31, customers: 16 },
  { date: '2024-03', division: 'cipher-ai', revenue: 3200000, projects: 34, customers: 18 },
  { date: '2024-01', division: 'cipher-products', revenue: 2200000, projects: 0, customers: 1234, products: 3890 },
  { date: '2024-02', division: 'cipher-products', revenue: 2500000, projects: 0, customers: 1401, products: 4206 },
  { date: '2024-03', division: 'cipher-products', revenue: 2800000, projects: 0, customers: 1567, products: 4523 }
];

// Purpose: Simulate API call to fetch comprehensive dashboard analytics data
export async function getDashboardData(): Promise<DashboardData> {
  // Simulate realistic API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const totalRevenue = mockDivisionMetrics.reduce((sum, div) => sum + div.revenue, 0);
  const avgGrowth = Math.round(mockDivisionMetrics.reduce((sum, div) => sum + div.growthRate, 0) / mockDivisionMetrics.length);
  const totalProjects = mockDivisionMetrics.reduce((sum, div) => sum + div.projectCount, 0);
  const totalCustomers = mockDivisionMetrics.reduce((sum, div) => sum + div.customerCount, 0);
  const totalProductsSold = mockDivisionMetrics.reduce((sum, div) => sum + (div.productsSold || 0), 0);
  
  return {
    totalRevenue,
    totalGrowth: avgGrowth,
    totalProjects,
    totalCustomers,
    totalProductsSold,
    divisionMetrics: mockDivisionMetrics,
    conversionFunnel: mockConversionFunnel,
    revenueTimeline: mockRevenueTimeline,
    topPerformers: mockDivisionMetrics
      .sort((a, b) => b.growthRate - a.growthRate)
      .slice(0, 3),
    productMetrics: mockProductMetrics,
    crossDivisionReferrals: 156 // 25% of total projects span multiple divisions
  };
}
// src/app/analytics/divisions/[slug]/page.tsx
// Deep-dive analytics page for individual division performance with granular metrics and insights

"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Download, Share2, TrendingUp, Users, Briefcase, Target, Calendar } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DivisionMetrics } from '@/types/analytics';
import { divisionConfig } from '@/lib/analytics-data';

interface DivisionAnalyticsData {
  division: DivisionMetrics;
  monthlyRevenue: Array<{ month: string; revenue: number; target: number; }>;
  customerGrowth: Array<{ month: string; customers: number; churn: number; }>;
  projectBreakdown: Array<{ category: string; count: number; revenue: number; }>;
  performanceMetrics: {
    clientSatisfaction: number;
    projectDeliveryTime: number;
    profitMargin: number;
    teamUtilization: number;
  };
  competitorComparison: Array<{ metric: string; cipher: number; industry: number; }>;
  topClients: Array<{ name: string; revenue: number; projects: number; }>;
}

// Purpose: Provide comprehensive division-specific analytics with detailed performance insights and strategic recommendations
export default function DivisionAnalyticsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [data, setData] = useState<DivisionAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('12m');

  const divisionData = divisionConfig[slug as keyof typeof divisionConfig];

  useEffect(() => {
    loadDivisionAnalytics();
  }, [slug, timeRange]);

  const loadDivisionAnalytics = async () => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual Supabase query
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data based on division type
      const mockData: DivisionAnalyticsData = {
        division: {
          id: '1',
          name: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          slug,
          revenue: Math.floor(Math.random() * 3000000) + 500000,
          growthRate: Math.floor(Math.random() * 200) + 20,
          projectCount: Math.floor(Math.random() * 150) + 10,
          customerCount: Math.floor(Math.random() * 100) + 5,
          conversionRate: Math.random() * 10 + 2,
          period: 'quarter',
          color: divisionData?.bg || '#1a1b2e',
          accentColor: divisionData?.accent || '#3b82f6',
          category: divisionData?.category || 'consulting'
        },
        monthlyRevenue: Array.from({ length: 12 }, (_, i) => ({
          month: new Date(2024, i, 1).toLocaleDateString('en-US', { month: 'short' }),
          revenue: Math.floor(Math.random() * 500000) + 200000,
          target: Math.floor(Math.random() * 400000) + 300000
        })),
        customerGrowth: Array.from({ length: 12 }, (_, i) => ({
          month: new Date(2024, i, 1).toLocaleDateString('en-US', { month: 'short' }),
          customers: Math.floor(Math.random() * 20) + 10 + i * 2,
          churn: Math.floor(Math.random() * 3) + 1
        })),
        projectBreakdown: [
          { category: 'Enterprise', count: 15, revenue: 1200000 },
          { category: 'SMB', count: 45, revenue: 800000 },
          { category: 'Startup', count: 23, revenue: 300000 }
        ],
        performanceMetrics: {
          clientSatisfaction: 94,
          projectDeliveryTime: 87,
          profitMargin: 68,
          teamUtilization: 82
        },
        competitorComparison: [
          { metric: 'Growth Rate', cipher: 145, industry: 89 },
          { metric: 'Client Retention', cipher: 94, industry: 78 },
          { metric: 'Project Success', cipher: 96, industry: 82 },
          { metric: 'Innovation Index', cipher: 92, industry: 71 }
        ],
        topClients: [
          { name: 'TechCorp Enterprise', revenue: 450000, projects: 3 },
          { name: 'Global Solutions Inc', revenue: 320000, projects: 5 },
          { name: 'Innovation Labs', revenue: 280000, projects: 2 }
        ]
      };
      
      setData(mockData);
    } catch (error) {
      console.error('Failed to load division analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  };

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

  if (!divisionData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Division Not Found</h2>
            <p className="text-muted-foreground mb-4">The division "{slug}" does not exist.</p>
            <Button onClick={() => router.push('/analytics')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Skeleton className="h-16 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
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
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Error Loading Data</h2>
            <p className="text-muted-foreground mb-4">Unable to load analytics for this division.</p>
            <Button onClick={loadDivisionAnalytics}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => router.push('/analytics')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 
                  className="text-2xl font-bold"
                  style={{ color: divisionData.accent }}
                >
                  {data.division.name}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge 
                    variant="secondary"
                    style={{ 
                      backgroundColor: `${divisionData.accent}20`,
                      color: divisionData.accent,
                      borderColor: `${divisionData.accent}40`
                    }}
                  >
                    {data.division.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Calendar className="h-3 w-3 mr-1" />
                    Q1 2024
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Key Metrics Overview */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card/50 backdrop-blur-md">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${divisionData.accent}20` }}
                  >
                    <TrendingUp className="h-5 w-5" style={{ color: divisionData.accent }} />
                  </div>
                  <span className="text-sm text-muted-foreground">Revenue</span>
                </div>
                <div className="text-2xl font-bold">{formatCurrency(data.division.revenue)}</div>
                <div className="flex items-center gap-1 text-green-400 text-sm">
                  <TrendingUp className="h-3 w-3" />
                  +{data.division.growthRate}%
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-md">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Users className="h-5 w-5 text-blue-400" />
                  </div>
                  <span className="text-sm text-muted-foreground">Customers</span>
                </div>
                <div className="text-2xl font-bold">{data.division.customerCount}</div>
                <div className="text-sm text-muted-foreground">Active clients</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-md">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <Briefcase className="h-5 w-5 text-green-400" />
                  </div>
                  <span className="text-sm text-muted-foreground">Projects</span>
                </div>
                <div className="text-2xl font-bold">{data.division.projectCount}</div>
                <div className="text-sm text-muted-foreground">This quarter</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-md">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <Target className="h-5 w-5 text-purple-400" />
                  </div>
                  <span className="text-sm text-muted-foreground">Conversion</span>
                </div>
                <div className="text-2xl font-bold">{data.division.conversionRate.toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Lead to client</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Revenue & Growth Charts */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Revenue Performance</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue vs Target</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" className="text-muted-foreground" />
                      <YAxis tickFormatter={(value) => formatCurrency(value)} className="text-muted-foreground" />
                      <Tooltip 
                        formatter={(value: number) => [formatCurrency(value), '']}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="target"
                        stackId="1"
                        stroke="#6b7280"
                        fill="#6b728020"
                        name="Target"
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stackId="2"
                        stroke={divisionData.accent}
                        fill={`${divisionData.accent}40`}
                        name="Actual Revenue"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Growth & Churn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.customerGrowth}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" className="text-muted-foreground" />
                      <YAxis className="text-muted-foreground" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="customers"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                        name="New Customers"
                      />
                      <Line
                        type="monotone"
                        dataKey="churn"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
                        name="Churn"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Project Analysis & Performance */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Project & Performance Analysis</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Project Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Project Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.projectBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="count"
                      >
                        {data.projectBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number, name) => [`${value} projects`, name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                  {data.projectBreakdown.map((item, index) => (
                    <div key={item.category} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span>{item.category}</span>
                      </div>
                      <span className="font-medium">{formatCurrency(item.revenue)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  {Object.entries(data.performanceMetrics).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="font-medium">{value}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full transition-all duration-1000 rounded-full"
                          style={{ 
                            width: `${value}%`,
                            backgroundColor: value >= 80 ? '#10b981' : value >= 60 ? '#f59e0b' : '#ef4444'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Competitive Analysis & Top Clients */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Market Position & Key Relationships</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>vs Industry Average</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.competitorComparison} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis type="number" className="text-muted-foreground" />
                      <YAxis dataKey="metric" type="category" className="text-muted-foreground" width={100} />
                      <Tooltip 
                        formatter={(value: number) => [`${value}%`, '']}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="industry" fill="#6b7280" name="Industry Avg" />
                      <Bar dataKey="cipher" fill={divisionData.accent} name="Cipher" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.topClients.map((client, index) => (
                    <div 
                      key={client.name}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {client.projects} projects completed
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatCurrency(client.revenue)}</div>
                        <div className="text-xs text-muted-foreground">revenue</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
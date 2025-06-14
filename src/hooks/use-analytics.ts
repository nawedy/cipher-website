// src/hooks/use-analytics.ts
// Custom React hooks for analytics data fetching with caching and real-time updates

import { useState, useEffect, useCallback } from 'react';
import { DashboardData, AnalyticsFilters } from '@/types/analytics';

interface UseAnalyticsOptions {
  autoRefresh?: boolean;
  refreshInterval?: number;
  filters?: Partial<AnalyticsFilters>;
}

interface UseAnalyticsReturn {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  updateFilters: (filters: Partial<AnalyticsFilters>) => void;
}

// Purpose: Manage analytics data state with automatic refresh and filtering capabilities
export function useAnalytics(options: UseAnalyticsOptions = {}): UseAnalyticsReturn {
  const { 
    autoRefresh = false, 
    refreshInterval = 300000, // 5 minutes
    filters: initialFilters = {}
  } = options;

  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Partial<AnalyticsFilters>>(initialFilters);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const searchParams = new URLSearchParams();
      
      if (filters.dateRange?.start) {
        searchParams.append('start_date', filters.dateRange.start.toISOString().split('T')[0]);
      }
      if (filters.dateRange?.end) {
        searchParams.append('end_date', filters.dateRange.end.toISOString().split('T')[0]);
      }
      if (filters.divisions?.length) {
        searchParams.append('divisions', filters.divisions.join(','));
      }
      if (filters.metric) {
        searchParams.append('metric', filters.metric);
      }

      const response = await fetch(`/api/analytics?${searchParams.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const analyticsData = await response.json();
      setData(analyticsData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch analytics data';
      setError(errorMessage);
      console.error('Analytics fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const updateFilters = useCallback((newFilters: Partial<AnalyticsFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const refresh = useCallback(async () => {
    await fetchAnalytics();
  }, [fetchAnalytics]);

  // Initial data fetch
  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  // Auto-refresh setup
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchAnalytics();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchAnalytics]);

  return {
    data,
    loading,
    error,
    refresh,
    updateFilters
  };
}

// Purpose: Specialized hook for division-specific analytics with performance optimizations
export function useDivisionAnalytics(divisionSlug: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDivisionData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/analytics/divisions/${divisionSlug}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const divisionData = await response.json();
      setData(divisionData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch division data';
      setError(errorMessage);
      console.error('Division analytics fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [divisionSlug]);

  useEffect(() => {
    if (divisionSlug) {
      fetchDivisionData();
    }
  }, [fetchDivisionData, divisionSlug]);

  return {
    data,
    loading,
    error,
    refresh: fetchDivisionData
  };
}

// Purpose: Real-time metrics hook with WebSocket integration for live updates
export function useRealTimeMetrics() {
  const [metrics, setMetrics] = useState<any>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // WebSocket connection for real-time updates
    // Implementation would depend on your WebSocket setup
    const connectWebSocket = () => {
      try {
        const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001');
        
        ws.onopen = () => {
          setConnected(true);
          console.log('WebSocket connected for real-time metrics');
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'metrics_update') {
              setMetrics(data.payload);
            }
          } catch (err) {
            console.error('WebSocket message parse error:', err);
          }
        };

        ws.onclose = () => {
          setConnected(false);
          console.log('WebSocket disconnected');
          // Attempt to reconnect after 5 seconds
          setTimeout(connectWebSocket, 5000);
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          setConnected(false);
        };

        return ws;
      } catch (err) {
        console.error('WebSocket connection error:', err);
        return null;
      }
    };

    const ws = connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return {
    metrics,
    connected
  };
}
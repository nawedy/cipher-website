// src/components/analytics/realtime-indicator.tsx
// Visual indicator for real-time connection status with live update notifications

"use client";

import { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Wifi, WifiOff, Activity, AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';
import { realtimeAnalytics, RealtimeUpdate, ConnectionState } from '@/lib/realtime-analytics';
import { cn } from '@/lib/utils';

interface RealtimeIndicatorProps {
  showDetails?: boolean;
  className?: string;
}

// Purpose: Provide visual feedback for real-time connection status and recent updates with interactive details
export function RealtimeIndicator({ showDetails = false, className }: RealtimeIndicatorProps) {
  const [connectionState, setConnectionState] = useState<ConnectionState>({
    connected: false,
    reconnecting: false,
    lastUpdate: null,
    connectionCount: 0
  });
  const [recentUpdates, setRecentUpdates] = useState<RealtimeUpdate[]>([]);
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    // Subscribe to connection changes
    const unsubscribeConnection = realtimeAnalytics.onConnectionChange((state) => {
      setConnectionState(state);
    });

    // Subscribe to real-time updates
    const unsubscribeUpdates = realtimeAnalytics.onUpdate((update) => {
      setRecentUpdates(prev => {
        const newUpdates = [update, ...prev].slice(0, 10); // Keep last 10 updates
        return newUpdates;
      });
      setUpdateCount(prev => prev + 1);
    });

    // Initialize connection
    realtimeAnalytics.subscribeToMetrics();

    return () => {
      unsubscribeConnection();
      unsubscribeUpdates();
    };
  }, []);

  const getStatusIcon = () => {
    if (connectionState.reconnecting) {
      return <Activity className="h-3 w-3 animate-pulse" />;
    }
    if (connectionState.connected) {
      return <Wifi className="h-3 w-3" />;
    }
    return <WifiOff className="h-3 w-3" />;
  };

  const getStatusColor = () => {
    if (connectionState.reconnecting) return 'text-yellow-500';
    if (connectionState.connected) return 'text-green-500';
    return 'text-red-500';
  };

  const getStatusText = () => {
    if (connectionState.reconnecting) return 'Reconnecting...';
    if (connectionState.connected) return 'Live';
    return 'Offline';
  };

  const formatUpdateTime = (timestamp: Date | string) => {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getUpdateIcon = (type: RealtimeUpdate['type']) => {
    switch (type) {
      case 'metric_update':
        return <Activity className="h-3 w-3 text-blue-500" />;
      case 'revenue_change':
        return <Zap className="h-3 w-3 text-green-500" />;
      case 'new_conversion':
        return <CheckCircle className="h-3 w-3 text-purple-500" />;
      case 'user_activity':
        return <AlertCircle className="h-3 w-3 text-orange-500" />;
      default:
        return <Clock className="h-3 w-3 text-gray-500" />;
    }
  };

  const getUpdateDescription = (update: RealtimeUpdate) => {
    switch (update.type) {
      case 'metric_update':
        return `Division metrics updated for ${update.division || 'unknown'}`;
      case 'revenue_change':
        return `Revenue data refreshed`;
      case 'new_conversion':
        return `New conversion in ${update.division}`;
      case 'user_activity':
        return `User activity in ${update.division}`;
      default:
        return 'Data updated';
    }
  };

  if (!showDetails) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm"
            className={cn("h-8 px-2 gap-2", className)}
          >
            <div className={getStatusColor()}>
              {getStatusIcon()}
            </div>
            <span className="text-xs font-medium">{getStatusText()}</span>
            {updateCount > 0 && (
              <Badge variant="secondary" className="h-4 px-1 text-xs">
                {updateCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Real-time Status</h4>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className={getStatusColor()}>
                    {getStatusIcon()}
                  </div>
                  <span>{getStatusText()}</span>
                </div>
                <span className="text-muted-foreground">
                  {connectionState.connectionCount} sessions
                </span>
              </div>
              {connectionState.lastUpdate && (
                <p className="text-xs text-muted-foreground mt-1">
                  Last update: {formatUpdateTime(connectionState.lastUpdate)}
                </p>
              )}
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-2">Recent Updates</h4>
              {recentUpdates.length === 0 ? (
                <p className="text-sm text-muted-foreground">No recent updates</p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {recentUpdates.map((update, index) => (
                    <div key={`${update.timestamp}-${index}`} className="flex items-start gap-2 text-sm">
                      {getUpdateIcon(update.type)}
                      <div className="flex-1">
                        <p className="text-foreground">{getUpdateDescription(update)}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatUpdateTime(update.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={getStatusColor()}>
              {getStatusIcon()}
            </div>
            <h3 className="font-semibold">Real-time Analytics</h3>
          </div>
          <Badge 
            variant={connectionState.connected ? "default" : "destructive"}
            className="text-xs"
          >
            {getStatusText()}
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div>
            <div className="text-lg font-bold text-foreground">
              {connectionState.connectionCount}
            </div>
            <div className="text-xs text-muted-foreground">Sessions</div>
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">
              {recentUpdates.length}
            </div>
            <div className="text-xs text-muted-foreground">Updates</div>
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">
              {connectionState.lastUpdate 
                ? formatUpdateTime(connectionState.lastUpdate)
                : 'Never'
              }
            </div>
            <div className="text-xs text-muted-foreground">Last Update</div>
          </div>
        </div>

        <Separator className="mb-4" />

        <div>
          <h4 className="font-medium mb-2">Live Activity Feed</h4>
          {recentUpdates.length === 0 ? (
            <div className="text-center py-4">
              <Activity className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Waiting for live updates...
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {recentUpdates.map((update, index) => (
                <div 
                  key={`${update.timestamp}-${index}`}
                  className="flex items-start gap-3 p-2 bg-muted/30 rounded-lg"
                >
                  {getUpdateIcon(update.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {getUpdateDescription(update)}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-muted-foreground">
                        {update.division && (
                          <Badge variant="outline" className="text-xs mr-2">
                            {update.division}
                          </Badge>
                        )}
                        {formatUpdateTime(update.timestamp)}
                      </p>
                      {update.type === 'user_activity' && (
                        <Badge 
                          variant="secondary"
                          className="text-xs"
                        >
                          Activity
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
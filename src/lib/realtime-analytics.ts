// src/lib/realtime-analytics.ts
// Real-time analytics system for live dashboard updates - migrated from Supabase to NeonDB

export interface RealtimeUpdate {
  id: string;
  type: 'metric_update' | 'new_conversion' | 'revenue_change' | 'user_activity';
  division: string;
  timestamp: Date;
  data: {
    old?: any;
    new?: any;
    change?: number;
    percentage?: number;
  };
  message: string;
}

export interface ConnectionState {
  connected: boolean;
  reconnecting: boolean;
  lastUpdate: Date | null;
  connectionCount: number;
}

export interface AnalyticsSubscription {
  id: string;
  division: string;
  metrics: string[];
  callback: (update: RealtimeUpdate) => void;
}

class RealtimeAnalytics {
  private subscriptions: Map<string, AnalyticsSubscription> = new Map();
  private updateCallbacks: ((update: RealtimeUpdate) => void)[] = [];
  private connectionCallbacks: ((state: ConnectionState) => void)[] = [];
  private connected: boolean = false;
  private simulationInterval: NodeJS.Timeout | null = null;
  private connectionState: ConnectionState = {
    connected: false,
    reconnecting: false,
    lastUpdate: null,
    connectionCount: 0
  };

  constructor() {
    this.initializeSimulation();
  }

  // Purpose: Initialize simulation for development/demo purposes
  private initializeSimulation() {
    console.log('🔄 Initializing analytics simulation (NeonDB migration in progress)');
    this.connected = true;
    this.connectionState = {
      connected: true,
      reconnecting: false,
      lastUpdate: new Date(),
      connectionCount: 1
    };
    this.notifyConnectionChange();
    this.startSimulation();
  }

  // Purpose: Start simulation of real-time updates for demo purposes
  private startSimulation() {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
    }

    this.simulationInterval = setInterval(() => {
      this.generateSimulatedUpdate();
    }, 10000); // Generate update every 10 seconds
  }

  // Purpose: Generate simulated real-time updates
  private generateSimulatedUpdate() {
    const divisions = ['ai', 'digitalworks', 'labs', 'products', 'strategy', 'studio'];
    const updateTypes: RealtimeUpdate['type'][] = ['metric_update', 'new_conversion', 'revenue_change', 'user_activity'];
    
    const randomDivision = divisions[Math.floor(Math.random() * divisions.length)];
    const randomType = updateTypes[Math.floor(Math.random() * updateTypes.length)];
    
    const update: RealtimeUpdate = {
      id: `sim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: randomType,
      division: randomDivision,
      timestamp: new Date(),
      data: this.generateSimulatedData(randomType),
      message: this.generateUpdateMessage(randomType, randomDivision)
    };

    this.connectionState.lastUpdate = new Date();
    this.notifyConnectionChange();
    this.notifySubscribers(update);
  }

  // Purpose: Generate simulated data based on update type
  private generateSimulatedData(type: RealtimeUpdate['type']) {
    switch (type) {
      case 'metric_update':
        return {
          new: {
            revenue: Math.floor(Math.random() * 50000) + 10000,
            growth_rate: Math.floor(Math.random() * 30) + 5,
            conversion_rate: Math.floor(Math.random() * 15) + 2
          }
        };
      case 'revenue_change':
        const change = Math.floor(Math.random() * 5000) + 500;
        return {
          change,
          percentage: Math.floor(Math.random() * 20) + 5
        };
      case 'new_conversion':
        return {
          new: {
            customer_id: `cust_${Math.random().toString(36).substr(2, 9)}`,
            value: Math.floor(Math.random() * 2000) + 100
          }
        };
      default:
        return {};
    }
  }

  // Purpose: Generate human-readable update messages
  private generateUpdateMessage(type: RealtimeUpdate['type'], division: string): string {
    const divisionNames: Record<string, string> = {
      ai: 'AI Division',
      digitalworks: 'Digital Works',
      labs: 'Labs',
      products: 'Products',
      strategy: 'Strategy',
      studio: 'Studio'
    };

    const divisionName = divisionNames[division] || division;

    switch (type) {
      case 'metric_update':
        return `${divisionName} metrics updated`;
      case 'revenue_change':
        return `Revenue increase in ${divisionName}`;
      case 'new_conversion':
        return `New conversion in ${divisionName}`;
      case 'user_activity':
        return `Increased activity in ${divisionName}`;
      default:
        return `Update in ${divisionName}`;
    }
  }

  // Purpose: Subscribe to real-time metric updates for all divisions
  subscribeToMetrics(): string {
    const subscriptionId = `metrics_${Date.now()}`;
    console.log('📊 Subscribed to metrics updates (simulation mode)');
    return subscriptionId;
  }

  // Purpose: Subscribe to specific division updates
  subscribeToDivision(
    division: string, 
    metrics: string[] = ['revenue', 'conversions', 'growth'],
    callback?: (update: RealtimeUpdate) => void
  ): string {
    const subscriptionId = `${division}_${Date.now()}`;
    
    const subscription: AnalyticsSubscription = {
      id: subscriptionId,
      division,
      metrics,
      callback: callback || (() => {})
    };

    this.subscriptions.set(subscriptionId, subscription);
    console.log(`📈 Subscribed to ${division} division updates (simulation mode)`);
    
    return subscriptionId;
  }

  // Purpose: Register callback for all real-time updates
  onUpdate(callback: (update: RealtimeUpdate) => void): () => void {
    this.updateCallbacks.push(callback);
    
    return () => {
      const index = this.updateCallbacks.indexOf(callback);
      if (index > -1) {
        this.updateCallbacks.splice(index, 1);
      }
    };
  }

  // Purpose: Register callback for connection state changes
  onConnectionChange(callback: (state: ConnectionState) => void): () => void {
    this.connectionCallbacks.push(callback);
    
    // Immediately call with current state
    callback(this.connectionState);
    
    return () => {
      const index = this.connectionCallbacks.indexOf(callback);
      if (index > -1) {
        this.connectionCallbacks.splice(index, 1);
      }
    };
  }

  // Purpose: Notify all subscribers of connection state changes
  private notifyConnectionChange() {
    this.connectionCallbacks.forEach(callback => {
      try {
        callback(this.connectionState);
      } catch (error) {
        console.error('Error in connection callback:', error);
      }
    });
  }

  // Purpose: Notify all subscribers of updates
  private notifySubscribers(update: RealtimeUpdate) {
    // Notify general update callbacks
    this.updateCallbacks.forEach(callback => {
      try {
        callback(update);
      } catch (error) {
        console.error('Error in update callback:', error);
      }
    });

    // Notify specific division subscribers
    this.subscriptions.forEach(subscription => {
      if (subscription.division === update.division) {
        try {
          subscription.callback(update);
        } catch (error) {
          console.error('Error in subscription callback:', error);
        }
      }
    });
  }

  // Purpose: Unsubscribe from specific subscription
  unsubscribe(subscriptionId: string): void {
    this.subscriptions.delete(subscriptionId);
    console.log(`🔌 Unsubscribed from ${subscriptionId}`);
  }

  // Purpose: Unsubscribe from division updates
  unsubscribeFromDivision(subscriptionId: string): void {
    this.unsubscribe(subscriptionId);
  }

  // Purpose: Disconnect from real-time updates
  disconnect(): void {
    console.log('🔌 Disconnecting from real-time analytics');
    this.connected = false;
    this.connectionState.connected = false;
    this.notifyConnectionChange();
    
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = null;
    }
    
    this.subscriptions.clear();
    this.updateCallbacks = [];
    this.connectionCallbacks = [];
  }

  // Purpose: Check connection status
  isConnected(): boolean {
    return this.connected;
  }

  // Purpose: Get current subscription count
  getSubscriptionCount(): number {
    return this.subscriptions.size;
  }

  // Purpose: Get current connection state
  getConnectionState(): ConnectionState {
    return { ...this.connectionState };
  }
}

// Export singleton instance
export const realtimeAnalytics = new RealtimeAnalytics(); 
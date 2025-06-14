// src/lib/analytics.ts
// Analytics tracking using NeonDB

import { executeCommand } from '@/lib/neon/client';
import type { AnalyticsEventInsert } from '@/types/database';

// Analytics event types
export type AnalyticsEventType = 
  | 'page_view'
  | 'button_click'
  | 'form_submission'
  | 'download'
  | 'video_play'
  | 'purchase'
  | 'sign_up'
  | 'lead_generated'
  | 'booking_created'
  | 'email_sent'
  | 'engagement'
  | 'error'
  | 'conversion'
  | 'custom';

// Event properties interface
export interface EventProperties {
  [key: string]: string | number | boolean | null;
}

// Analytics configuration
export interface AnalyticsConfig {
  enabled: boolean;
  debug: boolean;
  anonymizeIp: boolean;
  trackPageViews: boolean;
}

// Default configuration
const defaultConfig: AnalyticsConfig = {
  enabled: process.env.NODE_ENV === 'production',
  debug: process.env.NODE_ENV === 'development',
  anonymizeIp: true,
  trackPageViews: true,
};

let config = { ...defaultConfig };

// Initialize analytics
export function initAnalytics(customConfig?: Partial<AnalyticsConfig>) {
  config = { ...defaultConfig, ...customConfig };
  
  if (config.debug) {
    console.log('Analytics initialized with config:', config);
  }
}

// Generate a unique session ID
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Get or create session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return generateSessionId();
  
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
}

// Get user ID from localStorage if available
function getUserId(): string | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      const user = JSON.parse(userData);
      return user.id || null;
    }
  } catch (error) {
    console.error('Error getting user ID:', error);
  }
  return null;
}

// Main tracking function
export async function trackEvent(
  eventType: string,
  properties?: Record<string, any>,
  division?: string
): Promise<void> {
  if (!config.enabled) {
    if (config.debug) {
      console.log('Analytics tracking skipped:', { eventType, properties, division });
    }
    return;
  }

  try {
    const eventData: AnalyticsEventInsert = {
      event_type: eventType,
      user_id: getUserId(),
      session_id: getSessionId(),
      properties: properties || {},
      division: division || null,
      created_at: new Date().toISOString()
    };

    await executeCommand(
      `INSERT INTO analytics_events (event_type, user_id, session_id, properties, division, created_at)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        eventData.event_type,
        eventData.user_id,
        eventData.session_id,
        JSON.stringify(eventData.properties),
        eventData.division,
        eventData.created_at
      ]
    );

    if (config.debug) {
      console.log('Event tracked:', eventData);
    }
  } catch (error) {
    console.error('Error tracking event:', error);
  }
}

// Track page views
export async function trackPageView(
  page: string,
  title?: string,
  division?: string
): Promise<void> {
  await trackEvent('page_view', {
    page,
    title: title || (typeof document !== 'undefined' ? document.title : ''),
    referrer: typeof window !== 'undefined' ? document.referrer : null,
    user_agent: typeof window !== 'undefined' ? navigator.userAgent : null,
    timestamp: new Date().toISOString()
  }, division);
}

// Track button clicks
export async function trackButtonClick(
  buttonName: string,
  location: string,
  division?: string
): Promise<void> {
  await trackEvent('button_click', {
    button_name: buttonName,
    location,
    timestamp: new Date().toISOString()
  }, division);
}

// Track form submissions
export async function trackFormSubmission(
  formName: string,
  success: boolean,
  division?: string
): Promise<void> {
  await trackEvent('form_submission', {
    form_name: formName,
    success,
    timestamp: new Date().toISOString()
  }, division);
}

// Track user engagement
export async function trackEngagement(
  action: string,
  duration?: number,
  division?: string
): Promise<void> {
  await trackEvent('engagement', {
    action,
    duration,
    timestamp: new Date().toISOString()
  }, division);
}

// Track errors
export async function trackError(
  error: string,
  context?: string,
  division?: string
): Promise<void> {
  await trackEvent('error', {
    error_message: error,
    context,
    timestamp: new Date().toISOString()
  }, division);
}

// Track conversions
export async function trackConversion(
  conversionType: string,
  value?: number,
  division?: string
): Promise<void> {
  await trackEvent('conversion', {
    conversion_type: conversionType,
    value,
    timestamp: new Date().toISOString()
  }, division);
}

// Track downloads
export async function trackDownload(
  fileName: string,
  fileType: string,
  division?: string
): Promise<void> {
  await trackEvent('download', {
    file_name: fileName,
    file_type: fileType,
    timestamp: new Date().toISOString()
  }, division);
}

// Track video plays
export async function trackVideoPlay(
  videoTitle: string,
  videoDuration?: number,
  division?: string
): Promise<void> {
  await trackEvent('video_play', {
    video_title: videoTitle,
    video_duration: videoDuration,
    timestamp: new Date().toISOString()
  }, division);
}

// Track purchases
export async function trackPurchase(
  value: number,
  currency = 'USD',
  itemName?: string,
  division?: string
): Promise<void> {
  await trackEvent('purchase', {
    value,
    currency,
    item_name: itemName,
    timestamp: new Date().toISOString()
  }, division);
}

// Track lead generation
export async function trackLeadGenerated(
  email: string,
  source: string,
  division?: string
): Promise<void> {
  await trackEvent('lead_generated', {
    email: hashEmail(email),
    source,
    timestamp: new Date().toISOString()
  }, division);
}

// Track booking creation
export async function trackBookingCreated(
  bookingId: string,
  division?: string
): Promise<void> {
  await trackEvent('booking_created', {
    booking_id: bookingId,
    timestamp: new Date().toISOString()
  }, division);
}

// Hash email for privacy
function hashEmail(email: string): string {
  // Simple hash function for demo purposes
  // In production, use a proper hashing library
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    const char = email.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
}

// Export configuration for external access
export { config as analyticsConfig }; 
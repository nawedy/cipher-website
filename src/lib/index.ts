// Export all lib utilities from a central location
export { sql, executeQuery, executeQuerySingle, executeCommand, withTransaction } from './neon/client';

export { 
  trackEvent, 
  trackPageView, 
  trackButtonClick, 
  trackFormSubmission, 
  trackEngagement, 
  trackError, 
  trackConversion, 
  trackDownload, 
  trackVideoPlay, 
  trackPurchase, 
  trackLeadGenerated, 
  trackBookingCreated,
  initAnalytics,
  generateSessionId,
  analyticsConfig
} from './analytics';
export type { AnalyticsEventType, EventProperties, AnalyticsConfig } from './analytics';

export { 
  api, 
  analyticsApi, 
  leadsApi, 
  emailApi, 
  bookingApi, 
  uploadApi, 
  paymentApi, 
  authApi,
  handleApiError,
  withAuthToken,
  transformResponse,
  ApiError
} from './api';
export type { ApiResponse } from './api';

export { 
  validators, 
  Validator, 
  schemas,
  validateEmail,
  validatePhone,
  validatePassword,
  validateRequired,
  createFormValidator
} from './validation';
export type { ValidationRule, ValidationResult } from './validation';

export { 
  cn,
  dateUtils,
  stringUtils,
  numberUtils,
  arrayUtils,
  objectUtils,
  urlUtils,
  storageUtils,
  colorUtils,
  fileUtils,
  performanceUtils
} from './utils';

export { env } from '@/config/env'; 
// src/types/lead-scoring.ts
// TypeScript type definitions for advanced lead scoring system

export interface LeadFormData {
  // Basic Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  
  // Division and Service Selection
  division: 'strategy' | 'digitalworks' | 'labs' | 'studio' | 'ai';
  services: string[];
  
  // Qualification Data
  companySize: 'startup' | 'small' | 'medium' | 'enterprise';
  industry: string;
  budget: 'under-10k' | '10k-50k' | '50k-100k' | '100k-500k' | '500k+';
  timeline: 'immediate' | 'within-month' | 'within-quarter' | 'within-year';
  urgency: 1 | 2 | 3 | 4 | 5;
  
  // Technology Assessment
  currentTech: string[];
  painPoints: string[];
  painPointSeverity: Record<string, number>;
  
  // Project Details
  projectDescription: string;
  expectedOutcomes: string[];
  previousExperience: 'none' | 'some' | 'extensive';
  
  // Geographic and Market
  location: string;
  timezone: string;
  marketType: 'local' | 'national' | 'international';
}

export interface LeadScore {
  id: string;
  leadId: string;
  totalScore: number;
  classification: 'hot' | 'warm' | 'cold' | 'nurture';
  confidence: number;
  
  // Score Breakdown
  companyScore: number;
  budgetScore: number;
  timelineScore: number;
  painPointScore: number;
  techCompatibilityScore: number;
  engagementScore: number;
  
  // Metadata
  calculatedAt: Date;
  version: string;
  factors: ScoreFactor[];
}

export interface ScoreFactor {
  category: string;
  factor: string;
  weight: number;
  value: number;
  impact: number;
  reason: string;
}

export interface LeadScoringConfig {
  weights: {
    companySize: number;
    budget: number;
    timeline: number;
    painPoints: number;
    techCompatibility: number;
    engagement: number;
  };
  thresholds: {
    hot: number;
    warm: number;
    cold: number;
  };
  version: string;
}

export interface FormSession {
  id: string;
  sessionId: string;
  currentStep: number;
  totalSteps: number;
  division: string | null;
  formData: Partial<LeadFormData>;
  completionPercentage: number;
  timeSpent: number;
  lastUpdated: Date;
  isCompleted: boolean;
  abandonedAt?: Date;
}

export interface CalendarBooking {
  id: string;
  leadId: string;
  meetingType: 'discovery' | 'demo' | 'consultation' | 'strategy';
  scheduledAt: Date;
  duration: number;
  timezone: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  meetingLink: string;
  calendarEventId: string;
  reminders: BookingReminder[];
  notes?: string;
}

export interface BookingReminder {
  type: '24h' | '1h' | '15m';
  sentAt?: Date;
  status: 'pending' | 'sent' | 'failed';
}

export interface EmailCampaign {
  id: string;
  name: string;
  type: 'welcome' | 'nurture' | 'follow-up' | 'education' | 'recovery';
  division: string;
  trigger: EmailTrigger;
  sequence: EmailStep[];
  isActive: boolean;
  createdAt: Date;
}

export interface EmailTrigger {
  event: 'form_submit' | 'form_abandon' | 'booking_confirm' | 'no_response';
  conditions: Record<string, any>;
  delay?: number; // minutes
}

export interface EmailStep {
  id: string;
  subject: string;
  template: string;
  delay: number; // hours from previous step
  conditions?: Record<string, any>;
  trackingEnabled: boolean;
}

export interface LeadEngagement {
  leadId: string;
  pageViews: PageView[];
  emailInteractions: EmailInteraction[];
  formInteractions: FormInteraction[];
  totalEngagementScore: number;
  lastActivity: Date;
}

export interface PageView {
  url: string;
  timestamp: Date;
  timeOnPage: number;
  referrer?: string;
  source?: string;
  campaign?: string;
}

export interface EmailInteraction {
  campaignId: string;
  stepId: string;
  action: 'delivered' | 'opened' | 'clicked' | 'replied' | 'bounced';
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface FormInteraction {
  step: number;
  field: string;
  action: 'focus' | 'blur' | 'change' | 'abandon';
  timestamp: Date;
  value?: string;
  timeSpent: number;
}
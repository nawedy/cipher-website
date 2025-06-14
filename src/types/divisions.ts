// src/types/divisions.ts
// Enhanced division types for landing page implementation with complete typing structure

export interface DivisionConfig {
    id: string;
    name: string;
    tagline: string;
    description: string;
    colors: DivisionColors;
    services: Service[];
    process: ProcessStep[];
    pricing: PricingTier[];
    testimonials: Testimonial[];
    faqs: FAQ[];
    caseStudy: CaseStudy;
    demo?: DemoConfig;
  }
  
  export interface DivisionColors {
    primary: string;
    secondary: string;
    accent: string;
    neon: string;
    background: string;
    backgroundGradient: string;
    cardBackground: string;
    textPrimary: string;
    textSecondary: string;
    border: string;
  }
  
  export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    features: string[];
    ctaText: string;
    ctaLink: string;
    highlighted?: boolean;
  }
  
  export interface ProcessStep {
    step: number;
    title: string;
    description: string;
    icon: string;
    duration: string;
    details?: string[];
  }
  
  export interface PricingTier {
    id: string;
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    highlighted: boolean;
    ctaText: string;
    popular?: boolean;
    savings?: string;
  }
  
  export interface Testimonial {
    id: string;
    name: string;
    title: string;
    company: string;
    content: string;
    avatar: string;
    rating: number;
    industry?: string;
  }
  
  export interface FAQ {
    id: string;
    question: string;
    answer: string;
    category?: string;
  }
  
  export interface CaseStudy {
    title: string;
    client: string;
    industry: string;
    challenge: string;
    solution: string;
    results: CaseStudyResult[];
    image: string;
    testimonial?: string;
    timeline?: string;
  }
  
  export interface CaseStudyResult {
    metric: string;
    value: string;
    description: string;
    icon?: string;
  }
  
  export interface DemoConfig {
    type: 'chat' | 'dashboard' | 'workflow' | 'analytics';
    title: string;
    description: string;
    features: string[];
    interactive?: boolean;
  }
  
  export interface ContactFormData {
    name: string;
    email: string;
    company: string;
    phone?: string;
    message: string;
    division: string;
    service: string;
    budget?: string;
    timeline?: string;
  }
  
  export interface NavigationItem {
    label: string;
    href: string;
    division?: string;
    external?: boolean;
  }
  
  export type DivisionId = 'strategy' | 'digitalworks' | 'labs' | 'studio' | 'ai' | 'products';
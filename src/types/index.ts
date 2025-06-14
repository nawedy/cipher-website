// src/types/index.ts
// TypeScript type definitions for Cipher Intelligence platform components and data structures

import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

// Division Types
export type Division = 'cig' | 'cs' | 'cdw' | 'cl' | 'cst' | 'cai';

export interface DivisionConfig {
  id: Division;
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
  };
  url: string;
  services: string[];
}

// Component Props Types
export interface ComponentProps {
  children?: ReactNode;
  className?: string;
}

// Button Component Types
export interface ButtonProps extends ComponentProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  href?: string;
  external?: boolean;
}

// Card Component Types
export interface CardProps extends ComponentProps {
  variant?: 'default' | 'glass' | 'highlighted' | 'division';
  division?: Division;
  interactive?: boolean;
}

export interface FeatureCardProps extends ComponentProps {
  icon: LucideIcon;
  title: string;
  description: string;
  division?: Division;
  href?: string;
}

export interface TestimonialCardProps extends ComponentProps {
  quote: string;
  author: {
    name: string;
    title: string;
    company: string;
    avatar: string;
  };
  featured?: boolean;
}

export interface PricingCardProps extends ComponentProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  popular?: boolean;
  division?: Division;
  ctaText?: string;
  ctaHref?: string;
}

// Product Types
export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  division: Division;
  price: {
    amount: number;
    currency: string;
    period?: 'month' | 'year' | 'one-time';
  };
  features: string[];
  tags: string[];
  popular?: boolean;
  trial?: boolean;
  href: string;
  image?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  division: Division;
  productCount: number;
}

// Navigation Types
export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavigationItem[];
}

export interface HeaderProps extends ComponentProps {
  transparent?: boolean;
  division?: Division;
  logo?: {
    text: string;
    href: string;
  };
  navigation: NavigationItem[];
  cta?: {
    text: string;
    href: string;
    variant?: ButtonProps['variant'];
  };
}

// Animation Types
export interface BlurFadeProps extends ComponentProps {
  delay?: number;
  duration?: number;
  inView?: boolean;
  blur?: string;
  yOffset?: number;
}

export interface TypingAnimationProps extends ComponentProps {
  text: string;
  duration?: number;
  startDelay?: number;
}

export interface NumberTickerProps extends ComponentProps {
  value: number;
  direction?: 'up' | 'down';
  delay?: number;
  decimalPlaces?: number;
}

export interface MarqueeProps extends ComponentProps {
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
  speed?: number;
}

// Chat Component Types
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  avatar?: string;
}

export interface ChatBubbleProps extends ComponentProps {
  message: ChatMessage;
  showAvatar?: boolean;
}

export interface ChatMockupProps extends ComponentProps {
  messages: ChatMessage[];
  showTyping?: boolean;
  autoPlay?: boolean;
  delay?: number;
}

// Layout Types
export interface SectionProps extends ComponentProps {
  id?: string;
  background?: 'default' | 'gradient' | 'glass';
  division?: Division;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface ContainerProps extends ComponentProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl' | 'full';
  center?: boolean;
}

export interface GridProps extends ComponentProps {
  cols?: 1 | 2 | 3 | 4 | 6;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
}

// Form Types
export interface FormFieldProps extends ComponentProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  error?: string;
  options?: { value: string; label: string }[];
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
  division?: Division;
  services?: string[];
}

// Analytics Types
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  division?: Division;
}

export interface MetricData {
  label: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
    period: string;
  };
  format?: 'number' | 'currency' | 'percentage';
}

// API Response Types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  errors?: string[];
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Supabase Types
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  company?: string;
  role: 'admin' | 'user' | 'client';
  division?: Division;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  source: string;
  division: Division;
  services: string[];
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
  created_at: string;
  updated_at: string;
}

// Utility Types
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = 
  Pick<T, Exclude<keyof T, Keys>> & 
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

// Environment Types
export interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  NEXT_PUBLIC_SITE_URL: string;
  NEXT_PUBLIC_SUPABASE_URL: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  STRIPE_PUBLIC_KEY: string;
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  GOOGLE_ANALYTICS_ID?: string;
}
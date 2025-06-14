// src/lib/stripe-config.ts
// Stripe product and pricing configuration

export interface StripeProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  priceId: string;
  features: string[];
  category: 'omnipanel' | 'diagnostic' | 'audit' | 'kit' | 'transformation';
  deliveryTime?: string;
  badge?: string;
}

// OmniPanel Products (Emergency Campaign)
export const omniPanelProducts: StripeProduct[] = [
  {
    id: 'individual-founder',
    name: 'Individual Founder',
    description: 'Perfect for solo entrepreneurs and small startups',
    price: 99,
    priceId: process.env.STRIPE_PRICE_ID_INDIVIDUAL_FOUNDER || 'price_1RZqJDP4nRvJbyjDCacGT1gG',
    category: 'omnipanel',
    features: [
      'Complete privacy-first AI workspace',
      'Advanced security protocols',
      'Unified development environment',
      'Priority support',
      'Early access to new features'
    ],
    badge: 'EMERGENCY PRICING'
  },
  {
    id: 'team-crisis-pack',
    name: 'Team Crisis Pack',
    description: 'For teams needing immediate AI security solutions',
    price: 79,
    priceId: process.env.STRIPE_PRICE_ID_TEAM_CRISIS_PACK || 'price_1RZqJNP4nRvJbyjDRDA6mK1D',
    category: 'omnipanel',
    features: [
      'Everything in Individual Founder',
      'Team collaboration tools',
      'Advanced analytics',
      'Custom integrations',
      'Dedicated account manager'
    ],
    badge: 'MOST POPULAR'
  },
  {
    id: 'enterprise-emergency',
    name: 'Enterprise Emergency',
    description: 'Enterprise-grade security for large organizations',
    price: 59,
    priceId: process.env.STRIPE_PRICE_ID_ENTERPRISE_EMERGENCY || 'price_1RZqJuP4nRvJbyjDWpQ0xqjl',
    category: 'omnipanel',
    features: [
      'Everything in Team Crisis Pack',
      'Enterprise SSO',
      'Advanced compliance tools',
      'Custom deployment options',
      '24/7 premium support'
    ],
    badge: 'BEST VALUE'
  },
  {
    id: 'supporter',
    name: 'Supporter',
    description: 'Support our mission and get early access',
    price: 25,
    priceId: process.env.STRIPE_PRICE_ID_SUPPORTER || 'price_1RZqK3P4nRvJbyjDbC1jdzlL',
    category: 'omnipanel',
    features: [
      'Early access to OmniPanel',
      'Supporter badge',
      'Community access',
      'Updates and progress reports',
      'Lifetime discount on future products'
    ],
    badge: 'SUPPORT US'
  }
];

// Immediate Revenue Products
export const immediateProducts: StripeProduct[] = [
  {
    id: 'ai-business-diagnostic-standard',
    name: 'AI Business Diagnostic Report - Standard',
    description: 'Comprehensive AI-powered business analysis in 48 hours',
    price: 497,
    priceId: process.env.STRIPE_PRICE_ID_AI_DIAGNOSTIC_STANDARD || 'price_1RZxuMP4nRvJbyjDsYfcvDNY',
    category: 'diagnostic',
    deliveryTime: '48 hours',
    features: [
      'Digital presence audit & optimization',
      'AI opportunity assessment',
      'ROI projections for AI implementation',
      'Competitive analysis & positioning',
      'Custom implementation roadmap',
      'Priority action items with timelines',
      'Professional PDF report (25-30 pages)',
      'Email support during delivery'
    ],
    badge: 'MOST POPULAR'
  },
  {
    id: 'ai-business-diagnostic-premium',
    name: 'AI Business Diagnostic Report - Premium',
    description: 'Standard diagnostic plus 1-hour strategy consultation',
    price: 997,
    priceId: process.env.STRIPE_PRICE_ID_AI_DIAGNOSTIC_PREMIUM || 'price_1RZxuwP4nRvJbyjDzgYnNeWg',
    category: 'diagnostic',
    deliveryTime: '48 hours + 1 hour call',
    features: [
      'Everything in Standard Diagnostic',
      '1-hour strategy consultation call',
      'Personalized implementation guidance',
      'Q&A session with AI experts',
      'Custom action plan refinement',
      'Follow-up email support (30 days)',
      'Priority delivery (24 hours)',
      'Executive summary presentation'
    ],
    badge: 'BEST VALUE'
  },
  {
    id: 'website-conversion-audit',
    name: 'Website Conversion Audit',
    description: 'AI-powered website performance and conversion optimization analysis',
    price: 197,
    priceId: process.env.STRIPE_PRICE_ID_WEBSITE_AUDIT || 'price_1RZxuyP4nRvJbyjDBA1xXx6X',
    category: 'audit',
    deliveryTime: '24 hours',
    features: [
      'Page speed & performance analysis',
      'SEO audit & recommendations',
      'UX/UI optimization suggestions',
      'Conversion bottleneck identification',
      'A/B testing recommendations',
      'Implementation priority matrix'
    ],
    badge: 'QUICK WINS'
  },
  {
    id: 'ai-starter-kits',
    name: 'AI Implementation Starter Kits',
    description: 'Ready-to-use AI templates and guides for immediate implementation',
    price: 97,
    priceId: process.env.STRIPE_PRICE_ID_AI_STARTER_KITS || 'price_1RZxuzP4nRvJbyjDPQ7kbEGU',
    category: 'kit',
    deliveryTime: 'Instant',
    features: [
      'Customer Service AI Kit',
      'Marketing Automation Templates',
      'Business Analytics Dashboard',
      'Integration guides & workflows',
      'Training materials & best practices',
      'Ongoing updates & support'
    ],
    badge: 'BEST VALUE'
  },
  {
    id: 'ai-transformation-5day',
    name: '5-Day AI Business Transformation',
    description: 'Fixed-scope AI implementation with guaranteed results',
    price: 2997,
    priceId: process.env.STRIPE_PRICE_ID_AI_TRANSFORMATION || '',
    category: 'transformation',
    deliveryTime: '5 business days',
    features: [
      'Complete AI strategy development',
      'Custom AI tool implementation',
      'Team training & onboarding',
      'Process automation setup',
      'Performance monitoring dashboard',
      '30-day post-implementation support'
    ],
    badge: 'GUARANTEED RESULTS'
  }
];

// All products combined
export const allProducts = [...omniPanelProducts, ...immediateProducts];

// Helper functions
export const getProductById = (id: string): StripeProduct | undefined => {
  return allProducts.find(product => product.id === id);
};

export const getProductsByCategory = (category: StripeProduct['category']): StripeProduct[] => {
  return allProducts.filter(product => product.category === category);
};

export const getOmniPanelProducts = (): StripeProduct[] => {
  return omniPanelProducts;
};

export const getImmediateProducts = (): StripeProduct[] => {
  return immediateProducts;
};

// Stripe configuration
export const stripeConfig = {
  secretKey: process.env.STRIPE_SECRET_KEY!,
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
};

// Campaign configuration
export const campaignConfig = {
  omnipanel: {
    deadline: new Date('2024-12-31T23:59:59'),
    fundingGoal: 100000,
    currentFunding: 15750,
    emergencyPricing: {
      current: 99,
      afterCampaign: 149,
      afterLaunch: 199,
      afterScale: 499
    },
    timeLeft: {
      hours: 72,
      isEmergency: true
    }
  }
};

 
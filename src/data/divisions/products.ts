// src/data/divisions/products.ts
// Complete configuration data for Cipher Products division landing page

import { DivisionConfig } from '@/types/divisions';

export const productsDivisionConfig: DivisionConfig = {
  id: 'products',
  name: 'Cipher Products',
  tagline: 'Ready-to-deploy AI solutions',
  description: 'Pre-built AI products and solutions designed to accelerate your digital transformation with minimal setup time and maximum impact.',
  colors: {
    primary: '#7C3AED',
    secondary: '#A855F7',
    accent: '#F59E0B',
    neon: '#A855F7',
    background: '#1a1a2e',
    backgroundGradient: 'linear-gradient(135deg, #7C3AED 0%, #1a1a2e 100%)',
    cardBackground: 'rgba(124, 58, 237, 0.1)',
    textPrimary: '#ffffff',
    textSecondary: '#c4b5fd',
    border: 'rgba(168, 85, 247, 0.15)'
  },
  services: [
    {
      id: 'ai-analytics',
      title: 'AI Analytics Platform',
      description: 'Comprehensive analytics dashboard with AI-powered insights and predictive analytics.',
      icon: 'BarChart3',
      features: [
        'Real-time data visualization',
        'Predictive analytics engine',
        'Custom reporting tools',
        'Integration with existing systems'
      ],
      ctaText: 'Try Analytics',
      ctaLink: '/contact?service=ai-analytics',
      highlighted: true
    },
    {
      id: 'automation-suite',
      title: 'Process Automation Suite',
      description: 'Ready-to-deploy automation tools for common business processes.',
      icon: 'Zap',
      features: [
        'Workflow automation',
        'Document processing',
        'Email automation',
        'Task scheduling'
      ],
      ctaText: 'Get Automation',
      ctaLink: '/contact?service=automation-suite',
      highlighted: false
    }
  ],
  process: [
    {
      step: 1,
      title: 'Product Selection',
      description: 'Choose from our catalog of pre-built AI solutions that match your business needs.',
      icon: 'Package',
      duration: '1 day',
      details: [
        'Needs assessment',
        'Product demonstration',
        'Feature comparison',
        'Pricing discussion'
      ]
    },
    {
      step: 2,
      title: 'Quick Setup',
      description: 'Rapid deployment and configuration with minimal technical requirements.',
      icon: 'Settings',
      duration: '1-2 weeks',
      details: [
        'System integration',
        'Data migration',
        'User training',
        'Testing and validation'
      ]
    }
  ],
  pricing: [
    {
      id: 'starter',
      name: 'Product Starter',
      price: '$299',
      period: 'per month',
      description: 'Essential AI tools for small businesses.',
      features: [
        'Basic analytics dashboard',
        'Standard automation tools',
        'Email support',
        '99.9% uptime guarantee'
      ],
      highlighted: false,
      ctaText: 'Start Free Trial'
    },
    {
      id: 'professional',
      name: 'Product Professional',
      price: '$899',
      period: 'per month',
      description: 'Advanced AI solutions for growing businesses.',
      features: [
        'Everything in Starter',
        'Advanced analytics',
        'Custom integrations',
        'Priority support',
        'Advanced automation'
      ],
      highlighted: true,
      popular: true,
      ctaText: 'Get Professional',
      savings: 'Most Popular'
    }
  ],
  testimonials: [
    {
      id: '1',
      name: 'Michael Rodriguez',
      title: 'CTO',
      company: 'DataFlow Corp',
      content: 'The AI Analytics Platform gave us immediate insights that would have taken months to develop in-house. ROI was visible within the first quarter.',
      avatar: 'https://source.unsplash.com/100x100/?businessman,tech',
      rating: 5
    }
  ],
  faqs: [
    {
      id: '1',
      question: 'How quickly can we deploy these products?',
      answer: 'Most products can be deployed within 1-2 weeks, with basic setup completed in just a few days.'
    },
    {
      id: '2',
      question: 'Do you offer custom modifications?',
      answer: 'Yes, we offer customization services to adapt our products to your specific business requirements.'
    }
  ],
  caseStudy: {
    title: 'DataFlow Corp Transformation',
    client: 'DataFlow Corp',
    industry: 'Technology',
    challenge: 'Needed rapid deployment of analytics capabilities without extensive development time.',
    solution: 'Implemented our AI Analytics Platform with custom integrations for their existing data sources.',
    results: [
      {
        metric: 'Deployment Time',
        value: '2 weeks',
        description: 'From decision to full deployment'
      },
      {
        metric: 'ROI',
        value: '300%',
        description: 'Return on investment in first quarter'
      },
      {
        metric: 'Data Processing',
        value: '10x faster',
        description: 'Improvement in data analysis speed'
      }
    ],
    image: 'https://source.unsplash.com/800x600/?analytics,dashboard',
    testimonial: 'The AI Analytics Platform gave us immediate insights that would have taken months to develop in-house.',
    timeline: '2 weeks'
  }
}; 
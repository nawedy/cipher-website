// src/config/divisions.ts
// Configuration data for all Cipher Intelligence divisions with branding, services, and metadata

import { DivisionConfig } from '@/types';

export const divisions: Record<string, DivisionConfig> = {
  cig: {
    id: 'cig',
    name: 'Cipher Intelligence',
    fullName: 'Cipher Intelligence Group',
    tagline: 'Pioneering technology, united expertise',
    description: 'The parent company orchestrating transformative AI solutions across industries through our specialized divisions.',
    colors: {
      primary: '#0f0f1a',
      secondary: '#1a1b2e',
      accent: '#FFD700',
      gradient: 'linear-gradient(135deg, #0f0f1a 0%, #1a1b2e 100%)',
    },
    url: 'https://cipher-intelligence.com',
    services: [
      'Strategic Technology Leadership',
      'Cross-Division Coordination',
      'Enterprise Partnerships',
      'Innovation Investment',
      'Corporate Security',
      'Unified Analytics Platform'
    ]
  },

  cs: {
    id: 'cs',
    name: 'Strategy',
    fullName: 'Cipher Strategy',
    tagline: 'Smarter decisions, accelerated by AI',
    description: 'AI-powered strategic consulting that transforms data into competitive advantage through intelligent automation and decision support.',
    colors: {
      primary: '#073C32',
      secondary: '#2a1b3d',
      accent: '#00FFE7',
      gradient: 'linear-gradient(135deg, #073C32 0%, #2a1b3d 100%)',
    },
    url: 'https://strategy.cipher-intelligence.com',
    services: [
      'Digital Transformation Strategy',
      'AI Maturity Assessment',
      'Process Automation Consulting',
      'Data Strategy & Governance',
      'Change Management',
      'Technology Selection & Roadmapping'
    ]
  },

  cdw: {
    id: 'cdw',
    name: 'DigitalWorks',
    fullName: 'Cipher DigitalWorks',
    tagline: 'Content, campaigns, and growth built for impact',
    description: 'Growth-focused digital marketing powered by AI automation, delivering measurable results through data-driven campaigns.',
    colors: {
      primary: '#088B8B',
      secondary: '#1a1b2e',
      accent: '#2FE4FF',
      gradient: 'linear-gradient(135deg, #088B8B 0%, #1a1b2e 100%)',
    },
    url: 'https://growth.cipher-intelligence.com',
    services: [
      'AI-Powered Content Marketing',
      'Growth Automation Systems',
      'Performance Marketing Campaigns',
      'Conversion Optimization',
      'Social Media Automation',
      'Marketing Analytics & Attribution'
    ]
  },

  cl: {
    id: 'cl',
    name: 'Labs',
    fullName: 'Cipher Labs',
    tagline: 'We don\'t just build AI products. We build the future',
    description: 'Research and development powerhouse creating breakthrough AI technologies and innovative solutions for tomorrow\'s challenges.',
    colors: {
      primary: '#00BFFF',
      secondary: '#312066',
      accent: '#64FFDA',
      gradient: 'linear-gradient(135deg, #00BFFF 0%, #312066 100%)',
    },
    url: 'https://labs.cipher-intelligence.com',
    services: [
      'AI Research & Development',
      'Prototype Development',
      'Emerging Technology Integration',
      'Open Source Contributions',
      'Academic Partnerships',
      'Innovation Consulting'
    ]
  },

  cst: {
    id: 'cst',
    name: 'Studio',
    fullName: 'Cipher Studio',
    tagline: 'Designing tomorrow\'s web, today',
    description: 'Premium web development and digital experience design, creating scalable applications with cutting-edge technology stacks.',
    colors: {
      primary: '#4B5665',
      secondary: '#1a1b2e',
      accent: '#C0C0C0',
      gradient: 'linear-gradient(135deg, #4B5665 0%, #1a1b2e 100%)',
    },
    url: 'https://studio.cipher-intelligence.com',
    services: [
      'Custom Web Applications',
      'SaaS Platform Development',
      'Mobile App Development',
      'API Development & Integration',
      'Performance Optimization',
      'Technical Architecture Consulting'
    ]
  },

  cai: {
    id: 'cai',
    name: 'AI',
    fullName: 'Cipher AI',
    tagline: 'Intelligence, redefined. Proprietary AI, next-gen performance',
    description: 'Cutting-edge artificial intelligence solutions with proprietary models and enterprise-grade deployment capabilities.',
    colors: {
      primary: '#222328',
      secondary: '#0A0A0A',
      accent: '#FF6B35',
      gradient: 'linear-gradient(135deg, #222328 0%, #0A0A0A 100%)',
    },
    url: 'https://ai.cipher-intelligence.com',
    services: [
      'Custom AI Model Development',
      'Enterprise AI Integration',
      'Intelligent Automation Platforms',
      'Natural Language Processing',
      'Computer Vision Solutions',
      'AI Infrastructure & Operations'
    ]
  }
};

// Purpose: Helper functions for division configuration management
export const getDivision = (id: string): DivisionConfig | undefined => {
  return divisions[id];
};

export const getAllDivisions = (): DivisionConfig[] => {
  return Object.values(divisions);
};

export const getDivisionsByCategory = (category: 'services' | 'products' | 'research'): DivisionConfig[] => {
  const categoryMap = {
    services: ['cs', 'cdw', 'cst'],
    products: ['cai', 'cst', 'cl'],
    research: ['cl', 'cai']
  };
  
  return categoryMap[category]?.map(id => divisions[id]).filter(Boolean) || [];
};

export const getDivisionColor = (divisionId: string, type: 'primary' | 'accent' | 'gradient' = 'primary'): string => {
  const division = getDivision(divisionId);
  return division?.colors[type] || divisions.cig.colors[type];
};

// Purpose: Navigation configuration for cross-division integration
export const divisionNavigation = [
  {
    label: 'Services',
    items: [
      { label: 'Strategy Consulting', href: '/strategy', division: 'cs' },
      { label: 'Growth Marketing', href: '/growth', division: 'cdw' },
      { label: 'Web Development', href: '/studio', division: 'cst' },
      { label: 'AI Solutions', href: '/ai', division: 'cai' }
    ]
  },
  {
    label: 'Products',
    items: [
      { label: 'Browse All Products', href: '/products' },
      { label: 'AI Platforms', href: '/products/ai', division: 'cai' },
      { label: 'Web Applications', href: '/products/web', division: 'cst' },
      { label: 'Growth Tools', href: '/products/growth', division: 'cdw' }
    ]
  },
  {
    label: 'Innovation',
    items: [
      { label: 'Research Labs', href: '/labs', division: 'cl' },
      { label: 'Open Source', href: '/labs/open-source', division: 'cl' },
      { label: 'Partnerships', href: '/labs/partnerships', division: 'cl' }
    ]
  }
];

// Purpose: Featured services for homepage showcase
export const featuredServices = [
  {
    title: 'AI Strategy & Transformation',
    description: 'Complete digital transformation powered by artificial intelligence',
    division: 'cs',
    icon: 'brain',
    metrics: { projects: '150+', satisfaction: '98%', roi: '340%' }
  },
  {
    title: 'Growth Automation Platform',
    description: 'Scale your marketing with intelligent automation and optimization',
    division: 'cdw',
    icon: 'trending-up',
    metrics: { campaigns: '500+', growth: '156%', clients: '50+' }
  },
  {
    title: 'Custom AI Development',
    description: 'Proprietary AI models tailored to your specific business needs',
    division: 'cai',
    icon: 'cpu',
    metrics: { models: '25+', accuracy: '94%', deployment: '99.9%' }
  },
  {
    title: 'Enterprise Web Platforms',
    description: 'Scalable web applications built with modern technology stacks',
    division: 'cst',
    icon: 'globe',
    metrics: { applications: '200+', uptime: '99.9%', performance: '95+' }
  }
];

// Purpose: Trust indicators and client logos configuration
export const trustIndicators = {
  stats: [
    { label: 'Enterprise Clients', value: '500+' },
    { label: 'AI Models Deployed', value: '150+' },
    { label: 'Revenue Generated', value: '$50M+' },
    { label: 'Success Rate', value: '98%' }
  ],
  clients: [
    { name: 'Microsoft', logo: '/logos/microsoft.svg' },
    { name: 'Amazon', logo: '/logos/amazon.svg' },
    { name: 'Google', logo: '/logos/google.svg' },
    { name: 'IBM', logo: '/logos/ibm.svg' },
    { name: 'Salesforce', logo: '/logos/salesforce.svg' },
    { name: 'Oracle', logo: '/logos/oracle.svg' }
  ]
};

// Purpose: Cross-division collaboration examples
export const collaborationExamples = [
  {
    title: 'AI-Powered E-commerce Transformation',
    divisions: ['cs', 'cai', 'cst', 'cdw'],
    description: 'Complete e-commerce overhaul with AI recommendations, custom platform, and growth automation',
    duration: '6 months',
    results: ['300% increase in conversion rate', '150% growth in average order value', '45% reduction in cart abandonment']
  },
  {
    title: 'Healthcare AI Platform Development',
    divisions: ['cl', 'cai', 'cst'],
    description: 'Research-backed AI platform for medical diagnosis with enterprise deployment',
    duration: '12 months',
    results: ['94% diagnostic accuracy', 'FDA approval pathway', '50+ hospital partnerships']
  },
  {
    title: 'Financial Services Digital Transformation',
    divisions: ['cs', 'cai', 'cdw'],
    description: 'AI-driven risk assessment with automated marketing and customer acquisition',
    duration: '8 months',
    results: ['60% faster loan processing', '200% increase in qualified leads', '99.9% fraud detection accuracy']
  }
];

export default divisions;
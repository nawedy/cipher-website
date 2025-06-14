// src/data/divisions/strategy.ts
// Complete configuration data for Cipher Strategy division landing page

import { DivisionConfig } from '@/types/divisions';

export const strategyDivisionConfig: DivisionConfig = {
  id: 'strategy',
  name: 'Cipher Strategy',
  tagline: 'Smarter decisions, accelerated by AI',
  description: 'Transform your business strategy with AI-powered insights, data-driven decision making, and intelligent automation that drives measurable growth across every aspect of your organization.',
  colors: {
    primary: '#073C32',
    secondary: '#00FFE7',
    accent: '#FF367B',
    neon: '#00FFE7',
    background: '#0a0f0d',
    backgroundGradient: 'linear-gradient(135deg, #073C32 0%, #0a0f0d 100%)',
    cardBackground: 'rgba(7, 60, 50, 0.1)',
    textPrimary: '#ffffff',
    textSecondary: '#8b9dc3',
    border: 'rgba(0, 255, 231, 0.15)'
  },
  services: [
    {
      id: 'digital-maturity',
      title: 'Digital Maturity Assessment',
      description: 'Comprehensive analysis of your current digital capabilities and AI readiness with actionable roadmaps for transformation.',
      icon: 'BarChart3',
      features: [
        'Current state digital capability analysis',
        'AI readiness gap identification',
        'Priority-based transformation roadmap',
        'ROI projections and timeline estimates'
      ],
      ctaText: 'Get Assessment',
      ctaLink: '/contact?service=digital-maturity',
      highlighted: false
    },
    {
      id: 'ai-strategy',
      title: 'AI Strategy Development',
      description: 'Custom AI implementation strategies that align with your business objectives and drive sustainable competitive advantage.',
      icon: 'Brain',
      features: [
        'Strategic use case identification',
        'Technology stack selection',
        'Implementation planning and phasing',
        'Risk mitigation and governance'
      ],
      ctaText: 'Build Strategy',
      ctaLink: '/contact?service=ai-strategy',
      highlighted: true
    },
    {
      id: 'data-governance',
      title: 'Data Governance & Architecture',
      description: 'Establish robust data foundations that enable AI initiatives while ensuring compliance with regulatory requirements.',
      icon: 'Database',
      features: [
        'Enterprise data architecture design',
        'Governance frameworks and policies',
        'Data quality standards implementation',
        'Security and compliance protocols'
      ],
      ctaText: 'Design Architecture',
      ctaLink: '/contact?service=data-governance',
      highlighted: false
    },
    {
      id: 'change-management',
      title: 'Digital Change Management',
      description: 'Guide your organization through digital transformation with proven methodologies and comprehensive stakeholder alignment.',
      icon: 'Users',
      features: [
        'Stakeholder mapping and engagement',
        'Custom training and enablement programs',
        'Communication and adoption strategies',
        'Success metrics and monitoring'
      ],
      ctaText: 'Manage Change',
      ctaLink: '/contact?service=change-management',
      highlighted: false
    }
  ],
  process: [
    {
      step: 1,
      title: 'Discovery & Analysis',
      description: 'Deep dive into your current state, challenges, and strategic objectives to identify high-impact opportunities.',
      icon: 'Search',
      duration: '2-3 weeks',
      details: [
        'Stakeholder interviews and workshops',
        'Current state assessment',
        'Market and competitive analysis',
        'Opportunity identification'
      ]
    },
    {
      step: 2,
      title: 'Strategy Development',
      description: 'Craft comprehensive AI-powered strategies with clear roadmaps, success metrics, and measurable outcomes.',
      icon: 'PenTool',
      duration: '3-4 weeks',
      details: [
        'Strategic framework development',
        'Use case prioritization',
        'Technology roadmap creation',
        'Investment planning'
      ]
    },
    {
      step: 3,
      title: 'Implementation Planning',
      description: 'Detailed execution plans with timelines, resources, risk mitigation, and change management strategies.',
      icon: 'Calendar',
      duration: '2-3 weeks',
      details: [
        'Project planning and sequencing',
        'Resource allocation',
        'Risk assessment and mitigation',
        'Success metrics definition'
      ]
    },
    {
      step: 4,
      title: 'Execution & Optimization',
      description: 'Guided implementation with continuous monitoring, strategy refinement, and performance optimization.',
      icon: 'TrendingUp',
      duration: 'Ongoing',
      details: [
        'Implementation oversight',
        'Performance monitoring',
        'Continuous optimization',
        'Strategic adjustments'
      ]
    }
  ],
  pricing: [
    {
      id: 'starter',
      name: 'Strategy Starter',
      price: '$15,000',
      period: 'one-time',
      description: 'Essential strategic guidance for small to medium businesses starting their AI transformation journey.',
      features: [
        'Digital maturity assessment report',
        'Basic AI strategy roadmap',
        'Technology recommendations',
        '30-day implementation guide',
        'Email support for 3 months'
      ],
      highlighted: false,
      ctaText: 'Get Started'
    },
    {
      id: 'professional',
      name: 'Strategy Professional',
      price: '$45,000',
      period: 'project',
      description: 'Comprehensive strategic consulting for established businesses ready to scale their operations with AI.',
      features: [
        'Everything in Strategy Starter',
        'Custom AI strategy development',
        'Data governance framework',
        'Change management plan',
        'Quarterly strategy reviews (1 year)',
        'Priority support and consultation'
      ],
      highlighted: true,
      popular: true,
      ctaText: 'Start Project',
      savings: 'Most Popular'
    },
    {
      id: 'enterprise',
      name: 'Strategy Enterprise',
      price: 'Custom',
      period: 'engagement',
      description: 'Full-scale strategic transformation for large enterprises with complex multi-division requirements.',
      features: [
        'Everything in Strategy Professional',
        'Multi-division strategy alignment',
        'Executive advisory services',
        'Custom training and certification programs',
        'Dedicated strategy team assignment',
        '24/7 support and emergency consultation'
      ],
      highlighted: false,
      ctaText: 'Contact Sales'
    }
  ],
  testimonials: [
    {
      id: '1',
      name: 'Sarah Chen',
      title: 'Chief Strategy Officer',
      company: 'TechFlow Industries',
      content: 'Cipher Strategy completely transformed our approach to AI adoption. Their comprehensive roadmap helped us achieve 40% operational efficiency gains in just 6 months, with clear ROI metrics throughout.',
      avatar: 'https://source.unsplash.com/100x100/?businesswoman,professional',
      rating: 5,
      industry: 'Technology'
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      title: 'VP of Digital Transformation',
      company: 'Global Manufacturing Corp',
      content: 'The strategic framework they provided became our blueprint for enterprise-wide success. Our ROI exceeded initial expectations by 250%, and the change management approach ensured smooth adoption.',
      avatar: 'https://source.unsplash.com/100x100/?businessman,executive',
      rating: 5,
      industry: 'Manufacturing'
    },
    {
      id: '3',
      name: 'Dr. Emily Watson',
      title: 'Head of Innovation',
      company: 'HealthTech Solutions',
      content: 'Their AI strategy expertise helped us navigate complex regulatory requirements while driving unprecedented innovation. The data governance framework they established is now our competitive advantage.',
      avatar: 'https://source.unsplash.com/100x100/?doctor,professional',
      rating: 5,
      industry: 'Healthcare'
    }
  ],
  faqs: [
    {
      id: '1',
      question: 'How long does a typical strategy engagement take?',
      answer: 'Most strategic consulting projects range from 8-12 weeks, depending on scope and organizational complexity. We provide detailed timelines and milestones during the discovery phase to ensure transparent expectations.',
      category: 'Timeline'
    },
    {
      id: '2',
      question: 'Do you work with companies that have no AI experience?',
      answer: 'Absolutely. Our digital maturity assessment helps identify your current state, and we design strategies appropriate for your level of AI readiness. Many of our most successful clients started with minimal AI experience.',
      category: 'Experience'
    },
    {
      id: '3',
      question: 'What industries do you specialize in?',
      answer: 'We work across industries including healthcare, financial services, manufacturing, retail, and technology. Our strategic frameworks adapt to sector-specific requirements and regulatory environments.',
      category: 'Industries'
    },
    {
      id: '4',
      question: 'How do you measure strategic success?',
      answer: 'We establish clear KPIs during strategy development, including efficiency gains, cost reductions, revenue growth, and transformation milestones. All metrics are tracked and reported regularly.',
      category: 'Metrics'
    },
    {
      id: '5',
      question: 'Do you provide ongoing support after strategy delivery?',
      answer: 'Yes, we offer various support packages including quarterly reviews, implementation guidance, strategy refinement services, and emergency consultation depending on your engagement level.',
      category: 'Support'
    }
  ],
  caseStudy: {
    title: 'AI-Driven Supply Chain Optimization',
    client: 'Global Logistics Leader',
    industry: 'Logistics & Transportation',
    challenge: 'A multi-billion dollar logistics company was struggling with supply chain inefficiencies, inventory optimization challenges, and demand forecasting accuracy across 50+ countries, resulting in significant cost overruns and customer satisfaction issues.',
    solution: 'We implemented a comprehensive AI strategy focusing on predictive analytics for demand forecasting, automated inventory management systems, and real-time supply chain visibility platforms. The strategy included data governance frameworks and change management to ensure organization-wide adoption.',
    results: [
      {
        metric: 'Cost Reduction',
        value: '32%',
        description: 'Operational cost savings through optimized routing and inventory management',
        icon: 'DollarSign'
      },
      {
        metric: 'Delivery Performance',
        value: '95%',
        description: 'On-time delivery rate improvement from 68% baseline',
        icon: 'Truck'
      },
      {
        metric: 'Inventory Turnover',
        value: '45%',
        description: 'Faster inventory turnover reducing carrying costs and waste',
        icon: 'Package'
      }
    ],
    image: 'https://source.unsplash.com/800x600/?logistics,warehouse,technology',
    testimonial: 'The strategic transformation delivered by Cipher Strategy exceeded every expectation. Their approach to AI implementation was methodical, practical, and delivered measurable results from day one.',
    timeline: '6 months implementation, 18 months total engagement'
  },
  demo: {
    type: 'analytics',
    title: 'Strategic Intelligence Dashboard',
    description: 'Experience how our AI-powered analytics provide real-time strategic insights and decision support.',
    features: [
      'Real-time performance monitoring',
      'Predictive trend analysis',
      'Strategic recommendation engine',
      'ROI tracking and forecasting'
    ],
    interactive: true
  }
};
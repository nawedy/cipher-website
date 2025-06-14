// src/data/divisions/digitalworks.ts
// Complete configuration for Cipher DigitalWorks - AI-powered growth and content automation

import { DivisionConfig } from '@/types/divisions';

export const digitalworksDivisionConfig: DivisionConfig = {
  id: 'digitalworks',
  name: 'Cipher DigitalWorks',
  tagline: 'Content, campaigns, and growth built for impact',
  description: 'Accelerate your digital presence with AI-powered content creation, intelligent marketing automation, and data-driven growth strategies that deliver measurable results at scale.',
  colors: {
    primary: '#088B8B',
    secondary: '#00FFF7',
    accent: '#FF2994',
    neon: '#2FE4FF',
    background: '#0a0f0f',
    backgroundGradient: 'linear-gradient(135deg, #088B8B 0%, #0a0f0f 100%)',
    cardBackground: 'rgba(8, 139, 139, 0.1)',
    textPrimary: '#ffffff',
    textSecondary: '#8b9dc3',
    border: 'rgba(47, 228, 255, 0.15)'
  },
  services: [
    {
      id: 'content-automation',
      title: 'AI Content Automation',
      description: 'Scale your content production exponentially with intelligent automation that maintains brand voice consistency while driving maximum engagement.',
      icon: 'FileText',
      features: [
        'Automated blog and social content generation',
        'Brand voice consistency across all channels',
        'Multi-platform distribution and optimization',
        'Real-time performance tracking and adjustment'
      ],
      ctaText: 'Automate Content',
      ctaLink: '/contact?service=content-automation',
      highlighted: true
    },
    {
      id: 'campaign-intelligence',
      title: 'Campaign Intelligence',
      description: 'AI-powered campaign optimization that adapts in real-time to maximize ROI, audience engagement, and conversion rates across all channels.',
      icon: 'Target',
      features: [
        'Real-time campaign optimization algorithms',
        'Advanced audience segmentation and targeting',
        'Predictive performance modeling',
        'Cross-channel attribution and insights'
      ],
      ctaText: 'Optimize Campaigns',
      ctaLink: '/contact?service=campaign-intelligence',
      highlighted: false
    },
    {
      id: 'growth-automation',
      title: 'Growth Automation',
      description: 'Intelligent growth engines that identify opportunities, execute strategies, and scale your revenue through automated systems and processes.',
      icon: 'TrendingUp',
      features: [
        'Automated lead qualification and scoring',
        'Conversion funnel optimization',
        'Customer retention automation workflows',
        'Revenue attribution and forecasting'
      ],
      ctaText: 'Drive Growth',
      ctaLink: '/contact?service=growth-automation',
      highlighted: false
    },
    {
      id: 'social-intelligence',
      title: 'Social Intelligence',
      description: 'Harness social data and AI to build authentic connections, manage brand reputation, and drive meaningful community engagement.',
      icon: 'MessageSquare',
      features: [
        'Real-time sentiment analysis and monitoring',
        'Influence mapping and partnership identification',
        'Community building and engagement automation',
        'Crisis management and response protocols'
      ],
      ctaText: 'Build Community',
      ctaLink: '/contact?service=social-intelligence',
      highlighted: false
    }
  ],
  process: [
    {
      step: 1,
      title: 'Audit & Strategy',
      description: 'Comprehensive analysis of your current digital presence and identification of high-impact growth opportunities through AI-powered insights.',
      icon: 'Search',
      duration: '1-2 weeks',
      details: [
        'Digital presence audit and competitive analysis',
        'Content performance evaluation',
        'Audience behavior and preference mapping',
        'Growth opportunity identification'
      ]
    },
    {
      step: 2,
      title: 'System Design',
      description: 'Architect intelligent automation systems and workflows tailored to your brand identity and specific growth objectives.',
      icon: 'Settings',
      duration: '2-3 weeks',
      details: [
        'Automation workflow design',
        'Content strategy framework',
        'Campaign architecture planning',
        'Integration system setup'
      ]
    },
    {
      step: 3,
      title: 'Implementation',
      description: 'Deploy AI-powered solutions with seamless integration into your existing marketing stack and operational workflows.',
      icon: 'Rocket',
      duration: '3-4 weeks',
      details: [
        'Platform integration and setup',
        'Content automation deployment',
        'Campaign launch and monitoring',
        'Team training and onboarding'
      ]
    },
    {
      step: 4,
      title: 'Optimization',
      description: 'Continuous monitoring, performance analysis, and system refinement to maximize growth metrics and ROI.',
      icon: 'BarChart',
      duration: 'Ongoing',
      details: [
        'Performance monitoring and reporting',
        'A/B testing and optimization',
        'Strategy refinement and scaling',
        'Advanced feature rollouts'
      ]
    }
  ],
  pricing: [
    {
      id: 'growth-starter',
      name: 'Growth Starter',
      price: '$3,500',
      period: 'month',
      description: 'Essential digital growth tools perfect for emerging businesses and startups ready to scale their online presence.',
      features: [
        'Content automation for 2 platforms',
        'Basic campaign optimization',
        'Social media scheduling and posting',
        'Monthly performance reports',
        'Email support and consultation'
      ],
      highlighted: false,
      ctaText: 'Start Growing'
    },
    {
      id: 'scale-professional',
      name: 'Scale Professional',
      price: '$8,500',
      period: 'month',
      description: 'Advanced automation and intelligence for established businesses ready to accelerate growth and market expansion.',
      features: [
        'Everything in Growth Starter',
        'Advanced AI personalization engines',
        'Multi-channel campaign automation',
        'Real-time optimization algorithms',
        'Weekly strategy sessions',
        'Priority support with dedicated success manager'
      ],
      highlighted: true,
      popular: true,
      ctaText: 'Scale Up',
      savings: 'Most Popular'
    },
    {
      id: 'enterprise-acceleration',
      name: 'Enterprise Acceleration',
      price: 'Custom',
      period: 'engagement',
      description: 'Full-scale growth transformation for large enterprises with complex multi-brand and international requirements.',
      features: [
        'Everything in Scale Professional',
        'Custom AI model development',
        'Enterprise-grade integrations',
        'Multi-brand campaign orchestration',
        'Dedicated growth team assignment',
        '24/7 support with guaranteed SLA'
      ],
      highlighted: false,
      ctaText: 'Contact Sales'
    }
  ],
  testimonials: [
    {
      id: '1',
      name: 'Jennifer Walsh',
      title: 'Head of Marketing',
      company: 'TechStart Innovations',
      content: 'DigitalWorks transformed our content game completely. We went from publishing 2 blog posts per week to 15 pieces of high-quality content daily across all platforms. Our engagement rates increased by 340% in just 3 months.',
      avatar: 'https://source.unsplash.com/100x100/?woman,marketing,professional',
      rating: 5,
      industry: 'Technology'
    },
    {
      id: '2',
      name: 'Carlos Martinez',
      title: 'VP of Growth',
      company: 'E-commerce Dynamics',
      content: 'The growth automation systems they built for us are incredible. We\'re now generating 5x more qualified leads while spending 60% less time on manual campaign management. ROI has never been better.',
      avatar: 'https://source.unsplash.com/100x100/?man,executive,hispanic',
      rating: 5,
      industry: 'E-commerce'
    },
    {
      id: '3',
      name: 'Lisa Park',
      title: 'Digital Marketing Director',
      company: 'SaaS Solutions Inc',
      content: 'Their AI-powered campaign intelligence helped us identify and capture market opportunities we never knew existed. Customer acquisition costs dropped by 45% while conversion rates doubled.',
      avatar: 'https://source.unsplash.com/100x100/?woman,asian,business',
      rating: 5,
      industry: 'SaaS'
    }
  ],
  faqs: [
    {
      id: '1',
      question: 'How quickly can we see results from your growth automation?',
      answer: 'Most clients see initial improvements within 2-3 weeks of implementation, with significant growth metrics typically emerging by week 6-8. The AI systems learn and optimize continuously, so performance compounds over time.',
      category: 'Timeline'
    },
    {
      id: '2',
      question: 'What platforms and tools do you integrate with?',
      answer: 'We integrate with 200+ marketing tools including HubSpot, Salesforce, Mailchimp, Google Ads, Facebook Ads, LinkedIn, Twitter, Instagram, WordPress, Shopify, and most major CRM and analytics platforms.',
      category: 'Integration'
    },
    {
      id: '3',
      question: 'How do you ensure brand voice consistency in automated content?',
      answer: 'Our AI content systems are trained specifically on your brand guidelines, tone, and existing high-performing content. We use advanced natural language processing to maintain authenticity while scaling production.',
      category: 'Quality'
    },
    {
      id: '4',
      question: 'Can you work with our existing marketing team?',
      answer: 'Absolutely. Our systems are designed to augment and empower your team, not replace them. We provide comprehensive training and create workflows that enhance your team\'s capabilities and efficiency.',
      category: 'Collaboration'
    },
    {
      id: '5',
      question: 'What kind of ROI can we expect?',
      answer: 'While results vary by industry and starting point, our clients typically see 200-400% ROI within the first year, with many achieving 5-10x improvements in key growth metrics like lead generation and customer acquisition.',
      category: 'ROI'
    }
  ],
  caseStudy: {
    title: 'E-commerce Growth Acceleration',
    client: 'Fashion Forward Retail',
    industry: 'E-commerce & Retail',
    challenge: 'Mid-sized fashion retailer struggling with content production bottlenecks, inefficient ad spend, and declining organic reach across social platforms. Manual processes were limiting growth potential.',
    solution: 'Implemented comprehensive growth automation including AI content creation, dynamic campaign optimization, and intelligent social media management. Deployed predictive analytics for inventory-based content and seasonal campaign planning.',
    results: [
      {
        metric: 'Content Output',
        value: '15x',
        description: 'Increase in daily content production across all channels',
        icon: 'FileText'
      },
      {
        metric: 'Ad Efficiency',
        value: '67%',
        description: 'Reduction in cost per acquisition across paid channels',
        icon: 'Target'
      },
      {
        metric: 'Revenue Growth',
        value: '280%',
        description: 'Year-over-year revenue increase from digital channels',
        icon: 'TrendingUp'
      }
    ],
    image: 'https://source.unsplash.com/800x600/?ecommerce,fashion,retail,technology',
    testimonial: 'DigitalWorks didn\'t just automate our marketing – they transformed our entire approach to growth. The results speak for themselves.',
    timeline: '4 months implementation, 12 months total engagement'
  },
  demo: {
    type: 'dashboard',
    title: 'Growth Intelligence Dashboard',
    description: 'See how our AI-powered analytics provide real-time insights and automated optimization recommendations.',
    features: [
      'Real-time campaign performance monitoring',
      'Automated content scheduling and optimization',
      'Predictive growth forecasting',
      'Cross-channel attribution insights'
    ],
    interactive: true
  }
};
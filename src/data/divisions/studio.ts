// src/data/divisions/studio.ts
// Complete configuration for Cipher Studio - Modern web development and digital experiences

import { DivisionConfig } from '@/types/divisions';

export const studioDivisionConfig: DivisionConfig = {
  id: 'studio',
  name: 'Cipher Studio',
  tagline: 'Designing tomorrow\'s web, today',
  description: 'Create exceptional digital experiences with cutting-edge web applications, mobile solutions, and user interfaces that blend aesthetic excellence with powerful functionality and seamless user journeys.',
  colors: {
    primary: '#4B5665',
    secondary: '#C0C0C0',
    accent: '#2FE4FF',
    neon: '#2FE4FF',
    background: '#0f0f0f',
    backgroundGradient: 'linear-gradient(135deg, #4B5665 0%, #0f0f0f 100%)',
    cardBackground: 'rgba(75, 86, 101, 0.1)',
    textPrimary: '#ffffff',
    textSecondary: '#8b9dc3',
    border: 'rgba(47, 228, 255, 0.15)'
  },
  services: [
    {
      id: 'web-development',
      title: 'Next-Gen Web Applications',
      description: 'Build lightning-fast, scalable web applications using modern frameworks like Next.js, React, and cutting-edge technologies that deliver exceptional user experiences.',
      icon: 'Code',
      features: [
        'React/Next.js application development',
        'Progressive Web App (PWA) creation',
        'API integration and backend development',
        'Performance optimization and SEO'
      ],
      ctaText: 'Build Web App',
      ctaLink: '/contact?service=web-development',
      highlighted: true
    },
    {
      id: 'mobile-apps',
      title: 'Cross-Platform Mobile Apps',
      description: 'Develop stunning mobile applications that work seamlessly across iOS and Android platforms, delivering native performance with shared codebases.',
      icon: 'Smartphone',
      features: [
        'React Native and Flutter development',
        'Native iOS and Android applications',
        'Cross-platform compatibility',
        'App store optimization and deployment'
      ],
      ctaText: 'Create Mobile App',
      ctaLink: '/contact?service=mobile-apps',
      highlighted: false
    },
    {
      id: 'ui-ux-design',
      title: 'UI/UX Design Excellence',
      description: 'Craft intuitive, beautiful user interfaces and experiences that convert visitors into customers through data-driven design principles and user psychology.',
      icon: 'Palette',
      features: [
        'User experience research and strategy',
        'Interface design and prototyping',
        'Design system creation',
        'Conversion optimization through design'
      ],
      ctaText: 'Design Experience',
      ctaLink: '/contact?service=ui-ux-design',
      highlighted: false
    },
    {
      id: 'saas-platforms',
      title: 'SaaS Platform Development',
      description: 'End-to-end SaaS platform creation including user authentication, subscription management, analytics, and scalable infrastructure architecture.',
      icon: 'Globe',
      features: [
        'Full-stack SaaS development',
        'User authentication and authorization',
        'Subscription and billing integration',
        'Analytics and dashboard creation'
      ],
      ctaText: 'Launch Platform',
      ctaLink: '/contact?service=saas-platforms',
      highlighted: false
    }
  ],
  process: [
    {
      step: 1,
      title: 'Discovery & Planning',
      description: 'Understand your vision, analyze requirements, and create detailed project specifications with wireframes and technical architecture.',
      icon: 'Search',
      duration: '1-2 weeks',
      details: [
        'Requirements gathering and analysis',
        'User research and persona development',
        'Technical architecture planning',
        'Project timeline and milestone definition'
      ]
    },
    {
      step: 2,
      title: 'Design & Prototyping',
      description: 'Create stunning visual designs, interactive prototypes, and comprehensive design systems that guide the development process.',
      icon: 'Figma',
      duration: '2-3 weeks',
      details: [
        'UI/UX design creation',
        'Interactive prototype development',
        'Design system establishment',
        'User testing and feedback integration'
      ]
    },
    {
      step: 3,
      title: 'Development & Testing',
      description: 'Build your application using modern development practices, including automated testing, code reviews, and continuous integration.',
      icon: 'Code',
      duration: '6-12 weeks',
      details: [
        'Agile development sprints',
        'Automated testing implementation',
        'Code reviews and quality assurance',
        'Performance optimization'
      ]
    },
    {
      step: 4,
      title: 'Launch & Support',
      description: 'Deploy your application with monitoring systems, provide comprehensive documentation, and offer ongoing maintenance and support.',
      icon: 'Rocket',
      duration: 'Ongoing',
      details: [
        'Production deployment and monitoring',
        'Documentation and training',
        'Performance monitoring',
        'Ongoing maintenance and updates'
      ]
    }
  ],
  pricing: [
    {
      id: 'startup-mvp',
      name: 'Startup MVP',
      price: '$15,000',
      period: 'project',
      description: 'Perfect for startups and small businesses looking to validate their ideas with a minimum viable product.',
      features: [
        'MVP web or mobile application',
        'Core feature development (3-5 features)',
        'Basic UI/UX design',
        '8-week development timeline',
        'Basic analytics and monitoring'
      ],
      highlighted: false,
      ctaText: 'Build MVP'
    },
    {
      id: 'business-app',
      name: 'Business Application',
      price: '$45,000',
      period: 'project',
      description: 'Comprehensive applications for established businesses ready to scale their digital presence and operations.',
      features: [
        'Everything in Startup MVP',
        'Advanced feature development (10+ features)',
        'Custom UI/UX design system',
        'API integrations and backend development',
        'Advanced analytics and admin dashboard',
        '16-week development timeline'
      ],
      highlighted: true,
      popular: true,
      ctaText: 'Build Application',
      savings: 'Most Popular'
    },
    {
      id: 'enterprise-platform',
      name: 'Enterprise Platform',
      price: 'Custom',
      period: 'engagement',
      description: 'Large-scale platform development for enterprises requiring complex integrations, advanced security, and scalable architecture.',
      features: [
        'Everything in Business Application',
        'Enterprise-grade security and compliance',
        'Custom integrations and APIs',
        'Scalable cloud infrastructure',
        'Multi-tenant architecture',
        'Dedicated development team'
      ],
      highlighted: false,
      ctaText: 'Contact Sales'
    }
  ],
  testimonials: [
    {
      id: '1',
      name: 'Rachel Thompson',
      title: 'Founder & CEO',
      company: 'FinTech Solutions',
      content: 'Cipher Studio built our entire SaaS platform from scratch. The quality is exceptional, and they delivered ahead of schedule. Our user engagement metrics are 3x higher than industry averages thanks to their UX expertise.',
      avatar: 'https://source.unsplash.com/100x100/?woman,ceo,fintech,professional',
      rating: 5,
      industry: 'FinTech'
    },
    {
      id: '2',
      name: 'David Kumar',
      title: 'CTO',
      company: 'HealthTech Innovations',
      content: 'Their technical expertise is outstanding. They built a complex healthcare platform that handles sensitive data with perfect security compliance. The code quality and architecture are world-class.',
      avatar: 'https://source.unsplash.com/100x100/?man,cto,indian,technology',
      rating: 5,
      industry: 'Healthcare'
    },
    {
      id: '3',
      name: 'Maria Garcia',
      title: 'Product Manager',
      company: 'EdTech Platform',
      content: 'The mobile app they created for us has been downloaded over 100k times with a 4.8 star rating. Their attention to user experience and performance optimization is incredible.',
      avatar: 'https://source.unsplash.com/100x100/?woman,product,manager,education',
      rating: 5,
      industry: 'Education'
    }
  ],
  faqs: [
    {
      id: '1',
      question: 'What technologies do you use for development?',
      answer: 'We use modern, proven technologies including React, Next.js, TypeScript, Node.js, Python, React Native, Flutter, and leading cloud platforms like AWS and Vercel. We choose the best technology stack for each project\'s specific needs.',
      category: 'Technology'
    },
    {
      id: '2',
      question: 'How do you ensure quality and performance?',
      answer: 'We follow rigorous development practices including automated testing, code reviews, performance optimization, and continuous integration. Every application undergoes thorough testing before deployment.',
      category: 'Quality'
    },
    {
      id: '3',
      question: 'Do you provide ongoing maintenance and support?',
      answer: 'Yes, we offer comprehensive maintenance packages including bug fixes, security updates, feature enhancements, and technical support. We can also provide dedicated development teams for ongoing projects.',
      category: 'Support'
    },
    {
      id: '4',
      question: 'Can you integrate with our existing systems?',
      answer: 'Absolutely. We have extensive experience integrating with CRMs, ERPs, payment systems, analytics platforms, and custom APIs. We ensure seamless data flow between your new application and existing tools.',
      category: 'Integration'
    },
    {
      id: '5',
      question: 'What\'s included in your design process?',
      answer: 'Our design process includes user research, wireframing, visual design, interactive prototyping, user testing, and design system creation. We focus on both aesthetics and conversion optimization.',
      category: 'Design'
    }
  ],
  caseStudy: {
    title: 'Revolutionary SaaS Platform for Legal Tech',
    client: 'LegalFlow Technologies',
    industry: 'Legal Technology',
    challenge: 'Law firm needed a comprehensive case management platform to replace outdated systems. Required complex document management, client portals, billing integration, and compliance with legal industry standards.',
    solution: 'Built a full-stack SaaS platform with React/Next.js frontend, Node.js backend, and advanced document processing. Implemented role-based access, automated workflows, and integrated billing systems with bank-level security.',
    results: [
      {
        metric: 'User Adoption',
        value: '95%',
        description: 'Firm-wide adoption rate within 3 months of launch',
        icon: 'Users'
      },
      {
        metric: 'Efficiency Gain',
        value: '60%',
        description: 'Reduction in case processing time',
        icon: 'Clock'
      },
      {
        metric: 'Revenue Impact',
        value: '$2.4M',
        description: 'Additional annual revenue from improved efficiency',
        icon: 'DollarSign'
      }
    ],
    image: 'https://source.unsplash.com/800x600/?legal,technology,office,software',
    testimonial: 'Cipher Studio transformed our entire practice. The platform they built is intuitive, powerful, and has revolutionized how we serve our clients.',
    timeline: '6 months development, 12 months total engagement'
  },
  demo: {
    type: 'workflow',
    title: 'Development Process Showcase',
    description: 'See our systematic approach to building world-class web and mobile applications.',
    features: [
      'Interactive design prototyping',
      'Real-time collaboration tools',
      'Automated testing and deployment',
      'Performance monitoring dashboard'
    ],
    interactive: true
  }
};
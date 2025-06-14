// src/data/divisions/ai.ts
// Complete configuration for Cipher AI - Custom AI models and intelligent automation

import { DivisionConfig } from '@/types/divisions';

export const aiDivisionConfig: DivisionConfig = {
  id: 'ai',
  name: 'Cipher AI',
  tagline: 'Intelligence, redefined. Proprietary AI, next-gen performance.',
  description: 'Transform your business with custom AI models, intelligent automation, and cutting-edge machine learning solutions that deliver unprecedented performance and competitive advantage.',
  colors: {
    primary: '#222328',
    secondary: '#FF6B35',
    accent: '#A259FF',
    neon: '#FF6B35',
    background: '#0a0a0a',
    backgroundGradient: 'linear-gradient(135deg, #222328 0%, #0a0a0a 100%)',
    cardBackground: 'rgba(34, 35, 40, 0.1)',
    textPrimary: '#ffffff',
    textSecondary: '#8b9dc3',
    border: 'rgba(255, 107, 53, 0.15)'
  },
  services: [
    {
      id: 'custom-ai-models',
      title: 'Custom AI Model Development',
      description: 'Build proprietary AI models tailored to your specific business needs, from natural language processing to computer vision and predictive analytics.',
      icon: 'Brain',
      features: [
        'Custom neural network architecture',
        'Domain-specific model training',
        'Advanced fine-tuning and optimization',
        'Model deployment and scaling infrastructure'
      ],
      ctaText: 'Build AI Model',
      ctaLink: '/contact?service=custom-ai-models',
      highlighted: true
    },
    {
      id: 'ai-integration',
      title: 'AI Integration Services',
      description: 'Seamlessly integrate AI capabilities into your existing systems and workflows, enhancing productivity and decision-making across your organization.',
      icon: 'Zap',
      features: [
        'Legacy system AI enhancement',
        'API development and integration',
        'Workflow automation with AI',
        'Real-time AI processing systems'
      ],
      ctaText: 'Integrate AI',
      ctaLink: '/contact?service=ai-integration',
      highlighted: false
    },
    {
      id: 'ai-consulting',
      title: 'AI Technical Consulting',
      description: 'Expert guidance on AI strategy, technology selection, and implementation roadmaps to maximize your AI investment and achieve business objectives.',
      icon: 'MessageSquare',
      features: [
        'AI readiness assessment',
        'Technology stack recommendations',
        'Implementation strategy development',
        'Performance optimization guidance'
      ],
      ctaText: 'Get AI Guidance',
      ctaLink: '/contact?service=ai-consulting',
      highlighted: false
    },
    {
      id: 'intelligent-automation',
      title: 'Intelligent Process Automation',
      description: 'Transform business processes with AI-powered automation that learns, adapts, and optimizes operations for maximum efficiency and accuracy.',
      icon: 'Cog',
      features: [
        'Robotic Process Automation (RPA)',
        'Intelligent document processing',
        'Predictive maintenance systems',
        'Automated decision-making engines'
      ],
      ctaText: 'Automate Processes',
      ctaLink: '/contact?service=intelligent-automation',
      highlighted: false
    }
  ],
  process: [
    {
      step: 1,
      title: 'AI Assessment',
      description: 'Evaluate your current systems, identify AI opportunities, and define success metrics for custom AI implementation.',
      icon: 'Search',
      duration: '2-3 weeks',
      details: [
        'Current state analysis and data audit',
        'AI opportunity identification',
        'Technical requirements gathering',
        'Success metrics and KPI definition'
      ]
    },
    {
      step: 2,
      title: 'Model Design',
      description: 'Design custom AI architectures, select optimal algorithms, and create detailed technical specifications for development.',
      icon: 'PenTool',
      duration: '3-4 weeks',
      details: [
        'AI model architecture design',
        'Algorithm selection and optimization',
        'Data pipeline architecture',
        'Infrastructure requirements planning'
      ]
    },
    {
      step: 3,
      title: 'Development & Training',
      description: 'Build, train, and optimize your custom AI models using advanced machine learning techniques and proprietary datasets.',
      icon: 'Code',
      duration: '8-16 weeks',
      details: [
        'Model development and training',
        'Performance optimization and tuning',
        'Testing and validation protocols',
        'Integration development'
      ]
    },
    {
      step: 4,
      title: 'Deployment & Monitoring',
      description: 'Deploy AI models to production with comprehensive monitoring, continuous learning, and performance optimization systems.',
      icon: 'Activity',
      duration: 'Ongoing',
      details: [
        'Production deployment and scaling',
        'Performance monitoring and alerting',
        'Continuous model improvement',
        'Maintenance and support'
      ]
    }
  ],
  pricing: [
    {
      id: 'ai-pilot',
      name: 'AI Pilot',
      price: '$35,000',
      period: 'project',
      description: 'Proof-of-concept AI development perfect for validating AI applications and demonstrating business value.',
      features: [
        'Custom AI model development',
        'Proof-of-concept implementation',
        'Performance benchmarking',
        '8-12 week development cycle',
        'Documentation and knowledge transfer'
      ],
      highlighted: false,
      ctaText: 'Start AI Pilot'
    },
    {
      id: 'ai-production',
      name: 'AI Production',
      price: '$85,000',
      period: 'project',
      description: 'Production-ready AI systems for businesses ready to deploy AI at scale with enterprise-grade performance.',
      features: [
        'Everything in AI Pilot',
        'Production-grade model development',
        'Scalable deployment infrastructure',
        'Advanced monitoring and optimization',
        'Integration with existing systems',
        '16-24 week development timeline'
      ],
      highlighted: true,
      popular: true,
      ctaText: 'Deploy AI',
      savings: 'Best Value'
    },
    {
      id: 'ai-enterprise',
      name: 'AI Enterprise',
      price: 'Custom',
      period: 'engagement',
      description: 'Comprehensive AI transformation for large enterprises requiring multiple AI systems and advanced capabilities.',
      features: [
        'Everything in AI Production',
        'Multiple AI model development',
        'Enterprise integration suite',
        'Advanced security and compliance',
        'Dedicated AI team assignment',
        'Ongoing optimization and enhancement'
      ],
      highlighted: false,
      ctaText: 'Transform Enterprise'
    }
  ],
  testimonials: [
    {
      id: '1',
      name: 'Dr. Amanda Foster',
      title: 'Chief Data Officer',
      company: 'Global Insurance Corp',
      content: 'The custom AI models Cipher AI built for us revolutionized our risk assessment process. We\'re now processing claims 10x faster with 95% accuracy, saving millions annually while improving customer satisfaction.',
      avatar: 'https://source.unsplash.com/100x100/?woman,data,scientist,insurance',
      rating: 5,
      industry: 'Insurance'
    },
    {
      id: '2',
      name: 'Robert Kim',
      title: 'VP of Operations',
      company: 'Manufacturing Excellence',
      content: 'Their predictive maintenance AI has transformed our manufacturing operations. We\'ve reduced unplanned downtime by 80% and increased overall equipment effectiveness by 35%. The ROI was realized within 6 months.',
      avatar: 'https://source.unsplash.com/100x100/?man,operations,manufacturing,korean',
      rating: 5,
      industry: 'Manufacturing'
    },
    {
      id: '3',
      name: 'Lisa Thompson',
      title: 'Head of Innovation',
      company: 'Retail Dynamics',
      content: 'The AI-powered personalization engine they developed increased our conversion rates by 180% and customer lifetime value by 150%. It\'s like having a personal shopping assistant for every customer.',
      avatar: 'https://source.unsplash.com/100x100/?woman,retail,innovation,technology',
      rating: 5,
      industry: 'Retail'
    }
  ],
  faqs: [
    {
      id: '1',
      question: 'What types of AI models can you develop?',
      answer: 'We develop a full spectrum of AI models including natural language processing, computer vision, predictive analytics, recommendation systems, anomaly detection, and custom neural networks. We tailor each model to your specific business requirements.',
      category: 'AI Capabilities'
    },
    {
      id: '2',
      question: 'How do you ensure AI model accuracy and reliability?',
      answer: 'We use rigorous testing methodologies, cross-validation techniques, and continuous monitoring systems. Our models undergo extensive training with diverse datasets and are validated against real-world scenarios before deployment.',
      category: 'Quality Assurance'
    },
    {
      id: '3',
      question: 'What data requirements do you have for AI development?',
      answer: 'Data requirements vary by project, but we can work with existing datasets, help you collect new data, or use synthetic data generation techniques. We also provide data cleaning, preprocessing, and augmentation services.',
      category: 'Data Requirements'
    },
    {
      id: '4',
      question: 'How do you handle AI model deployment and scaling?',
      answer: 'We deploy models using modern cloud infrastructure with auto-scaling capabilities. Our deployment includes monitoring dashboards, performance tracking, and automated retraining systems to maintain optimal performance.',
      category: 'Deployment'
    },
    {
      id: '5',
      question: 'Do you provide ongoing AI model maintenance?',
      answer: 'Yes, we offer comprehensive maintenance including performance monitoring, model retraining, accuracy improvement, and adaptation to changing business requirements. AI models require ongoing care to maintain peak performance.',
      category: 'Maintenance'
    }
  ],
  caseStudy: {
    title: 'AI-Powered Fraud Detection System',
    client: 'SecureBank Financial',
    industry: 'Financial Services',
    challenge: 'Major financial institution was losing $50M annually to sophisticated fraud schemes. Traditional rule-based systems had high false positive rates and couldn\'t adapt to emerging fraud patterns quickly enough.',
    solution: 'Developed a real-time AI fraud detection system using ensemble machine learning models, graph neural networks for relationship analysis, and adaptive learning algorithms that continuously improve from new fraud patterns.',
    results: [
      {
        metric: 'Fraud Detection',
        value: '99.2%',
        description: 'Accuracy rate for identifying fraudulent transactions',
        icon: 'Shield'
      },
      {
        metric: 'False Positives',
        value: '87%',
        description: 'Reduction in false positive rates',
        icon: 'CheckCircle'
      },
      {
        metric: 'Annual Savings',
        value: '$48M',
        description: 'Prevented fraud losses in first year',
        icon: 'DollarSign'
      }
    ],
    image: 'https://source.unsplash.com/800x600/?cybersecurity,fraud,detection,ai',
    testimonial: 'Cipher AI\'s fraud detection system is a game-changer. It\'s like having thousands of expert fraud analysts working 24/7 with superhuman accuracy.',
    timeline: '6 months development, 18 months total engagement'
  },
  demo: {
    type: 'analytics',
    title: 'AI Performance Dashboard',
    description: 'Monitor your AI models in real-time with comprehensive performance metrics and optimization insights.',
    features: [
      'Real-time model performance monitoring',
      'Accuracy and efficiency metrics',
      'Automated retraining alerts',
      'Business impact analytics'
    ],
    interactive: true
  }
};
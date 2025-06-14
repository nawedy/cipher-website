// src/data/divisions/labs.ts
// Complete configuration for Cipher Labs - AI research, innovation, and prototype development

import { DivisionConfig } from '@/types/divisions';

export const labsDivisionConfig: DivisionConfig = {
  id: 'labs',
  name: 'Cipher Labs',
  tagline: 'We don\'t just build AI products. We build the future.',
  description: 'Push the boundaries of what\'s possible with cutting-edge AI research, rapid prototype development, and breakthrough innovation that transforms industries and creates new market opportunities.',
  colors: {
    primary: '#00BFFF',
    secondary: '#312066',
    accent: '#9F5AFF',
    neon: '#64FFDA',
    background: '#0a0a0f',
    backgroundGradient: 'linear-gradient(135deg, #00BFFF 0%, #312066 100%)',
    cardBackground: 'rgba(0, 191, 255, 0.1)',
    textPrimary: '#ffffff',
    textSecondary: '#8b9dc3',
    border: 'rgba(100, 255, 218, 0.15)'
  },
  services: [
    {
      id: 'ai-research',
      title: 'AI Research & Development',
      description: 'Pioneering research into next-generation AI technologies, from advanced neural architectures to novel machine learning paradigms that redefine industry standards.',
      icon: 'Brain',
      features: [
        'Custom neural network architecture design',
        'Advanced machine learning model development',
        'AI algorithm optimization and enhancement',
        'Research publication and patent support'
      ],
      ctaText: 'Explore Research',
      ctaLink: '/contact?service=ai-research',
      highlighted: true
    },
    {
      id: 'prototype-development',
      title: 'Rapid Prototype Development',
      description: 'Transform breakthrough ideas into working prototypes with our accelerated development process, validating concepts and proving market viability.',
      icon: 'Zap',
      features: [
        'Concept-to-prototype in 4-8 weeks',
        'MVP development and market testing',
        'Technical feasibility assessment',
        'Investor demo and presentation support'
      ],
      ctaText: 'Build Prototype',
      ctaLink: '/contact?service=prototype-development',
      highlighted: false
    },
    {
      id: 'innovation-consulting',
      title: 'Innovation Strategy Consulting',
      description: 'Strategic guidance on emerging technologies, market disruption opportunities, and innovation roadmaps that position you ahead of the competition.',
      icon: 'Lightbulb',
      features: [
        'Technology trend analysis and forecasting',
        'Innovation opportunity assessment',
        'R&D strategy and roadmap development',
        'Partnership and acquisition guidance'
      ],
      ctaText: 'Innovate Strategy',
      ctaLink: '/contact?service=innovation-consulting',
      highlighted: false
    },
    {
      id: 'emerging-tech',
      title: 'Emerging Technology Integration',
      description: 'Stay ahead of the curve with early access to cutting-edge technologies including quantum computing, advanced robotics, and next-gen AI systems.',
      icon: 'Cpu',
      features: [
        'Quantum computing applications',
        'Advanced robotics and automation',
        'Neural interface technology',
        'Blockchain and Web3 integration'
      ],
      ctaText: 'Explore Future Tech',
      ctaLink: '/contact?service=emerging-tech',
      highlighted: false
    }
  ],
  process: [
    {
      step: 1,
      title: 'Discovery & Research',
      description: 'Deep dive into the problem space, exploring cutting-edge research, identifying technological opportunities, and defining innovation parameters.',
      icon: 'Search',
      duration: '2-3 weeks',
      details: [
        'Technology landscape analysis',
        'Research literature review',
        'Feasibility assessment',
        'Innovation opportunity mapping'
      ]
    },
    {
      step: 2,
      title: 'Design & Architecture',
      description: 'Create detailed technical specifications, system architecture, and development roadmaps for breakthrough solutions.',
      icon: 'PenTool',
      duration: '3-4 weeks',
      details: [
        'Technical architecture design',
        'Algorithm development strategy',
        'System specifications creation',
        'Risk assessment and mitigation'
      ]
    },
    {
      step: 3,
      title: 'Prototype Development',
      description: 'Build working prototypes using agile development methodologies, incorporating continuous testing and iteration cycles.',
      icon: 'Code',
      duration: '6-12 weeks',
      details: [
        'Rapid prototype development',
        'Iterative testing and refinement',
        'Performance optimization',
        'Documentation and knowledge transfer'
      ]
    },
    {
      step: 4,
      title: 'Validation & Scale',
      description: 'Validate prototypes through rigorous testing, prepare for market deployment, and develop scaling strategies.',
      icon: 'Rocket',
      duration: 'Ongoing',
      details: [
        'Market validation testing',
        'Performance benchmarking',
        'Scaling strategy development',
        'IP protection and commercialization'
      ]
    }
  ],
  pricing: [
    {
      id: 'research-sprint',
      name: 'Research Sprint',
      price: '$25,000',
      period: 'project',
      description: 'Focused research projects perfect for validating breakthrough concepts and exploring innovative technology applications.',
      features: [
        'Technical feasibility assessment',
        'Proof-of-concept development',
        'Research documentation',
        '4-week sprint methodology',
        'Final presentation and roadmap'
      ],
      highlighted: false,
      ctaText: 'Start Research'
    },
    {
      id: 'innovation-lab',
      name: 'Innovation Lab',
      price: '$75,000',
      period: 'project',
      description: 'Comprehensive innovation projects for companies ready to push technological boundaries and create market-leading solutions.',
      features: [
        'Everything in Research Sprint',
        'Working prototype development',
        'Advanced AI model creation',
        'Market validation testing',
        'IP strategy and patent support',
        'Dedicated research team'
      ],
      highlighted: true,
      popular: true,
      ctaText: 'Build Innovation',
      savings: 'Best Value'
    },
    {
      id: 'future-tech',
      name: 'Future Tech Partnership',
      price: 'Custom',
      period: 'engagement',
      description: 'Long-term strategic partnerships for enterprises investing in next-generation technology research and development.',
      features: [
        'Everything in Innovation Lab',
        'Ongoing research collaboration',
        'Exclusive technology access',
        'Custom research initiatives',
        'Joint IP development',
        'Executive advisory services'
      ],
      highlighted: false,
      ctaText: 'Partner With Us'
    }
  ],
  testimonials: [
    {
      id: '1',
      name: 'Dr. Michael Chen',
      title: 'Chief Technology Officer',
      company: 'Quantum Dynamics Corp',
      content: 'Cipher Labs helped us pioneer quantum-classical hybrid algorithms that gave us a 3-year competitive advantage. Their research capabilities are truly world-class, and they understand both the science and business implications.',
      avatar: 'https://source.unsplash.com/100x100/?man,scientist,asian,professional',
      rating: 5,
      industry: 'Quantum Computing'
    },
    {
      id: '2',
      name: 'Sarah Rodriguez',
      title: 'VP of Innovation',
      company: 'BioTech Innovations',
      content: 'The AI-powered drug discovery platform they prototyped for us revolutionized our research process. What used to take months now happens in weeks, and the accuracy improvements are remarkable.',
      avatar: 'https://source.unsplash.com/100x100/?woman,scientist,lab,professional',
      rating: 5,
      industry: 'Biotechnology'
    },
    {
      id: '3',
      name: 'James Patterson',
      title: 'Head of R&D',
      company: 'Autonomous Systems Ltd',
      content: 'Their breakthrough work in neural interface technology opened entirely new product categories for us. The team\'s ability to translate cutting-edge research into practical applications is unmatched.',
      avatar: 'https://source.unsplash.com/100x100/?man,engineer,robotics',
      rating: 5,
      industry: 'Robotics'
    }
  ],
  faqs: [
    {
      id: '1',
      question: 'What types of research projects do you take on?',
      answer: 'We focus on applied AI research with commercial potential, including machine learning, computer vision, natural language processing, robotics, quantum computing applications, and emerging technology integration. We prioritize projects that can create significant market impact.',
      category: 'Research Scope'
    },
    {
      id: '2',
      question: 'How do you protect intellectual property during research?',
      answer: 'We work under comprehensive NDAs and can structure IP ownership in various ways - from client-owned to joint development agreements. We have extensive experience with patent applications and IP commercialization strategies.',
      category: 'IP Protection'
    },
    {
      id: '3',
      question: 'What\'s the typical timeline for a prototype development project?',
      answer: 'Research-based prototypes typically take 8-16 weeks depending on complexity. We use agile methodologies with 2-week sprints, providing regular updates and demo milestones throughout the development process.',
      category: 'Timeline'
    },
    {
      id: '4',
      question: 'Do you collaborate with universities or research institutions?',
      answer: 'Yes, we maintain partnerships with leading universities and research labs worldwide. This gives us access to cutting-edge research and top talent while providing additional validation for breakthrough technologies.',
      category: 'Partnerships'
    },
    {
      id: '5',
      question: 'Can you help commercialize research outcomes?',
      answer: 'Absolutely. We provide end-to-end support from research to market, including business model development, investor presentations, technology transfer, and scaling strategies. Many of our research projects become successful products.',
      category: 'Commercialization'
    }
  ],
  caseStudy: {
    title: 'Revolutionary Neural Interface Platform',
    client: 'NeuroTech Innovations',
    industry: 'Medical Technology',
    challenge: 'Pioneering medical device company needed breakthrough neural interface technology to enable direct brain-computer communication for paralyzed patients. Existing solutions were too invasive, expensive, and limited in functionality.',
    solution: 'Developed novel non-invasive neural interface algorithms using advanced signal processing and machine learning. Created proprietary brain signal interpretation system that achieved unprecedented accuracy and real-time response rates.',
    results: [
      {
        metric: 'Signal Accuracy',
        value: '96%',
        description: 'Improvement in neural signal interpretation accuracy',
        icon: 'Brain'
      },
      {
        metric: 'Response Time',
        value: '12ms',
        description: 'Real-time neural signal processing latency',
        icon: 'Zap'
      },
      {
        metric: 'Market Impact',
        value: '$50M',
        description: 'Series A funding raised based on technology',
        icon: 'TrendingUp'
      }
    ],
    image: 'https://source.unsplash.com/800x600/?neuroscience,brain,technology,medical',
    testimonial: 'Cipher Labs didn\'t just help us build a product – they helped us create an entirely new category of medical technology that will impact millions of lives.',
    timeline: '18 months R&D, 24 months total partnership'
  },
  demo: {
    type: 'workflow',
    title: 'AI Research Pipeline',
    description: 'Experience our systematic approach to breakthrough AI research and rapid prototype development.',
    features: [
      'Automated research literature analysis',
      'Hypothesis generation and testing',
      'Rapid prototype iteration cycles',
      'Performance benchmarking and validation'
    ],
    interactive: true
  }
};
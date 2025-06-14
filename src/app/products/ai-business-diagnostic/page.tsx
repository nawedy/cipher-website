// src/app/products/ai-business-diagnostic/page.tsx
// Dedicated product page for AI Business Diagnostic Report

'use client';

import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Star,
  TrendingUp,
  Search,
  Target,
  Brain,
  Shield,
  Award,
  FileText,
  Calendar,
  DollarSign
} from 'lucide-react';
import { useState } from 'react';

export default function AIBusinessDiagnosticPage() {
  const [selectedPackage, setSelectedPackage] = useState('ai-business-diagnostic-standard');
  const [isLoading, setIsLoading] = useState(false);

  const packages = [
    {
      id: 'ai-business-diagnostic-standard',
      name: 'Standard Diagnostic',
      price: 497,
      originalPrice: 2500,
      deliveryTime: '48 hours',
      description: 'Comprehensive AI-powered business analysis',
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
      badge: 'MOST POPULAR',
      color: 'blue'
    },
    {
      id: 'ai-business-diagnostic-premium',
      name: 'Premium Diagnostic + Strategy Call',
      price: 997,
      originalPrice: 5000,
      deliveryTime: '48 hours + 1 hour call',
      description: 'Everything in Standard plus 1-hour strategy consultation',
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
      badge: 'BEST VALUE',
      color: 'purple'
    }
  ];

  const handleCheckout = async (productId: string) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
          metadata: {
            source: 'ai-business-diagnostic-page'
          }
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an error processing your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const reportSections = [
    {
      title: 'Executive Summary',
      description: 'High-level overview of findings and recommendations',
      icon: FileText
    },
    {
      title: 'Digital Presence Analysis',
      description: 'Website, SEO, social media, and online visibility audit',
      icon: Search
    },
    {
      title: 'AI Opportunity Assessment',
      description: 'Specific AI use cases and implementation opportunities',
      icon: Brain
    },
    {
      title: 'Competitive Positioning',
      description: 'Market analysis and competitive advantage identification',
      icon: Target
    },
    {
      title: 'ROI Projections',
      description: 'Financial impact analysis and investment recommendations',
      icon: DollarSign
    },
    {
      title: 'Implementation Roadmap',
      description: 'Step-by-step action plan with timelines and priorities',
      icon: Calendar
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CEO, TechStart Solutions',
      content: 'The diagnostic report identified $2.3M in potential savings through AI automation. ROI was immediate.',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'Operations Director, ManufactureCorp',
      content: 'Incredibly detailed analysis. We implemented 3 recommendations and saw 40% efficiency gains in 60 days.',
      rating: 5
    },
    {
      name: 'Jennifer Walsh',
      role: 'Marketing VP, RetailPlus',
      content: 'The competitive analysis section alone was worth the investment. Game-changing insights.',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'How is this different from traditional consulting?',
      answer: 'Our AI-powered analysis delivers 80% of the insights of a $10K+ consulting engagement in 48 hours at a fraction of the cost. We use proprietary algorithms to analyze your digital footprint and identify opportunities.'
    },
    {
      question: 'What information do you need from me?',
      answer: 'Just your website URL and basic business information. Our AI tools handle the rest of the analysis automatically. No lengthy questionnaires or time-consuming interviews required.'
    },
    {
      question: 'Is my business information secure?',
      answer: 'Absolutely. We use enterprise-grade security and never share your data. All analysis is conducted in secure environments and reports are delivered via encrypted channels.'
    },
    {
      question: 'What if I\'m not satisfied with the report?',
      answer: '100% money-back guarantee within 7 days. We\'re confident you\'ll find actionable insights that more than justify the investment.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-zinc-900 to-slate-950">
      {/* Hero Section */}
      <section className="py-20 border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
              <BarChart3 className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-blue-400 font-medium">AI Business Diagnostic Report</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Discover Hidden
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                AI Opportunities
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Get a comprehensive AI-powered analysis of your business in 48 hours. 
              Identify $100K+ in potential savings and growth opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 text-green-400">
                <Clock className="w-5 h-5" />
                <span className="font-medium">48-hour delivery</span>
              </div>
              <div className="flex items-center space-x-2 text-yellow-400">
                <Award className="w-5 h-5" />
                <span className="font-medium">100% satisfaction guarantee</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-400">
                <Shield className="w-5 h-5" />
                <span className="font-medium">Enterprise-grade security</span>
              </div>
            </div>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-4 gap-6 mb-12"
          >
            {[
              { label: 'Reports Delivered', value: '500+', icon: FileText },
              { label: 'Average Savings Identified', value: '$340K', icon: DollarSign },
              { label: 'Client Satisfaction', value: '98%', icon: Star },
              { label: 'Implementation Success', value: '94%', icon: TrendingUp }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Package Selection */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Choose Your Package</h2>
            <p className="text-xl text-gray-300">Select the level of analysis that fits your needs</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border rounded-2xl p-8 transition-all duration-300 cursor-pointer ${
                  selectedPackage === pkg.id 
                    ? 'border-blue-500/50 ring-2 ring-blue-500/25' 
                    : 'border-slate-700/50 hover:border-blue-500/30'
                }`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                {/* Badge */}
                {pkg.badge && (
                  <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-sm font-bold z-10 ${
                    pkg.color === 'blue' ? 'bg-blue-500 text-white' : 'bg-purple-500 text-white'
                  }`}>
                    {pkg.badge}
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-8 mt-4">
                  <h3 className="text-2xl font-bold text-white mb-4">{pkg.name}</h3>
                  <p className="text-gray-300 mb-6">{pkg.description}</p>
                  
                  {/* Pricing */}
                  <div className="mb-4">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-4xl font-bold text-white">${pkg.price}</span>
                      <span className="text-gray-500 line-through text-xl">${pkg.originalPrice}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">Delivered in {pkg.deliveryTime}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Selection Indicator */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCheckout(pkg.id);
                  }}
                  disabled={isLoading}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center space-x-2 ${
                    pkg.color === 'blue' 
                      ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/25' 
                      : 'bg-purple-500 hover:bg-purple-600 text-white shadow-lg hover:shadow-purple-500/25'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span>{isLoading ? 'Processing...' : `Get Started - $${pkg.price}`}</span>
                  {!isLoading && <ArrowRight className="w-5 h-5" />}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Quick Checkout Button */}
          <div className="text-center mt-12">
            <button 
              onClick={() => handleCheckout(selectedPackage)}
              disabled={isLoading}
              className={`bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-6 px-12 rounded-xl text-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25 flex items-center space-x-3 mx-auto ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span>
                {isLoading 
                  ? 'Processing...' 
                  : `Get Started - $${packages.find(p => p.id === selectedPackage)?.price}`
                }
              </span>
              {!isLoading && <ArrowRight className="w-6 h-6" />}
            </button>
            <p className="text-sm text-gray-400 mt-4">
              Secure payment via Stripe • 100% satisfaction guarantee
            </p>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-gradient-to-br from-blue-900/10 to-purple-900/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">What's Included in Your Report</h2>
            <p className="text-xl text-gray-300">Comprehensive analysis across 6 key business areas</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reportSections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50"
              >
                <section.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{section.title}</h3>
                <p className="text-gray-300">{section.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">What Our Clients Say</h2>
            <p className="text-xl text-gray-300">Real results from real businesses</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-br from-slate-900/50 to-zinc-900/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50"
              >
                <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 border-t border-slate-800">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Discover Your AI Opportunities?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join 500+ businesses that have unlocked their AI potential with our diagnostic reports.
            </p>
            
            <button 
              onClick={() => handleCheckout(selectedPackage)}
              disabled={isLoading}
              className={`bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-6 px-12 rounded-xl text-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25 flex items-center space-x-3 mx-auto mb-6 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span>
                {isLoading 
                  ? 'Processing...' 
                  : `Get Your Report - $${packages.find(p => p.id === selectedPackage)?.price}`
                }
              </span>
              {!isLoading && <ArrowRight className="w-6 h-6" />}
            </button>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>48-hour delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>100% satisfaction guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>Secure payment</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 
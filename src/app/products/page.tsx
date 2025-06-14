// src/app/products/page.tsx
// Main products marketplace showcasing immediate revenue products

'use client';

import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Zap, 
  Clock, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Star,
  TrendingUp,
  Search,
  Rocket,
  Target,
  Brain
} from 'lucide-react';
import { useState } from 'react';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

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
            source: 'products-page'
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

  const categories = [
    { id: 'all', name: 'All Products', icon: BarChart3 },
    { id: 'diagnostics', name: 'Business Diagnostics', icon: Search },
    { id: 'audits', name: 'Website Audits', icon: TrendingUp },
    { id: 'kits', name: 'Starter Kits', icon: Rocket },
    { id: 'transformation', name: 'Transformation', icon: Target }
  ];

  const products = [
    {
      id: 'ai-business-diagnostic-standard',
      category: 'diagnostics',
      name: 'AI Business Diagnostic Report',
      price: 497,
      originalPrice: 2500,
      deliveryTime: '48 hours',
      description: 'Comprehensive AI-powered analysis of your business\'s digital presence, operations, and growth opportunities.',
      features: [
        'Digital presence audit & optimization',
        'AI opportunity assessment',
        'ROI projections for AI implementation',
        'Competitive analysis & positioning',
        'Custom implementation roadmap',
        'Priority action items with timelines'
      ],
      benefits: [
        'Replaces $2,500+ consulting engagement',
        '80% automated delivery process',
        'Immediate actionable insights',
        'Professional PDF report'
      ],
      badge: 'MOST POPULAR',
      color: 'blue'
    },
    {
      id: 'website-conversion-audit',
      category: 'audits', 
      name: 'Website Conversion Audit',
      price: 197,
      originalPrice: 500,
      deliveryTime: '24 hours',
      description: 'AI-powered analysis of website performance, user experience, and conversion optimization opportunities.',
      features: [
        'Page speed & performance analysis',
        'SEO audit & recommendations',
        'UX/UI optimization suggestions',
        'Conversion bottleneck identification',
        'A/B testing recommendations',
        'Implementation priority matrix'
      ],
      benefits: [
        'Increase conversion rates by 15-40%',
        'Improve user experience scores',
        'Boost search engine rankings',
        'Reduce bounce rates'
      ],
      badge: 'QUICK WINS',
      color: 'green'
    },
    {
      id: 'ai-starter-kits',
      category: 'kits',
      name: 'AI Implementation Starter Kits',
      price: 97,
      originalPrice: 297,
      deliveryTime: 'Instant',
      description: 'Ready-to-use AI templates and guides for immediate business implementation.',
      features: [
        'Customer Service AI Kit',
        'Marketing Automation Templates',
        'Business Analytics Dashboard',
        'Integration guides & workflows',
        'Training materials & best practices',
        'Ongoing updates & support'
      ],
      benefits: [
        'Skip months of research & development',
        'Proven templates & workflows',
        'Immediate implementation',
        'Cost-effective AI adoption'
      ],
      badge: 'BEST VALUE',
      color: 'purple'
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-zinc-900 to-slate-950">
      {/* Header */}
      <section className="py-20 border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
              <Rocket className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-blue-400 font-medium">Immediate Revenue Products</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              AI-Powered Business
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                Solutions
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Get immediate insights and actionable recommendations to transform your business with AI. 
              Professional-grade analysis delivered in hours, not months.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-4 gap-6 mb-12"
          >
            {[
              { label: 'Reports Delivered', value: '500+', icon: BarChart3 },
              { label: 'Average ROI Increase', value: '340%', icon: TrendingUp },
              { label: 'Delivery Time', value: '24-48hrs', icon: Clock },
              { label: 'Client Satisfaction', value: '98%', icon: Star }
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

      {/* Category Filter */}
      <section className="py-8 border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <category.icon className="w-5 h-5" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300"
              >
                {/* Badge */}
                {product.badge && (
                  <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-sm font-bold z-10 ${
                    product.color === 'blue' ? 'bg-blue-500 text-white' :
                    product.color === 'green' ? 'bg-green-500 text-white' :
                    'bg-purple-500 text-white'
                  }`}>
                    {product.badge}
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-8 mt-4">
                  <h3 className="text-2xl font-bold text-white mb-4">{product.name}</h3>
                  <p className="text-gray-300 mb-6">{product.description}</p>
                  
                  {/* Pricing */}
                  <div className="mb-4">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-4xl font-bold text-white">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-gray-500 line-through text-xl">${product.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">Delivered in {product.deliveryTime}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  <h4 className="font-semibold text-white">What's Included:</h4>
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Benefits */}
                <div className="space-y-3 mb-8">
                  <h4 className="font-semibold text-white">Key Benefits:</h4>
                  {product.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <Star className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button 
                  onClick={() => handleCheckout(product.id)}
                  disabled={isLoading}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center space-x-2 ${
                    product.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/25' :
                    product.color === 'green' ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-green-500/25' :
                    'bg-purple-500 hover:bg-purple-600 text-white shadow-lg hover:shadow-purple-500/25'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span>{isLoading ? 'Processing...' : `Get Started - $${product.price}`}</span>
                  {!isLoading && <ArrowRight className="w-5 h-5" />}
                </button>

                <p className="text-xs text-gray-400 text-center mt-4">
                  100% satisfaction guarantee • Secure payment via Stripe
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Brain className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">
              More Products Coming Soon
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              We're launching new AI-powered business solutions every week. 
              Be the first to know about our latest products and exclusive early-bird pricing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300">
                Notify Me
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 
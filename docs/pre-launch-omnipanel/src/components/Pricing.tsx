import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Pricing: React.FC = () => {
  const [email, setEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const plans = [
    {
      id: 'early-bird',
      name: 'Early Bird',
      badge: 'Most Popular',
      price: 29,
      originalPrice: 49,
      description: 'Perfect for individuals getting started with AI',
      features: [
        '10,000 AI requests per month',
        'Basic integrations',
        'Email support',
        'Mobile app access',
        'Community forum access'
      ],
      color: 'from-blue-500 to-purple-500',
      popular: true
    },
    {
      id: 'pro',
      name: 'Pro',
      badge: 'Best Value',
      price: 79,
      originalPrice: 129,
      description: 'Ideal for professionals and growing teams',
      features: [
        '100,000 AI requests per month',
        'Advanced integrations',
        'Priority support',
        'Custom workflows',
        'API access',
        'Team collaboration'
      ],
      color: 'from-purple-500 to-pink-500',
      popular: false
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      badge: 'Custom',
      price: 199,
      originalPrice: 299,
      description: 'For large organizations with custom needs',
      features: [
        'Unlimited AI requests',
        'Custom integrations',
        'Dedicated support',
        'White-label solution',
        'Advanced analytics',
        'SLA guarantee'
      ],
      color: 'from-pink-500 to-red-500',
      popular: false
    }
  ];

  const handleEmailSubmit = async (planId: string) => {
    if (!email) {
      setMessage('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setSelectedPlan(planId);

    try {
      const { error } = await supabase
        .from('signups')
        .insert([
          {
            email: email,
            plan: planId,
            payment_status: 'pending'
          }
        ]);

      if (error) throw error;

      setMessage('Successfully registered! We\'ll contact you soon with payment details.');
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
      setSelectedPlan('');
    }
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-slate-900 to-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-6">
            Early Access Pricing
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Lock in exclusive launch pricing - these rates will never be available again
          </p>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/30 rounded-full px-6 py-3">
            <Star className="w-5 h-5 text-green-300" />
            <span className="text-green-200 font-medium">Save up to 40% - Limited Time</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative group ${plan.popular ? 'md:-mt-4' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className={`bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border ${plan.popular ? 'border-purple-500/50' : 'border-slate-700/50'} rounded-2xl p-8 h-full transition-all duration-300 group-hover:border-purple-500/50`}>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-300 mb-4">{plan.description}</p>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      ${plan.price}
                    </span>
                    <div className="text-left">
                      <div className="text-slate-400 line-through text-sm">${plan.originalPrice}</div>
                      <div className="text-slate-300 text-sm">/month</div>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleEmailSubmit(plan.id)}
                    disabled={isLoading && selectedPlan === plan.id}
                    className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-purple-500/25'
                        : 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-purple-600 hover:to-blue-600'
                    } disabled:opacity-50`}
                  >
                    {isLoading && selectedPlan === plan.id ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Zap className="w-5 h-5" />
                        Secure Early Access
                      </div>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center p-4 rounded-xl ${
              message.includes('Successfully') 
                ? 'bg-green-500/20 border border-green-500/30 text-green-200' 
                : 'bg-red-500/20 border border-red-500/30 text-red-200'
            }`}
          >
            {message}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Pricing;
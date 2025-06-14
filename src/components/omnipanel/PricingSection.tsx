'use client';

import { motion } from 'framer-motion';
import { 
  Check, 
  Crown, 
  Shield, 
  Users, 
  Building, 
  Zap,
  Clock,
  AlertTriangle,
  Calculator,
  Star,
  TrendingUp
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'lifetime' | 'monthly'>('lifetime');
  const [teamSize, setTeamSize] = useState(10);
  const [spotsRemaining, setSpotsRemaining] = useState(347);

  useEffect(() => {
    // Calculate spots remaining based on elapsed time from launch
    const launchDate = new Date('2024-01-15T00:00:00Z'); // Fixed launch date
    const now = new Date().getTime();
    const elapsedTime = now - launchDate.getTime();
    const totalCampaignTime = 72 * 60 * 60 * 1000; // 72 hours in milliseconds
    
    if (elapsedTime > 0 && elapsedTime < totalCampaignTime) {
      const elapsedPercentage = Math.max(0, Math.min(1, elapsedTime / totalCampaignTime));
      const spotsUsed = Math.floor(elapsedPercentage * 153); // 153 spots taken out of 500 total
      const remaining = Math.max(0, 347 - spotsUsed);
      setSpotsRemaining(remaining);
    } else if (elapsedTime >= totalCampaignTime) {
      setSpotsRemaining(0);
    }
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-black/40 to-black/60">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
            <Crown className="w-5 h-5 text-purple-400 mr-2" />
            <span className="text-purple-400 font-medium">Emergency Pricing - 72 Hours Only</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Own Your AI Tools
            <span className="block bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Forever
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            While competitors trap you in expensive subscriptions that harvest your data, 
            OmniPanel offers lifetime ownership with complete privacy protection.
          </p>

          {/* Crisis Countdown */}
          <div className="max-w-2xl mx-auto p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
            <div className="flex items-center justify-center space-x-4 text-red-400 mb-4">
              <Clock className="w-6 h-6" />
              <span className="font-bold text-2xl">47 HOURS REMAINING</span>
              <Clock className="w-6 h-6" />
            </div>
            <p className="text-red-300 text-lg">
              Emergency pricing increases to $149, then $199, then $499 at launch
            </p>
            <div className="mt-4 bg-red-500/20 rounded-full h-3">
              <div className="bg-red-500 h-3 rounded-full w-3/4"></div>
            </div>
            <p className="text-red-300 text-sm mt-2">{spotsRemaining} spots remaining at this price</p>
          </div>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-gray-800 p-2 rounded-xl">
            <button
              onClick={() => setBillingCycle('lifetime')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                billingCycle === 'lifetime'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Lifetime (Recommended)
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Monthly
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-4 gap-8 mb-16 relative">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 whitespace-nowrap">
                  MOST POPULAR
                </div>
              )}
              
              <div className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border ${
                tier.popular ? 'border-blue-500/50 shadow-blue-500/20 shadow-xl' : 'border-slate-700/50'
              } rounded-2xl p-8 h-full hover:border-purple-500/50 transition-all duration-300 ${
                tier.popular ? 'mt-4' : ''
              }`}>
                
                {/* Tier Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                    tier.popular ? 'bg-blue-500/20' : 'bg-gray-700'
                  }`}>
                    <tier.icon className={`w-8 h-8 ${
                      tier.popular ? 'text-blue-400' : 'text-gray-300'
                    }`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-gray-300">{tier.description}</p>
                </div>

                {/* Pricing */}
                <div className="text-center mb-8">
                  {billingCycle === 'lifetime' ? (
                    <>
                      <div className="mb-2">
                        <span className="text-5xl font-bold text-white">${tier.lifetimePrice}</span>
                        <span className="text-gray-400 ml-2">one-time</span>
                      </div>
                      {tier.originalPrice && (
                        <div className="text-gray-500 line-through text-xl">
                          ${tier.originalPrice} at launch
                        </div>
                      )}
                      <div className="text-green-400 font-medium">
                        Save ${tier.originalPrice ? tier.originalPrice - tier.lifetimePrice : 0}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mb-2">
                        <span className="text-5xl font-bold text-white">${tier.monthlyPrice}</span>
                        <span className="text-gray-400">/month</span>
                      </div>
                      <div className="text-gray-400">
                        ${tier.monthlyPrice * 12}/year
                      </div>
                    </>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  tier.popular
                    ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-blue-500/25'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}>
                  {tier.cta}
                </button>

                {/* Additional Info */}
                {tier.note && (
                  <p className="text-sm text-gray-400 text-center mt-4">{tier.note}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cost Comparison Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <Calculator className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-white mb-4">
                Calculate Your Savings
              </h3>
              <p className="text-xl text-gray-300">
                See how much you'll save compared to subscription-based competitors
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Calculator Input */}
              <div>
                <div className="mb-6">
                  <label className="block text-white font-medium mb-3">Team Size</label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={teamSize}
                      onChange={(e) => setTeamSize(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-2xl font-bold text-blue-400 w-16">{teamSize}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Team Size:</span>
                    <span className="text-white font-bold">{teamSize} developers</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Time Period:</span>
                    <span className="text-white font-bold">5 years</span>
                  </div>
                </div>
              </div>

              {/* Cost Comparison */}
              <div className="space-y-6">
                <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <h4 className="text-lg font-bold text-red-400 mb-4">Competitor Stack (5 Years)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">GitHub Copilot:</span>
                      <span className="text-white">${(228 * teamSize * 5).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Cursor Pro:</span>
                      <span className="text-white">${(240 * teamSize * 5).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Security Tools:</span>
                      <span className="text-white">${(180 * teamSize * 5).toLocaleString()}</span>
                    </div>
                    <div className="border-t border-red-500/20 pt-2 mt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-red-400">Total Cost:</span>
                        <span className="text-red-400">${(648 * teamSize * 5).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <h4 className="text-lg font-bold text-green-400 mb-4">OmniPanel (5 Years)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">OmniPanel License:</span>
                      <span className="text-white">${(99 * teamSize).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">API Costs (optional):</span>
                      <span className="text-white">${(600 * teamSize).toLocaleString()}</span>
                    </div>
                    <div className="border-t border-green-500/20 pt-2 mt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-green-400">Total Cost:</span>
                        <span className="text-green-400">${((99 * teamSize) + (600 * teamSize)).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-white">Your Savings:</span>
                    <span className="text-3xl font-bold text-blue-400">
                      ${((648 * teamSize * 5) - ((99 * teamSize) + (600 * teamSize))).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-blue-400 mt-2">
                    {Math.round((((648 * teamSize * 5) - ((99 * teamSize) + (600 * teamSize))) / (648 * teamSize * 5)) * 100)}% cost reduction
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Final CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 md:p-12">
            <div className="mb-8">
              <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-white mb-4">
                Don't Let This Opportunity Disappear
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                After 72 hours, pricing increases and this privacy solution might be gone forever. 
                Help us build the future of private AI development.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-gray-800/50 rounded-xl">
                <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-gray-300">Privacy guaranteed</div>
              </div>
              <div className="text-center p-6 bg-gray-800/50 rounded-xl">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">90%</div>
                <div className="text-gray-300">Development complete</div>
              </div>
              <div className="text-center p-6 bg-gray-800/50 rounded-xl">
                <Clock className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">72hrs</div>
                <div className="text-gray-300">Emergency deadline</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <button className="bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-red-500/25 transition-all duration-300 flex items-center justify-center flex-1">
                <Shield className="w-6 h-6 mr-2" />
                Secure Founder Access - $99
              </button>
            </div>

            <p className="text-sm text-gray-400 mt-6">
              60-day money-back guarantee • Beta access in 2 weeks • Full product in 6 weeks
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Pricing Data - Updated to match IndieGoGo Campaign
const pricingTiers = [
  {
    id: 'individual-founder',
    name: 'Individual Founder',
    description: '$400 savings vs launch price',
    icon: Zap,
    lifetimePrice: 99,
    originalPrice: 499,
    monthlyPrice: 8,
    popular: true,
    features: [
      'Lifetime OmniPanel access',
      'All future updates included',
      'Beta access within 2 weeks',
      'Founding member Discord',
      'Development updates and input',
      '100% refund if we don\'t deliver',
      'AI Guardian security scanning',
      'Local AI model execution'
    ],
    cta: 'Secure Founder Access - $99',
    note: 'Price increases to $149 after 72 hours'
  },
  {
    id: 'team-crisis-pack',
    name: 'Team Crisis Pack',
    description: 'Per seat for 5+ seats',
    icon: Users,
    lifetimePrice: 79,
    originalPrice: 299,
    monthlyPrice: 12,
    popular: false,
    features: [
      'Everything in Individual Founder',
      'Shared workspace features',
      'Admin dashboard access',
      'Priority support',
      'Team collaboration tools',
      'Bulk license management',
      'Team training included',
      'Multi-project support'
    ],
    cta: 'Save Your Team - $79/seat',
    note: 'Minimum 5 seats required'
  },
  {
    id: 'enterprise-emergency',
    name: 'Enterprise Emergency',
    description: 'Per seat for 25+ seats',
    icon: Building,
    lifetimePrice: 59,
    originalPrice: 199,
    monthlyPrice: 15,
    popular: false,
    features: [
      'Everything in Team Crisis Pack',
      'Custom deployment assistance',
      'White-label options discussion',
      'Direct founder contact',
      'Enterprise-grade support',
      'Custom integrations',
      'Advanced audit trails',
      'Dedicated account manager'
    ],
    cta: 'Enterprise Emergency - $59/seat',
    note: 'Minimum 25 seats required'
  },
  {
    id: 'supporter',
    name: 'Supporter',
    description: 'Support the project',
    icon: Shield,
    lifetimePrice: 25,
    originalPrice: 99,
    monthlyPrice: 5,
    popular: false,
    features: [
      'Beta access when ready',
      'Community Discord access',
      'Development updates',
      '50% off future purchase',
      'Supporter badge',
      'Early access to announcements',
      'Help save the project',
      'Founding community member'
    ],
    cta: 'Support Development - $25',
    note: 'Help us reach our funding goal'
  }
]; 
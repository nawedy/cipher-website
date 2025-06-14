// Pricing Section Component - Comprehensive & Conversion Optimized
'use client';

import { motion } from 'framer-motion';
import { 
  Check, 
  X, 
  Crown, 
  Shield, 
  Users, 
  Building, 
  Zap,
  Clock,
  AlertTriangle,
  Calculator,
  TrendingUp,
  Star,
  ArrowRight,
  Download,
  Phone
} from 'lucide-react';
import { useState } from 'react';

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'lifetime' | 'monthly'>('lifetime');
  const [teamSize, setTeamSize] = useState(10);

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
          <div className="inline-flex items-center px-4 py-2 bg-neon-purple/10 border border-neon-purple/20 rounded-full mb-6">
            <Crown className="w-5 h-5 text-neon-purple mr-2" />
            <span className="text-neon-purple font-medium">Emergency Pricing - 72 Hours Only</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Own Your AI Tools
            <span className="text-gradient block">Forever</span>
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
              Emergency pricing increases to $199, then $249, then $499 at launch
            </p>
            <div className="mt-4 bg-red-500/20 rounded-full h-3">
              <div className="bg-red-500 h-3 rounded-full w-3/4"></div>
            </div>
            <p className="text-red-300 text-sm mt-2">347 spots remaining at this price</p>
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
                  ? 'bg-neon-blue text-black'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Lifetime (Recommended)
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-neon-blue text-black'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Monthly
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-4 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative ${tier.popular ? 'lg:-mt-8' : ''}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-neon-blue text-black px-4 py-2 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              )}
              
              <div className={`glass-card p-8 h-full ${
                tier.popular ? 'border-neon-blue shadow-neon-blue/20 shadow-xl' : ''
              } hover:neon-glow transition-all duration-300`}>
                
                {/* Tier Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                    tier.popular ? 'bg-neon-blue/20' : 'bg-gray-700'
                  }`}>
                    <tier.icon className={`w-8 h-8 ${
                      tier.popular ? 'text-neon-blue' : 'text-gray-300'
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
                      <div className="text-neon-green font-medium">
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
                      <Check className="w-5 h-5 text-neon-green mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  tier.popular
                    ? 'bg-neon-blue text-black hover:bg-neon-blue/90 neon-glow'
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
          <div className="glass-card p-8 md:p-12">
            <div className="text-center mb-12">
              <Calculator className="w-16 h-16 text-neon-blue mx-auto mb-4" />
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
                    <span className="text-2xl font-bold text-neon-blue w-16">{teamSize}</span>
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
                      <span className="text-white">${(149 * teamSize).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">API Costs (optional):</span>
                      <span className="text-white">${(600 * teamSize).toLocaleString()}</span>
                    </div>
                    <div className="border-t border-green-500/20 pt-2 mt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-green-400">Total Cost:</span>
                        <span className="text-green-400">${((149 * teamSize) + (600 * teamSize)).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-neon-blue/10 border border-neon-blue/20 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-white">Your Savings:</span>
                    <span className="text-3xl font-bold text-neon-blue">
                      ${((648 * teamSize * 5) - ((149 * teamSize) + (600 * teamSize))).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-neon-blue mt-2">
                    {Math.round((((648 * teamSize * 5) - ((149 * teamSize) + (600 * teamSize))) / (648 * teamSize * 5)) * 100)}% cost reduction
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enterprise Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">
              Why Enterprises Choose OmniPanel
            </h3>
            <p className="text-xl text-gray-300">
              Complete feature comparison with leading competitors
            </p>
          </div>

          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-6 text-white font-bold">Features</th>
                    <th className="text-center p-6">
                      <div className="text-neon-blue font-bold">OmniPanel</div>
                      <div className="text-sm text-gray-400">$149 lifetime</div>
                    </th>
                    <th className="text-center p-6">
                      <div className="text-white font-bold">GitHub Copilot</div>
                      <div className="text-sm text-gray-400">$19/month</div>
                    </th>
                    <th className="text-center p-6">
                      <div className="text-white font-bold">Cursor</div>
                      <div className="text-sm text-gray-400">$20/month</div>
                    </th>
                    <th className="text-center p-6">
                      <div className="text-white font-bold">ChatGPT + VS Code</div>
                      <div className="text-sm text-gray-400">$20/month</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, index) => (
                    <tr key={index} className="border-b border-white/5">
                      <td className="p-6 text-white font-medium">{feature.name}</td>
                      <td className="text-center p-6">
                        {feature.omnipanel === true ? (
                          <Check className="w-6 h-6 text-neon-green mx-auto" />
                        ) : feature.omnipanel === false ? (
                          <X className="w-6 h-6 text-red-400 mx-auto" />
                        ) : (
                          <span className="text-neon-blue font-medium">{feature.omnipanel}</span>
                        )}
                      </td>
                      <td className="text-center p-6">
                        {feature.copilot === true ? (
                          <Check className="w-6 h-6 text-green-400 mx-auto" />
                        ) : feature.copilot === false ? (
                          <X className="w-6 h-6 text-red-400 mx-auto" />
                        ) : (
                          <span className="text-gray-300">{feature.copilot}</span>
                        )}
                      </td>
                      <td className="text-center p-6">
                        {feature.cursor === true ? (
                          <Check className="w-6 h-6 text-green-400 mx-auto" />
                        ) : feature.cursor === false ? (
                          <X className="w-6 h-6 text-red-400 mx-auto" />
                        ) : (
                          <span className="text-gray-300">{feature.cursor}</span>
                        )}
                      </td>
                      <td className="text-center p-6">
                        {feature.chatgpt === true ? (
                          <Check className="w-6 h-6 text-green-400 mx-auto" />
                        ) : feature.chatgpt === false ? (
                          <X className="w-6 h-6 text-red-400 mx-auto" />
                        ) : (
                          <span className="text-gray-300">{feature.chatgpt}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Enterprise Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Enterprise Package */}
            <div className="glass-card p-8">
              <div className="mb-6">
                <Building className="w-12 h-12 text-neon-purple mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Enterprise & Government</h3>
                <p className="text-gray-300">Custom solutions for large organizations</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-neon-green" />
                  <span className="text-gray-300">Air-gap deployment capability</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-neon-green" />
                  <span className="text-gray-300">Custom compliance integration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-neon-green" />
                  <span className="text-gray-300">Dedicated security auditing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-neon-green" />
                  <span className="text-gray-300">White-label options available</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-neon-green" />
                  <span className="text-gray-300">24/7 priority support</span>
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-white mb-2">Custom Pricing</div>
                <div className="text-gray-300">Starting at $99/seat for 100+ users</div>
              </div>

              <button className="w-full btn btn-outline btn-lg">
                <Phone className="w-5 h-5 mr-2" />
                Schedule Enterprise Demo
              </button>
            </div>

            {/* Government Package */}
            <div className="glass-card p-8 border-neon-purple">
              <div className="mb-6">
                <Shield className="w-12 h-12 text-neon-purple mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Government & Defense</h3>
                <p className="text-gray-300">Security clearance ready solutions</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-neon-green" />
                  <span className="text-gray-300">FedRAMP and FISMA compliance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-neon-green" />
                  <span className="text-gray-300">Classified environment deployment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-neon-green" />
                  <span className="text-gray-300">No foreign dependencies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-neon-green" />
                  <span className="text-gray-300">Complete audit trail logging</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-neon-green" />
                  <span className="text-gray-300">Security clearance compatible</span>
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-white mb-2">$500K - $2M</div>
                <div className="text-gray-300">Per agency implementation</div>
              </div>

              <button className="w-full btn btn-primary btn-lg neon-glow">
                <Download className="w-5 h-5 mr-2" />
                Download Security Specifications
              </button>
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
          <div className="glass-card p-8 md:p-12">
            <div className="mb-8">
              <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-white mb-4">
                Don't Let This Opportunity Disappear
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                After 72 hours, pricing increases and this privacy solution might be gone forever. 
                Join 500+ developers who've already secured their intellectual property protection.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-gray-800/50 rounded-xl">
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">4.9/5</div>
                <div className="text-gray-300">Beta user rating</div>
              </div>
              <div className="text-center p-6 bg-gray-800/50 rounded-xl">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">90%</div>
                <div className="text-gray-300">Development complete</div>
              </div>
              <div className="text-center p-6 bg-gray-800/50 rounded-xl">
                <Shield className="w-8 h-8 text-neon-blue mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-gray-300">Privacy guaranteed</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <button className="btn btn-primary btn-xl neon-glow flex-1">
                <Shield className="w-6 h-6 mr-2" />
                Secure Early Access - $149
              </button>
              <button className="btn btn-outline btn-xl flex-1">
                <ArrowRight className="w-6 h-6 mr-2" />
                Watch Live Demo
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

// Pricing Data
const pricingTiers = [
  {
    id: 'early-believer',
    name: 'Early Believer',
    description: 'First 500 customers only',
    icon: Zap,
    lifetimePrice: 149,
    originalPrice: 499,
    monthlyPrice: 8,
    popular: true,
    features: [
      'Complete OmniPanel workspace',
      'AI Guardian security scanning',
      'Local AI model execution',
      'Lifetime updates included',
      'Beta access in 2 weeks',
      'Founding member status',
      'Priority support queue',
      '60-day money-back guarantee'
    ],
    cta: 'Save Developer Privacy - $149',
    note: 'Price increases to $199 in 47 hours'
  },
  {
    id: 'team',
    name: 'Team Security',
    description: '5-25 developers',
    icon: Users,
    lifetimePrice: 129,
    originalPrice: 299,
    monthlyPrice: 12,
    popular: false,
    features: [
      'Everything in Early Believer',
      'Team workspace management',
      'Shared security policies',
      'Admin dashboard access',
      'Team collaboration features',
      'Bulk license management',
      'Team training included',
      'Priority enterprise support'
    ],
    cta: 'Secure Team Privacy',
    note: 'Per seat pricing'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plus',
    description: '25+ developers',
    icon: Building,
    lifetimePrice: 99,
    originalPrice: 199,
    monthlyPrice: 15,
    popular: false,
    features: [
      'Everything in Team Security',
      'Air-gap deployment option',
      'Custom compliance integration',
      'Advanced audit trails',
      'White-label options',
      'Dedicated account manager',
      'Custom security auditing',
      '24/7 priority support'
    ],
    cta: 'Enterprise Demo',
    note: 'Volume discounts available'
  },
  {
    id: 'government',
    name: 'Government',
    description: 'Agencies & defense',
    icon: Shield,
    lifetimePrice: 299,
    originalPrice: 599,
    monthlyPrice: 25,
    popular: false,
    features: [
      'Everything in Enterprise Plus',
      'FedRAMP/FISMA compliance',
      'Classified environment ready',
      'No foreign dependencies',
      'Complete audit logging',
      'Security clearance compatible',
      'Custom implementation',
      'Government contract ready'
    ],
    cta: 'Contact Government Sales',
    note: 'Custom pricing for large deployments'
  }
];

const comparisonFeatures = [
  { name: 'AI Security Scanning', omnipanel: true, copilot: false, cursor: false, chatgpt: false },
  { name: 'Privacy Protection', omnipanel: true, copilot: false, cursor: false, chatgpt: false },
  { name: 'Local AI Execution', omnipanel: true, copilot: false, cursor: false, chatgpt: false },
  { name: 'Code Editor Integration', omnipanel: true, copilot: true, cursor: true, chatgpt: false },
  { name: 'Notebook Support', omnipanel: true, copilot: false, cursor: false, chatgpt: false },
  { name: 'Terminal Integration', omnipanel: true, copilot: false, cursor: false, chatgpt: false },
  { name: 'Multi-Provider AI', omnipanel: '9 providers', copilot: 'OpenAI only', cursor: 'Limited', chatgpt: 'OpenAI only' },
  { name: 'Pricing Model', omnipanel: 'One-time', copilot: 'Subscription', cursor: 'Subscription', chatgpt: 'Subscription' },
  { name: 'Data Harvesting', omnipanel: false, copilot: true, cursor: true, chatgpt: true },
  { name: 'Air-Gap Deployment', omnipanel: true, copilot: false, cursor: false, chatgpt: false },
  { name: 'Compliance Ready', omnipanel: true, copilot: 'Limited', cursor: false, chatgpt: false },
  { name: 'Team Collaboration', omnipanel: true, copilot: false, cursor: false, chatgpt: false }
];
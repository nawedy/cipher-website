// src/app/omnipanel/page.tsx
// OmniPanel Pre-Launch Campaign Page - Emergency Funding Drive

'use client';

import { motion } from 'framer-motion';
import { 
  Shield, 
  Clock, 
  AlertTriangle, 
  Crown, 
  Zap,
  Users,
  Building,
  Star,
  ArrowRight,
  Download,
  Phone,
  CheckCircle,
  Eye,
  Lock,
  Code,
  Cpu,
  FileSearch,
  Server,
  Globe,
  Calculator,
  TrendingUp,
  Play,
  Mail,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';

// Components
import CountdownTimer from '@/components/omnipanel/CountdownTimer';
import PricingSection from '@/components/omnipanel/PricingSection';
import FeaturesSection from '@/components/omnipanel/FeaturesSection';
import TestimonialsSection from '@/components/omnipanel/TestimonialsSection';
import FAQSection from '@/components/omnipanel/FAQSection';

export default function OmniPanelPage() {
  const [email, setEmail] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        
        <div className="relative container mx-auto px-4 pt-20 pb-32 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Crisis Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full">
                <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
                <span className="text-red-400 font-bold">EMERGENCY FUNDING - 72 HOURS ONLY</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="text-white">Stop Feeding</span>
                  <br />
                  <span className="bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Your Code
                  </span>
                  <br />
                  <span className="text-white">To Your Competition</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                  While GitHub Copilot and Cursor harvest your intellectual property for training, 
                  <span className="text-blue-400 font-semibold"> OmniPanel's AI Guardian</span> provides 
                  the same assistance with <span className="text-green-400 font-semibold">100% local execution</span> 
                  and real-time security protection.
                </p>
              </div>

              {/* Value Props */}
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: "Zero data harvesting" },
                  { icon: Lock, text: "100% local AI execution" },
                  { icon: Eye, text: "Real-time security scanning" },
                  { icon: Code, text: "Unified development workspace" }
                ].map((prop, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50"
                  >
                    <prop.icon className="w-6 h-6 text-blue-400" />
                    <span className="text-white font-medium">{prop.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-red-500/25 transition-all duration-300 flex items-center justify-center flex-1"
                  onClick={() => setShowEmailModal(true)}
                >
                  <Shield className="w-6 h-6 mr-2" />
                  Secure Founder Access - $99
                </motion.button>
                
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="border-2 border-white/20 text-white hover:bg-white/10 py-4 px-8 rounded-xl text-lg transition-all duration-300 flex items-center justify-center"
                >
                  <Play className="w-6 h-6 mr-2" />
                  Demo Coming Soon
                </motion.button>
              </div>

              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex items-center space-x-6 pt-4"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300 text-sm">Emergency funding campaign</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-gray-300 text-sm">Privacy-first development</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <CountdownTimer />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-900/20 to-purple-900/20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Emergency Funding Campaign Ends in 72 Hours
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              After the emergency deadline, Individual Founder pricing increases to $149, then $199, then $499 at launch. 
              This may be your last chance to own a truly private AI development environment at founder pricing.
            </p>
            
            {/* Emergency Pricing Grid */}
            <div className="grid md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <div className="text-green-400 font-bold text-lg">NOW</div>
                <div className="text-white text-2xl font-bold">$99</div>
                <div className="text-green-300 text-sm">Individual Founder</div>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                <div className="text-yellow-400 font-bold text-lg">72 HRS</div>
                <div className="text-white text-2xl font-bold">$149</div>
                <div className="text-yellow-300 text-sm">Early Access</div>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                <div className="text-orange-400 font-bold text-lg">WEEK 2</div>
                <div className="text-white text-2xl font-bold">$199</div>
                <div className="text-orange-300 text-sm">Pre-Launch</div>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <div className="text-red-400 font-bold text-lg">LAUNCH</div>
                <div className="text-white text-2xl font-bold">$499</div>
                <div className="text-red-300 text-sm">Full Price</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <button 
                className="bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-red-500/25 transition-all duration-300 flex items-center justify-center flex-1"
                onClick={() => setShowEmailModal(true)}
              >
                <Shield className="w-6 h-6 mr-2" />
                Secure Founder Access - $99
              </button>
              <button 
                className="border-2 border-white/20 text-white hover:bg-white/10 py-4 px-8 rounded-xl text-lg transition-all duration-300 flex items-center justify-center flex-1"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/docs/The Hidden Privacy Crisis.pdf';
                  link.download = 'The Hidden Privacy Crisis - OmniPanel Whitepaper.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <Download className="w-6 h-6 mr-2" />
                Download Whitepaper
              </button>
            </div>

            <p className="text-sm text-gray-400 mt-6">
              100% refund if we don't deliver • Beta access in 2 weeks • Full product in 6 weeks
            </p>
          </motion.div>
        </div>
      </section>

      {/* Emergency Campaign Footer */}
      <section className="py-12 bg-gradient-to-r from-red-900/40 to-purple-900/40 border-t border-red-500/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-red-400 font-bold text-lg">Emergency Deadline</div>
              <div className="text-white text-2xl font-bold">72 Hours</div>
              <div className="text-gray-300 text-sm">Until pricing increases</div>
            </div>
            <div className="space-y-2">
              <div className="text-green-400 font-bold text-lg">Funding Goal</div>
              <div className="text-white text-2xl font-bold">$50,000</div>
              <div className="text-gray-300 text-sm">To complete development</div>
            </div>
            <div className="space-y-2">
              <div className="text-blue-400 font-bold text-lg">Development Status</div>
              <div className="text-white text-2xl font-bold">90%</div>
              <div className="text-gray-300 text-sm">Complete and ready</div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-300 text-lg mb-4">
              Help us reach our emergency funding goal and secure the future of privacy-first AI development
            </p>
            <div className="bg-gray-800/50 rounded-full h-4 max-w-md mx-auto">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full w-1/3"></div>
            </div>
            <p className="text-gray-400 text-sm mt-2">$16,500 raised of $50,000 goal</p>
          </div>
        </div>
      </section>

      {/* Standard Footer */}
      <footer className="py-16 bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-blue-400" />
                <span className="text-xl font-bold text-white">OmniPanel</span>
              </div>
              <p className="text-gray-400">
                The world's first privacy-first AI development workspace with 100% local execution.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#security" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#integrations" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/security" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="/refund" className="hover:text-white transition-colors">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Cipher Intelligence Group. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="https://twitter.com/cipherintel" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://github.com/cipherintel" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://discord.gg/cipherintel" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Discord</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.942 4.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-8.662zM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Emergency Founder Access</h3>
              <button 
                onClick={() => setShowEmailModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-semibold">Emergency Pricing</span>
                </div>
                <div className="text-white">
                  <span className="text-2xl font-bold">$99</span>
                  <span className="text-gray-400 line-through ml-2">$499</span>
                  <span className="text-green-400 ml-2">Save $400</span>
                </div>
                <p className="text-gray-300 text-sm mt-1">
                  Price increases to $149 in 72 hours, then $199, then $499 at launch
                </p>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
              </div>

              <button className="w-full bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300">
                Secure Founder Access - $99
              </button>

              <p className="text-sm text-gray-400 text-center">
                100% refund if we don't deliver • Secure payment via Stripe
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 
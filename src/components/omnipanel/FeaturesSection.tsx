// src/components/omnipanel/FeaturesSection.tsx
// Features Section Component - Conversion Optimized for OmniPanel

'use client';

import { motion } from 'framer-motion';
import { 
  Shield, 
  Code, 
  Zap, 
  Lock, 
  Eye, 
  Users, 
  Server, 
  CheckCircle,
  ArrowRight,
  Play,
  Download,
  Globe,
  Cpu,
  FileSearch,
  AlertTriangle
} from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-black/20 to-black/40">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
            <Shield className="w-5 h-5 text-blue-400 mr-2" />
            <span className="text-blue-400 font-medium">Revolutionary AI Protection</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Stop Feeding Your Code to
            <span className="block bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Your Competition
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            While others harvest your intellectual property, OmniPanel's AI Guardian provides 
            continuous security scanning and privacy protection in the world's first 
            truly unified development workspace.
          </p>
          
          {/* Crisis Timeline */}
          <div className="mt-8 p-6 bg-red-500/10 border border-red-500/20 rounded-xl max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-4 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <span className="font-bold text-lg">72 Hours Remaining</span>
              <AlertTriangle className="w-6 h-6" />
            </div>
            <p className="text-red-300 mt-2">
              Save this privacy solution before it disappears forever
            </p>
          </div>
        </motion.div>

        {/* Core Value Propositions */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {coreFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer"
            >
              <div className="mb-6">
                <feature.icon className="w-16 h-16 text-blue-400 group-hover:text-green-400 transition-colors duration-300" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {feature.description}
              </p>
              
              <div className="space-y-3">
                {feature.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center text-blue-400 font-medium group-hover:text-green-400 transition-colors">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Guardian Deep Dive */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
                  <Cpu className="w-5 h-5 text-green-400 mr-2" />
                  <span className="text-green-400 font-medium">AI Guardian Technology</span>
                </div>
                
                <h3 className="text-4xl font-bold text-white mb-6">
                  Your Personal AI Cybersecurity Expert
                </h3>
                
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Imagine having a cybersecurity expert watching over your shoulder 24/7, 
                  but it's an AI that never sleeps, never misses a threat, and learns 
                  from every line of code you write.
                </p>
                
                <div className="space-y-6">
                  {aiGuardianFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                        <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25 mt-8 flex items-center">
                  <Play className="w-5 h-5 mr-2" />
                  Watch AI Guardian Demo
                </button>
              </div>

              {/* Right Column - Visual Demo */}
              <div className="relative">
                <div className="bg-gray-900 rounded-xl p-6 relative overflow-hidden">
                  {/* Terminal Header */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-400 ml-4">AI Guardian Dashboard</span>
                  </div>
                  
                  {/* AI Guardian Status */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-6 h-6 text-green-400" />
                        <span className="text-green-400 font-medium">Security Scan Complete</span>
                      </div>
                      <span className="text-xs text-green-400">✓ SECURE</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-800 rounded-lg">
                        <div className="text-2xl font-bold text-white">0</div>
                        <div className="text-sm text-gray-400">Vulnerabilities</div>
                      </div>
                      <div className="p-4 bg-gray-800 rounded-lg">
                        <div className="text-2xl font-bold text-white">247</div>
                        <div className="text-sm text-gray-400">Files Protected</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300">No exposed secrets detected</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300">Privacy compliance verified</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300">Local AI execution confirmed</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Badge */}
                  <div className="absolute -top-4 -right-4 bg-green-500 text-black px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                    REAL-TIME PROTECTION
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Competitive Advantage Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">
              Why Enterprises Choose OmniPanel
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The only AI workspace that provides privacy protection AND intelligent security scanning
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {competitiveAdvantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 text-center hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <advantage.icon className="w-8 h-8 text-blue-400" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3">{advantage.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{advantage.description}</p>
                <div className="mt-4 text-2xl font-bold text-green-400">{advantage.metric}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social Proof Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-white mb-8">
              How Enterprises Will Benefit
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">100%</div>
                <div className="text-gray-300">Local AI execution</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">Zero</div>
                <div className="text-gray-300">Data harvesting</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">Real-time</div>
                <div className="text-gray-300">Security scanning</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-red-500/25 transition-all duration-300 flex items-center justify-center">
                <Shield className="w-5 h-5 mr-2" />
                Save Developer Privacy - $149
              </button>
              <button 
                className="border-2 border-white/20 text-white hover:bg-white/10 py-4 px-8 rounded-xl text-lg transition-all duration-300 flex items-center justify-center"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/docs/The Hidden Privacy Crisis.pdf';
                  link.download = 'The Hidden Privacy Crisis - OmniPanel Whitepaper.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <Download className="w-5 h-5 mr-2" />
                Download Security Whitepaper
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Feature Data
const coreFeatures = [
  {
    icon: Shield,
    title: "AI-Powered Security Guardian",
    description: "The world's first AI that continuously protects your code from vulnerabilities, privacy violations, and security threats in real-time.",
    benefits: [
      "Real-time vulnerability detection as you code",
      "Automatic secret and credential scanning",
      "Privacy compliance verification (GDPR, HIPAA)",
      "Context-aware threat analysis",
      "Zero false positive intelligent alerts"
    ]
  },
  {
    icon: Lock,
    title: "Complete Privacy Protection", 
    description: "Your intellectual property never leaves your machine. Local AI execution ensures your innovations stay yours forever.",
    benefits: [
      "100% local AI model execution",
      "Zero data transmission to external servers",
      "Air-gap deployment for classified environments",
      "End-to-end encryption for all project data",
      "No training data harvesting ever"
    ]
  },
  {
    icon: Code,
    title: "Unified Development Workspace",
    description: "Chat, code, notebooks, and terminal working together seamlessly with shared context and intelligent AI assistance.",
    benefits: [
      "Monaco editor with AI-powered completion",
      "Jupyter-style notebooks with embedded AI",
      "Integrated terminal with smart suggestions",
      "Real-time collaboration and sync",
      "Project-wide context understanding"
    ]
  }
];

const aiGuardianFeatures = [
  {
    icon: Eye,
    title: "Continuous Monitoring",
    description: "AI never sleeps, constantly scanning every line of code for security vulnerabilities and privacy violations."
  },
  {
    icon: Zap,
    title: "Instant Remediation",
    description: "Get immediate, contextual fixes for security issues with one-click AI-powered solutions."
  },
  {
    icon: FileSearch,
    title: "Intelligent Analysis", 
    description: "Context-aware scanning that understands your project structure and business logic."
  },
  {
    icon: CheckCircle,
    title: "Learning Protection",
    description: "AI gets smarter about your coding patterns and security preferences over time."
  }
];

const competitiveAdvantages = [
  {
    icon: Server,
    title: "Local AI Execution",
    description: "Complete privacy with local model processing",
    metric: "0% Data Sharing"
  },
  {
    icon: Shield,
    title: "AI Security Scanning", 
    description: "Real-time vulnerability detection and remediation",
    metric: "24/7 Protection"
  },
  {
    icon: Users,
    title: "Enterprise Ready",
    description: "Air-gap deployment and compliance automation",
    metric: "$4.45M Risk Avoided"
  },
  {
    icon: Globe,
    title: "Unified Workspace",
    description: "All tools working together with shared context",
    metric: "80% Time Saved"
  }
]; 
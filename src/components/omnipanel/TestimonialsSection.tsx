'use client';

import { motion } from 'framer-motion';
import { Shield, Code, Lock, CheckCircle } from 'lucide-react';

export default function TestimonialsSection() {
  const visionPoints = [
    {
      icon: Shield,
      title: "Privacy-First Development",
      content: "We're building OmniPanel because developers deserve AI tools that don't harvest their intellectual property. Your code should stay yours.",
      highlight: "Complete data sovereignty"
    },
    {
      icon: Code,
      title: "Unified Workspace Vision", 
      content: "Imagine having chat, code editor, notebooks, and terminal all working together with shared AI context - without sending your data to the cloud.",
      highlight: "All-in-one solution"
    },
    {
      icon: Lock,
      title: "Enterprise-Ready Security",
      content: "Built for organizations that can't risk their code being used to train competitor AI models. Local execution means zero data leakage.",
      highlight: "Air-gap compatible"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900/30 to-slate-900">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why We're Building OmniPanel
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The future of AI development should be private, secure, and owned by developers - not big tech companies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visionPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="mb-6">
                <point.icon className="w-12 h-12 text-blue-400 mb-4" />
                <div className="inline-flex items-center px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                  <span className="text-blue-400 text-sm font-medium">{point.highlight}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-4">
                {point.title}
              </h3>
              
              <p className="text-slate-300 leading-relaxed">
                {point.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Development Progress */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-white mb-8">
              Development Progress
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  90%
                </div>
                <div className="text-slate-300">Core features complete</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  6 weeks
                </div>
                <div className="text-slate-300">To full launch</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text text-transparent mb-2">
                  2 weeks
                </div>
                <div className="text-slate-300">To beta access</div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <p className="text-blue-300 text-lg">
                <strong>Help us finish what we started.</strong> Your early support funds the final development sprint and ensures OmniPanel launches with the privacy-first features developers need.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 
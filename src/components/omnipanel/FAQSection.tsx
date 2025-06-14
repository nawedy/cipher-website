'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "When will OmniPanel be officially launched?",
      answer: "OmniPanel is launching in 6 weeks after this emergency pre-sale ends. Beta access begins in 2 weeks for early supporters. The countdown timer shows exactly when this emergency pricing expires."
    },
    {
      question: "What makes OmniPanel different from GitHub Copilot or Cursor?",
      answer: "Unlike cloud-based tools that harvest your code for training, OmniPanel runs AI models locally on your machine. You get the same AI assistance without sacrificing your intellectual property or privacy. Plus, our AI Guardian provides real-time security scanning that other tools don't offer."
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "Yes! We offer a 60-day money-back guarantee. If OmniPanel doesn't save you at least 5 hours per week or meet your privacy expectations, we'll refund your purchase in full."
    },
    {
      question: "How does local AI execution work?",
      answer: "OmniPanel integrates with Ollama, vLLM, and llama.cpp to run AI models directly on your hardware. No internet required for core functionality. Your code never leaves your machine, ensuring complete privacy and compliance with enterprise security policies."
    },
    {
      question: "What about team collaboration and enterprise features?",
      answer: "OmniPanel supports team workspaces with shared configurations, admin controls, and audit trails. Enterprise customers get air-gap deployment, custom compliance integration, and dedicated support. All while maintaining local AI execution for maximum security."
    },
    {
      question: "Why is this an 'emergency' funding campaign?",
      answer: "We need immediate funding to complete development and launch. Traditional VC funding would require compromising on privacy (adding cloud dependencies for data collection). This emergency pre-sale lets us maintain our privacy-first mission while securing the resources needed to launch."
    },
    {
      question: "What happens if the funding goal isn't met?",
      answer: "If we don't reach our minimum funding threshold, all pre-orders will be refunded in full. However, we're already at 50% of our goal with strong momentum, so we're confident about reaching the target."
    },
    {
      question: "Can I use OmniPanel with my existing development workflow?",
      answer: "Absolutely! OmniPanel includes a full Monaco editor (VS Code's editor), integrated terminal, and Jupyter-style notebooks. You can import your existing projects and continue working with familiar tools, just with better AI assistance and privacy protection."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-purple-900/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300">
            Everything you need to know about OmniPanel and this emergency campaign
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-purple-500/10 transition-colors duration-300"
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-purple-400" />
                  ) : (
                    <Plus className="w-5 h-5 text-purple-400" />
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6">
                      <p className="text-slate-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 
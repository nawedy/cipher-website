import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "When will IntelliMind AI be officially launched?",
      answer: "We're launching in just a few days! The countdown timer on our homepage shows the exact time remaining. Early access users will get immediate access upon launch."
    },
    {
      question: "What makes IntelliMind AI different from other AI assistants?",
      answer: "Our AI uses advanced neural networks that learn and adapt to your specific workflow. Unlike generic AI tools, IntelliMind becomes more personalized and efficient the more you use it."
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "Yes! We offer a 30-day money-back guarantee. If you're not completely satisfied with IntelliMind AI, we'll refund your purchase in full."
    },
    {
      question: "Can I upgrade or downgrade my plan later?",
      answer: "Absolutely! You can change your plan at any time from your dashboard. Upgrades take effect immediately, and downgrades take effect at your next billing cycle."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We provide email support for all plans, priority support for Pro users, and dedicated support for Enterprise customers. Our average response time is under 2 hours."
    },
    {
      question: "Will my data be secure?",
      answer: "Yes, we use bank-level encryption and never store your sensitive data. All processing is done securely, and we're fully compliant with GDPR and other privacy regulations."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-purple-900/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-300">
            Everything you need to know about IntelliMind AI
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
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
};

export default FAQ;
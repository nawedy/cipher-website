// src/app/products/ai-business-diagnostic/success/page.tsx
// Success page for AI Business Diagnostic Report purchases

'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Clock, Mail, ArrowRight } from 'lucide-react';

export default function AIBusinessDiagnosticSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-zinc-900 to-slate-950">
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500/20 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Order Confirmed!
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Thank you for purchasing the AI Business Diagnostic Report. 
              Your comprehensive business analysis will be delivered within 48 hours.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-2">48-Hour Delivery</h3>
                <p className="text-gray-300 text-sm">Fast turnaround time</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <Mail className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-2">Email Support</h3>
                <p className="text-gray-300 text-sm">Full support included</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <CheckCircle className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-2">100% Guarantee</h3>
                <p className="text-gray-300 text-sm">Satisfaction guaranteed</p>
              </div>
            </div>

            <a 
              href="/products"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300"
            >
              <span>View More Products</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 
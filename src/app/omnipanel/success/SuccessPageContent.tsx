'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Mail, Calendar, Shield } from 'lucide-react';

export default function SuccessPageContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [customerEmail, setCustomerEmail] = useState<string>('');

  useEffect(() => {
    // In a real implementation, you'd verify the session with Stripe
    // and get customer details from the session
    if (sessionId) {
      // Placeholder for session verification
      console.log('Verifying session:', sessionId);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950/20 to-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle className="w-12 h-12 text-white" />
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6 mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            🎉 Welcome to the Privacy Revolution!
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Thank you for supporting OmniPanel's emergency funding campaign. 
            You've just secured your place in the future of privacy-first AI development.
          </p>

          <div className="bg-gradient-to-br from-green-900/40 to-blue-900/40 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">What Happens Next?</h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="flex items-start space-x-3">
                <Mail className="w-6 h-6 text-green-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-white">Confirmation Email</h3>
                  <p className="text-gray-300 text-sm">Receipt and access details sent to your email</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Calendar className="w-6 h-6 text-blue-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-white">Beta Access</h3>
                  <p className="text-gray-300 text-sm">Early access in 2 weeks, full product in 6 weeks</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-purple-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-white">Privacy Protection</h3>
                  <p className="text-gray-300 text-sm">Your code stays yours - 100% local AI execution</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Download className="w-6 h-6 text-yellow-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-white">Resources</h3>
                  <p className="text-gray-300 text-sm">Access to whitepapers and founder updates</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button 
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 flex items-center justify-center"
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
          
          <button 
            className="border-2 border-white/20 text-white hover:bg-white/10 py-4 px-8 rounded-xl text-lg transition-all duration-300 flex items-center justify-center"
            onClick={() => window.location.href = '/'}
          >
            Return to Homepage
          </button>
        </motion.div>

        {/* Session ID for debugging */}
        {sessionId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 text-sm text-gray-500"
          >
            Session ID: {sessionId}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 
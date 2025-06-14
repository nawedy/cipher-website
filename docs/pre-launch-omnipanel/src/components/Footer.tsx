import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Mail, Twitter, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 to-black border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                IntelliMind AI
              </span>
            </div>
            <p className="text-slate-300 mb-6 max-w-md">
              The next-generation AI assistant that thinks, learns, and adapts to your workflow. 
              Join thousands of early users experiencing the future of productivity.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Github, Mail].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-purple-400 hover:bg-slate-700 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Product */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'API', 'Documentation', 'Status'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {['About', 'Blog', 'Careers', 'Contact', 'Privacy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-slate-800 mt-12 pt-8 text-center"
        >
          <p className="text-slate-400">
            © 2025 IntelliMind AI. All rights reserved. Built with ❤️ for the future of AI.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
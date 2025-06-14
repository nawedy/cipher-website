import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Brain } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Product Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full px-6 py-3 mb-8"
        >
          <Sparkles className="w-5 h-5 text-purple-300" />
          <span className="text-purple-200 font-medium">AI Revolution Incoming</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Meet
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            IntelliMind AI
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-purple-100 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          The next-generation AI assistant that thinks, learns, and adapts to your workflow. 
          <span className="text-purple-300 font-semibold"> Get early access now!</span>
        </motion.p>

        {/* Features Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center gap-8 mb-12"
        >
          {[
            { icon: Brain, label: "Smart Learning" },
            { icon: Zap, label: "Lightning Fast" },
            { icon: Sparkles, label: "AI Powered" },
          ].map((feature, index) => (
            <motion.div
              key={feature.label}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <div className="p-3 bg-gradient-to-br from-purple-500/30 to-blue-500/30 backdrop-blur-sm border border-purple-400/30 rounded-xl">
                <feature.icon className="w-6 h-6 text-purple-200" />
              </div>
              <span className="text-sm text-purple-200">{feature.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Launch Countdown
          </h2>
          <CountdownTimer />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 shadow-lg"
          >
            Secure Your Early Access
          </motion.button>
        </motion.div>

        {/* Hero Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative">
            {/* Placeholder for screenshot - replace src with your actual image */}
            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-4 shadow-2xl">
              <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl aspect-video flex items-center justify-center">
                <div className="text-center">
                  <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <p className="text-purple-200 text-lg font-medium">
                    IntelliMind AI Dashboard Preview
                  </p>
                  <p className="text-slate-400 text-sm mt-2">
                    Replace this with your actual screenshot
                  </p>
                </div>
              </div>
            </div>
            
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl -z-10 scale-110"></div>
            
            {/* Floating Elements around Image */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-3"
            >
              <Zap className="w-6 h-6 text-white" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Shield, Globe, Code, Sparkles } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: "Advanced Neural Networks",
      description: "Powered by cutting-edge AI technology that learns and adapts to your unique workflow patterns.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast Processing",
      description: "Process complex tasks in milliseconds with our optimized AI infrastructure and cloud computing.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and privacy controls ensure your data remains secure and confidential.",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Globe,
      title: "Global Accessibility",
      description: "Access your AI assistant from anywhere in the world with 99.9% uptime guarantee.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Code,
      title: "Developer Friendly",
      description: "Comprehensive APIs and SDKs for seamless integration into your existing development workflow.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Sparkles,
      title: "Continuous Learning",
      description: "AI that evolves with your needs, becoming more intelligent and efficient over time.",
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-6">
            Revolutionary Features
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Experience the future of AI assistance with features designed to transform how you work
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 h-full transition-all duration-300 group-hover:border-purple-500/50">
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                {/* Hover Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
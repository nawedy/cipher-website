// src/components/divisions/hero-section.tsx
// Reusable hero section component for division landing pages with dynamic theming

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlurFade } from '@/components/magicui/blur-fade';
import { TypingAnimation } from '@/components/magicui/typing-animation';
import { DivisionConfig, DivisionId } from '@/types/divisions';
import { getDivisionTheme, generateDivisionCSS } from '@/lib/divisions';

interface DivisionHeroProps {
  division: DivisionConfig;
  onWatchDemo?: () => void;
  onGetStarted?: () => void;
}

export function DivisionHero({ 
  division, 
  onWatchDemo, 
  onGetStarted 
}: DivisionHeroProps) {
  const theme = getDivisionTheme(division.id as DivisionId);
  const cssVars = generateDivisionCSS(division.id as DivisionId);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: theme.backgroundGradient,
        ...cssVars
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: theme.neon, opacity: 0.1 }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: theme.accent, opacity: 0.1 }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${theme.neon} 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <BlurFade delay={0.2}>
          <Badge 
            variant="outline" 
            className="mb-6 border-2 backdrop-blur-sm"
            style={{ 
              borderColor: theme.border,
              backgroundColor: `${theme.cardBackground}80`,
              color: theme.neon 
            }}
          >
            <span className="text-sm font-medium">
              Powered by AI • {division.name}
            </span>
          </Badge>
        </BlurFade>

        <BlurFade delay={0.4}>
          <div className="mb-6">
            <TypingAnimation
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
              style={{ color: theme.textPrimary }}
              duration={50}
            >
              {division.tagline}
            </TypingAnimation>
          </div>
        </BlurFade>

        <BlurFade delay={0.6}>
          <p 
            className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8"
            style={{ color: theme.textSecondary }}
          >
            {division.description}
          </p>
        </BlurFade>

        <BlurFade delay={0.8}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="group relative overflow-hidden px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
                color: theme.textPrimary,
                border: 'none'
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started Today
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                style={{ backgroundColor: theme.neon }}
              />
            </Button>

            {onWatchDemo && (
              <Button
                variant="outline"
                size="lg"
                onClick={onWatchDemo}
                className="group px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: theme.border,
                  backgroundColor: `${theme.cardBackground}40`,
                  color: theme.textPrimary
                }}
              >
                <Play className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                Watch Demo
              </Button>
            )}
          </div>
        </BlurFade>

        {/* Key metrics or highlights */}
        <BlurFade delay={1.0}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { label: 'Average ROI Increase', value: '250%' },
              { label: 'Implementation Time', value: '8-12 weeks' },
              { label: 'Client Satisfaction', value: '98%' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="text-center"
              >
                <div 
                  className="text-3xl md:text-4xl font-bold mb-2"
                  style={{ color: theme.neon }}
                >
                  {stat.value}
                </div>
                <div 
                  className="text-sm font-medium"
                  style={{ color: theme.textSecondary }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </BlurFade>

        {/* Scroll indicator */}
        <BlurFade delay={1.4}>
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div 
              className="w-6 h-10 border-2 rounded-full flex justify-center"
              style={{ borderColor: theme.border }}
            >
              <div 
                className="w-1 h-3 rounded-full mt-2"
                style={{ backgroundColor: theme.neon }}
              />
            </div>
          </motion.div>
        </BlurFade>
      </div>
    </section>
  );
}
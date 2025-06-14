// src/app/divisions/strategy/page.tsx
// Complete Cipher Strategy landing page with shared layout integration

'use client';

import React, { useState } from 'react';
import { DivisionLayout } from '@/components/divisions/division-layout';
import { DivisionHero } from '@/components/divisions/hero-section';
import { ServicesGrid } from '@/components/divisions/services-grid';
import { PricingSection } from '@/components/divisions/pricing-section';
import { strategyDivisionConfig } from '@/data/divisions/strategy';
import { getDivisionTheme } from '@/lib/divisions';

// Import all the same components from the previous landing page
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, BarChart3, Users, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BlurFade } from '@/components/magicui/blur-fade';
import { TypingAnimation } from '@/components/magicui/typing-animation';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { Marquee } from '@/components/magicui/marquee';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function StrategyPage() {
  const [activeDemo, setActiveDemo] = useState<'dashboard' | 'chat'>('dashboard');
  const theme = getDivisionTheme('strategy');
  const config = strategyDivisionConfig;

  const handleGetStarted = () => {
    // Navigate to contact form with pre-filled division
    window.location.href = '/contact?division=strategy&utm_source=landing_hero';
  };

  const handleWatchDemo = () => {
    setActiveDemo(activeDemo === 'dashboard' ? 'chat' : 'dashboard');
  };

  const handleServiceClick = (serviceId: string) => {
    // Navigate to service-specific contact form
    window.location.href = `/contact?division=strategy&service=${serviceId}&utm_source=services_grid`;
  };

  const handlePlanSelect = (planId: string) => {
    // Navigate to contact form with plan selection
    window.location.href = `/contact?division=strategy&plan=${planId}&utm_source=pricing_section`;
  };

  return (
    <DivisionLayout divisionId="strategy">
      {/* Hero Section */}
      <section id="hero">
        <DivisionHero
          division={config}
          onGetStarted={handleGetStarted}
          onWatchDemo={handleWatchDemo}
        />
      </section>

      {/* Trust Indicators */}
      <section id="trust" className="py-16 border-y" style={{ borderColor: theme.border, backgroundColor: `${theme.cardBackground}20` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.2}>
            <div className="text-center mb-12">
              <p className="text-lg font-medium" style={{ color: theme.textSecondary }}>
                Trusted by industry leaders and emerging companies worldwide
              </p>
            </div>
          </BlurFade>
          <Marquee className="py-4">
            {[
              'TechFlow Industries', 'Global Manufacturing Corp', 'HealthTech Solutions',
              'Financial Dynamics', 'Retail Innovation Group', 'Energy Systems Ltd'
            ].map((company, index) => (
              <div key={index} className="flex items-center justify-center mx-8">
                <span className="text-xl font-semibold opacity-60" style={{ color: theme.textSecondary }}>
                  {company}
                </span>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services">
        <ServicesGrid
          services={config.services}
          divisionId="strategy"
          onServiceClick={handleServiceClick}
        />
      </section>

      {/* Interactive Demo */}
      <section id="demo" className="py-24" style={{ backgroundColor: `${theme.primary}10` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: theme.textPrimary }}>
                See Our AI Strategy Platform in Action
              </h2>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: theme.textSecondary }}>
                Experience how our intelligent analytics and strategic insights drive real business transformation.
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.4}>
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-center mb-8">
                <div className="flex p-1 backdrop-blur-sm rounded-lg" style={{ backgroundColor: `${theme.cardBackground}80`, border: `1px solid ${theme.border}` }}>
                  <Button
                    variant={activeDemo === 'dashboard' ? 'default' : 'ghost'}
                    onClick={() => setActiveDemo('dashboard')}
                    className="px-6 py-2"
                    style={activeDemo === 'dashboard' ? { backgroundColor: theme.neon, color: theme.background } : { color: theme.textSecondary }}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics Dashboard
                  </Button>
                  <Button
                    variant={activeDemo === 'chat' ? 'default' : 'ghost'}
                    onClick={() => setActiveDemo('chat')}
                    className="px-6 py-2"
                    style={activeDemo === 'chat' ? { backgroundColor: theme.neon, color: theme.background } : { color: theme.textSecondary }}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    AI Advisor
                  </Button>
                </div>
              </div>

              <Card className="backdrop-blur-md border-2" style={{ backgroundColor: `${theme.cardBackground}40`, borderColor: theme.border }}>
                <CardContent className="p-8">
                  {activeDemo === 'dashboard' ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                          { label: 'Strategy ROI', value: 245, suffix: '%', color: theme.neon },
                          { label: 'Implementation Speed', value: 68, suffix: '%', color: theme.accent },
                          { label: 'Risk Reduction', value: 34, suffix: '%', color: theme.secondary }
                        ].map((metric, index) => (
                          <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            className="text-center p-6 rounded-lg backdrop-blur-sm"
                            style={{ backgroundColor: `${theme.cardBackground}60`, border: `1px solid ${theme.border}` }}
                          >
                            <div className="text-3xl font-bold mb-2" style={{ color: metric.color }}>
                              <NumberTicker value={metric.value} />
                              {metric.suffix}
                            </div>
                            <div className="text-sm font-medium" style={{ color: theme.textSecondary }}>
                              {metric.label}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="text-center">
                        <p className="text-lg" style={{ color: theme.textSecondary }}>
                          Real-time strategic intelligence powered by AI analytics
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 max-w-2xl mx-auto">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium" style={{ backgroundColor: theme.primary, color: theme.textPrimary }}>
                          You
                        </div>
                        <div className="flex-1 p-4 rounded-lg" style={{ backgroundColor: `${theme.primary}20`, color: theme.textPrimary }}>
                          "Analyze our Q4 performance and suggest strategic improvements for next quarter"
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium" style={{ backgroundColor: theme.neon, color: theme.background }}>
                          AI
                        </div>
                        <div className="flex-1 p-4 rounded-lg" style={{ backgroundColor: `${theme.cardBackground}80`, color: theme.textPrimary }}>
                          <TypingAnimation
                            duration={30}
                            className="text-sm"
                          >
                            Based on your Q4 data, I've identified 3 high-impact strategic opportunities: 1) Market expansion in Southeast Asia could increase revenue by 28%, 2) Process automation in supply chain would reduce costs by $2.1M annually, 3) Customer retention program could improve LTV by 45%. Would you like detailed implementation plans for any of these strategies?
                          </TypingAnimation>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Process Steps */}
      <section id="process" className="py-24" style={{ backgroundColor: theme.background }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: theme.textPrimary }}>
                Our Strategic Process
              </h2>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: theme.textSecondary }}>
                A proven methodology that transforms strategic vision into measurable business results.
              </p>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {config.process.map((step, index) => (
              <BlurFade key={step.step} delay={0.4 + index * 0.1}>
                <Card className="text-center h-full backdrop-blur-md border" style={{ backgroundColor: `${theme.cardBackground}60`, borderColor: theme.border }}>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <div 
                        className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl font-bold mb-4"
                        style={{ backgroundColor: theme.neon, color: theme.background }}
                      >
                        {step.step}
                      </div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: theme.textPrimary }}>
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: theme.textSecondary }}>
                        {step.description}
                      </p>
                      <Badge variant="outline" style={{ borderColor: theme.border, color: theme.neon }}>
                        {step.duration}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section id="case-study" className="py-24" style={{ backgroundColor: `${theme.primary}05` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: theme.textPrimary }}>
                Real Results, Real Impact
              </h2>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: theme.textSecondary }}>
                See how our strategic intelligence transforms businesses across industries.
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.4}>
            <Card className="backdrop-blur-md border-2 overflow-hidden" style={{ backgroundColor: `${theme.cardBackground}40`, borderColor: theme.border }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="p-8 lg:p-12">
                  <Badge className="mb-6" style={{ backgroundColor: theme.neon, color: theme.background }}>
                    {config.caseStudy.industry}
                  </Badge>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: theme.textPrimary }}>
                    {config.caseStudy.title}
                  </h3>
                  <p className="text-lg mb-6" style={{ color: theme.textSecondary }}>
                    {config.caseStudy.challenge}
                  </p>
                  <p className="text-base mb-8" style={{ color: theme.textSecondary }}>
                    {config.caseStudy.solution}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {config.caseStudy.results.map((result, index) => (
                      <motion.div
                        key={result.metric}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="text-center"
                      >
                        <div className="text-3xl font-bold mb-2" style={{ color: theme.neon }}>
                          {result.value}
                        </div>
                        <div className="text-sm font-medium mb-1" style={{ color: theme.textPrimary }}>
                          {result.metric}
                        </div>
                        <div className="text-xs" style={{ color: theme.textSecondary }}>
                          {result.description}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <img
                    src={config.caseStudy.image}
                    alt={config.caseStudy.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(45deg, ${theme.primary}20, transparent)` }} />
                </div>
              </div>
            </Card>
          </BlurFade>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing">
        <PricingSection
          pricing={config.pricing}
          divisionId="strategy"
          onPlanSelect={handlePlanSelect}
        />
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24" style={{ backgroundColor: theme.background }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: theme.textPrimary }}>
                What Our Clients Say
              </h2>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: theme.textSecondary }}>
                Trusted by leaders who demand results and value strategic excellence.
              </p>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.testimonials.map((testimonial, index) => (
              <BlurFade key={testimonial.id} delay={0.4 + index * 0.1}>
                <Card className="h-full backdrop-blur-md border" style={{ backgroundColor: `${theme.cardBackground}60`, borderColor: theme.border }}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.1 + i * 0.05 }}
                        >
                          <svg className="w-5 h-5 mr-1" style={{ color: theme.neon }} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-base leading-relaxed mb-6" style={{ color: theme.textSecondary }}>
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <div className="font-medium" style={{ color: theme.textPrimary }}>
                          {testimonial.name}
                        </div>
                        <div className="text-sm" style={{ color: theme.textSecondary }}>
                          {testimonial.title}, {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24" style={{ backgroundColor: `${theme.primary}05` }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: theme.textPrimary }}>
                Frequently Asked Questions
              </h2>
              <p className="text-xl leading-relaxed" style={{ color: theme.textSecondary }}>
                Get answers to common questions about our strategic consulting services.
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.4}>
            <Accordion type="single" collapsible className="space-y-4">
              {config.faqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <AccordionItem 
                    value={faq.id}
                    className="backdrop-blur-md border rounded-lg px-6"
                    style={{ backgroundColor: `${theme.cardBackground}60`, borderColor: theme.border }}
                  >
                    <AccordionTrigger 
                      className="text-left font-semibold hover:no-underline"
                      style={{ color: theme.textPrimary }}
                    >
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent 
                      className="leading-relaxed"
                      style={{ color: theme.textSecondary }}
                    >
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </BlurFade>
        </div>
      </section>

      {/* Final CTA */}
      <section id="cta" className="py-24" style={{ backgroundColor: theme.background }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BlurFade delay={0.2}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: theme.textPrimary }}>
              Ready to Transform Your Strategy?
            </h2>
            <p className="text-xl leading-relaxed mb-8" style={{ color: theme.textSecondary }}>
              Join industry leaders who trust Cipher Strategy to drive their most important business transformations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="group px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
                  color: theme.textPrimary,
                  border: 'none'
                }}
              >
                <span className="flex items-center gap-2">
                  Start Your Transformation
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: theme.border,
                  backgroundColor: `${theme.cardBackground}40`,
                  color: theme.textPrimary
                }}
                onClick={() => window.location.href = '/contact?division=strategy&action=consultation&utm_source=final_cta'}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Consultation
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: theme.neon,
                  backgroundColor: `${theme.cardBackground}40`,
                  color: theme.neon
                }}
              >
                <Link href="/analytics?division=strategy">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  View Performance
                </Link>
              </Button>
            </div>
          </BlurFade>
        </div>
      </section>
    </DivisionLayout>
  );
}
// src/components/divisions/pricing-section.tsx
// Responsive pricing tiers with division theming and conversion optimization

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BlurFade } from '@/components/magicui/blur-fade';
import { BorderBeam } from '@/components/magicui/border-beam';
import { PricingTier, DivisionId } from '@/types/divisions';
import { getDivisionTheme, formatPrice } from '@/lib/divisions';

interface PricingSectionProps {
  pricing: PricingTier[];
  divisionId: DivisionId;
  onPlanSelect?: (planId: string) => void;
}

export function PricingSection({ 
  pricing, 
  divisionId, 
  onPlanSelect 
}: PricingSectionProps) {
  const theme = getDivisionTheme(divisionId);

  return (
    <section className="py-24 relative" style={{ backgroundColor: theme.background }}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute top-0 left-1/2 w-96 h-96 rounded-full blur-3xl transform -translate-x-1/2"
          style={{ backgroundColor: theme.primary }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlurFade delay={0.2}>
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              style={{ color: theme.textPrimary }}
            >
              Choose Your Strategic Plan
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: theme.textSecondary }}
            >
              Flexible engagement models designed to deliver maximum value at every stage 
              of your strategic transformation journey.
            </p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {pricing.map((plan, index) => (
            <BlurFade key={plan.id} delay={0.4 + index * 0.1}>
              <motion.div
                whileHover={{ y: plan.popular ? 0 : -8 }}
                transition={{ duration: 0.3 }}
                className="relative h-full"
              >
                <Card 
                  className={`relative h-full overflow-hidden backdrop-blur-md transition-all duration-300 ${
                    plan.popular ? 'scale-105 md:scale-110' : 'hover:shadow-2xl'
                  }`}
                  style={{
                    backgroundColor: plan.popular 
                      ? `${theme.primary}20` 
                      : `${theme.cardBackground}80`,
                    borderColor: plan.popular ? theme.neon : theme.border,
                    borderWidth: plan.popular ? '2px' : '1px'
                  }}
                >
                  {plan.popular && <BorderBeam size={250} duration={12} />}

                  {(plan.popular || plan.savings) && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge 
                        className="px-4 py-2 text-sm font-semibold"
                        style={{ 
                          backgroundColor: theme.neon, 
                          color: theme.background 
                        }}
                      >
                        <Star className="w-4 h-4 mr-1" />
                        {plan.savings || 'Most Popular'}
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <CardTitle 
                      className="text-2xl font-bold mb-2"
                      style={{ color: theme.textPrimary }}
                    >
                      {plan.name}
                    </CardTitle>
                    <CardDescription 
                      className="text-base leading-relaxed"
                      style={{ color: theme.textSecondary }}
                    >
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Pricing */}
                    <div className="text-center">
                      <div className="flex items-baseline justify-center gap-2">
                        <span 
                          className="text-4xl md:text-5xl font-bold"
                          style={{ color: theme.neon }}
                        >
                          {plan.price === 'Custom' ? 'Custom' : plan.price}
                        </span>
                        {plan.price !== 'Custom' && (
                          <span 
                            className="text-lg font-medium"
                            style={{ color: theme.textSecondary }}
                          >
                            /{plan.period}
                          </span>
                        )}
                      </div>
                      {plan.price === 'Custom' && (
                        <p 
                          className="text-sm mt-2"
                          style={{ color: theme.textSecondary }}
                        >
                          Tailored to your requirements
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.div 
                          key={featureIndex}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 + featureIndex * 0.05 }}
                        >
                          <Check 
                            className="w-5 h-5 flex-shrink-0 mt-0.5" 
                            style={{ color: theme.neon }}
                          />
                          <span 
                            className="text-sm font-medium leading-relaxed"
                            style={{ color: theme.textSecondary }}
                          >
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="pt-6">
                      <Button
                        className="w-full group transition-all duration-300 hover:scale-105"
                        size="lg"
                        style={{
                          backgroundColor: plan.popular ? theme.neon : `${theme.primary}80`,
                          color: plan.popular ? theme.background : theme.textPrimary,
                          border: 'none'
                        }}
                        onClick={() => onPlanSelect?.(plan.id)}
                      >
                        <span className="flex items-center justify-center gap-2">
                          {plan.ctaText}
                          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </Button>
                    </div>
                  </CardContent>

                  {/* Glow effect for popular plan */}
                  {plan.popular && (
                    <div 
                      className="absolute inset-0 opacity-10 pointer-events-none"
                      style={{ backgroundColor: theme.neon }}
                    />
                  )}
                </Card>
              </motion.div>
            </BlurFade>
          ))}
        </div>

        {/* Additional info */}
        <BlurFade delay={0.8}>
          <div className="text-center mt-16 space-y-4">
            <p 
              className="text-lg"
              style={{ color: theme.textSecondary }}
            >
              All plans include comprehensive support and a 30-day satisfaction guarantee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="outline"
                size="lg"
                className="px-6 py-3 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: theme.border,
                  backgroundColor: `${theme.cardBackground}40`,
                  color: theme.textPrimary
                }}
              >
                Compare All Features
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="px-6 py-3 transition-all duration-300 hover:scale-105"
                style={{ color: theme.textSecondary }}
              >
                Talk to Sales
              </Button>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
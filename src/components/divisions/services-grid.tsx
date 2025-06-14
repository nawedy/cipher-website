// src/components/divisions/services-grid.tsx
// Dynamic services showcase grid with glassmorphism effects and interactive cards

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BlurFade } from '@/components/magicui/blur-fade';
import { Service, DivisionId } from '@/types/divisions';
import { getDivisionTheme } from '@/lib/divisions';

interface ServicesGridProps {
  services: Service[];
  divisionId: DivisionId;
  onServiceClick?: (serviceId: string) => void;
}

export function ServicesGrid({ 
  services, 
  divisionId, 
  onServiceClick 
}: ServicesGridProps) {
  const theme = getDivisionTheme(divisionId);

  const getIcon = (iconName: string): React.ComponentType<{ className?: string }> => {
    const IconComponent = Icons[iconName as keyof typeof Icons];
    // Ensure we return a valid React component
    if (typeof IconComponent === 'function') {
      return IconComponent as React.ComponentType<{ className?: string }>;
    }
    return Icons.Zap;
  };

  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: theme.background }}>
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute top-1/3 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: theme.accent, transform: 'translateX(50%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlurFade delay={0.2}>
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              style={{ color: theme.textPrimary }}
            >
              Our Strategic Services
            </h2>
            <p 
              className="text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: theme.textSecondary }}
            >
              Comprehensive AI-powered solutions designed to transform your business strategy 
              and accelerate your competitive advantage.
            </p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = getIcon(service.icon);
            
            return (
              <BlurFade key={service.id} delay={0.4 + index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card 
                    className="group relative h-full overflow-hidden border-2 backdrop-blur-md transition-all duration-300 hover:shadow-2xl cursor-pointer"
                    style={{
                      backgroundColor: `${theme.cardBackground}80`,
                      borderColor: service.highlighted ? theme.neon : theme.border,
                      boxShadow: service.highlighted 
                        ? `0 0 30px ${theme.neon}20` 
                        : 'none'
                    }}
                    onClick={() => onServiceClick?.(service.id)}
                  >
                    {service.highlighted && (
                      <Badge 
                        className="absolute top-4 right-4 z-10"
                        style={{ 
                          backgroundColor: theme.neon, 
                          color: theme.background 
                        }}
                      >
                        Featured
                      </Badge>
                    )}

                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div 
                          className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
                          style={{ 
                            backgroundColor: `${theme.primary}40`,
                            color: theme.neon 
                          }}
                        >
                          <IconComponent className="w-8 h-8" />
                        </div>
                        <div>
                          <CardTitle 
                            className="text-2xl font-bold group-hover:text-opacity-80 transition-all duration-300"
                            style={{ color: theme.textPrimary }}
                          >
                            {service.title}
                          </CardTitle>
                        </div>
                      </div>
                      <CardDescription 
                        className="text-lg leading-relaxed"
                        style={{ color: theme.textSecondary }}
                      >
                        {service.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-3 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <motion.div 
                            key={featureIndex}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 + featureIndex * 0.05 }}
                          >
                            <Check 
                              className="w-5 h-5 flex-shrink-0" 
                              style={{ color: theme.neon }}
                            />
                            <span 
                              className="text-sm font-medium"
                              style={{ color: theme.textSecondary }}
                            >
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      <Button
                        className="w-full group/btn transition-all duration-300 hover:scale-105"
                        style={{
                          backgroundColor: service.highlighted ? theme.neon : `${theme.primary}80`,
                          color: service.highlighted ? theme.background : theme.textPrimary,
                          border: 'none'
                        }}
                        onClick={() => onServiceClick?.(service.id)}
                      >
                        <span className="flex items-center justify-center gap-2">
                          {service.ctaText}
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </span>
                      </Button>
                    </CardContent>

                    {/* Hover glow effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                      style={{ backgroundColor: theme.neon }}
                    />
                  </Card>
                </motion.div>
              </BlurFade>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <BlurFade delay={0.8}>
          <div className="text-center mt-16">
            <p 
              className="text-lg mb-6"
              style={{ color: theme.textSecondary }}
            >
              Need a custom solution? Let's discuss your specific requirements.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105"
              style={{
                borderColor: theme.border,
                backgroundColor: `${theme.cardBackground}40`,
                color: theme.textPrimary
              }}
            >
              Schedule Consultation
            </Button>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
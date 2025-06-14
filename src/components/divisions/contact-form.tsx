// src/components/divisions/contact-form.tsx
// Conversion-optimized contact form with Supabase integration and division theming

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BlurFade } from '@/components/magicui/blur-fade';
import { ContactFormData, DivisionId } from '@/types/divisions';
import { getDivisionTheme } from '@/lib/divisions';

interface ContactFormProps {
  divisionId: DivisionId;
  prefilledService?: string;
  prefilledPlan?: string;
  variant?: 'default' | 'inline' | 'modal';
  onSuccess?: () => void;
}

interface FormState {
  data: ContactFormData;
  errors: Partial<ContactFormData>;
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error';
  submitMessage: string;
}

const serviceOptions = {
  strategy: [
    { value: 'digital-maturity', label: 'Digital Maturity Assessment' },
    { value: 'ai-strategy', label: 'AI Strategy Development' },
    { value: 'data-governance', label: 'Data Governance & Architecture' },
    { value: 'change-management', label: 'Digital Change Management' },
    { value: 'custom', label: 'Custom Strategy Consulting' }
  ],
  digitalworks: [
    { value: 'content-automation', label: 'AI Content Automation' },
    { value: 'campaign-intelligence', label: 'Campaign Intelligence' },
    { value: 'growth-automation', label: 'Growth Automation' },
    { value: 'social-intelligence', label: 'Social Intelligence' }
  ],
  labs: [
    { value: 'ai-research', label: 'AI Research & Development' },
    { value: 'prototype-development', label: 'Prototype Development' },
    { value: 'innovation-consulting', label: 'Innovation Consulting' }
  ],
  studio: [
    { value: 'web-development', label: 'Web Application Development' },
    { value: 'mobile-apps', label: 'Mobile App Development' },
    { value: 'ui-ux-design', label: 'UI/UX Design' }
  ],
  ai: [
    { value: 'custom-ai-models', label: 'Custom AI Models' },
    { value: 'ai-integration', label: 'AI Integration Services' },
    { value: 'ai-consulting', label: 'AI Technical Consulting' }
  ],
  products: [
    { value: 'saas-platforms', label: 'SaaS Platform Development' },
    { value: 'enterprise-software', label: 'Enterprise Software Solutions' },
    { value: 'api-development', label: 'API Development & Integration' },
    { value: 'product-consulting', label: 'Product Strategy Consulting' }
  ]
};

const budgetOptions = [
  { value: 'under-25k', label: 'Under $25,000' },
  { value: '25k-100k', label: '$25,000 - $100,000' },
  { value: '100k-500k', label: '$100,000 - $500,000' },
  { value: 'over-500k', label: 'Over $500,000' },
  { value: 'discuss', label: 'Let\'s discuss' }
];

const timelineOptions = [
  { value: 'immediate', label: 'Immediate (within 1 month)' },
  { value: 'quarter', label: 'This quarter (1-3 months)' },
  { value: 'half-year', label: 'Next 6 months' },
  { value: 'year', label: 'Within a year' },
  { value: 'exploring', label: 'Just exploring options' }
];

export function ContactForm({ 
  divisionId, 
  prefilledService, 
  prefilledPlan,
  variant = 'default',
  onSuccess 
}: ContactFormProps) {
  const theme = getDivisionTheme(divisionId);
  const [formState, setFormState] = useState<FormState>({
    data: {
      name: '',
      email: '',
      company: '',
      phone: '',
      message: '',
      division: divisionId,
      service: prefilledService || '',
      budget: prefilledPlan || '',
      timeline: ''
    },
    errors: {},
    isSubmitting: false,
    submitStatus: 'idle',
    submitMessage: ''
  });

  const validateForm = (): boolean => {
    const errors: Partial<ContactFormData> = {};
    
    if (!formState.data.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formState.data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.data.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!formState.data.company.trim()) {
      errors.company = 'Company is required';
    }
    
    if (!formState.data.message.trim()) {
      errors.message = 'Please describe your project or needs';
    }
    
    if (!formState.data.service) {
      errors.service = 'Please select a service';
    }

    setFormState(prev => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setFormState(prev => ({ 
      ...prev, 
      isSubmitting: true, 
      submitStatus: 'idle',
      submitMessage: '' 
    }));

    try {
      // Simulate API call to Supabase
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formState.data,
          source: 'division_landing',
          timestamp: new Date().toISOString(),
          utm_source: window.location.search
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        submitStatus: 'success',
        submitMessage: 'Thank you! We\'ll be in touch within 24 hours.'
      }));

      // Reset form after success
      setTimeout(() => {
        setFormState(prev => ({
          ...prev,
          data: {
            name: '',
            email: '',
            company: '',
            phone: '',
            message: '',
            division: divisionId,
            service: '',
            budget: '',
            timeline: ''
          },
          submitStatus: 'idle',
          submitMessage: ''
        }));
        onSuccess?.();
      }, 3000);

    } catch (error) {
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        submitStatus: 'error',
        submitMessage: 'Something went wrong. Please try again or email us directly.'
      }));
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormState(prev => ({
      ...prev,
      data: { ...prev.data, [field]: value },
      errors: { ...prev.errors, [field]: '' }
    }));
  };

  return (
    <BlurFade delay={0.2}>
      <Card 
        className={`backdrop-blur-md border-2 ${variant === 'inline' ? 'shadow-none' : 'shadow-2xl'}`}
        style={{ 
          backgroundColor: `${theme.cardBackground}60`, 
          borderColor: theme.border 
        }}
      >
        <CardHeader>
          <CardTitle 
            className="text-2xl font-bold"
            style={{ color: theme.textPrimary }}
          >
            Get Started Today
          </CardTitle>
          <CardDescription 
            className="text-lg"
            style={{ color: theme.textSecondary }}
          >
            Tell us about your project and we'll create a custom strategy for your success.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {formState.submitStatus !== 'idle' && (
            <Alert 
              className="mb-6"
              variant={formState.submitStatus === 'success' ? 'default' : 'destructive'}
            >
              {formState.submitStatus === 'success' ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertDescription>{formState.submitMessage}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label 
                  htmlFor="name" 
                  className="text-sm font-medium"
                  style={{ color: theme.textPrimary }}
                >
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formState.data.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`backdrop-blur-sm ${formState.errors.name ? 'border-red-500' : ''}`}
                  style={{
                    backgroundColor: `${theme.cardBackground}40`,
                    borderColor: formState.errors.name ? '#ef4444' : theme.border,
                    color: theme.textPrimary
                  }}
                  placeholder="John Smith"
                />
                {formState.errors.name && (
                  <p className="text-xs text-red-500">{formState.errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label 
                  htmlFor="email" 
                  className="text-sm font-medium"
                  style={{ color: theme.textPrimary }}
                >
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formState.data.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`backdrop-blur-sm ${formState.errors.email ? 'border-red-500' : ''}`}
                  style={{
                    backgroundColor: `${theme.cardBackground}40`,
                    borderColor: formState.errors.email ? '#ef4444' : theme.border,
                    color: theme.textPrimary
                  }}
                  placeholder="john@company.com"
                />
                {formState.errors.email && (
                  <p className="text-xs text-red-500">{formState.errors.email}</p>
                )}
              </div>
            </div>

            {/* Company & Phone Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label 
                  htmlFor="company" 
                  className="text-sm font-medium"
                  style={{ color: theme.textPrimary }}
                >
                  Company *
                </Label>
                <Input
                  id="company"
                  type="text"
                  value={formState.data.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className={`backdrop-blur-sm ${formState.errors.company ? 'border-red-500' : ''}`}
                  style={{
                    backgroundColor: `${theme.cardBackground}40`,
                    borderColor: formState.errors.company ? '#ef4444' : theme.border,
                    color: theme.textPrimary
                  }}
                  placeholder="Your Company"
                />
                {formState.errors.company && (
                  <p className="text-xs text-red-500">{formState.errors.company}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label 
                  htmlFor="phone" 
                  className="text-sm font-medium"
                  style={{ color: theme.textPrimary }}
                >
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formState.data.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="backdrop-blur-sm"
                  style={{
                    backgroundColor: `${theme.cardBackground}40`,
                    borderColor: theme.border,
                    color: theme.textPrimary
                  }}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Service & Budget Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label 
                  htmlFor="service" 
                  className="text-sm font-medium"
                  style={{ color: theme.textPrimary }}
                >
                  Service Interest *
                </Label>
                <Select
                  value={formState.data.service}
                  onValueChange={(value) => handleInputChange('service', value)}
                >
                  <SelectTrigger 
                    className={`backdrop-blur-sm ${formState.errors.service ? 'border-red-500' : ''}`}
                    style={{
                      backgroundColor: `${theme.cardBackground}40`,
                      borderColor: formState.errors.service ? '#ef4444' : theme.border,
                      color: theme.textPrimary
                    }}
                  >
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent style={{ backgroundColor: theme.cardBackground, borderColor: theme.border }}>
                    {serviceOptions[divisionId]?.map((option) => (
                      <SelectItem 
                        key={option.value} 
                        value={option.value}
                        style={{ color: theme.textPrimary }}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formState.errors.service && (
                  <p className="text-xs text-red-500">{formState.errors.service}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label 
                  htmlFor="budget" 
                  className="text-sm font-medium"
                  style={{ color: theme.textPrimary }}
                >
                  Budget Range
                </Label>
                <Select
                  value={formState.data.budget || ''}
                  onValueChange={(value) => handleInputChange('budget', value)}
                >
                  <SelectTrigger 
                    className="backdrop-blur-sm"
                    style={{
                      backgroundColor: `${theme.cardBackground}40`,
                      borderColor: theme.border,
                      color: theme.textPrimary
                    }}
                  >
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent style={{ backgroundColor: theme.cardBackground, borderColor: theme.border }}>
                    {budgetOptions.map((option) => (
                      <SelectItem 
                        key={option.value} 
                        value={option.value}
                        style={{ color: theme.textPrimary }}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-2">
              <Label 
                htmlFor="timeline" 
                className="text-sm font-medium"
                style={{ color: theme.textPrimary }}
              >
                Project Timeline
              </Label>
              <Select
                value={formState.data.timeline || ''}
                onValueChange={(value) => handleInputChange('timeline', value)}
              >
                <SelectTrigger 
                  className="backdrop-blur-sm"
                  style={{
                    backgroundColor: `${theme.cardBackground}40`,
                    borderColor: theme.border,
                    color: theme.textPrimary
                  }}
                >
                  <SelectValue placeholder="When do you need this?" />
                </SelectTrigger>
                <SelectContent style={{ backgroundColor: theme.cardBackground, borderColor: theme.border }}>
                  {timelineOptions.map((option) => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                      style={{ color: theme.textPrimary }}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label 
                htmlFor="message" 
                className="text-sm font-medium"
                style={{ color: theme.textPrimary }}
              >
                Project Description *
              </Label>
              <Textarea
                id="message"
                value={formState.data.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className={`backdrop-blur-sm min-h-[120px] ${formState.errors.message ? 'border-red-500' : ''}`}
                style={{
                  backgroundColor: `${theme.cardBackground}40`,
                  borderColor: formState.errors.message ? '#ef4444' : theme.border,
                  color: theme.textPrimary
                }}
                placeholder="Tell us about your project goals, challenges, and how we can help transform your business..."
              />
              {formState.errors.message && (
                <p className="text-xs text-red-500">{formState.errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                size="lg"
                disabled={formState.isSubmitting || formState.submitStatus === 'success'}
                className="w-full text-lg font-semibold py-3 transition-all duration-300"
                style={{
                  backgroundColor: theme.neon,
                  color: theme.background,
                  border: 'none'
                }}
              >
                {formState.isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </span>
                ) : formState.submitStatus === 'success' ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Message Sent!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Send Message
                  </span>
                )}
              </Button>
            </motion.div>

            {/* Privacy Notice */}
            <p 
              className="text-xs text-center leading-relaxed"
              style={{ color: theme.textSecondary }}
            >
              By submitting this form, you agree to our privacy policy. We'll only use your information 
              to respond to your inquiry and may follow up about our services.
            </p>
          </form>
        </CardContent>
      </Card>
    </BlurFade>
  );
}
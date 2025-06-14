// src/components/forms/IntegratedContactForm.tsx
// Main form component integrating multi-step form, scoring, and calendar booking

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Calendar, Mail, TrendingUp, Sparkles, X } from 'lucide-react';
import MultiStepFormWizard from './MultiStepFormWizard';
import CalendarBookingWidget from '../booking/CalendarBookingWidget';
import { LeadFormData, LeadScore, FormSession } from '@/types/lead-scoring';
import { LeadScoringEngine } from '@/lib/lead-scoring';
import { sendEmail } from '@/lib/email-automation';
import { createCalendarEvent } from '@/lib/calendar-integration';
import { executeQuery, executeCommand } from '@/lib/neon/client';

interface IntegratedContactFormProps {
  division?: string;
  initialData?: Partial<LeadFormData>;
  showBooking?: boolean;
  onComplete?: (data: { lead: LeadFormData; score: LeadScore; booking?: any }) => void;
  className?: string;
}

type FormState = 'form' | 'scoring' | 'results' | 'booking' | 'complete';

interface ScoreInsight {
  type: 'strength' | 'opportunity' | 'recommendation';
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function IntegratedContactForm({
  division,
  initialData,
  showBooking = true,
  onComplete,
  className = '',
}: IntegratedContactFormProps) {
  const [currentState, setCurrentState] = useState<FormState>('form');
  const [formData, setFormData] = useState<LeadFormData | null>(null);
  const [leadScore, setLeadScore] = useState<LeadScore | null>(null);
  const [booking, setBooking] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [insights, setInsights] = useState<ScoreInsight[]>([]);

  const scoringEngine = new LeadScoringEngine();

  // Auto-fill division if provided
  useEffect(() => {
    if (division && initialData) {
      setFormData({ ...initialData, division } as LeadFormData);
    }
  }, [division, initialData]);

  const handleFormComplete = async (data: any, score: LeadScore) => {
    setIsProcessing(true);
    setError(null);

    try {
      // Store form data and score
      setFormData(data);
      setLeadScore(score);

      // Transition to scoring animation
      setCurrentState('scoring');

      // Simulate scoring calculation time for better UX
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Save lead to database
      const leadId = await saveLead(data, score);

      // Generate insights based on score
      const generatedInsights = generateInsights(score, data);
      setInsights(generatedInsights);

      // Trigger email automation
      await sendEmail({
        to: data.email,
        subject: 'Welcome to Cipher Intelligence Group',
        content: `Thank you for your interest, ${data.firstName}!`,
        type: 'welcome'
      });

      // Show results
      setCurrentState('results');

    } catch (err) {
      console.error('Form processing failed:', err);
      setError('Failed to process your submission. Please try again.');
      setCurrentState('form');
    } finally {
      setIsProcessing(false);
    }
  };

  const saveLead = async (data: LeadFormData, score: LeadScore): Promise<string> => {
    try {
      // Save lead using NeonDB
      const leadResult = await executeQuery(
        `INSERT INTO leads (
          email, first_name, last_name, phone, company, position, company_size,
          industry, location, market_type, division, services, budget, timeline,
          urgency, project_description, current_tech, pain_points, pain_point_severity,
          expected_outcomes, previous_experience, source, utm_source, utm_medium, utm_campaign
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
        RETURNING id`,
        [
          data.email, data.firstName, data.lastName, data.phone, data.company,
          data.position, data.companySize, data.industry, data.location, data.marketType,
          data.division, JSON.stringify(data.services), data.budget, data.timeline,
          data.urgency, data.projectDescription, JSON.stringify(data.currentTech),
          JSON.stringify(data.painPoints), data.painPointSeverity, JSON.stringify(data.expectedOutcomes),
          data.previousExperience, 'website_form',
          new URLSearchParams(window.location.search).get('utm_source'),
          new URLSearchParams(window.location.search).get('utm_medium'),
          new URLSearchParams(window.location.search).get('utm_campaign')
        ]
      );

      const leadId = leadResult[0]?.id;
      if (!leadId) throw new Error('Failed to create lead');

      // Save lead score
      await executeCommand(
        `INSERT INTO lead_scores (
          lead_id, total_score, classification, confidence, company_score,
          budget_score, timeline_score, pain_point_score, tech_compatibility_score,
          engagement_score, factors, version
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          leadId, score.totalScore, score.classification, score.confidence,
          score.companyScore, score.budgetScore, score.timelineScore,
          score.painPointScore, score.techCompatibilityScore, score.engagementScore,
          JSON.stringify(score.factors), score.version
        ]
      );

      return leadId;
    } catch (error) {
      console.error('Failed to save lead:', error);
      throw error;
    }
  };

  const generateInsights = (score: LeadScore, data: LeadFormData): ScoreInsight[] => {
    const insights: ScoreInsight[] = [];

    // Strengths
    if (score.budgetScore >= 80) {
      insights.push({
        type: 'strength',
        title: 'Strong Budget Alignment',
        description: 'Your budget range indicates excellent project feasibility.',
        icon: <TrendingUp className="w-5 h-5 text-green-500" />,
      });
    }

    if (score.timelineScore >= 80) {
      insights.push({
        type: 'strength',
        title: 'Urgent Timeline',
        description: 'Your immediate timeline allows for rapid implementation.',
        icon: <Sparkles className="w-5 h-5 text-blue-500" />,
      });
    }

    if (score.painPointScore >= 80) {
      insights.push({
        type: 'strength',
        title: 'Clear Pain Points',
        description: 'Well-defined challenges enable targeted solutions.',
        icon: <CheckCircle className="w-5 h-5 text-purple-500" />,
      });
    }

    // Opportunities
    if (score.techCompatibilityScore < 60) {
      insights.push({
        type: 'opportunity',
        title: 'Technology Modernization',
        description: 'Upgrading your tech stack could unlock significant value.',
        icon: <Sparkles className="w-5 h-5 text-orange-500" />,
      });
    }

    // Recommendations based on classification
    if (score.classification === 'hot') {
      insights.push({
        type: 'recommendation',
        title: 'Priority Consultation',
        description: 'Schedule a strategy session with our senior team immediately.',
        icon: <Calendar className="w-5 h-5 text-red-500" />,
      });
    } else if (score.classification === 'warm') {
      insights.push({
        type: 'recommendation',
        title: 'Detailed Proposal',
        description: 'We recommend a comprehensive consultation to explore opportunities.',
        icon: <Mail className="w-5 h-5 text-yellow-500" />,
      });
    }

    return insights;
  };

  const handleBookingComplete = (bookingData: any) => {
    setBooking(bookingData);
    setCurrentState('complete');
    
    if (onComplete && formData && leadScore) {
      onComplete({
        lead: formData,
        score: leadScore,
        booking: bookingData,
      });
    }
  };

  const handleSkipBooking = () => {
    setCurrentState('complete');
    
    if (onComplete && formData && leadScore) {
      onComplete({
        lead: formData,
        score: leadScore,
      });
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-blue-100';
    if (score >= 40) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getClassificationBadge = (classification: string) => {
    const badges = {
      hot: { label: 'Hot Lead', color: 'bg-red-100 text-red-800' },
      warm: { label: 'Warm Lead', color: 'bg-yellow-100 text-yellow-800' },
      cold: { label: 'Cold Lead', color: 'bg-blue-100 text-blue-800' },
      nurture: { label: 'Nurture Lead', color: 'bg-gray-100 text-gray-800' },
    };

    const badge = badges[classification as keyof typeof badges] || badges.nurture;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <AnimatePresence mode="wait">
        {/* Multi-Step Form */}
        {currentState === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MultiStepFormWizard
              onComplete={handleFormComplete}
              initialData={initialData}
            />
          </motion.div>
        )}

        {/* Scoring Animation */}
        {currentState === 'scoring' && (
          <motion.div
            key="scoring"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <div className="relative">
                <div className="w-24 h-24 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-8"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Analyzing Your Requirements
              </h3>
              <p className="text-gray-600 mb-8">
                Our AI is evaluating your project details and calculating your compatibility score...
              </p>
              
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Evaluating project requirements</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <span>Calculating compatibility score</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <span>Generating personalized recommendations</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results Display */}
        {currentState === 'results' && leadScore && formData && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Score Header */}
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreBgColor(leadScore.totalScore)} mb-6`}>
                <span className={`text-3xl font-bold ${getScoreColor(leadScore.totalScore)}`}>
                  {leadScore.totalScore}
                </span>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Your Compatibility Score
              </h2>
              
              <div className="flex items-center justify-center space-x-4 mb-6">
                {getClassificationBadge(leadScore.classification)}
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-600">
                  {leadScore.confidence}% confidence
                </span>
              </div>
              
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Based on your project requirements, we've calculated your compatibility with our services 
                and generated personalized recommendations.
              </p>
            </div>

            {/* Score Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Score Breakdown</h4>
                <div className="space-y-3">
                  {[
                    { label: 'Company Fit', score: leadScore.companyScore },
                    { label: 'Budget Alignment', score: leadScore.budgetScore },
                    { label: 'Timeline Match', score: leadScore.timelineScore },
                    { label: 'Pain Points', score: leadScore.painPointScore },
                    { label: 'Tech Compatibility', score: leadScore.techCompatibilityScore },
                    { label: 'Engagement', score: leadScore.engagementScore },
                  ].map(({ label, score }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{label}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 ${
                              score >= 80 ? 'bg-green-500' :
                              score >= 60 ? 'bg-blue-500' :
                              score >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${score}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8">
                          {score}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insights */}
              <div className="md:col-span-2 bg-white rounded-lg border p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Personalized Insights</h4>
                <div className="space-y-4">
                  {insights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {insight.icon}
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-1">
                          {insight.title}
                        </h5>
                        <p className="text-sm text-gray-600">
                          {insight.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended Next Steps */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Recommended Next Steps
                </h3>
                <p className="text-gray-600">
                  Based on your score and requirements, here's what we recommend:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Immediate Action */}
                <div className="bg-white rounded-lg p-6 border-2 border-blue-200">
                  <div className="flex items-center mb-4">
                    <Calendar className="w-6 h-6 text-blue-500 mr-3" />
                    <h4 className="font-semibold text-gray-900">
                      {leadScore.classification === 'hot' ? 'Priority Consultation' :
                       leadScore.classification === 'warm' ? 'Strategy Session' :
                       'Discovery Call'}
                    </h4>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {leadScore.classification === 'hot' 
                      ? 'Schedule an immediate consultation with our senior team to discuss your high-priority project.'
                      : leadScore.classification === 'warm'
                      ? 'Book a strategy session to explore how we can address your specific challenges.'
                      : 'Start with a discovery call to better understand your needs and explore opportunities.'
                    }
                  </p>
                  
                  {showBooking && (
                    <div className="space-y-3">
                      <button
                        onClick={() => setCurrentState('booking')}
                        className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                      >
                        Schedule Meeting Now
                      </button>
                      <button
                        onClick={handleSkipBooking}
                        className="w-full text-blue-600 hover:text-blue-700 transition-colors text-sm"
                      >
                        Skip for now
                      </button>
                    </div>
                  )}
                </div>

                {/* Follow-up Resources */}
                <div className="bg-white rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Mail className="w-6 h-6 text-green-500 mr-3" />
                    <h4 className="font-semibold text-gray-900">
                      Personalized Resources
                    </h4>
                  </div>
                  <p className="text-gray-600 mb-4">
                    We're sending you a customized package of resources, case studies, 
                    and insights specifically tailored to your {formData.industry} industry and {formData.division} needs.
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Industry-specific case studies
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      ROI calculator and pricing guide
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Technology roadmap template
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Weekly insights newsletter
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Thank You Message */}
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Thank You, {formData.firstName}!
              </h3>
              <p className="text-gray-600">
                We're excited about the opportunity to work with {formData.company} and help you achieve your goals.
                Our team will review your requirements and follow up within 24 hours.
              </p>
            </div>
          </motion.div>
        )}

        {/* Calendar Booking */}
        {currentState === 'booking' && formData && (
          <motion.div
            key="booking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CalendarBookingWidget
              leadData={formData}
              onBookingComplete={handleBookingComplete}
              onCancel={() => setCurrentState('results')}
              defaultMeetingType={
                leadScore?.classification === 'hot' ? 'strategy' :
                leadScore?.classification === 'warm' ? 'consultation' :
                'discovery'
              }
            />
          </motion.div>
        )}

        {/* Final Completion */}
        {currentState === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                We're All Set!
              </h2>
              
              <p className="text-lg text-gray-600 mb-8">
                {booking 
                  ? `Your consultation is scheduled and you'll receive a confirmation email shortly. We're looking forward to discussing your project!`
                  : `Thank you for your interest! Our team will review your requirements and reach out within 24 hours with next steps.`
                }
              </p>

              {booking && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                  <h4 className="font-semibold text-green-900 mb-2">
                    Meeting Confirmed
                  </h4>
                  <p className="text-green-700">
                    {new Date(booking.scheduledAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })} at {new Date(booking.scheduledAt).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="text-center">
                  <Mail className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <h4 className="font-medium text-gray-900 mb-2">Check Your Email</h4>
                  <p className="text-sm text-gray-600">
                    Confirmation and resources are on their way
                  </p>
                </div>
                
                <div className="text-center">
                  <Calendar className="w-8 h-8 text-green-500 mx-auto mb-3" />
                  <h4 className="font-medium text-gray-900 mb-2">Prepare for Meeting</h4>
                  <p className="text-sm text-gray-600">
                    Gather any additional project details
                  </p>
                </div>
                
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                  <h4 className="font-medium text-gray-900 mb-2">Track Progress</h4>
                  <p className="text-sm text-gray-600">
                    We'll keep you updated every step of the way
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Questions? Contact us at{' '}
                  <a href="mailto:hello@cipher-intelligence.com" className="text-blue-600 hover:underline">
                    hello@cipher-intelligence.com
                  </a>{' '}
                  or{' '}
                  <a href="tel:+1234567890" className="text-blue-600 hover:underline">
                    (123) 456-7890
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg max-w-md"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <X className="w-5 h-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-red-800">Error</h4>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="ml-auto flex-shrink-0"
            >
              <X className="w-4 h-4 text-red-400 hover:text-red-600" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
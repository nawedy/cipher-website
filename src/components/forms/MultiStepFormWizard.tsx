// src/components/forms/MultiStepFormWizard.tsx
// Advanced multi-step form wizard with conditional logic and progress tracking

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Clock, AlertCircle } from 'lucide-react';
import { LeadFormData, FormSession } from '@/types/lead-scoring';
import { LeadScoringEngine } from '@/lib/lead-scoring';
import { executeQuery, executeCommand } from '@/lib/neon/client';

// Form schema for validation
const formSchema = z.object({
  // Step 1: Basic Information
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  company: z.string().min(2, 'Company name is required'),
  position: z.string().min(2, 'Position is required'),

  // Step 2: Division and Services
  division: z.enum(['strategy', 'digitalworks', 'labs', 'studio', 'ai']),
  services: z.array(z.string()).min(1, 'At least one service must be selected'),

  // Step 3: Company Information
  companySize: z.enum(['startup', 'small', 'medium', 'enterprise']),
  industry: z.string().min(2, 'Industry is required'),
  location: z.string().min(2, 'Location is required'),
  marketType: z.enum(['local', 'national', 'international']),

  // Step 4: Project Details
  budget: z.enum(['under-10k', '10k-50k', '50k-100k', '100k-500k', '500k+']),
  timeline: z.enum(['immediate', 'within-month', 'within-quarter', 'within-year']),
  urgency: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  projectDescription: z.string().min(10, 'Please provide project details'),

  // Step 5: Technical Assessment
  currentTech: z.array(z.string()),
  painPoints: z.array(z.string()).min(1, 'Please identify at least one pain point'),
  painPointSeverity: z.record(z.number().min(1).max(5)),
  expectedOutcomes: z.array(z.string()),
  previousExperience: z.enum(['none', 'some', 'extensive']),
});

type FormData = z.infer<typeof formSchema>;

interface MultiStepFormWizardProps {
  onComplete: (data: FormData, score: any) => Promise<void>;
  onSessionSave?: (session: FormSession) => Promise<void>;
  initialData?: Partial<FormData>;
  className?: string;
}

interface StepConfig {
  title: string;
  description: string;
  fields: (keyof FormData)[];
  component: React.ComponentType<{ form: UseFormReturn<FormData>; onNext: () => void }>;
}

export default function MultiStepFormWizard({
  onComplete,
  onSessionSave,
  initialData,
  className = '',
}: MultiStepFormWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [sessionId] = useState(() => crypto.randomUUID());
  const [timeSpent, setTimeSpent] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionData, setSessionData] = useState<FormSession | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      services: [],
      currentTech: [],
      painPoints: [],
      expectedOutcomes: [],
      painPointSeverity: {},
      urgency: 3,
      ...initialData,
    },
    mode: 'onChange',
  });

  // Using NeonDB instead of Supabase
  const scoringEngine = new LeadScoringEngine();

  // Timer for tracking session duration
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-save session data
  const saveSession = useCallback(async () => {
    const formData = form.getValues();
    const completionPercentage = Math.round(((currentStep + 1) / steps.length) * 100);

    const session: FormSession = {
      id: sessionData?.id || crypto.randomUUID(),
      sessionId,
      currentStep,
      totalSteps: steps.length,
      division: formData.division || null,
      formData,
      completionPercentage,
      timeSpent,
      lastUpdated: new Date(),
      isCompleted: false,
    };

    setSessionData(session);

    if (onSessionSave) {
      await onSessionSave(session);
    }

    // Save to NeonDB
    try {
      await executeCommand(
        'INSERT INTO form_sessions (session_id, current_step, form_data, time_spent, updated_at) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (session_id) DO UPDATE SET current_step = $2, form_data = $3, time_spent = $4, updated_at = $5',
        [sessionId, currentStep, JSON.stringify(formData), timeSpent, new Date().toISOString()]
      );
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  }, [currentStep, form, sessionId, sessionData?.id, timeSpent, onSessionSave]);

  // Auto-save every 30 seconds
  useEffect(() => {
    const autoSave = setInterval(() => {
      saveSession();
    }, 30000);

    return () => clearInterval(autoSave);
  }, [saveSession]);

  const steps: StepConfig[] = [
    {
      title: 'Basic Information',
      description: 'Tell us about yourself and your company',
      fields: ['firstName', 'lastName', 'email', 'phone', 'company', 'position'],
      component: BasicInfoStep,
    },
    {
      title: 'Services & Division',
      description: 'What services are you interested in?',
      fields: ['division', 'services'],
      component: ServicesStep,
    },
    {
      title: 'Company Details',
      description: 'Help us understand your organization',
      fields: ['companySize', 'industry', 'location', 'marketType'],
      component: CompanyStep,
    },
    {
      title: 'Project Information',
      description: 'Tell us about your project requirements',
      fields: ['budget', 'timeline', 'urgency', 'projectDescription'],
      component: ProjectStep,
    },
    {
      title: 'Technical Assessment',
      description: 'Current tech stack and pain points',
      fields: ['currentTech', 'painPoints', 'painPointSeverity', 'expectedOutcomes', 'previousExperience'],
      component: TechnicalStep,
    },
  ];

  const nextStep = async () => {
    const currentStepConfig = steps[currentStep];
    const isValid = await form.trigger(currentStepConfig.fields);

    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        await saveSession();
      } else {
        await handleSubmit();
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      const formData = form.getValues();
      
      // Calculate lead score
      const score = scoringEngine.calculateScore(formData as LeadFormData);
      
      // Mark session as completed
      if (sessionData) {
        const completedSession = {
          ...sessionData,
          isCompleted: true,
          completionPercentage: 100,
        };
        await executeCommand(
          'UPDATE form_sessions SET is_completed = $1, completion_percentage = $2 WHERE session_id = $3',
          [true, 100, sessionId]
        );
      }

      await onComplete(formData, score);
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className={`max-w-4xl mx-auto p-6 ${className}`}>
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Get Your Custom Proposal
          </h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index < steps.length - 1 ? 'flex-1' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                    index < currentStep
                      ? 'bg-green-500 border-green-500 text-white'
                      : index === currentStep
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-gray-100 border-gray-300 text-gray-500'
                  }`}
                >
                  {index < currentStep ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 transition-all ${
                      index < currentStep ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-600">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
          </div>
        </div>

        {/* Progress Percentage */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Form Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {steps[currentStep].title}
              </h3>
              <p className="text-gray-600">
                {steps[currentStep].description}
              </p>
            </div>

            {React.createElement(steps[currentStep].component, {
              form,
              onNext: nextStep,
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`flex items-center px-4 py-2 rounded-lg transition-all ${
            currentStep === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={saveSession}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Save Progress
          </button>

          <button
            type="button"
            onClick={nextStep}
            disabled={isSubmitting}
            className={`flex items-center px-6 py-2 rounded-lg font-medium transition-all ${
              currentStep === steps.length - 1
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Submitting...
              </>
            ) : currentStep === steps.length - 1 ? (
              <>
                Submit Application
                <Check className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Continue
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Form Validation Errors */}
      {Object.keys(form.formState.errors).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <div className="flex items-center mb-2">
            <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
            <span className="text-sm font-medium text-red-700">
              Please fix the following errors:
            </span>
          </div>
          <ul className="text-sm text-red-600 space-y-1">
            {Object.entries(form.formState.errors).map(([field, error]) => (
              <li key={field}>• {typeof error === 'string' ? error : (error as any)?.message || 'Invalid field'}</li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}

// Step 1: Basic Information Component
function BasicInfoStep({ form, onNext }: { form: UseFormReturn<FormData>; onNext: () => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            {...form.register('firstName')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your first name"
          />
          {form.formState.errors.firstName && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            {...form.register('lastName')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your last name"
          />
          {form.formState.errors.lastName && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <input
          {...form.register('email')}
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your email address"
        />
        {form.formState.errors.email && (
          <p className="mt-1 text-sm text-red-600">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number *
        </label>
        <input
          {...form.register('phone')}
          type="tel"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your phone number"
        />
        {form.formState.errors.phone && (
          <p className="mt-1 text-sm text-red-600">
            {form.formState.errors.phone.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name *
          </label>
          <input
            {...form.register('company')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your company name"
          />
          {form.formState.errors.company && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.company.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Title *
          </label>
          <input
            {...form.register('position')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your job title"
          />
          {form.formState.errors.position && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.position.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Step 2: Services Selection Component
function ServicesStep({ form, onNext }: { form: UseFormReturn<FormData>; onNext: () => void }) {
  const divisions = [
    {
      id: 'strategy',
      name: 'Strategy Division',
      description: 'AI-powered strategic consulting and business transformation',
      services: [
        'Strategic Planning & AI Integration',
        'Market Analysis & Competitive Intelligence',
        'Digital Transformation Roadmaps',
        'Performance Optimization',
        'Business Process Automation',
      ],
    },
    {
      id: 'digitalworks',
      name: 'DigitalWorks Division',
      description: 'Content automation and growth systems',
      services: [
        'Content Marketing Automation',
        'SEO & Growth Optimization',
        'Social Media Management',
        'Email Marketing Systems',
        'Lead Generation Funnels',
      ],
    },
    {
      id: 'labs',
      name: 'Labs Division',
      description: 'AI research and innovation prototyping',
      services: [
        'AI Research & Development',
        'Prototype Development',
        'Innovation Consulting',
        'Technology Feasibility Studies',
        'Custom AI Solutions',
      ],
    },
    {
      id: 'studio',
      name: 'Studio Division',
      description: 'Modern web and mobile application development',
      services: [
        'Web Application Development',
        'Mobile App Development',
        'UI/UX Design',
        'Progressive Web Apps',
        'E-commerce Solutions',
      ],
    },
    {
      id: 'ai',
      name: 'AI Division',
      description: 'Custom AI models and intelligent automation',
      services: [
        'Custom AI Model Development',
        'Machine Learning Implementation',
        'Natural Language Processing',
        'Computer Vision Solutions',
        'Intelligent Automation',
      ],
    },
  ];

  const selectedDivision = form.watch('division');
  const selectedServices = form.watch('services') || [];

  const handleDivisionSelect = (divisionId: string) => {
    form.setValue('division', divisionId as any);
    form.setValue('services', []); // Reset services when division changes
  };

  const handleServiceToggle = (service: string) => {
    const currentServices = selectedServices;
    const isSelected = currentServices.includes(service);
    
    if (isSelected) {
      form.setValue('services', currentServices.filter(s => s !== service));
    } else {
      form.setValue('services', [...currentServices, service]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Division Selection */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">
          Select Your Primary Interest *
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {divisions.map((division) => (
            <div
              key={division.id}
              onClick={() => handleDivisionSelect(division.id)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedDivision === division.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h5 className="font-medium text-gray-900 mb-2">{division.name}</h5>
              <p className="text-sm text-gray-600">{division.description}</p>
            </div>
          ))}
        </div>
        {form.formState.errors.division && (
          <p className="mt-2 text-sm text-red-600">
            {form.formState.errors.division.message}
          </p>
        )}
      </div>

      {/* Services Selection */}
      {selectedDivision && (
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Select Specific Services *
          </h4>
          <div className="space-y-3">
            {divisions
              .find(d => d.id === selectedDivision)
              ?.services.map((service) => (
                <label
                  key={service}
                  className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service)}
                    onChange={() => handleServiceToggle(service)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-3 text-gray-900">{service}</span>
                </label>
              ))}
          </div>
          {form.formState.errors.services && (
            <p className="mt-2 text-sm text-red-600">
              {form.formState.errors.services.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// Step 3: Company Information Component
function CompanyStep({ form, onNext }: { form: UseFormReturn<FormData>; onNext: () => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Size *
          </label>
          <select
            {...form.register('companySize')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select company size</option>
            <option value="startup">Startup (1-10 employees)</option>
            <option value="small">Small Business (11-50 employees)</option>
            <option value="medium">Medium Business (51-200 employees)</option>
            <option value="enterprise">Enterprise (200+ employees)</option>
          </select>
          {form.formState.errors.companySize && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.companySize.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry *
          </label>
          <input
            {...form.register('industry')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Technology, Healthcare, Finance"
          />
          {form.formState.errors.industry && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.industry.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <input
            {...form.register('location')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="City, State/Country"
          />
          {form.formState.errors.location && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.location.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Market Reach *
          </label>
          <select
            {...form.register('marketType')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select market reach</option>
            <option value="local">Local Market</option>
            <option value="national">National Market</option>
            <option value="international">International Market</option>
          </select>
          {form.formState.errors.marketType && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.marketType.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Step 4: Project Information Component  
function ProjectStep({ form, onNext }: { form: UseFormReturn<FormData>; onNext: () => void }) {
  const urgency = form.watch('urgency') || 3;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget Range *
          </label>
          <select
            {...form.register('budget')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select budget range</option>
            <option value="under-10k">Under $10,000</option>
            <option value="10k-50k">$10,000 - $50,000</option>
            <option value="50k-100k">$50,000 - $100,000</option>
            <option value="100k-500k">$100,000 - $500,000</option>
            <option value="500k+">$500,000+</option>
          </select>
          {form.formState.errors.budget && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.budget.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timeline *
          </label>
          <select
            {...form.register('timeline')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select timeline</option>
            <option value="immediate">Start Immediately</option>
            <option value="within-month">Within 1 Month</option>
            <option value="within-quarter">Within 3 Months</option>
            <option value="within-year">Within 1 Year</option>
          </select>
          {form.formState.errors.timeline && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.timeline.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Urgency: {urgency}/5
        </label>
        <input
          type="range"
          min="1"
          max="5"
          {...form.register('urgency', { valueAsNumber: true })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Not Urgent</span>
          <span>Very Urgent</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Description *
        </label>
        <textarea
          {...form.register('projectDescription')}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Describe your project goals, requirements, and expected outcomes..."
        />
        {form.formState.errors.projectDescription && (
          <p className="mt-1 text-sm text-red-600">
            {form.formState.errors.projectDescription.message}
          </p>
        )}
      </div>
    </div>
  );
}

// Step 5: Technical Assessment Component
function TechnicalStep({ form, onNext }: { form: UseFormReturn<FormData>; onNext: () => void }) {
  const commonTechnologies = [
    'React', 'Next.js', 'TypeScript', 'JavaScript', 'Python', 'Node.js',
    'Supabase', 'PostgreSQL', 'MySQL', 'MongoDB', 'Firebase',
    'AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes',
    'AI/ML', 'Machine Learning', 'OpenAI', 'TensorFlow', 'PyTorch'
  ];

  const commonPainPoints = [
    'Slow website performance',
    'Poor user experience',
    'Lack of automation',
    'Inefficient processes',
    'Poor data insights',
    'Security concerns',
    'Scalability issues',
    'High operational costs',
    'Competitive disadvantage',
    'Technical debt'
  ];

  const selectedTech = form.watch('currentTech') || [];
  const selectedPainPoints = form.watch('painPoints') || [];
  const painPointSeverity = form.watch('painPointSeverity') || {};

  const handleTechToggle = (tech: string) => {
    const isSelected = selectedTech.includes(tech);
    if (isSelected) {
      form.setValue('currentTech', selectedTech.filter(t => t !== tech));
    } else {
      form.setValue('currentTech', [...selectedTech, tech]);
    }
  };

  const handlePainPointToggle = (painPoint: string) => {
    const isSelected = selectedPainPoints.includes(painPoint);
    if (isSelected) {
      form.setValue('painPoints', selectedPainPoints.filter(p => p !== painPoint));
      const newSeverity = { ...painPointSeverity };
      delete newSeverity[painPoint];
      form.setValue('painPointSeverity', newSeverity);
    } else {
      form.setValue('painPoints', [...selectedPainPoints, painPoint]);
      form.setValue('painPointSeverity', { ...painPointSeverity, [painPoint]: 3 });
    }
  };

  const handleSeverityChange = (painPoint: string, severity: number) => {
    form.setValue('painPointSeverity', { ...painPointSeverity, [painPoint]: severity });
  };

  return (
    <div className="space-y-8">
      {/* Current Technology */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">
          Current Technology Stack
        </h4>
        <p className="text-sm text-gray-600 mb-4">
          Select the technologies you're currently using:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {commonTechnologies.map((tech) => (
            <label
              key={tech}
              className="flex items-center p-2 border rounded cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedTech.includes(tech)}
                onChange={() => handleTechToggle(tech)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-900">{tech}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Pain Points */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">
          Current Pain Points *
        </h4>
        <p className="text-sm text-gray-600 mb-4">
          Select your biggest challenges and rate their severity:
        </p>
        <div className="space-y-4">
          {commonPainPoints.map((painPoint) => (
            <div key={painPoint} className="border rounded-lg p-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedPainPoints.includes(painPoint)}
                  onChange={() => handlePainPointToggle(painPoint)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-3 text-gray-900">{painPoint}</span>
              </label>
              
              {selectedPainPoints.includes(painPoint) && (
                <div className="mt-3 ml-7">
                  <label className="block text-sm text-gray-600 mb-2">
                    Severity: {painPointSeverity[painPoint] || 3}/5
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={painPointSeverity[painPoint] || 3}
                    onChange={(e) => handleSeverityChange(painPoint, parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Minor</span>
                    <span>Critical</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {form.formState.errors.painPoints && (
          <p className="mt-2 text-sm text-red-600">
            {form.formState.errors.painPoints.message}
          </p>
        )}
      </div>

      {/* Previous Experience */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Previous Experience with Similar Projects *
        </label>
        <select
          {...form.register('previousExperience')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select experience level</option>
          <option value="none">No previous experience</option>
          <option value="some">Some experience</option>
          <option value="extensive">Extensive experience</option>
        </select>
        {form.formState.errors.previousExperience && (
          <p className="mt-1 text-sm text-red-600">
            {form.formState.errors.previousExperience.message}
          </p>
        )}
      </div>
    </div>
  );
}
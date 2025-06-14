// src/components/booking/CalendarBookingWidget.tsx
// Calendar booking widget component with time slot selection and confirmation

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { AvailabilitySlot, BookingRequest, getAvailableSlots, createBooking } from '@/lib/calendar-integration';
import { LeadFormData } from '@/types/lead-scoring';

interface CalendarBookingWidgetProps {
  leadData: LeadFormData;
  onBookingComplete: (booking: any) => void;
  onCancel: () => void;
  defaultMeetingType?: 'discovery' | 'demo' | 'consultation' | 'strategy';
  className?: string;
}

interface TimeSlot {
  start: Date;
  end: Date;
  isAvailable: boolean;
  isSelected: boolean;
}

export default function CalendarBookingWidget({
  leadData,
  onBookingComplete,
  onCancel,
  defaultMeetingType = 'discovery',
  className = '',
}: CalendarBookingWidgetProps) {
  const [currentStep, setCurrentStep] = useState<'meeting-type' | 'date-time' | 'confirmation' | 'success'>('meeting-type');
  const [selectedMeetingType, setSelectedMeetingType] = useState(defaultMeetingType);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [availableSlots, setAvailableSlots] = useState<AvailabilitySlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [timezone, setTimezone] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');

  // Using direct calendar integration functions

  const meetingTypes = {
    discovery: {
      title: 'Discovery Call',
      duration: 30,
      description: 'Initial consultation to understand your needs and goals',
      icon: '🔍',
    },
    demo: {
      title: 'Product Demo',
      duration: 45,
      description: 'Live demonstration of our solutions and capabilities',
      icon: '📺',
    },
    consultation: {
      title: 'Consultation',
      duration: 60,
      description: 'In-depth discussion about your project requirements',
      icon: '💬',
    },
    strategy: {
      title: 'Strategy Session',
      duration: 90,
      description: 'Comprehensive strategic planning and roadmap discussion',
      icon: '🎯',
    },
  };

  // Detect user timezone
  useEffect(() => {
    const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(detectedTimezone);
  }, []);

  // Generate calendar days for current month
  useEffect(() => {
    const generateCalendarDays = () => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const startDate = new Date(firstDay);
      const endDate = new Date(lastDay);
      
      // Start from the first Monday before or on the first day of the month
      startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
      
      // End on the last Sunday after or on the last day of the month
      endDate.setDate(endDate.getDate() + (7 - endDate.getDay()));
      
      const days: Date[] = [];
      const currentDate = new Date(startDate);
      
      while (currentDate <= endDate) {
        days.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      setCalendarDays(days);
    };

    generateCalendarDays();
  }, [currentMonth]);

  // Load available slots when date is selected
  useEffect(() => {
    if (selectedDate && selectedMeetingType) {
      loadAvailableSlots();
    }
  }, [selectedDate, selectedMeetingType]);

  const loadAvailableSlots = async () => {
    if (!selectedDate) return;

    setIsLoading(true);
    setError(null);

    try {
      const startDate = new Date(selectedDate);
      const endDate = new Date(selectedDate);
      endDate.setDate(endDate.getDate() + 1);

      const slots = await getAvailableSlots(
        startDate,
        meetingTypes[selectedMeetingType].duration
      );

      setAvailableSlots(slots);
    } catch (err) {
      setError('Failed to load available time slots. Please try again.');
      console.error('Failed to load slots:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMeetingTypeSelect = (type: keyof typeof meetingTypes) => {
    setSelectedMeetingType(type);
    setCurrentStep('date-time');
  };

  const handleDateSelect = (date: Date) => {
    // Don't allow selecting past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) return;

    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (slot: AvailabilitySlot) => {
    setSelectedTimeSlot({
      start: slot.start,
      end: slot.end,
      isAvailable: slot.available,
      isSelected: true,
    });
  };

  const handleBookingConfirm = async () => {
    if (!selectedTimeSlot || !selectedDate) return;

    setIsLoading(true);
    setError(null);

    try {
      const bookingRequest: BookingRequest = {
        name: `${leadData.firstName} ${leadData.lastName}`,
        email: leadData.email,
        phone: leadData.phone,
        service: selectedMeetingType,
        duration: meetingTypes[selectedMeetingType].duration,
        preferredDate: selectedTimeSlot.start,
        notes: bookingNotes,
      };

      const booking = await createBooking(bookingRequest);
      
      setCurrentStep('success');
      onBookingComplete(booking);
    } catch (err) {
      setError('Failed to book meeting. Please try again.');
      console.error('Booking failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Disable past dates and weekends
    return date < today || date.getDay() === 0 || date.getDay() === 6;
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    const now = new Date();
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    
    // Don't allow going to previous months
    if (newMonth >= new Date(now.getFullYear(), now.getMonth())) {
      setCurrentMonth(newMonth);
    }
  };

  return (
    <div className={`max-w-2xl mx-auto bg-white rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Schedule Your Meeting
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Progress indicators */}
        <div className="flex items-center mt-4 space-x-4">
          {(['meeting-type', 'date-time', 'confirmation'] as const).map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  currentStep === step
                    ? 'bg-blue-500 text-white'
                    : index < (['meeting-type', 'date-time', 'confirmation', 'success'] as const).indexOf(currentStep)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index < (['meeting-type', 'date-time', 'confirmation', 'success'] as const).indexOf(currentStep) ? (
                  <Check className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>
              {index < 2 && (
                <div
                  className={`w-12 h-0.5 mx-2 transition-all ${
                    index < (['meeting-type', 'date-time', 'confirmation', 'success'] as const).indexOf(currentStep)
                      ? 'bg-green-500'
                      : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Meeting Type Selection */}
          {currentStep === 'meeting-type' && (
            <motion.div
              key="meeting-type"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  What type of meeting would you like?
                </h4>
                <p className="text-gray-600">
                  Choose the meeting type that best fits your needs
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(meetingTypes).map(([key, type]) => (
                  <button
                    key={key}
                    onClick={() => handleMeetingTypeSelect(key as keyof typeof meetingTypes)}
                    className={`p-4 border-2 rounded-lg text-left transition-all hover:border-blue-300 hover:bg-blue-50 ${
                      selectedMeetingType === key
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{type.icon}</span>
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900 mb-1">
                          {type.title}
                        </h5>
                        <p className="text-sm text-gray-600 mb-2">
                          {type.description}
                        </p>
                        <div className="flex items-center text-sm text-blue-600">
                          <Clock className="w-4 h-4 mr-1" />
                          {type.duration} minutes
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Date and Time Selection */}
          {currentStep === 'date-time' && (
            <motion.div
              key="date-time"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Select Date & Time
                </h4>
                <p className="text-gray-600">
                  Choose your preferred date and time slot
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Calendar */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-gray-900">Select Date</h5>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={prevMonth}
                        disabled={currentMonth.getMonth() === new Date().getMonth()}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <span className="font-medium text-gray-900">
                        {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </span>
                      <button
                        onClick={nextMonth}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    {/* Calendar header */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                        <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar days */}
                    <div className="grid grid-cols-7 gap-1">
                      {calendarDays.map((date, index) => {
                        const isSelected = selectedDate?.toDateString() === date.toDateString();
                        const isDisabled = isDateDisabled(date);
                        const isOtherMonth = !isCurrentMonth(date);

                        return (
                          <button
                            key={index}
                            onClick={() => !isDisabled && handleDateSelect(date)}
                            disabled={isDisabled}
                            className={`
                              w-10 h-10 text-sm rounded-lg transition-all
                              ${isSelected
                                ? 'bg-blue-500 text-white'
                                : isDisabled
                                ? 'text-gray-300 cursor-not-allowed'
                                : isOtherMonth
                                ? 'text-gray-400 hover:bg-gray-100'
                                : 'text-gray-900 hover:bg-blue-100'
                              }
                            `}
                          >
                            {date.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Time Slots */}
                <div className="space-y-4">
                  <h5 className="font-medium text-gray-900">Available Times</h5>
                  
                  {selectedDate ? (
                    <div className="border rounded-lg p-4">
                      <div className="text-sm font-medium text-gray-700 mb-4">
                        {formatDate(selectedDate)}
                      </div>

                      {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                      ) : availableSlots.length > 0 ? (
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {availableSlots.map((slot, index) => (
                            <button
                              key={index}
                              onClick={() => handleTimeSlotSelect(slot)}
                              className={`
                                w-full p-3 text-left rounded-lg border transition-all
                                ${selectedTimeSlot?.start.getTime() === slot.start.getTime()
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                }
                              `}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium">
                                  {formatTime(slot.start)} - {formatTime(slot.end)}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {meetingTypes[selectedMeetingType].duration} min
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          No available time slots for this date.
                          Please select another date.
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="border rounded-lg p-4">
                      <div className="text-center py-8 text-gray-500">
                        Please select a date to see available times
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4 border-t">
                <button
                  onClick={() => setCurrentStep('meeting-type')}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </button>

                <button
                  onClick={() => setCurrentStep('confirmation')}
                  disabled={!selectedTimeSlot}
                  className={`
                    px-6 py-2 rounded-lg font-medium transition-all
                    ${selectedTimeSlot
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirmation */}
          {currentStep === 'confirmation' && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Confirm Your Meeting
                </h4>
                <p className="text-gray-600">
                  Please review your meeting details
                </p>
              </div>

              {/* Meeting Summary */}
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="flex items-start space-x-4">
                  <Calendar className="w-6 h-6 text-blue-500 mt-1" />
                  <div>
                    <h5 className="font-medium text-gray-900">
                      {meetingTypes[selectedMeetingType].title}
                    </h5>
                    <p className="text-sm text-gray-600">
                      {meetingTypes[selectedMeetingType].description}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-blue-500 mt-1" />
                  <div>
                    <h5 className="font-medium text-gray-900">
                      {selectedDate && formatDate(selectedDate)}
                    </h5>
                    <p className="text-sm text-gray-600">
                      {selectedTimeSlot && formatTime(selectedTimeSlot.start)} - {selectedTimeSlot && formatTime(selectedTimeSlot.end)}
                      ({meetingTypes[selectedMeetingType].duration} minutes)
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {timezone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <User className="w-6 h-6 text-blue-500 mt-1" />
                  <div>
                    <h5 className="font-medium text-gray-900">
                      {leadData.firstName} {leadData.lastName}
                    </h5>
                    <p className="text-sm text-gray-600">
                      {leadData.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      {leadData.company} - {leadData.position}
                    </p>
                  </div>
                </div>
              </div>

              {/* Optional Notes */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any specific topics you'd like to discuss or questions you have..."
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4 border-t">
                <button
                  onClick={() => setCurrentStep('date-time')}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </button>

                <button
                  onClick={handleBookingConfirm}
                  disabled={isLoading}
                  className={`
                    px-6 py-2 rounded-lg font-medium transition-all
                    ${isLoading
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600'
                    }
                  `}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 inline-block"></div>
                      Booking...
                    </>
                  ) : (
                    'Confirm Meeting'
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Success */}
          {currentStep === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-green-600" />
              </div>

              <div>
                <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                  Meeting Confirmed!
                </h4>
                <p className="text-gray-600">
                  Your {meetingTypes[selectedMeetingType].title.toLowerCase()} has been scheduled successfully.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h5 className="font-medium text-green-900 mb-2">What's Next?</h5>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• You'll receive a confirmation email with meeting details</li>
                  <li>• Calendar invites will be sent to your email</li>
                  <li>• We'll send you reminders 24 hours and 1 hour before the meeting</li>
                  <li>• A meeting link will be provided in your confirmation email</li>
                </ul>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => window.open('https://calendar.google.com', '_blank')}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add to Calendar
                </button>
                
                <button
                  onClick={onCancel}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
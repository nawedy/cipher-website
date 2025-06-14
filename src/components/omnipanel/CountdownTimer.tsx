// src/components/omnipanel/CountdownTimer.tsx
// Emergency countdown timer for OmniPanel pre-launch campaign

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);
  const [spotsRemaining, setSpotsRemaining] = useState(347);

  useEffect(() => {
    setMounted(true);
    
    // Set emergency deadline to start at 6PM June 14, 2025 Central Time (CDT = UTC-5)
    // Convert to UTC: 6PM CDT = 11PM UTC (23:00)
    const launchDate = new Date('2025-06-14T23:00:00Z'); // 6PM Central Time on June 14, 2025
    const emergencyDeadline = new Date(launchDate.getTime() + (72 * 60 * 60 * 1000)); // 72 hours after launch

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = emergencyDeadline.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });

        // Calculate spots remaining based on elapsed time (simulate decreasing availability)
        const totalTime = 72 * 60 * 60 * 1000; // 72 hours in milliseconds
        const elapsedTime = totalTime - distance;
        const elapsedPercentage = Math.max(0, Math.min(1, elapsedTime / totalTime));
        const spotsUsed = Math.floor(elapsedPercentage * 153); // 153 spots taken out of 500 total
        const remaining = Math.max(0, 347 - spotsUsed);
        setSpotsRemaining(remaining);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setSpotsRemaining(0);
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="bg-gradient-to-br from-red-900/40 to-purple-900/40 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 text-center">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <AlertTriangle className="w-8 h-8 text-red-400 animate-pulse" />
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            EMERGENCY DEADLINE
          </h3>
          <AlertTriangle className="w-8 h-8 text-red-400 animate-pulse" />
        </div>

        <p className="text-red-300 text-lg mb-8">
          Emergency funding window closes in:
        </p>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Days', value: '--' },
            { label: 'Hours', value: '--' },
            { label: 'Minutes', value: '--' },
            { label: 'Seconds', value: '--' }
          ].map((unit, index) => (
            <div
              key={unit.label}
              className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {unit.value}
              </div>
              <div className="text-slate-300 text-sm uppercase tracking-wide">
                {unit.label}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="text-red-300 text-sm">
            After this deadline, we may not be able to continue development without traditional VC funding that would compromise our privacy-first mission.
          </div>
          
          <div className="text-orange-300 text-sm font-medium">
            Price increases to $149, then $199, then $499 at launch
          </div>
        </div>

        <div className="mt-8">
          <button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 flex items-center justify-center">
            <Clock className="w-6 h-6 mr-2" />
            Help Fund Development - $99
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-red-900/40 to-purple-900/40 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 text-center">
      <div className="flex items-center justify-center space-x-3 mb-6">
        <AlertTriangle className="w-8 h-8 text-red-400 animate-pulse" />
        <h3 className="text-2xl md:text-3xl font-bold text-white">
          EMERGENCY DEADLINE
        </h3>
        <AlertTriangle className="w-8 h-8 text-red-400 animate-pulse" />
      </div>

      <p className="text-red-300 text-lg mb-8">
        Emergency funding window closes in:
      </p>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds }
        ].map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4"
          >
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              {unit.value.toString().padStart(2, '0')}
            </div>
            <div className="text-slate-300 text-sm uppercase tracking-wide">
              {unit.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="text-red-300 text-sm">
          After this deadline, we may not be able to continue development without traditional VC funding that would compromise our privacy-first mission.
        </div>
        
        <div className="text-orange-300 text-sm font-medium">
          Price increases to $149, then $199, then $499 at launch
        </div>
      </div>

      <motion.div
        animate={{ 
          boxShadow: [
            '0 0 20px rgba(239, 68, 68, 0.3)',
            '0 0 40px rgba(239, 68, 68, 0.5)',
            '0 0 20px rgba(239, 68, 68, 0.3)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-8"
      >
        <button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 flex items-center justify-center">
          <Clock className="w-6 h-6 mr-2" />
          Help Fund Development - $99
        </button>
      </motion.div>
    </div>
  );
} 
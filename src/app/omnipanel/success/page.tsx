// src/app/omnipanel/success/page.tsx
// Success page for completed OmniPanel purchases

'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Mail, Calendar, Shield } from 'lucide-react';
import SuccessPageContent from './SuccessPageContent';

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-zinc-900 to-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-white text-xl">Loading your success page...</p>
      </div>
    </div>
  );
}

export default function OmniPanelSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SuccessPageContent />
    </Suspense>
  );
} 
// src/config/env.ts
// Environment configuration

export const env = {
  // NeonDB Configuration
  neon: {
    databaseUrl: process.env.NEON_DATABASE_URL || 'postgresql://neondb_owner:DLioyP18OERh@ep-damp-hill-a88h0ony-pooler.eastus2.azure.neon.tech/neondb?sslmode=require',
    projectId: process.env.NEON_PROJECT_ID || 'aged-field-73747906',
  },

  // Stripe Configuration
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  },

  // Next.js Configuration
  nextAuth: {
    url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    secret: process.env.NEXTAUTH_SECRET || 'development-secret-key',
  },

  // Analytics Configuration
  analytics: {
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
  },

  // Application Configuration
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    environment: process.env.NODE_ENV || 'development',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
  },
} as const;

// Validate required environment variables
export function validateEnv(): void {
  const requiredVars = [
    'NEON_DATABASE_URL',
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.warn('Missing environment variables:', missingVars);
    console.warn('Using default values for development');
  }
}

// Call validation on import
if (typeof window === 'undefined') {
  validateEnv();
} 
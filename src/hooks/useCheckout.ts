// src/hooks/useCheckout.ts
// Checkout and payment processing hook

import { useState, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';

interface PaymentIntentData {
  amount: number;
  currency: string;
  metadata?: Record<string, string>;
}

interface PaymentIntentResponse {
  client_secret: string;
  payment_intent_id: string;
}

interface UseCheckoutReturn {
  loading: boolean;
  error: string | null;
  createPaymentIntent: (data: PaymentIntentData) => Promise<PaymentIntentResponse>;
  confirmPayment: (paymentMethodId: string, clientSecret: string) => Promise<{
    status: string; success: boolean; error?: string 
}>;
}

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function useCheckout(): UseCheckoutReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create payment intent
  const createPaymentIntent = useCallback(async (data: PaymentIntentData): Promise<PaymentIntentResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(data.amount * 100), // Convert to cents
          currency: data.currency,
          metadata: data.metadata || {},
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create payment intent');
      }

      const result = await response.json();
      return {
        client_secret: result.client_secret,
        payment_intent_id: result.payment_intent_id,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create payment intent';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Confirm payment
  const confirmPayment = useCallback(async (
    paymentMethodId: string,
    clientSecret: string
  ): Promise<{ status: string; success: boolean; error?: string }> => {
    setLoading(true);
    setError(null);

    try {
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      // For demo purposes, we'll simulate a successful payment
      // In a real implementation, you would use stripe.confirmCardPayment
      if (paymentMethodId === 'demo_payment_method') {
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        return { status: 'succeeded', success: true };
      }

      // Real Stripe payment confirmation
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodId,
      });

      if (stripeError) {
        setError(stripeError.message || 'Payment failed');
        return { status: 'failed', success: false, error: stripeError.message };
      }

      if (paymentIntent?.status === 'succeeded') {
        return { status: 'succeeded', success: true };
      } else {
        const errorMessage = 'Payment was not successful';
        setError(errorMessage);
        return { status: 'failed', success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment confirmation failed';
      setError(errorMessage);
      return { status: 'failed', success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createPaymentIntent,
    confirmPayment,
  };
} 
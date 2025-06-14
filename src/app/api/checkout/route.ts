// src/app/api/checkout/route.ts
// Universal Stripe checkout API for all products

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getProductById, stripeConfig } from '@/lib/stripe-config';

const stripe = new Stripe(stripeConfig.secretKey, {
  apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      productId, 
      quantity = 1, 
      customerEmail,
      successUrl,
      cancelUrl,
      metadata = {}
    } = body;

    // Validate required fields
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Get product configuration
    const product = getProductById(productId);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Determine success and cancel URLs based on product category
    const defaultSuccessUrl = getSuccessUrl(product.category);
    const defaultCancelUrl = getCancelUrl(product.category);

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: product.priceId,
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: successUrl || `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${defaultSuccessUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${defaultCancelUrl}`,
      customer_email: customerEmail,
      metadata: {
        productId,
        productName: product.name,
        category: product.category,
        quantity: quantity.toString(),
        ...metadata
      },
      billing_address_collection: 'required',
      shipping_address_collection: product.category === 'kit' ? {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'ES', 'IT', 'NL', 'SE', 'NO', 'DK', 'FI']
      } : undefined,
    });

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });

  } catch (error) {
    console.error('Checkout error:', error);
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to get success URL based on product category
function getSuccessUrl(category: string): string {
  switch (category) {
    case 'omnipanel':
      return '/omnipanel/success';
    case 'diagnostic':
      return '/products/ai-business-diagnostic/success';
    case 'audit':
      return '/products/website-audit/success';
    case 'kit':
      return '/products/ai-starter-kits/success';
    case 'transformation':
      return '/products/ai-transformation/success';
    default:
      return '/success';
  }
}

// Helper function to get cancel URL based on product category
function getCancelUrl(category: string): string {
  switch (category) {
    case 'omnipanel':
      return '/omnipanel';
    case 'diagnostic':
      return '/products/ai-business-diagnostic';
    case 'audit':
      return '/products/website-audit';
    case 'kit':
      return '/products/ai-starter-kits';
    case 'transformation':
      return '/products/ai-transformation';
    default:
      return '/products';
  }
} 
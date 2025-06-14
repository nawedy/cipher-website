// src/app/api/stripe/checkout/route.ts
// Stripe checkout session creation for OmniPanel IndieGoGo campaign pricing

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getOmniPanelProducts, stripeConfig, getProductById } from '@/lib/stripe-config';

const stripe = new Stripe(stripeConfig.secretKey, {
  apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
  try {
    const { tier, email, successUrl, cancelUrl, quantity = 1 } = await request.json();

    // Get OmniPanel products
    const omniPanelProducts = getOmniPanelProducts();
    
    // Find the product by tier (id)
    const product = getProductById(tier);
    
    if (!product || product.category !== 'omnipanel') {
      return NextResponse.json(
        { error: 'Invalid pricing tier' },
        { status: 400 }
      );
    }
    
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
      success_url: successUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/omnipanel/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/omnipanel`,
      customer_email: email,
      metadata: {
        productId: product.id,
        productName: product.name,
        category: product.category,
        tier: tier,
        quantity: quantity.toString()
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'SE', 'NO', 'DK', 'FI'],
      },
    });

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
} 
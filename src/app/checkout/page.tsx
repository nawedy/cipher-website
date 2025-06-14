// File: /app/checkout/page.tsx
// Cipher Intelligence Group - Checkout Page

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CreditCard, Lock, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useCart } from '@/hooks/useCart';
// import { useAuth } from '@/hooks/useAuth'; // Removed - migrated to NeonDB
import { useCheckout } from '@/hooks/useCheckout';
import { CheckoutFormData, Address, Product } from '@/types/marketplace';
import { formatPrice } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

// Add missing type definitions
interface ProductVariant {
  id: string;
  price: number;
  [key: string]: any;
}

interface ProductMedia {
  id: string;
  url: string;
  is_primary: boolean;
  media_type: string;
  [key: string]: any;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  // const { user } = useAuth(); // Removed - migrated to NeonDB
  const { createPaymentIntent, confirmPayment, loading } = useCheckout();

  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');
  const [formData, setFormData] = useState<CheckoutFormData>({
    customer_info: {
      email: '', // user?.email || '',
      first_name: '',
      last_name: '',
      company: '',
      phone: ''
    },
    billing_address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'US'
    },
    shipping_address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'US'
    },
    same_as_billing: true,
    newsletter_opt_in: false,
    terms_accepted: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.items.length === 0) {
      router.push('/products');
    }
  }, [cart.items.length, router]);

  // Pre-fill form with user data - removed since no auth
  // useEffect(() => {
  //   if (user) {
  //     setFormData((prev: CheckoutFormData) => ({
  //       ...prev,
  //       customer_info: {
  //         email: user.email || '',
  //         first_name: '',
  //         last_name: '',
  //         company: '',
  //         phone: ''
  //       }
  //     }));
  //   }
  // }, [user]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Customer info validation
    if (!formData.customer_info.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.customer_info.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.customer_info.first_name) {
      newErrors.first_name = 'First name is required';
    }

    if (!formData.customer_info.last_name) {
      newErrors.last_name = 'Last name is required';
    }

    // Billing address validation
    if (!formData.billing_address.line1) {
      newErrors.billing_line1 = 'Address is required';
    }

    if (!formData.billing_address.city) {
      newErrors.billing_city = 'City is required';
    }

    if (!formData.billing_address.state) {
      newErrors.billing_state = 'State is required';
    }

    if (!formData.billing_address.postal_code) {
      newErrors.billing_postal_code = 'Postal code is required';
    }

    // Terms acceptance
    if (!formData.terms_accepted) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    section: keyof CheckoutFormData,
    field: string,
    value: string | boolean
  ) => {
    setFormData(prev => {
      const currentSection = prev[section];
      if (typeof currentSection === 'object' && currentSection !== null) {
        return {
          ...prev,
          [section]: {
            ...currentSection,
            [field]: value
          }
        };
      }
      return prev;
    });

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAddressChange = (
    addressType: 'billing_address' | 'shipping_address',
    field: keyof Address,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [addressType]: {
        ...prev[addressType],
        [field]: value
      }
    }));
  };

  const handleSameAsBillingToggle = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      same_as_billing: checked,
      shipping_address: checked ? prev.billing_address : prev.shipping_address
    }));
  };

  const handleContinueToPayment = async () => {
    if (!validateForm()) return;

    setStep('processing');
    
    try {
      // Create payment intent
      const { client_secret, payment_intent_id } = await createPaymentIntent({
        amount: cart.total_amount,
        currency: 'usd',
        metadata: {
          customer_email: formData.customer_info.email,
          items_count: cart.total_items.toString(),
          division_products: JSON.stringify(
            cart.items.map(item => ({
              product_id: item.product_id,
              division: item.product?.division?.name,
              quantity: item.quantity
            }))
          )
        }
      });

      setPaymentIntentId(payment_intent_id);
      setStep('payment');

      trackEvent('checkout_payment_step', {
        payment_intent_id,
        amount: cart.total_amount,
        items_count: cart.total_items
      });
    } catch (error) {
      console.error('Failed to create payment intent:', error);
      setStep('details');
    }
  };

  const handlePaymentConfirm = async (paymentMethodId: string) => {
    setStep('processing');
    
    try {
      const result = await confirmPayment(paymentIntentId, paymentMethodId);
      
      if (result.status === 'succeeded') {
        // Clear cart and redirect to success
        await clearCart();
        setStep('success');
        
        trackEvent('purchase_complete', {
          payment_intent_id: paymentIntentId,
          amount: cart.total_amount,
          items: cart.items.map(item => ({
            product_id: item.product_id,
            product_name: item.product?.name,
            division: item.product?.division?.name,
            price: item.variant?.price || (item.product as any)?.price || 0,
            quantity: item.quantity
          }))
        });
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      console.error('Payment failed:', error);
      setStep('payment');
    }
  };

  if (cart.items.length === 0) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 pt-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              onClick={() => step === 'details' ? router.push('/products') : setStep('details')}
              className="text-slate-400 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-green-400" />
              <span className="text-sm text-slate-300">Secure Checkout</span>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${step === 'details' ? 'text-amber-400' : 'text-green-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'details' ? 'bg-amber-500' : 'bg-green-500'
                }`}>
                  {step === 'details' ? '1' : <Check className="h-4 w-4" />}
                </div>
                <span className="text-sm font-medium">Details</span>
              </div>
              
              <div className="w-12 h-px bg-white/20" />
              
              <div className={`flex items-center gap-2 ${
                step === 'payment' ? 'text-amber-400' : 
                step === 'success' ? 'text-green-400' : 'text-slate-400'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'payment' ? 'bg-amber-500' :
                  step === 'success' ? 'bg-green-500' : 'bg-slate-600'
                }`}>
                  {step === 'success' ? <Check className="h-4 w-4" /> : '2'}
                </div>
                <span className="text-sm font-medium">Payment</span>
              </div>
              
              <div className="w-12 h-px bg-white/20" />
              
              <div className={`flex items-center gap-2 ${step === 'success' ? 'text-green-400' : 'text-slate-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'success' ? 'bg-green-500' : 'bg-slate-600'
                }`}>
                  {step === 'success' ? <Check className="h-4 w-4" /> : '3'}
                </div>
                <span className="text-sm font-medium">Complete</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Forms */}
            <div className="space-y-6">
              {step === 'details' && (
                <>
                  {/* Customer Information */}
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Customer Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="first_name" className="text-slate-300">First Name *</Label>
                          <Input
                            id="first_name"
                            value={formData.customer_info.first_name}
                            onChange={(e) => handleInputChange('customer_info', 'first_name', e.target.value)}
                            className={`bg-white/10 border-white/20 text-white ${errors.first_name ? 'border-red-500' : ''}`}
                          />
                          {errors.first_name && (
                            <p className="text-red-400 text-sm mt-1">{errors.first_name}</p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="last_name" className="text-slate-300">Last Name *</Label>
                          <Input
                            id="last_name"
                            value={formData.customer_info.last_name}
                            onChange={(e) => handleInputChange('customer_info', 'last_name', e.target.value)}
                            className={`bg-white/10 border-white/20 text-white ${errors.last_name ? 'border-red-500' : ''}`}
                          />
                          {errors.last_name && (
                            <p className="text-red-400 text-sm mt-1">{errors.last_name}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-slate-300">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.customer_info.email}
                          onChange={(e) => handleInputChange('customer_info', 'email', e.target.value)}
                          className={`bg-white/10 border-white/20 text-white ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && (
                          <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="company" className="text-slate-300">Company</Label>
                          <Input
                            id="company"
                            value={formData.customer_info.company}
                            onChange={(e) => handleInputChange('customer_info', 'company', e.target.value)}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="phone" className="text-slate-300">Phone</Label>
                          <Input
                            id="phone"
                            value={formData.customer_info.phone}
                            onChange={(e) => handleInputChange('customer_info', 'phone', e.target.value)}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Billing Address */}
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Billing Address</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="billing_line1" className="text-slate-300">Address Line 1 *</Label>
                        <Input
                          id="billing_line1"
                          value={formData.billing_address.line1}
                          onChange={(e) => handleAddressChange('billing_address', 'line1', e.target.value)}
                          className={`bg-white/10 border-white/20 text-white ${errors.billing_line1 ? 'border-red-500' : ''}`}
                        />
                        {errors.billing_line1 && (
                          <p className="text-red-400 text-sm mt-1">{errors.billing_line1}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="billing_line2" className="text-slate-300">Address Line 2</Label>
                        <Input
                          id="billing_line2"
                          value={formData.billing_address.line2}
                          onChange={(e) => handleAddressChange('billing_address', 'line2', e.target.value)}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="billing_city" className="text-slate-300">City *</Label>
                          <Input
                            id="billing_city"
                            value={formData.billing_address.city}
                            onChange={(e) => handleAddressChange('billing_address', 'city', e.target.value)}
                            className={`bg-white/10 border-white/20 text-white ${errors.billing_city ? 'border-red-500' : ''}`}
                          />
                          {errors.billing_city && (
                            <p className="text-red-400 text-sm mt-1">{errors.billing_city}</p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="billing_state" className="text-slate-300">State *</Label>
                          <Input
                            id="billing_state"
                            value={formData.billing_address.state}
                            onChange={(e) => handleAddressChange('billing_address', 'state', e.target.value)}
                            className={`bg-white/10 border-white/20 text-white ${errors.billing_state ? 'border-red-500' : ''}`}
                          />
                          {errors.billing_state && (
                            <p className="text-red-400 text-sm mt-1">{errors.billing_state}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="billing_postal_code" className="text-slate-300">Postal Code *</Label>
                          <Input
                            id="billing_postal_code"
                            value={formData.billing_address.postal_code}
                            onChange={(e) => handleAddressChange('billing_address', 'postal_code', e.target.value)}
                            className={`bg-white/10 border-white/20 text-white ${errors.billing_postal_code ? 'border-red-500' : ''}`}
                          />
                          {errors.billing_postal_code && (
                            <p className="text-red-400 text-sm mt-1">{errors.billing_postal_code}</p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="billing_country" className="text-slate-300">Country *</Label>
                          <Input
                            id="billing_country"
                            value={formData.billing_address.country}
                            onChange={(e) => handleAddressChange('billing_address', 'country', e.target.value)}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Terms and Newsletter */}
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="newsletter"
                          checked={formData.newsletter_opt_in}
                          onCheckedChange={(checked) => handleInputChange('newsletter_opt_in', 'newsletter_opt_in', !!checked)}
                          className="border-white/20 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                        />
                        <label htmlFor="newsletter" className="text-sm text-slate-300 cursor-pointer">
                          Subscribe to our newsletter for product updates and exclusive offers
                        </label>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="terms"
                          checked={formData.terms_accepted}
                          onCheckedChange={(checked) => handleInputChange('terms_accepted', 'terms_accepted', !!checked)}
                          className={`border-white/20 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 ${errors.terms ? 'border-red-500' : ''}`}
                        />
                        <label htmlFor="terms" className="text-sm text-slate-300 cursor-pointer">
                          I accept the <a href="/terms" className="text-amber-400 hover:text-amber-300">Terms of Service</a> and <a href="/privacy" className="text-amber-400 hover:text-amber-300">Privacy Policy</a> *
                        </label>
                      </div>
                      {errors.terms && (
                        <p className="text-red-400 text-sm mt-1">{errors.terms}</p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Continue Button */}
                  <Button
                    onClick={handleContinueToPayment}
                    disabled={loading}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-amber-900 font-semibold py-6"
                  >
                    {loading ? (
                      <LoadingSpinner className="mr-2" />
                    ) : (
                      <CreditCard className="h-5 w-5 mr-2" />
                    )}
                    Continue to Payment
                  </Button>
                </>
              )}

              {step === 'payment' && (
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Stripe Elements would go here */}
                    <div className="space-y-4">
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Stripe payment integration would be implemented here with Stripe Elements.
                          This is a demo version of the checkout flow.
                        </AlertDescription>
                      </Alert>
                      
                      <Button
                        onClick={() => handlePaymentConfirm('demo_payment_method')}
                        disabled={loading}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-amber-900 font-semibold py-6"
                      >
                        {loading ? (
                          <LoadingSpinner className="mr-2" />
                        ) : (
                          <Lock className="h-5 w-5 mr-2" />
                        )}
                        Complete Payment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 'processing' && (
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-12 text-center">
                    <LoadingSpinner size="lg" className="mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Processing Payment</h3>
                    <p className="text-slate-400">Please wait while we process your payment...</p>
                  </CardContent>
                </Card>
              )}

              {step === 'success' && (
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-12 text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
                    <p className="text-slate-400 mb-6">
                      Thank you for your purchase. You'll receive an email confirmation shortly.
                    </p>
                    <div className="space-y-3">
                      <Button 
                        onClick={() => router.push('/account/orders')}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-amber-900"
                      >
                        View Order Details
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => router.push('/products')}
                        className="w-full border-white/20 hover:bg-white/10"
                      >
                        Continue Shopping
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:sticky lg:top-8 h-fit">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3">
                    {cart.items.map((item) => {
                      const product = item.product! as Product & { media?: ProductMedia[]; price?: number };
                      const variant = item.variant as ProductVariant | null;
                      const primaryImage = product.media?.find((m: any) => m.is_primary && m.media_type === 'image') as ProductMedia | undefined;
                      const itemPrice = variant?.price || product.price || 0;
                      const itemTotal = itemPrice * item.quantity;

                      return (
                        <div key={item.id} className="flex gap-3 py-3 border-b border-white/10 last:border-0">
                          <div className="relative w-12 h-12 flex-shrink-0">
                            <Image
                              src={primaryImage?.url || '/images/product-placeholder.jpg'}
                              alt={product.name}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-white line-clamp-1">
                              {product.name}
                            </h4>
                            {variant && (
                              <p className="text-xs text-slate-400">{variant.name}</p>
                            )}
                            <div className="flex items-center gap-2 mt-1">
                              <Badge 
                                variant="secondary" 
                                className="text-xs"
                                style={{ 
                                  backgroundColor: '#3b82f620',
                                  color: '#3b82f6'
                                }}
                              >
                                {product.division?.name}
                              </Badge>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-sm font-medium text-white">
                              ${formatPrice(itemTotal)}
                            </div>
                            <div className="text-xs text-slate-400">
                              Qty: {item.quantity}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Separator className="bg-white/10" />

                  {/* Order Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Subtotal</span>
                      <span className="text-white">${formatPrice(cart.subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Tax</span>
                      <span className="text-white">${formatPrice(cart.tax_amount)}</span>
                    </div>

                    <Separator className="bg-white/10" />
                    
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-white">Total</span>
                      <span className="text-white">${formatPrice(cart.total_amount)}</span>
                    </div>
                  </div>

                  {/* Trust Indicators */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="grid grid-cols-2 gap-3 text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-green-400" />
                        <span>Secure Payment</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-400" />
                        <span>Instant Access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-blue-400" />
                        <span>24/7 Support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="h-4 w-4 bg-amber-500" />
                        <span>Premium Quality</span>
                      </div>
                    </div>
                  </div>

                  {/* Accepted Payment Methods */}
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-slate-400 mb-2">Accepted Payment Methods</p>
                    <div className="flex gap-2">
                      {['Visa', 'Mastercard', 'American Express', 'PayPal'].map((method) => (
                        <div 
                          key={method}
                          className="px-2 py-1 bg-white/10 rounded text-xs text-slate-300"
                        >
                          {method}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
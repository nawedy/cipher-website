// src/types/marketplace.ts
// Type definitions for marketplace and e-commerce functionality

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface CustomerInfo {
  email: string;
  first_name: string;
  last_name: string;
  company?: string;
  phone?: string;
}

export interface CheckoutFormData {
  customer_info: CustomerInfo;
  billing_address: Address;
  shipping_address: Address;
  same_as_billing: boolean;
  newsletter_opt_in: boolean;
  terms_accepted: boolean;
}

export interface PaymentIntent {
  id: string;
  client_secret: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'succeeded' | 'canceled';
}

export interface CartItem {
  variant: any;
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  product?: {
    id: string;
    name: string;
    description: string;
    division?: {
      name: string;
      slug: string;
    };
  };
}

export interface Cart {
  items: CartItem[];
  total_items: number;
  total_amount: number;
  subtotal: number;
  tax_amount: number;
  currency: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  division_id: string;
  is_active: boolean;
  features: string[];
  images?: string[];
  division?: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface Order {
  id: string;
  customer_id: string;
  total_amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_intent_id?: string;
  billing_address: Address;
  shipping_address?: Address;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  product?: Product;
}

export interface Customer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  company?: string;
  phone?: string;
  billing_address?: Address;
  shipping_address?: Address;
  stripe_customer_id?: string;
  created_at: string;
  updated_at: string;
} 
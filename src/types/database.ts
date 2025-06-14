// src/types/database.ts
// NeonDB database type definitions

export interface User {
  user_metadata: any;
  id: string;
  email: string;
  password_hash: string | null;
  first_name: string;
  last_name: string;
  company: string | null;
  job_title: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: 'admin' | 'client' | 'staff';
  status: 'active' | 'inactive' | 'suspended';
  email_verified: boolean;
  two_factor_enabled: boolean;
  created_at: string;
  updated_at: string;
  last_login: string | null;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  organization_id: string | null;
  total_amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  stripe_payment_intent_id: string | null;
  stripe_customer_id: string | null;
  billing_address: Record<string, any> | null;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  features: any[] | null;
  pricing_model: 'one_time' | 'subscription' | 'usage_based' | 'custom' | null;
  base_price: number | null;
  currency: string;
  billing_cycle: 'monthly' | 'quarterly' | 'yearly' | 'one_time' | null;
  stripe_price_id: string | null;
  stripe_product_id: string | null;
  images: any[] | null;
  status: 'active' | 'inactive' | 'draft';
  is_featured: boolean;
  metadata: Record<string, any>;
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
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsEvent {
  id: string;
  event_type: string;
  user_id: string | null;
  session_id: string | null;
  properties: Record<string, any> | null;
  division: string | null;
  created_at: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// Insert types (for creating new records)
export type UserInsert = Omit<User, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type OrderInsert = Omit<Order, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type ProductInsert = Omit<Product, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type OrderItemInsert = Omit<OrderItem, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type AnalyticsEventInsert = Omit<AnalyticsEvent, 'id' | 'created_at'> & {
  id?: string;
  created_at?: string;
};

export type ProductCategoryInsert = Omit<ProductCategory, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

// Update types (for updating existing records)
export type UserUpdate = Partial<Omit<User, 'id' | 'created_at'>> & {
  updated_at?: string;
};

export type OrderUpdate = Partial<Omit<Order, 'id' | 'created_at'>> & {
  updated_at?: string;
};

export type ProductUpdate = Partial<Omit<Product, 'id' | 'created_at'>> & {
  updated_at?: string;
};

export type OrderItemUpdate = Partial<Omit<OrderItem, 'id' | 'created_at'>> & {
  updated_at?: string;
};

export type ProductCategoryUpdate = Partial<Omit<ProductCategory, 'id' | 'created_at'>> & {
  updated_at?: string;
}; 
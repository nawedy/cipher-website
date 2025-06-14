import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      signups: {
        Row: {
          id: string
          email: string
          plan: string
          created_at: string
          stripe_customer_id?: string
          payment_status?: string
        }
        Insert: {
          id?: string
          email: string
          plan: string
          created_at?: string
          stripe_customer_id?: string
          payment_status?: string
        }
        Update: {
          id?: string
          email?: string
          plan?: string
          created_at?: string
          stripe_customer_id?: string
          payment_status?: string
        }
      }
    }
  }
}
/*
  # Create signups table for early access registration

  1. New Tables
    - `signups`
      - `id` (uuid, primary key)
      - `email` (text, unique, not null)
      - `plan` (text, not null) - early-bird, pro, enterprise
      - `created_at` (timestamptz, default now())
      - `stripe_customer_id` (text, optional)
      - `payment_status` (text, default 'pending')

  2. Security
    - Enable RLS on `signups` table
    - Add policy for public insert (for signup form)
    - Add policy for authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  plan text NOT NULL,
  created_at timestamptz DEFAULT now(),
  stripe_customer_id text,
  payment_status text DEFAULT 'pending'
);

ALTER TABLE signups ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for the signup form)
CREATE POLICY "Anyone can signup"
  ON signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow users to read their own signup data
CREATE POLICY "Users can read own signup data"
  ON signups
  FOR SELECT
  TO authenticated
  USING (email = auth.email());

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_signups_email ON signups(email);
CREATE INDEX IF NOT EXISTS idx_signups_created_at ON signups(created_at);
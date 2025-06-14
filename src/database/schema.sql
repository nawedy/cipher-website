-- src/database/schema.sql
-- Complete database schema for Cipher Intelligence Phase 2 with RLS policies

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE division_type AS ENUM ('strategy', 'digitalworks', 'labs', 'studio', 'ai');
CREATE TYPE contact_status AS ENUM ('new', 'contacted', 'qualified', 'converted', 'closed');
CREATE TYPE service_category AS ENUM (
  'digital-maturity', 'ai-strategy', 'data-governance', 'change-management',
  'content-automation', 'campaign-intelligence', 'growth-automation', 'social-intelligence',
  'ai-research', 'prototype-development', 'innovation-consulting',
  'web-development', 'mobile-apps', 'ui-ux-design',
  'custom-ai-models', 'ai-integration', 'ai-consulting'
);

-- Contacts table for lead management
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  division division_type NOT NULL,
  service service_category,
  budget VARCHAR(100),
  timeline VARCHAR(100),
  message TEXT NOT NULL,
  status contact_status DEFAULT 'new',
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255),
  source_page VARCHAR(500),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  assigned_to UUID,
  notes TEXT,
  
  -- Constraints
  CONSTRAINT contacts_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT contacts_name_length CHECK (length(name) >= 2),
  CONSTRAINT contacts_company_length CHECK (length(company) >= 1)
);

-- Performance analytics table
CREATE TABLE division_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  division division_type NOT NULL,
  metric_name VARCHAR(255) NOT NULL,
  metric_value NUMERIC NOT NULL,
  metric_type VARCHAR(100) NOT NULL, -- 'conversion', 'engagement', 'revenue', etc.
  date_recorded DATE NOT NULL DEFAULT CURRENT_DATE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  UNIQUE (division, metric_name, date_recorded)
);

-- Newsletter subscriptions
CREATE TABLE newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  division division_type,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  source VARCHAR(255),
  preferences JSONB DEFAULT '{}',
  
  CONSTRAINT newsletter_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Service inquiries tracking
CREATE TABLE service_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  service service_category NOT NULL,
  priority_level INTEGER DEFAULT 3 CHECK (priority_level BETWEEN 1 AND 5),
  estimated_value NUMERIC,
  qualification_score INTEGER DEFAULT 0 CHECK (qualification_score BETWEEN 0 AND 100),
  follow_up_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pricing plan interest tracking
CREATE TABLE pricing_interest (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  division division_type NOT NULL,
  plan_id VARCHAR(100) NOT NULL, -- 'starter', 'professional', 'enterprise'
  plan_price VARCHAR(100),
  interested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  converted_at TIMESTAMP WITH TIME ZONE,
  conversion_value NUMERIC
);

-- Create indexes for performance
CREATE INDEX idx_contacts_division ON contacts(division);
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_created_at ON contacts(created_at);
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_utm_source ON contacts(utm_source);
CREATE INDEX idx_division_analytics_division_date ON division_analytics(division, date_recorded);
CREATE INDEX idx_service_inquiries_contact_id ON service_inquiries(contact_id);
CREATE INDEX idx_pricing_interest_division ON pricing_interest(division);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE division_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_interest ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Contacts policies
CREATE POLICY "Public can insert contacts" ON contacts
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all contacts" ON contacts
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contacts" ON contacts
  FOR UPDATE TO authenticated
  USING (true);

-- Analytics policies (read-only for most users)
CREATE POLICY "Public can view division analytics" ON division_analytics
  FOR SELECT TO anon
  USING (true);

CREATE POLICY "Authenticated users can insert analytics" ON division_analytics
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Newsletter policies
CREATE POLICY "Public can subscribe to newsletter" ON newsletter_subscriptions
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Users can manage their newsletter subscription" ON newsletter_subscriptions
  FOR ALL TO anon
  USING (true);

-- Service inquiries policies
CREATE POLICY "Public can insert service inquiries" ON service_inquiries
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view service inquiries" ON service_inquiries
  FOR SELECT TO authenticated
  USING (true);

-- Pricing interest policies
CREATE POLICY "Public can express pricing interest" ON pricing_interest
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view pricing interest" ON pricing_interest
  FOR SELECT TO authenticated
  USING (true);

-- Create functions for common operations

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_inquiries_updated_at BEFORE UPDATE ON service_inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate lead qualification score
CREATE OR REPLACE FUNCTION calculate_qualification_score(
  company_size TEXT DEFAULT NULL,
  budget_range TEXT DEFAULT NULL,
  timeline TEXT DEFAULT NULL,
  service_type service_category DEFAULT NULL
)
RETURNS INTEGER AS $$
DECLARE
  score INTEGER := 0;
BEGIN
  -- Budget scoring
  CASE budget_range
    WHEN 'over-500k' THEN score := score + 40;
    WHEN '100k-500k' THEN score := score + 30;
    WHEN '25k-100k' THEN score := score + 20;
    WHEN 'under-25k' THEN score := score + 10;
    ELSE score := score + 5;
  END CASE;
  
  -- Timeline scoring
  CASE timeline
    WHEN 'immediate' THEN score := score + 30;
    WHEN 'quarter' THEN score := score + 25;
    WHEN 'half-year' THEN score := score + 15;
    WHEN 'year' THEN score := score + 10;
    ELSE score := score + 5;
  END CASE;
  
  -- Service type scoring (strategic services score higher)
  CASE service_type
    WHEN 'ai-strategy', 'digital-maturity' THEN score := score + 20;
    WHEN 'data-governance', 'change-management' THEN score := score + 15;
    ELSE score := score + 10;
  END CASE;
  
  -- Ensure score is within bounds
  RETURN LEAST(100, GREATEST(0, score));
END;
$$ LANGUAGE plpgsql;

-- Function to get division performance metrics
CREATE OR REPLACE FUNCTION get_division_metrics(
  target_division division_type,
  start_date DATE DEFAULT CURRENT_DATE - INTERVAL '30 days',
  end_date DATE DEFAULT CURRENT_DATE
)
RETURNS TABLE (
  total_contacts BIGINT,
  qualified_leads BIGINT,
  conversion_rate NUMERIC,
  avg_qualification_score NUMERIC,
  top_service service_category,
  total_estimated_value NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  WITH contact_stats AS (
    SELECT 
      COUNT(*) as total_contacts,
      COUNT(*) FILTER (WHERE c.status IN ('qualified', 'converted')) as qualified_leads,
      AVG(COALESCE(si.qualification_score, 0)) as avg_qualification_score,
      SUM(COALESCE(si.estimated_value, 0)) as total_estimated_value
    FROM contacts c
    LEFT JOIN service_inquiries si ON c.id = si.contact_id
    WHERE c.division = target_division
      AND c.created_at::date BETWEEN start_date AND end_date
  ),
  service_stats AS (
    SELECT 
      si.service,
      COUNT(*) as service_count
    FROM contacts c
    JOIN service_inquiries si ON c.id = si.contact_id
    WHERE c.division = target_division
      AND c.created_at::date BETWEEN start_date AND end_date
    GROUP BY si.service
    ORDER BY service_count DESC
    LIMIT 1
  )
  SELECT 
    cs.total_contacts,
    cs.qualified_leads,
    CASE 
      WHEN cs.total_contacts > 0 THEN 
        ROUND((cs.qualified_leads::NUMERIC / cs.total_contacts::NUMERIC) * 100, 2)
      ELSE 0 
    END as conversion_rate,
    ROUND(cs.avg_qualification_score, 1),
    ss.service,
    cs.total_estimated_value
  FROM contact_stats cs
  LEFT JOIN service_stats ss ON true;
END;
$$ LANGUAGE plpgsql;

-- Create view for dashboard analytics
CREATE VIEW division_performance_summary AS
SELECT 
  d.division,
  COUNT(c.id) as total_contacts_30d,
  COUNT(c.id) FILTER (WHERE c.created_at > NOW() - INTERVAL '7 days') as contacts_7d,
  COUNT(c.id) FILTER (WHERE c.status IN ('qualified', 'converted')) as qualified_leads,
  AVG(COALESCE(si.qualification_score, 0)) as avg_qualification_score,
  SUM(COALESCE(pi.conversion_value, si.estimated_value, 0)) as total_pipeline_value
FROM (VALUES 
  ('strategy'::division_type), 
  ('digitalworks'::division_type), 
  ('labs'::division_type), 
  ('studio'::division_type), 
  ('ai'::division_type)
) AS d(division)
LEFT JOIN contacts c ON c.division = d.division 
  AND c.created_at > NOW() - INTERVAL '30 days'
LEFT JOIN service_inquiries si ON c.id = si.contact_id
LEFT JOIN pricing_interest pi ON c.id = pi.contact_id
GROUP BY d.division;

-- Insert sample analytics data for testing
INSERT INTO division_analytics (division, metric_name, metric_value, metric_type) VALUES
('strategy', 'conversion_rate', 3.2, 'conversion'),
('strategy', 'avg_deal_size', 45000, 'revenue'),
('digitalworks', 'conversion_rate', 4.1, 'conversion'),
('digitalworks', 'avg_deal_size', 15000, 'revenue'),
('labs', 'conversion_rate', 2.8, 'conversion'),
('labs', 'avg_deal_size', 85000, 'revenue'),
('studio', 'conversion_rate', 5.2, 'conversion'),
('studio', 'avg_deal_size', 25000, 'revenue'),
('ai', 'conversion_rate', 2.1, 'conversion'),
('ai', 'avg_deal_size', 125000, 'revenue');

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
GRANT INSERT ON contacts, newsletter_subscriptions, service_inquiries, pricing_interest TO anon;

-- Enable realtime subscriptions for dashboard updates
ALTER PUBLICATION supabase_realtime ADD TABLE contacts;
ALTER PUBLICATION supabase_realtime ADD TABLE division_analytics;
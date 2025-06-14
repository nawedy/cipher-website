-- database/migrations/add-analytics-tables.sql
-- Comprehensive analytics database schema for Cipher Intelligence cross-division performance tracking

-- Enable Row Level Security
ALTER DATABASE postgres SET row_security = on;

-- Create divisions table
CREATE TABLE IF NOT EXISTS divisions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    category VARCHAR(20) NOT NULL CHECK (category IN ('consulting', 'products', 'services')),
    color VARCHAR(7) NOT NULL,
    accent_color VARCHAR(7) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create metrics table for time-series data
CREATE TABLE IF NOT EXISTS division_metrics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    division_id UUID REFERENCES divisions(id) ON DELETE CASCADE,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    period_type VARCHAR(20) NOT NULL CHECK (period_type IN ('day', 'week', 'month', 'quarter', 'year')),
    revenue DECIMAL(15,2) NOT NULL DEFAULT 0,
    growth_rate DECIMAL(5,2) NOT NULL DEFAULT 0,
    project_count INTEGER NOT NULL DEFAULT 0,
    customer_count INTEGER NOT NULL DEFAULT 0,
    products_sold INTEGER DEFAULT 0,
    conversion_rate DECIMAL(5,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(division_id, period_start, period_type)
);

-- Create conversion funnel tracking
CREATE TABLE IF NOT EXISTS conversion_funnel (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    division_id UUID REFERENCES divisions(id) ON DELETE CASCADE,
    stage VARCHAR(50) NOT NULL,
    stage_order INTEGER NOT NULL,
    visitors INTEGER NOT NULL DEFAULT 0,
    conversions INTEGER NOT NULL DEFAULT 0,
    conversion_rate DECIMAL(5,2) GENERATED ALWAYS AS 
        (CASE WHEN visitors > 0 THEN (conversions::DECIMAL / visitors * 100) ELSE 0 END) STORED,
    revenue_generated DECIMAL(15,2) NOT NULL DEFAULT 0,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(division_id, stage, period_start)
);

-- Create products table for marketplace analytics
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    division_id UUID REFERENCES divisions(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'draft')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product metrics table
CREATE TABLE IF NOT EXISTS product_metrics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    revenue DECIMAL(15,2) NOT NULL DEFAULT 0,
    units_sold INTEGER NOT NULL DEFAULT 0,
    trials_started INTEGER NOT NULL DEFAULT 0,
    trial_to_paid_rate DECIMAL(5,2) GENERATED ALWAYS AS 
        (CASE WHEN trials_started > 0 THEN (units_sold::DECIMAL / trials_started * 100) ELSE 0 END) STORED,
    avg_selling_price DECIMAL(10,2) GENERATED ALWAYS AS 
        (CASE WHEN units_sold > 0 THEN (revenue / units_sold) ELSE 0 END) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(product_id, period_start)
);

-- Create cross-division referrals table
CREATE TABLE IF NOT EXISTS cross_division_referrals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    from_division_id UUID REFERENCES divisions(id) ON DELETE CASCADE,
    to_division_id UUID REFERENCES divisions(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL,
    project_value DECIMAL(15,2),
    referral_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'converted', 'declined')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_division_metrics_division_period ON division_metrics(division_id, period_start, period_type);
CREATE INDEX IF NOT EXISTS idx_division_metrics_period ON division_metrics(period_start, period_end);
CREATE INDEX IF NOT EXISTS idx_conversion_funnel_division_period ON conversion_funnel(division_id, period_start);
CREATE INDEX IF NOT EXISTS idx_product_metrics_product_period ON product_metrics(product_id, period_start);
CREATE INDEX IF NOT EXISTS idx_cross_referrals_date ON cross_division_referrals(referral_date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_divisions_updated_at BEFORE UPDATE ON divisions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_division_metrics_updated_at BEFORE UPDATE ON division_metrics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE divisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE division_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversion_funnel ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE cross_division_referrals ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (adjust based on your auth system)
CREATE POLICY "Enable read access for authenticated users" ON divisions
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for authenticated users" ON division_metrics
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for authenticated users" ON conversion_funnel
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for authenticated users" ON products
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for authenticated users" ON product_metrics
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for authenticated users" ON cross_division_referrals
    FOR SELECT USING (auth.role() = 'authenticated');

-- Insert initial division data
INSERT INTO divisions (name, slug, category, color, accent_color, description) VALUES
('Cipher Intelligence', 'cipher-intelligence', 'consulting', '#1a1b2e', '#FFD700', 'Master brand and strategic leadership'),
('Cipher Strategy', 'cipher-strategy', 'consulting', '#073C32', '#00FFE7', 'AI-powered strategic consulting and digital transformation'),
('Cipher DigitalWorks', 'cipher-digitalworks', 'services', '#088B8B', '#2FE4FF', 'Content, campaigns, and growth acceleration services'),
('Cipher Labs', 'cipher-labs', 'consulting', '#00BFFF', '#64FFDA', 'Advanced R&D and future-focused AI product development'),
('Cipher Studio', 'cipher-studio', 'services', '#4B5665', '#C0C0C0', 'Web design, development, and digital experience creation'),
('Cipher AI', 'cipher-ai', 'products', '#222328', '#FF6B35', 'Proprietary AI solutions and intelligent automation platforms'),
('Cipher Products', 'cipher-products', 'products', '#2a1b3d', '#8b5cf6', 'SaaS marketplace and digital product distribution')
ON CONFLICT (slug) DO NOTHING;

-- Create analytics views for common queries
CREATE OR REPLACE VIEW division_performance_summary AS
SELECT 
    d.id,
    d.name,
    d.slug,
    d.category,
    d.color,
    d.accent_color,
    dm.revenue,
    dm.growth_rate,
    dm.project_count,
    dm.customer_count,
    dm.products_sold,
    dm.conversion_rate,
    dm.period_start,
    dm.period_end,
    dm.period_type
FROM divisions d
LEFT JOIN division_metrics dm ON d.id = dm.division_id
WHERE dm.period_type = 'quarter' 
AND dm.period_start = (
    SELECT MAX(period_start) 
    FROM division_metrics dm2 
    WHERE dm2.division_id = d.id 
    AND dm2.period_type = 'quarter'
);

CREATE OR REPLACE VIEW revenue_timeline AS
SELECT 
    d.slug as division,
    TO_CHAR(dm.period_start, 'YYYY-MM') as date,
    dm.revenue,
    dm.project_count as projects,
    dm.customer_count as customers,
    dm.products_sold as products
FROM divisions d
JOIN division_metrics dm ON d.id = dm.division_id
WHERE dm.period_type = 'month'
ORDER BY dm.period_start, d.slug; 
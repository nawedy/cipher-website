-- database/schema/phase3-enhancements.sql
-- Enhanced database schema for Phase 3 advanced contact forms and analytics

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ===================================
-- LEADS AND CONTACT MANAGEMENT
-- ===================================

-- Enhanced leads table with advanced scoring
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(50),
    company VARCHAR(255),
    position VARCHAR(255),
    
    -- Company information
    company_size VARCHAR(20) CHECK (company_size IN ('startup', 'small', 'medium', 'enterprise')),
    industry VARCHAR(255),
    location VARCHAR(255),
    timezone VARCHAR(100),
    market_type VARCHAR(20) CHECK (market_type IN ('local', 'national', 'international')),
    
    -- Project details
    division VARCHAR(20) CHECK (division IN ('strategy', 'digitalworks', 'labs', 'studio', 'ai')),
    services TEXT[], -- Array of selected services
    budget VARCHAR(20) CHECK (budget IN ('under-10k', '10k-50k', '50k-100k', '100k-500k', '500k+')),
    timeline VARCHAR(20) CHECK (timeline IN ('immediate', 'within-month', 'within-quarter', 'within-year')),
    urgency INTEGER CHECK (urgency >= 1 AND urgency <= 5),
    project_description TEXT,
    
    -- Technical assessment
    current_tech TEXT[], -- Array of current technologies
    pain_points TEXT[], -- Array of pain points
    pain_point_severity JSONB, -- {painPoint: severity} mapping
    expected_outcomes TEXT[],
    previous_experience VARCHAR(20) CHECK (previous_experience IN ('none', 'some', 'extensive')),
    
    -- Lead management
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost', 'nurture')),
    source VARCHAR(100), -- Marketing source/campaign
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_contacted_at TIMESTAMP WITH TIME ZONE,
    
    -- Metadata
    metadata JSONB DEFAULT '{}'
);

-- ===================================
-- LEAD SCORING SYSTEM
-- ===================================

-- Lead scores table for tracking scoring history
CREATE TABLE IF NOT EXISTS lead_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    
    -- Overall score
    total_score INTEGER NOT NULL CHECK (total_score >= 0 AND total_score <= 100),
    classification VARCHAR(10) CHECK (classification IN ('hot', 'warm', 'cold', 'nurture')),
    confidence INTEGER CHECK (confidence >= 0 AND confidence <= 100),
    
    -- Score breakdown
    company_score INTEGER CHECK (company_score >= 0 AND company_score <= 100),
    budget_score INTEGER CHECK (budget_score >= 0 AND budget_score <= 100),
    timeline_score INTEGER CHECK (timeline_score >= 0 AND timeline_score <= 100),
    pain_point_score INTEGER CHECK (pain_point_score >= 0 AND pain_point_score <= 100),
    tech_compatibility_score INTEGER CHECK (tech_compatibility_score >= 0 AND tech_compatibility_score <= 100),
    engagement_score INTEGER CHECK (engagement_score >= 0 AND engagement_score <= 100),
    
    -- Scoring metadata
    factors JSONB, -- Detailed scoring factors
    version VARCHAR(10) DEFAULT '1.0',
    calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(lead_id, calculated_at)
);

-- ===================================
-- FORM SESSIONS AND TRACKING
-- ===================================

-- Form sessions for multi-step form tracking
CREATE TABLE IF NOT EXISTS form_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR(255) UNIQUE NOT NULL,
    
    -- Progress tracking
    current_step INTEGER DEFAULT 0,
    total_steps INTEGER DEFAULT 5,
    completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
    
    -- Form data
    division VARCHAR(20),
    form_data JSONB DEFAULT '{}',
    
    -- Session metadata
    time_spent INTEGER DEFAULT 0, -- seconds
    device_info JSONB,
    browser_info JSONB,
    referrer VARCHAR(500),
    ip_address INET,
    
    -- Status
    is_completed BOOLEAN DEFAULT FALSE,
    abandoned_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Form interactions for detailed analytics
CREATE TABLE IF NOT EXISTS form_interactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES form_sessions(id) ON DELETE CASCADE,
    
    -- Interaction details
    step INTEGER NOT NULL,
    field_name VARCHAR(100),
    action VARCHAR(20) CHECK (action IN ('focus', 'blur', 'change', 'abandon', 'validate')),
    
    -- Interaction data
    field_value TEXT,
    time_spent INTEGER, -- milliseconds on this field
    error_message TEXT,
    
    -- Timestamp
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================
-- CALENDAR INTEGRATION
-- ===================================

-- Calendar providers configuration
CREATE TABLE IF NOT EXISTS calendar_providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(20) CHECK (type IN ('google', 'outlook', 'calendly')),
    division VARCHAR(20),
    
    -- Provider configuration
    access_token TEXT,
    refresh_token TEXT,
    calendar_id VARCHAR(255),
    
    -- Settings
    is_enabled BOOLEAN DEFAULT TRUE,
    default_duration INTEGER DEFAULT 60, -- minutes
    buffer_time INTEGER DEFAULT 15, -- minutes between meetings
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Calendar bookings
CREATE TABLE IF NOT EXISTS calendar_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    
    -- Meeting details
    meeting_type VARCHAR(20) CHECK (meeting_type IN ('discovery', 'demo', 'consultation', 'strategy')),
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    duration INTEGER NOT NULL, -- minutes
    timezone VARCHAR(100) NOT NULL,
    
    -- Status and tracking
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'rescheduled')),
    meeting_link VARCHAR(500),
    calendar_event_id VARCHAR(255),
    
    -- Meeting metadata
    notes TEXT,
    attendee_count INTEGER DEFAULT 1,
    division VARCHAR(20),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Booking reminders
CREATE TABLE IF NOT EXISTS booking_reminders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES calendar_bookings(id) ON DELETE CASCADE,
    
    -- Reminder details
    reminder_type VARCHAR(10) CHECK (reminder_type IN ('24h', '1h', '15m')),
    scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
    
    -- Status
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
    sent_at TIMESTAMP WITH TIME ZONE,
    error_message TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================
-- EMAIL AUTOMATION
-- ===================================

-- Email templates
CREATE TABLE IF NOT EXISTS email_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    
    -- Template content
    subject VARCHAR(500) NOT NULL,
    html_content TEXT NOT NULL,
    text_content TEXT NOT NULL,
    
    -- Template metadata
    category VARCHAR(20) CHECK (category IN ('welcome', 'nurture', 'follow-up', 'education', 'recovery', 'promotional')),
    division VARCHAR(20),
    variables TEXT[], -- Available template variables
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email campaigns
CREATE TABLE IF NOT EXISTS email_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    
    -- Campaign details
    type VARCHAR(20) CHECK (type IN ('welcome', 'nurture', 'follow-up', 'education', 'recovery')),
    division VARCHAR(20),
    
    -- Trigger configuration
    trigger_event VARCHAR(50) NOT NULL,
    trigger_conditions JSONB DEFAULT '{}',
    trigger_delay INTEGER DEFAULT 0, -- minutes
    
    -- Campaign sequence
    sequence JSONB NOT NULL, -- Array of email steps
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email jobs for scheduled sending
CREATE TABLE IF NOT EXISTS email_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES email_campaigns(id) ON DELETE CASCADE,
    step_id VARCHAR(100) NOT NULL,
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    
    -- Job details
    scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'cancelled')),
    
    -- Execution tracking
    attempts INTEGER DEFAULT 0,
    last_error TEXT,
    sent_at TIMESTAMP WITH TIME ZONE,
    
    -- Job data
    lead_data JSONB,
    lead_score JSONB,
    custom_data JSONB DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email events for tracking and analytics
CREATE TABLE IF NOT EXISTS email_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Event details
    event_type VARCHAR(50) NOT NULL, -- sent, delivered, opened, clicked, bounced, complained
    email VARCHAR(255) NOT NULL,
    
    -- Email identification
    campaign_id UUID,
    step_id VARCHAR(100),
    lead_id UUID,
    
    -- Event metadata
    metadata JSONB DEFAULT '{}',
    user_agent TEXT,
    ip_address INET,
    
    -- Timestamp
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===================================
-- ANALYTICS AND TRACKING
-- ===================================

-- Page views for lead engagement tracking
CREATE TABLE IF NOT EXISTS page_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Visitor identification
    session_id VARCHAR(255),
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    visitor_id VARCHAR(255), -- Anonymous visitor tracking
    
    -- Page details
    url VARCHAR(1000) NOT NULL,
    title VARCHAR(500),
    referrer VARCHAR(1000),
    
    -- UTM tracking
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    utm_term VARCHAR(100),
    utm_content VARCHAR(100),
    
    -- Engagement metrics
    time_on_page INTEGER, -- seconds
    scroll_depth INTEGER, -- percentage
    interactions INTEGER DEFAULT 0,
    
    -- Device and browser info
    user_agent TEXT,
    device_type VARCHAR(20),
    browser VARCHAR(50),
    os VARCHAR(50),
    screen_resolution VARCHAR(20),
    
    -- Location
    ip_address INET,
    country VARCHAR(100),
    city VARCHAR(100),
    
    -- Timestamp
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- A/B test configurations
CREATE TABLE IF NOT EXISTS ab_tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    
    -- Test configuration
    type VARCHAR(50) NOT NULL, -- form_variant, email_subject, landing_page
    target_page VARCHAR(500),
    traffic_split INTEGER DEFAULT 50 CHECK (traffic_split >= 0 AND traffic_split <= 100),
    
    -- Test variants
    control_variant JSONB NOT NULL,
    test_variant JSONB NOT NULL,
    
    -- Test status
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'running', 'paused', 'completed')),
    
    -- Test period
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    
    -- Results
    control_conversions INTEGER DEFAULT 0,
    test_conversions INTEGER DEFAULT 0,
    control_participants INTEGER DEFAULT 0,
    test_participants INTEGER DEFAULT 0,
    statistical_significance DECIMAL(5,4),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- A/B test participants
CREATE TABLE IF NOT EXISTS ab_test_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_id UUID REFERENCES ab_tests(id) ON DELETE CASCADE,
    
    -- Participant identification
    session_id VARCHAR(255),
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    visitor_id VARCHAR(255),
    
    -- Test assignment
    variant VARCHAR(20) CHECK (variant IN ('control', 'test')),
    converted BOOLEAN DEFAULT FALSE,
    conversion_value DECIMAL(10,2),
    
    -- Timestamps
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    converted_at TIMESTAMP WITH TIME ZONE
);

-- Lead engagement summary
CREATE TABLE IF NOT EXISTS lead_engagement (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    
    -- Engagement metrics
    total_page_views INTEGER DEFAULT 0,
    total_time_on_site INTEGER DEFAULT 0, -- seconds
    email_opens INTEGER DEFAULT 0,
    email_clicks INTEGER DEFAULT 0,
    form_submissions INTEGER DEFAULT 0,
    
    -- Engagement score (calculated)
    engagement_score INTEGER DEFAULT 0 CHECK (engagement_score >= 0 AND engagement_score <= 100),
    
    -- Last activity
    last_page_view TIMESTAMP WITH TIME ZONE,
    last_email_interaction TIMESTAMP WITH TIME ZONE,
    last_activity TIMESTAMP WITH TIME ZONE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(lead_id)
);

-- ===================================
-- INDEXES FOR PERFORMANCE
-- ===================================

-- Leads table indexes
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_division ON leads(division);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_company_size ON leads(company_size);
CREATE INDEX IF NOT EXISTS idx_leads_budget ON leads(budget);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);

-- Lead scores indexes
CREATE INDEX IF NOT EXISTS idx_lead_scores_lead_id ON lead_scores(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_scores_classification ON lead_scores(classification);
CREATE INDEX IF NOT EXISTS idx_lead_scores_total_score ON lead_scores(total_score);
CREATE INDEX IF NOT EXISTS idx_lead_scores_calculated_at ON lead_scores(calculated_at);

-- Form sessions indexes
CREATE INDEX IF NOT EXISTS idx_form_sessions_session_id ON form_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_form_sessions_division ON form_sessions(division);
CREATE INDEX IF NOT EXISTS idx_form_sessions_completed ON form_sessions(is_completed);
CREATE INDEX IF NOT EXISTS idx_form_sessions_created_at ON form_sessions(created_at);

-- Calendar bookings indexes
CREATE INDEX IF NOT EXISTS idx_calendar_bookings_lead_id ON calendar_bookings(lead_id);
CREATE INDEX IF NOT EXISTS idx_calendar_bookings_status ON calendar_bookings(status);
CREATE INDEX IF NOT EXISTS idx_calendar_bookings_scheduled_at ON calendar_bookings(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_calendar_bookings_meeting_type ON calendar_bookings(meeting_type);

-- Email jobs indexes
CREATE INDEX IF NOT EXISTS idx_email_jobs_status ON email_jobs(status);
CREATE INDEX IF NOT EXISTS idx_email_jobs_scheduled_for ON email_jobs(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_email_jobs_campaign_id ON email_jobs(campaign_id);
CREATE INDEX IF NOT EXISTS idx_email_jobs_lead_id ON email_jobs(lead_id);

-- Email events indexes
CREATE INDEX IF NOT EXISTS idx_email_events_event_type ON email_events(event_type);
CREATE INDEX IF NOT EXISTS idx_email_events_email ON email_events(email);
CREATE INDEX IF NOT EXISTS idx_email_events_campaign_id ON email_events(campaign_id);
CREATE INDEX IF NOT EXISTS idx_email_events_timestamp ON email_events(timestamp);

-- Page views indexes
CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_lead_id ON page_views(lead_id);
CREATE INDEX IF NOT EXISTS idx_page_views_url ON page_views(url);
CREATE INDEX IF NOT EXISTS idx_page_views_timestamp ON page_views(timestamp);
CREATE INDEX IF NOT EXISTS idx_page_views_utm_campaign ON page_views(utm_campaign);

-- A/B tests indexes
CREATE INDEX IF NOT EXISTS idx_ab_tests_status ON ab_tests(status);
CREATE INDEX IF NOT EXISTS idx_ab_tests_type ON ab_tests(type);
CREATE INDEX IF NOT EXISTS idx_ab_test_participants_test_id ON ab_test_participants(test_id);
CREATE INDEX IF NOT EXISTS idx_ab_test_participants_variant ON ab_test_participants(variant);

-- Lead engagement indexes
CREATE INDEX IF NOT EXISTS idx_lead_engagement_lead_id ON lead_engagement(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_engagement_score ON lead_engagement(engagement_score);
CREATE INDEX IF NOT EXISTS idx_lead_engagement_last_activity ON lead_engagement(last_activity);

-- ===================================
-- TRIGGERS AND FUNCTIONS
-- ===================================

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$ language 'plpgsql';

-- Triggers for updated_at columns
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_form_sessions_updated_at BEFORE UPDATE ON form_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calendar_bookings_updated_at BEFORE UPDATE ON calendar_bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_templates_updated_at BEFORE UPDATE ON email_templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_campaigns_updated_at BEFORE UPDATE ON email_campaigns
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ab_tests_updated_at BEFORE UPDATE ON ab_tests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lead_engagement_updated_at BEFORE UPDATE ON lead_engagement
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create lead engagement record
CREATE OR REPLACE FUNCTION create_lead_engagement()
RETURNS TRIGGER AS $
BEGIN
    INSERT INTO lead_engagement (lead_id)
    VALUES (NEW.id)
    ON CONFLICT (lead_id) DO NOTHING;
    RETURN NEW;
END;
$ language 'plpgsql';

-- Trigger to create engagement record when lead is created
CREATE TRIGGER create_lead_engagement_trigger AFTER INSERT ON leads
    FOR EACH ROW EXECUTE FUNCTION create_lead_engagement();

-- Function to update lead engagement metrics
CREATE OR REPLACE FUNCTION update_lead_engagement_metrics()
RETURNS TRIGGER AS $
BEGIN
    -- Update page view metrics
    IF TG_TABLE_NAME = 'page_views' AND NEW.lead_id IS NOT NULL THEN
        UPDATE lead_engagement 
        SET 
            total_page_views = total_page_views + 1,
            total_time_on_site = total_time_on_site + COALESCE(NEW.time_on_page, 0),
            last_page_view = NEW.timestamp,
            last_activity = NEW.timestamp,
            updated_at = NOW()
        WHERE lead_id = NEW.lead_id;
    END IF;
    
    -- Update email interaction metrics
    IF TG_TABLE_NAME = 'email_events' AND NEW.lead_id IS NOT NULL THEN
        IF NEW.event_type = 'email_opened' THEN
            UPDATE lead_engagement 
            SET 
                email_opens = email_opens + 1,
                last_email_interaction = NEW.timestamp,
                last_activity = NEW.timestamp,
                updated_at = NOW()
            WHERE lead_id = NEW.lead_id;
        ELSIF NEW.event_type = 'email_clicked' THEN
            UPDATE lead_engagement 
            SET 
                email_clicks = email_clicks + 1,
                last_email_interaction = NEW.timestamp,
                last_activity = NEW.timestamp,
                updated_at = NOW()
            WHERE lead_id = NEW.lead_id;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$ language 'plpgsql';

-- Triggers for engagement metrics
CREATE TRIGGER update_engagement_from_page_views AFTER INSERT ON page_views
    FOR EACH ROW EXECUTE FUNCTION update_lead_engagement_metrics();

CREATE TRIGGER update_engagement_from_email_events AFTER INSERT ON email_events
    FOR EACH ROW EXECUTE FUNCTION update_lead_engagement_metrics();

-- Function to calculate engagement score
CREATE OR REPLACE FUNCTION calculate_engagement_score(p_lead_id UUID)
RETURNS INTEGER AS $
DECLARE
    v_score INTEGER := 0;
    v_engagement RECORD;
BEGIN
    SELECT * INTO v_engagement FROM lead_engagement WHERE lead_id = p_lead_id;
    
    IF v_engagement IS NULL THEN
        RETURN 0;
    END IF;
    
    -- Page views contribution (max 30 points)
    v_score := v_score + LEAST(30, v_engagement.total_page_views * 3);
    
    -- Time on site contribution (max 25 points, 1 point per minute)
    v_score := v_score + LEAST(25, v_engagement.total_time_on_site / 60);
    
    -- Email engagement contribution (max 30 points)
    v_score := v_score + LEAST(20, v_engagement.email_opens * 2);
    v_score := v_score + LEAST(10, v_engagement.email_clicks * 5);
    
    -- Form submissions contribution (max 15 points)
    v_score := v_score + LEAST(15, v_engagement.form_submissions * 15);
    
    RETURN LEAST(100, v_score);
END;
$ language 'plpgsql';

-- ===================================
-- ROW LEVEL SECURITY (RLS)
-- ===================================

-- Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_test_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_engagement ENABLE ROW LEVEL SECURITY;

-- RLS Policies for authenticated users
CREATE POLICY "Users can access all lead data" ON leads
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Users can access all lead scores" ON lead_scores
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Users can access all form sessions" ON form_sessions
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Users can access all form interactions" ON form_interactions
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Users can access all calendar bookings" ON calendar_bookings
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Users can access all booking reminders" ON booking_reminders
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Users can access all email jobs" ON email_jobs
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Users can access all email events" ON email_events
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Users can access all page views" ON page_views
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Users can access all A/B test participants" ON ab_test_participants
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Users can access all lead engagement" ON lead_engagement
    FOR ALL USING (auth.role() = 'authenticated');

-- Allow anonymous users to create form sessions and interactions
CREATE POLICY "Anonymous users can create form sessions" ON form_sessions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Anonymous users can update their form sessions" ON form_sessions
    FOR UPDATE USING (true);

CREATE POLICY "Anonymous users can create form interactions" ON form_interactions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Anonymous users can create page views" ON page_views
    FOR INSERT WITH CHECK (true);

-- ===================================
-- VIEWS FOR ANALYTICS
-- ===================================

-- Lead conversion funnel view
CREATE OR REPLACE VIEW lead_conversion_funnel AS
SELECT 
    DATE_TRUNC('day', created_at) as date,
    division,
    COUNT(*) as total_leads,
    COUNT(*) FILTER (WHERE status = 'qualified') as qualified_leads,
    COUNT(*) FILTER (WHERE status = 'proposal') as proposal_leads,
    COUNT(*) FILTER (WHERE status = 'closed-won') as won_leads,
    ROUND(
        COUNT(*) FILTER (WHERE status = 'qualified')::DECIMAL / COUNT(*) * 100, 2
    ) as qualification_rate,
    ROUND(
        COUNT(*) FILTER (WHERE status = 'closed-won')::DECIMAL / COUNT(*) * 100, 2
    ) as conversion_rate
FROM leads 
GROUP BY DATE_TRUNC('day', created_at), division
ORDER BY date DESC;

-- Lead scoring distribution view
CREATE OR REPLACE VIEW lead_scoring_distribution AS
SELECT 
    classification,
    division,
    COUNT(*) as lead_count,
    AVG(total_score) as avg_score,
    MIN(total_score) as min_score,
    MAX(total_score) as max_score,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY total_score) as median_score
FROM lead_scores ls
JOIN leads l ON ls.lead_id = l.id
WHERE ls.calculated_at = (
    SELECT MAX(calculated_at) 
    FROM lead_scores ls2 
    WHERE ls2.lead_id = ls.lead_id
)
GROUP BY classification, division;

-- Email campaign performance view
CREATE OR REPLACE VIEW email_campaign_performance AS
SELECT 
    ec.id as campaign_id,
    ec.name as campaign_name,
    ec.type as campaign_type,
    ec.division,
    COUNT(ej.id) as emails_sent,
    COUNT(ee_open.id) as emails_opened,
    COUNT(ee_click.id) as emails_clicked,
    COUNT(ee_bounce.id) as emails_bounced,
    ROUND(
        COUNT(ee_open.id)::DECIMAL / NULLIF(COUNT(ej.id), 0) * 100, 2
    ) as open_rate,
    ROUND(
        COUNT(ee_click.id)::DECIMAL / NULLIF(COUNT(ej.id), 0) * 100, 2
    ) as click_rate,
    ROUND(
        COUNT(ee_bounce.id)::DECIMAL / NULLIF(COUNT(ej.id), 0) * 100, 2
    ) as bounce_rate
FROM email_campaigns ec
LEFT JOIN email_jobs ej ON ec.id = ej.campaign_id AND ej.status = 'sent'
LEFT JOIN email_events ee_open ON ej.campaign_id::text = ee_open.campaign_id::text 
    AND ee_open.event_type = 'email_opened'
LEFT JOIN email_events ee_click ON ej.campaign_id::text = ee_click.campaign_id::text 
    AND ee_click.event_type = 'email_clicked'
LEFT JOIN email_events ee_bounce ON ej.campaign_id::text = ee_bounce.campaign_id::text 
    AND ee_bounce.event_type = 'email_bounced'
GROUP BY ec.id, ec.name, ec.type, ec.division;

-- Form completion analytics view
CREATE OR REPLACE VIEW form_completion_analytics AS
SELECT 
    DATE_TRUNC('day', created_at) as date,
    division,
    COUNT(*) as total_sessions,
    COUNT(*) FILTER (WHERE is_completed = true) as completed_sessions,
    COUNT(*) FILTER (WHERE abandoned_at IS NOT NULL) as abandoned_sessions,
    ROUND(
        COUNT(*) FILTER (WHERE is_completed = true)::DECIMAL / COUNT(*) * 100, 2
    ) as completion_rate,
    AVG(completion_percentage) as avg_completion_percentage,
    AVG(time_spent) as avg_time_spent
FROM form_sessions
GROUP BY DATE_TRUNC('day', created_at), division
ORDER BY date DESC;

-- ===================================
-- SAMPLE DATA FOR TESTING
-- ===================================

-- Insert sample email templates
INSERT INTO email_templates (id, name, subject, html_content, text_content, category, division, variables) VALUES
(uuid_generate_v4(), 'Welcome - Strategy Division', 'Welcome to Cipher Intelligence Strategic Consulting', 
 '<h1>Welcome {{firstName}}!</h1><p>Thank you for your interest in our {{divisionName}} services...</p>', 
 'Welcome {{firstName}}! Thank you for your interest in our {{divisionName}} services...', 
 'welcome', 'strategy', ARRAY['firstName', 'company', 'divisionName']),

(uuid_generate_v4(), 'Form Abandonment Recovery', 'Complete your consultation request in just 2 minutes', 
 '<h1>Hi {{firstName}},</h1><p>You were so close to completing your request...</p>', 
 'Hi {{firstName}}, You were so close to completing your request...', 
 'recovery', null, ARRAY['firstName', 'company']);

-- Insert sample email campaigns
INSERT INTO email_campaigns (id, name, type, division, trigger_event, sequence) VALUES
(uuid_generate_v4(), 'Strategy Division Welcome Series', 'welcome', 'strategy', 'form_submit',
 '[{"id": "step1", "subject": "Welcome to Strategic Transformation", "template": "welcome-strategy", "delay": 0, "trackingEnabled": true}]'),

(uuid_generate_v4(), 'Form Abandonment Recovery', 'recovery', null, 'form_abandon',
 '[{"id": "step1", "subject": "Complete your consultation request", "template": "recovery-general", "delay": 1, "trackingEnabled": true}]');

-- Create indexes on JSONB columns for better performance
CREATE INDEX IF NOT EXISTS idx_leads_metadata_gin ON leads USING GIN (metadata);
CREATE INDEX IF NOT EXISTS idx_form_sessions_form_data_gin ON form_sessions USING GIN (form_data);
CREATE INDEX IF NOT EXISTS idx_email_events_metadata_gin ON email_events USING GIN (metadata);

-- Create partial indexes for active records
CREATE INDEX IF NOT EXISTS idx_active_campaigns ON email_campaigns(id) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_active_templates ON email_templates(id) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_pending_email_jobs ON email_jobs(scheduled_for) WHERE status = 'pending';

COMMENT ON TABLE leads IS 'Enhanced leads table with comprehensive lead data and scoring';
COMMENT ON TABLE lead_scores IS 'Historical lead scoring data with detailed breakdown';
COMMENT ON TABLE form_sessions IS 'Multi-step form session tracking and analytics';
COMMENT ON TABLE calendar_bookings IS 'Calendar integration for automated meeting booking';
COMMENT ON TABLE email_jobs IS 'Email automation job queue with retry logic';
COMMENT ON TABLE email_events IS 'Email tracking events for comprehensive analytics';
COMMENT ON TABLE page_views IS 'Website analytics and lead engagement tracking';
COMMENT ON TABLE ab_tests IS 'A/B testing framework for optimization';
COMMENT ON TABLE lead_engagement IS 'Aggregated lead engagement metrics and scoring';
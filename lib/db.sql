-- Database Schema for Facility Maintenance & Deep Cleaning Company Website

-- 1. Inquiries Table (For Contact and Service Quote forms)
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  service_type VARCHAR(100) NOT NULL,
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- pending, contacted, resolved
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Callbacks Table (For Schedule Call requests)
CREATE TABLE IF NOT EXISTS callbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  preferred_time VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, completed
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name VARCHAR(255) NOT NULL,
  designation VARCHAR(255),
  review TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Offers Table
CREATE TABLE IF NOT EXISTS offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  start_date DATE,
  end_date DATE,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Before/After Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255),
  category VARCHAR(100) NOT NULL, -- deep-cleaning, ac-maintenance, plumbing, electrical, etc.
  before_image_url TEXT NOT NULL,
  after_image_url TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Services Table (For dynamic page configuration)
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  benefits TEXT[] NOT NULL,
  process JSONB NOT NULL, -- Array of steps: [{ "step": 1, "title": "...", "desc": "..." }]
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE callbacks ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Disable all policies before recreation to avoid conflicts
DROP POLICY IF EXISTS "Enable public inserts for inquiries" ON inquiries;
DROP POLICY IF EXISTS "Enable read/write for authenticated users on inquiries" ON inquiries;
DROP POLICY IF EXISTS "Enable public inserts for callbacks" ON callbacks;
DROP POLICY IF EXISTS "Enable read/write for authenticated users on callbacks" ON callbacks;
DROP POLICY IF EXISTS "Enable public read for testimonials" ON testimonials;
DROP POLICY IF EXISTS "Enable all for authenticated users on testimonials" ON testimonials;
DROP POLICY IF EXISTS "Enable public read for offers" ON offers;
DROP POLICY IF EXISTS "Enable all for authenticated users on offers" ON offers;
DROP POLICY IF EXISTS "Enable public read for gallery" ON gallery;
DROP POLICY IF EXISTS "Enable all for authenticated users on gallery" ON gallery;
DROP POLICY IF EXISTS "Enable public read for services" ON services;
DROP POLICY IF EXISTS "Enable all for authenticated users on services" ON services;

-- Set up policies for inquiries
CREATE POLICY "Enable public inserts for inquiries" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read/write for authenticated users on inquiries" ON inquiries FOR ALL TO authenticated USING (true);

-- Set up policies for callbacks
CREATE POLICY "Enable public inserts for callbacks" ON callbacks FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read/write for authenticated users on callbacks" ON callbacks FOR ALL TO authenticated USING (true);

-- Set up policies for testimonials
CREATE POLICY "Enable public read for testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Enable all for authenticated users on testimonials" ON testimonials FOR ALL TO authenticated USING (true);

-- Set up policies for offers
CREATE POLICY "Enable public read for offers" ON offers FOR SELECT USING (true);
CREATE POLICY "Enable all for authenticated users on offers" ON offers FOR ALL TO authenticated USING (true);

-- Set up policies for gallery
CREATE POLICY "Enable public read for gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Enable all for authenticated users on gallery" ON gallery FOR ALL TO authenticated USING (true);

-- Set up policies for services
CREATE POLICY "Enable public read for services" ON services FOR SELECT USING (true);
CREATE POLICY "Enable all for authenticated users on services" ON services FOR ALL TO authenticated USING (true);

-- ============================================================================
-- SEED DATA
-- ============================================================================

-- Insert Testimonials
INSERT INTO testimonials (customer_name, designation, review, rating, is_featured) VALUES
('Ramesh Kumar', 'Villa Owner, Kochi', 'The deep cleaning team did an absolutely amazing job! They cleaned every single corner of my villa. Very professional equipment and polite staff.', 5, true),
('Anjana Nair', 'Apartment Resident, Trivandrum', 'Very reliable AC maintenance services. The technician arrived on time, diagnosed the issue quickly, and fixed it at a very reasonable price.', 5, true),
('Varghese George', 'Office Manager, Calicut', 'We have signed a Commercial AMC with them for our office. Everything from plumbing fixes to electrical checks has been managed perfectly and on time.', 5, true),
('Dr. Safeer', 'Clinic Owner, Thrissur', 'Extremely satisfied with the post-construction cleaning. They sanitized the entire clinic, and the reports they provided were highly professional.', 4, true);

-- Insert Special Offers
INSERT INTO offers (title, description, active) VALUES
('Free Villa Inspection', 'Book any deep cleaning service this month and get a free home snagging and visual checkup worth ₹2,500.', true),
('No Visiting Charge', 'Get electrical or plumbing troubleshooting done at zero inspection fees. Pay only for the replacement parts and manual labor.', true),
('15% Off First AMC Contract', 'Protect your home with our Annual Maintenance Contracts. Get an introductory 15% discount for a limited period.', true);

-- Insert Services Seed Data
INSERT INTO services (title, slug, description, image_url, benefits, process) VALUES
('AC Maintenance & Servicing', 'ac-maintenance', 'Professional AC maintenance, duct cleaning, gas refilling, and repairs for split and ducted AC systems.', '/images/ac-service.jpg', ARRAY['Improves cooling efficiency', 'Reduces monthly electricity bills by up to 20%', 'Extends equipment lifetime and prevents sudden breakdowns', 'Ensures clean, allergen-free air circulation'], '[
  {"step": 1, "title": "System Diagnostic", "desc": "We inspect thermostat settings, electrical connections, and current draw."},
  {"step": 2, "title": "Deep Coil Wash", "desc": "Pressure washing of indoor evaporator and outdoor condenser coils."},
  {"step": 3, "title": "Drain & Filter Clean", "desc": "Flush condensate drain lines and deep clean filters to prevent blockages."},
  {"step": 4, "title": "Performance Test", "desc": "We measure airflow temperature and verify gas pressure levels."}
]'::jsonb),

('Deep Cleaning Services', 'deep-cleaning', 'Thorough villa, apartment, and office sanitization, floor scrubbing, kitchen deep cleaning, and steam washing.', '/images/deep-clean.jpg', ARRAY['Eliminates deep-seated dust and allergens', 'Hospital-grade sanitization and disinfection', 'Restores shine to floor tiles and marble surfaces', 'Saves hours of heavy physical labor'], '[
  {"step": 1, "title": "Dusting & Vacuuming", "desc": "Hepta-filter vacuuming of ceilings, walls, upholstery, and carpets."},
  {"step": 2, "title": "Kitchen & Bathroom Sanitization", "desc": "Removing grease from cabinets and deep descaling of toilets and tiles."},
  {"step": 3, "title": "Window & Glass Buffing", "desc": "Polishing of indoor and outdoor window panes, frames, and mirrors."},
  {"step": 4, "title": "Floor Machine Scrubbing", "desc": "Rotary industrial floor washing to lift grime and restore gloss."}
]'::jsonb),

('Electrical Maintenance', 'electrical-maintenance', 'Safe and certified electrical upgrades, fuse checks, wiring fixes, and smart device installations.', '/images/electrical.jpg', ARRAY['Prevents dangerous short circuits and electrical fires', 'Saves power by fixing current leakage issues', 'Certified and highly experienced electricians', 'Emergency troubleshooting support available'], '[
  {"step": 1, "title": "DB Inspection", "desc": "Checking the Distribution Board, ELCD, MCB, and electrical connections."},
  {"step": 2, "title": "Load Balancing Check", "desc": "Verifying load distribution across phases to prevent overloads."},
  {"step": 3, "title": "Fixing & Upgrades", "desc": "Repairing switches, loose connections, and replacing damaged wires."},
  {"step": 4, "title": "Earthing Assessment", "desc": "Testing earth leakage and grounding pits for household safety."}
]'::jsonb),

('Plumbing Maintenance', 'plumbing-maintenance', 'Leak detection, pressure pump servicing, drainage clearing, and premium sanitary fixture installations.', '/images/plumbing.jpg', ARRAY['Stops water damage and dampness in walls', 'Restores proper water pressure in all showers', 'Saves precious fresh water from leakages', 'Quick response for blocked drains'], '[
  {"step": 1, "title": "Water Line Inspection", "desc": "Checking pressure lines, pumps, and looking for signs of concealed dampness."},
  {"step": 2, "title": "Leak Repair", "desc": "Replacing washers, cartridges, and sealing joints with professional sealants."},
  {"step": 3, "title": "Drain De-clogging", "desc": "Using specialized tools to clear debris from kitchen and bathroom drains."},
  {"step": 4, "title": "Fixture Polishing", "desc": "Descaling chrome and brass taps and showerheads for a shiny finish."}
]'::jsonb),

('Preventive Maintenance', 'preventive-maintenance', 'Scheduled home checkups, visual snagging, thermal imaging, and pre-monsoon checks to avoid damage.', '/images/preventive.jpg', ARRAY['Catches minor issues before they become expensive repairs', 'Keeps structure in top architectural health', 'Comprehensive property health report generated', 'Tailored schedules for Kerala tropical weather'], '[
  {"step": 1, "title": "Visual Snag Audit", "desc": "Full walkthrough checking walls, doors, ceilings, and tiles for cracks or dampness."},
  {"step": 2, "title": "Thermal Scan", "desc": "Using thermal cameras to find hidden damp spots or electrical hotspots."},
  {"step": 3, "title": "Roof & Gutters Prep", "desc": "Cleaning terrace drains and clearing leaves prior to monsoons."},
  {"step": 4, "title": "Report Submission", "desc": "Delivering a structured PDF snag-report with priority actions."}
]'::jsonb),

('Annual Maintenance Contracts (AMC)', 'amc-services', 'Year-round complete facility protection with routine visits, free breakdown calls, and priority response.', '/images/amc.jpg', ARRAY['Fixed annual costs - zero budgeting surprises', 'Unlimited emergency breakdown calls with priority booking', '4 scheduled comprehensive maintenance visits per year', 'Dedicated relationship manager for corporate clients'], '[
  {"step": 1, "title": "Initial Audit & Onboarding", "desc": "We map all appliances, electrical systems, and plumbing lines in your property."},
  {"step": 2, "title": "Custom Planner", "desc": "Creating a customized annual service calendar based on property size."},
  {"step": 3, "title": "Routine Visits", "desc": "Executing regular quarterly servicing of ACs, plumbing, and electrical units."},
  {"step": 4, "title": "24/7 Breakdown Response", "desc": "Dispatching technicians in under 2 hours for active contract customers."}
]'::jsonb),

('Emergency Support', 'emergency-support', 'Fast response team for power failures, major water leaks, AC breakdowns, and locks lockout.', '/images/emergency.jpg', ARRAY['Rapid response within 2 hours across Kerala cities', 'Special emergency response team dispatch', 'Resolves critical safety threats immediately', 'Available for residential & commercial premises'], '[
  {"step": 1, "title": "Hotline Call Intake", "desc": "Our support center records structural breakdown parameters immediately."},
  {"step": 2, "title": "Technician Dispatch", "desc": "Closest certified technician team is rerouted to the location with tools."},
  {"step": 3, "title": "Containment", "desc": "Shutting off main valves or breaker lines to secure the premises first."},
  {"step": 4, "title": "Resolution", "desc": "Executing permanent repairs or setting up a safe temporary bypass."}
]'::jsonb),

('Mobile Car Wash', 'mobile-car-wash', 'Eco-friendly premium car cleaning at your doorstep, utilizing waterless or high-pressure systems.', '/images/car-wash.jpg', ARRAY['Saves time - no waiting at crowded service stations', 'Saves up to 90% water using advanced polymer formulas', 'Includes interior vacuuming, dashboard polish, and tyre dressing', 'Gentle scratch-free micro-fiber cleaning process'], '[
  {"step": 1, "title": "Pre-rinse & Vacuum", "desc": "Removing loose dirt from paintwork and vacuuming carpets and seats."},
  {"step": 2, "title": "Polymer Wash", "desc": "Applying high-lubricity cleaning spray to safely lift and dissolve dirt."},
  {"step": 3, "title": "Buffing & Drying", "desc": "Hand-drying with premium 600GSM microfiber towels for swirl-free finish."},
  {"step": 4, "title": "Interior Dressing", "desc": "Sanitizing dashboard, conditioning leather, and applying tyre glaze."}
]'::jsonb);

'use server';

import { z } from 'zod';
import { createServerClientInstance, isSupabaseConfigured, supabase } from './supabase';
import { revalidatePath } from 'next/cache';
import { randomUUID } from 'crypto';

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  service_type: z.string().min(1, 'Please select a service'),
  message: z.string().max(1000, 'Message cannot exceed 1000 characters').optional(),
});

const callbackSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  preferred_time: z.string().min(1, 'Please select a preferred time slot'),
});

// ============================================================================
// IN-MEMORY MOCK STORE FOR FALLBACK
// ============================================================================

// Simulated server-side storage
let mockInquiries = [
  { id: 'inq-1', name: 'Rohan Kurian', phone: '9845612300', email: 'rohan@gmail.com', service_type: 'AC Maintenance & Servicing', message: 'AC in bedroom is making a loud noise and cooling is poor.', status: 'pending', created_at: new Date().toISOString() },
  { id: 'inq-2', name: 'Meera Joseph', phone: '9447123456', email: 'meera.j@yahoo.com', service_type: 'Deep Cleaning Services', message: 'Need deep cleaning for a 3BHK vacant apartment in Kakkanad.', status: 'contacted', created_at: new Date(Date.now() - 86400000).toISOString() },
  { id: 'inq-3', name: 'Sajid Ahmad', phone: '9562789123', email: 'sajid@clinichub.in', service_type: 'Annual Maintenance Contracts (AMC)', message: 'Requesting quote for AMC of small clinic (electrical & AC).', status: 'resolved', created_at: new Date(Date.now() - 172800000).toISOString() }
];

let mockCallbacks = [
  { id: 'cb-1', name: 'Thomas Philip', phone: '9072345678', preferred_time: 'Evening (4 PM - 7 PM)', status: 'pending', created_at: new Date().toISOString() },
  { id: 'cb-2', name: 'Neethu Paul', phone: '9048123009', preferred_time: 'Morning (9 AM - 12 PM)', status: 'completed', created_at: new Date(Date.now() - 3600000).toISOString() }
];

let mockTestimonials = [
  { id: 't-1', customer_name: 'Ramesh Kumar', designation: 'Villa Owner', review: 'The deep cleaning team did an absolutely amazing job! They cleaned every single corner of my villa. Very professional equipment and polite staff.', rating: 5, is_featured: true, created_at: new Date().toISOString() },
  { id: 't-2', customer_name: 'Anjana Nair', designation: 'Apartment Resident', review: 'Very reliable AC maintenance services. The technician arrived on time, diagnosed the issue quickly, and fixed it at a very reasonable price.', rating: 5, is_featured: true, created_at: new Date().toISOString() },
  { id: 't-3', customer_name: 'Varghese George', designation: 'Office Manager', review: 'We have signed a Commercial AMC with them for our office. Everything from plumbing fixes to electrical checks has been managed perfectly and on time.', rating: 5, is_featured: true, created_at: new Date().toISOString() },
  { id: 't-4', customer_name: 'Dr. Safeer', designation: 'Clinic Owner', review: 'Extremely satisfied with the post-construction cleaning. They sanitized the entire clinic, and the reports they provided were highly professional.', rating: 4, is_featured: true, created_at: new Date().toISOString() }
];

let mockOffers: Array<{
  id: string;
  title: string;
  description: string;
  image_url: string;
  start_date?: string;
  end_date?: string;
  active: boolean;
}> = [
  { id: 'o-1', title: 'Free Villa Inspection', description: 'Book any deep cleaning service this month and get a free home snagging and visual checkup worth ₹2,500.', image_url: '', start_date: '2026-06-01', end_date: '2026-07-31', active: true },
  { id: 'o-2', title: 'No Visiting Charge', description: 'Get electrical or plumbing troubleshooting done at zero inspection fees. Pay only for replacement parts and labor.', image_url: '', start_date: '2026-06-01', end_date: '2026-08-31', active: true },
  { id: 'o-3', title: '15% Off First AMC Contract', description: 'Protect your home with our Annual Maintenance Contracts. Get an introductory 15% discount for a limited period.', image_url: '', start_date: '2026-06-15', end_date: '2026-09-15', active: true }
];

let mockGallery = [
  { id: 'g-1', title: 'Kitchen Deep Clean', category: 'deep-cleaning', before_image_url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80', after_image_url: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=600&q=80', is_featured: true, created_at: new Date().toISOString() },
  { id: 'g-2', title: 'Living Room Scrubbing', category: 'deep-cleaning', before_image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80', after_image_url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80', is_featured: true, created_at: new Date().toISOString() },
  { id: 'g-3', title: 'AC Filter Descaling', category: 'ac-maintenance', before_image_url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=600&q=80', after_image_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80', is_featured: false, created_at: new Date().toISOString() }
];

// ============================================================================
// PUBLIC SERVER ACTIONS
// ============================================================================

export async function submitInquiry(rawState: any, formData: FormData) {
  const data = {
    name: formData.get('name') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    service_type: formData.get('service_type') as string,
    message: formData.get('message') as string,
  };

  const validation = inquirySchema.safeParse(data);
  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
      message: 'Validation failed. Please correct the fields.',
    };
  }

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerClientInstance();
      const { error } = await supabase.from('inquiries').insert([validation.data]);
      if (error) throw error;
      
      revalidatePath('/admin/dashboard');
      return { success: true, message: 'Inquiry submitted successfully! We will contact you soon.' };
    } catch (e: any) {
      console.error('Supabase Inquiry Error:', e);
      return { success: false, message: e.message || 'Database error occurred. Please try again.' };
    }
  } else {
    // Fallback store
    const newInquiry = {
      id: `inq-${Date.now()}`,
      ...validation.data,
      email: validation.data.email || '',
      message: validation.data.message || '',
      status: 'pending',
      created_at: new Date().toISOString(),
    };
    mockInquiries.unshift(newInquiry);
    return {
      success: true,
      message: 'Inquiry submitted successfully (Demo Mode)! We will contact you soon.',
    };
  }
}

export async function requestCallback(rawState: any, formData: FormData) {
  const data = {
    name: formData.get('name') as string,
    phone: formData.get('phone') as string,
    preferred_time: formData.get('preferred_time') as string,
  };

  const validation = callbackSchema.safeParse(data);
  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
      message: 'Validation failed. Please correct the fields.',
    };
  }

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerClientInstance();
      const { error } = await supabase.from('callbacks').insert([validation.data]);
      if (error) throw error;
      
      revalidatePath('/admin/dashboard');
      return { success: true, message: 'Callback request registered! We will call you back at your preferred time.' };
    } catch (e: any) {
      console.error('Supabase Callback Error:', e);
      return { success: false, message: e.message || 'Database error occurred.' };
    }
  } else {
    const newCallback = {
      id: `cb-${Date.now()}`,
      ...validation.data,
      status: 'pending',
      created_at: new Date().toISOString(),
    };
    mockCallbacks.unshift(newCallback);
    return {
      success: true,
      message: 'Callback request registered (Demo Mode)! We will call you back.',
    };
  }
}

// ============================================================================
// ADMIN ACTIONS
// ============================================================================

export async function getDashboardStats() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerClientInstance();
      
      const { count: totalLeads } = await supabase.from('inquiries').select('*', { count: 'exact', head: true });
      
      const today = new Date();
      today.setHours(0,0,0,0);
      const { count: todayLeads } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString());

      const { count: openInquiries } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      const { count: activeAmc } = await supabase
        .from('service_requests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      return {
        totalLeads: totalLeads || 0,
        todayLeads: todayLeads || 0,
        openInquiries: openInquiries || 0,
        activeAmc: activeAmc || 0,
        mode: 'production',
      };
    } catch (e) {
      console.error('Stats query failed, falling back to mock.');
    }
  }

  // Fallback
  const todayStart = new Date();
  todayStart.setHours(0,0,0,0);
  const todayCount = mockInquiries.filter(i => new Date(i.created_at) >= todayStart).length;
  const openCount = mockInquiries.filter(i => i.status === 'pending').length;
  const amcCount = mockInquiries.filter(i => i.service_type.includes('AMC') && i.status === 'pending').length;

  return {
    totalLeads: mockInquiries.length + mockCallbacks.length,
    todayLeads: todayCount,
    openInquiries: openCount + mockCallbacks.filter(c => c.status === 'pending').length,
    activeAmc: amcCount,
    mode: 'demo',
  };
}

export async function getInquiries() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerClientInstance();
      const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
      if (!error) return data || [];
    } catch (e) {
      console.error(e);
    }
  }
  return mockInquiries;
}

export async function updateInquiryStatus(id: string, status: string) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerClientInstance();
      await supabase.from('inquiries').update({ status }).eq('id', id);
      revalidatePath('/admin/dashboard');
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  const inq = mockInquiries.find(i => i.id === id);
  if (inq) {
    inq.status = status;
    return { success: true };
  }
  return { success: false, error: 'Inquiry not found' };
}

export async function getCallbacks() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerClientInstance();
      const { data, error } = await supabase.from('callbacks').select('*').order('created_at', { ascending: false });
      if (!error) return data || [];
    } catch (e) {
      console.error(e);
    }
  }
  return mockCallbacks;
}

export async function updateCallbackStatus(id: string, status: string) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerClientInstance();
      await supabase.from('callbacks').update({ status }).eq('id', id);
      revalidatePath('/admin/dashboard');
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  const cb = mockCallbacks.find(c => c.id === id);
  if (cb) {
    cb.status = status;
    return { success: true };
  }
  return { success: false, error: 'Callback not found' };
}

export async function getGalleryItems() {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
      if (!error) return data || [];
    } catch (e) {
      console.error(e);
    }
  }
  return mockGallery;
}

export async function addGalleryItem(item: { title: string; category: string; before_image_url: string; after_image_url: string; is_featured: boolean }) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerClientInstance();
      const { error } = await supabase.from('gallery').insert([item]);
      if (error) throw error;
      revalidatePath('/deep-cleaning');
      revalidatePath('/admin/dashboard');
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  const newItem = {
    id: `g-${Date.now()}`,
    ...item,
    created_at: new Date().toISOString(),
  };
  mockGallery.unshift(newItem);
  return { success: true };
}

export async function deleteGalleryItem(id: string) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerClientInstance();
      await supabase.from('gallery').delete().eq('id', id);
      revalidatePath('/deep-cleaning');
      revalidatePath('/admin/dashboard');
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  mockGallery = mockGallery.filter(g => g.id !== id);
  return { success: true };
}

export async function getTestimonials() {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
      if (!error) return data || [];
    } catch (e) {
      console.error(e);
    }
  }
  return mockTestimonials;
}

export async function addTestimonial(item: { customer_name: string; designation: string; review: string; rating: number; is_featured: boolean }) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerClientInstance();
      const { error } = await supabase.from('testimonials').insert([item]);
      if (error) throw error;
      revalidatePath('/');
      revalidatePath('/admin/dashboard');
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  const newItem = {
    id: `t-${Date.now()}`,
    ...item,
    created_at: new Date().toISOString(),
  };
  mockTestimonials.unshift(newItem);
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerClientInstance();
      await supabase.from('testimonials').delete().eq('id', id);
      revalidatePath('/');
      revalidatePath('/admin/dashboard');
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  mockTestimonials = mockTestimonials.filter(t => t.id !== id);
  return { success: true };
}

export async function getOffers() {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('offers').select('*').order('created_at', { ascending: false });
      if (!error) return data || [];
    } catch (e) {
      console.error(e);
    }
  }
  return mockOffers;
}

export async function addOffer(item: { title: string; description: string; start_date?: string; end_date?: string; active: boolean }) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerClientInstance();
      const { error } = await supabase.from('offers').insert([item]);
      if (error) throw error;
      revalidatePath('/offers');
      revalidatePath('/admin/dashboard');
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  const newItem = {
    id: `o-${Date.now()}`,
    ...item,
    image_url: '',
    created_at: new Date().toISOString(),
  };
  mockOffers.unshift(newItem);
  return { success: true };
}

export async function toggleOfferActive(id: string, active: boolean) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerClientInstance();
      await supabase.from('offers').update({ active }).eq('id', id);
      revalidatePath('/offers');
      revalidatePath('/admin/dashboard');
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  const offer = mockOffers.find(o => o.id === id);
  if (offer) {
    offer.active = active;
    return { success: true };
  }
  return { success: false, error: 'Offer not found' };
}

export async function deleteOffer(id: string) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerClientInstance();
      await supabase.from('offers').delete().eq('id', id);
      revalidatePath('/offers');
      revalidatePath('/admin/dashboard');
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  mockOffers = mockOffers.filter(o => o.id !== id);
  return { success: true };
}

// ============================================================================
// SERVICES RETRIEVAL ACTIONS
// ============================================================================

export async function getServices() {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map(s => ({
          ...s,
          imageUrl: s.image_url, // Map database snake_case to camelCase if needed in cards
        }));
      }
    } catch (e) {
      console.error('Failed to fetch services from Supabase, falling back:', e);
    }
  }
  return defaultServices;
}

export async function getServiceBySlug(slug: string) {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('services').select('*').eq('slug', slug).single();
      if (!error && data) {
        return {
          ...data,
          imageUrl: data.image_url,
        };
      }
    } catch (e) {
      console.error(`Failed to fetch service "${slug}" from Supabase, falling back:`, e);
    }
  }
  return defaultServices.find(s => s.slug === slug) || null;
}

const defaultServices = [
  {
    id: 's-1',
    title: 'AC Maintenance & Servicing',
    slug: 'ac-maintenance',
    description: 'Professional AC maintenance, duct cleaning, gas refilling, and repairs for split and ducted AC systems.',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    image_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    benefits: ['Improves cooling efficiency', 'Reduces monthly electricity bills by up to 20%', 'Extends equipment lifetime and prevents sudden breakdowns', 'Ensures clean, allergen-free air circulation'],
    process: [
      { step: 1, title: 'System Diagnostic', desc: 'We inspect thermostat settings, electrical connections, and current draw.' },
      { step: 2, title: 'Deep Coil Wash', desc: 'Pressure washing of indoor evaporator and outdoor condenser coils.' },
      { step: 3, title: 'Drain & Filter Clean', desc: 'Flush condensate drain lines and deep clean filters to prevent blockages.' },
      { step: 4, title: 'Performance Test', desc: 'We measure airflow temperature and verify gas pressure levels.' }
    ]
  },
  {
    id: 's-2',
    title: 'Deep Cleaning Services',
    slug: 'deep-cleaning',
    description: 'Thorough villa, flat, and corporate office cleaning. Machine floor scrubbing, toilet descaling, window washing, and steam sanitization.',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    image_url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    benefits: ['Eliminates deep-seated dust and allergens', 'Hospital-grade sanitization and disinfection', 'Restores shine to floor tiles and marble surfaces', 'Saves hours of heavy physical labor'],
    process: [
      { step: 1, title: 'Dusting & Vacuuming', desc: 'Hepta-filter vacuuming of ceilings, walls, upholstery, and carpets.' },
      { step: 2, title: 'Kitchen & Bathroom Sanitization', desc: 'Removing grease from cabinets and deep descaling of toilets and tiles.' },
      { step: 3, title: 'Window & Glass Buffing', desc: 'Polishing of indoor and outdoor window panes, frames, and mirrors.' },
      { step: 4, title: 'Floor Machine Scrubbing', desc: 'Rotary industrial floor washing to lift grime and restore gloss.' }
    ]
  },
  {
    id: 's-3',
    title: 'Electrical Maintenance',
    slug: 'electrical-maintenance',
    description: 'Safe and certified electrical upgrades, fuse checks, wiring fixes, and smart device installations.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    benefits: ['Prevents dangerous short circuits and electrical fires', 'Saves power by fixing current leakage issues', 'Certified and highly experienced electricians', 'Emergency troubleshooting support available'],
    process: [
      { step: 1, title: 'DB Inspection', desc: 'Checking the Distribution Board, ELCB, MCB, and electrical connections.' },
      { step: 2, title: 'Load Balancing Check', desc: 'Verifying load distribution across phases to prevent overloads.' },
      { step: 3, title: 'Fixing & Upgrades', desc: 'Repairing switches, loose connections, and replacing damaged wires.' },
      { step: 4, title: 'Earthing Assessment', desc: 'Testing earth leakage and grounding pits for household safety.' }
    ]
  },
  {
    id: 's-4',
    title: 'Plumbing Maintenance',
    slug: 'plumbing-maintenance',
    description: 'Leak detection, pressure pump servicing, drainage clearing, and premium sanitary fixture installations.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    benefits: ['Stops water damage and dampness in walls', 'Restores proper water pressure in all showers', 'Saves precious fresh water from leakages', 'Quick response for blocked drains'],
    process: [
      { step: 1, title: 'Water Line Inspection', desc: 'Checking pressure lines, pumps, and looking for signs of concealed dampness.' },
      { step: 2, title: 'Leak Repair', desc: 'Replacing washers, cartridges, and sealing joints with professional sealants.' },
      { step: 3, title: 'Drain De-clogging', desc: 'Using specialized tools to clear debris from kitchen and bathroom drains.' },
      { step: 4, title: 'Fixture Polishing', desc: 'Descaling chrome and brass taps and showerheads for a shiny finish.' }
    ]
  },
  {
    id: 's-5',
    title: 'Preventive Maintenance',
    slug: 'preventive-maintenance',
    description: 'Scheduled home checkups, visual snagging, thermal imaging, and pre-monsoon checks to avoid damage.',
    imageUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=600&q=80',
    image_url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=600&q=80',
    benefits: ['Catches minor issues before they become expensive repairs', 'Keeps structure in top architectural health', 'Comprehensive property health report generated', 'Tailored schedules for seasonal weather conditions'],
    process: [
      { step: 1, title: 'Visual Snag Audit', desc: 'Full walkthrough checking walls, doors, ceilings, and tiles for cracks or dampness.' },
      { step: 2, title: 'Thermal Scan', desc: 'Using thermal cameras to find hidden damp spots or electrical hotspots.' },
      { step: 3, title: 'Roof & Gutters Prep', desc: 'Cleaning terrace drains and clearing leaves prior to monsoons.' },
      { step: 4, title: 'Report Submission', desc: 'Delivering a structured PDF snag-report with priority actions.' }
    ]
  },
  {
    id: 's-6',
    title: 'Annual Maintenance Contracts (AMC)',
    slug: 'amc-services',
    description: 'Year-round complete facility protection with routine visits, free breakdown calls, and priority response.',
    imageUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=600&q=80',
    image_url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=600&q=80',
    benefits: ['Fixed annual costs - zero budgeting surprises', 'Unlimited emergency breakdown calls with priority booking', '4 scheduled comprehensive maintenance visits per year', 'Dedicated relationship manager for corporate clients'],
    process: [
      { step: 1, title: 'Initial Onboarding', desc: 'We map all appliances, electrical systems, and plumbing lines in your property.' },
      { step: 2, title: 'Custom Planner', desc: 'Creating a customized annual service calendar based on property size.' },
      { step: 3, title: 'Routine Visits', desc: 'Executing regular quarterly servicing of ACs, plumbing, and electrical units.' },
      { step: 4, title: '24/7 Breakdown Response', desc: 'Dispatching technicians in under 2 hours for active contract customers.' }
    ]
  },
  {
    id: 's-7',
    title: 'Emergency Support',
    slug: 'emergency-support',
    description: 'Fast response team for power failures, major water leaks, AC breakdowns, and locks lockout.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    benefits: ['Rapid response within 2 hours across all service cities', 'Special emergency response team dispatch', 'Resolves critical safety threats immediately', 'Available for residential & commercial premises'],
    process: [
      { step: 1, title: 'Hotline Call Intake', desc: 'Our support center records structural breakdown parameters immediately.' },
      { step: 2, title: 'Technician Dispatch', desc: 'Closest certified technician team is rerouted to the location with tools.' },
      { step: 3, title: 'Containment', desc: 'Shutting off main valves or breaker lines to secure the premises first.' },
      { step: 4, title: 'Resolution', desc: 'Executing permanent repairs or setting up a safe temporary bypass.' }
    ]
  },
  {
    id: 's-8',
    title: 'Mobile Car Wash',
    slug: 'mobile-car-wash',
    description: 'Eco-friendly premium car cleaning at your doorstep, utilizing waterless or high-pressure systems.',
    imageUrl: 'https://images.unsplash.com/photo-1520340356584-f9917d1ecc6f?auto=format&fit=crop&w=600&q=80',
    image_url: 'https://images.unsplash.com/photo-1520340356584-f9917d1ecc6f?auto=format&fit=crop&w=600&q=80',
    benefits: ['Saves time - no waiting at crowded service stations', 'Saves up to 90% water using advanced polymer formulas', 'Includes interior vacuuming, dashboard polish, and tyre dressing', 'Gentle scratch-free micro-fiber cleaning process'],
    process: [
      { step: 1, title: 'Pre-rinse & Vacuum', desc: 'Removing loose dirt from paintwork and vacuuming carpets and seats.' },
      { step: 2, title: 'Polymer Wash', desc: 'Applying high-lubricity cleaning spray to safely lift and dissolve dirt.' },
      { step: 3, title: 'Buffing & Drying', desc: 'Hand-drying with premium 600GSM microfiber towels for swirl-free finish.' },
      { step: 4, title: 'Interior Dressing', desc: 'Sanitizing dashboard, conditioning leather, and applying tyre glaze.' }
    ]
  }
];

// ============================================================================
// ADMIN AUTHENTICATION ACTIONS
// ============================================================================

export async function adminLogin(rawState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerClientInstance();
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email.trim().toLowerCase())
        .eq('password', password)
        .eq('role', 'admin')
        .single();

      if (error || !profile) {
        return { success: false, error: 'Invalid credentials or not authorized as admin' };
      }

      const cookieStore = await (await import('next/headers')).cookies();
      cookieStore.set('admin-session-email', email.trim().toLowerCase(), { path: '/', maxAge: 60 * 60 * 24 });
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Authentication failed' };
    }
  } else {
    // Mock Authentication
    if (email === 'admin@maintenance.com') {
      const cookieStore = await (await import('next/headers')).cookies();
      cookieStore.set('mock-admin-session', 'true', { path: '/', maxAge: 60 * 60 * 24 }); // 1 day
      return { success: true };
    }
    return { success: false, error: 'Invalid admin credentials. In Demo Mode, use email: admin@maintenance.com' };
  }
}

export async function adminLogout() {
  try {
    const cookieStore = await (await import('next/headers')).cookies();
    cookieStore.delete('admin-session-email');
    cookieStore.delete('mock-admin-session');
  } catch (e) {
    console.error(e);
  }

  revalidatePath('/admin/dashboard');
  return { success: true };
}

export async function checkAdminAuth() {
  if (isSupabaseConfigured()) {
    try {
      const cookieStore = await (await import('next/headers')).cookies();
      return cookieStore.has('admin-session-email');
    } catch (e) {
      return false;
    }
  }

  try {
    const cookieStore = await (await import('next/headers')).cookies();
    return cookieStore.has('mock-admin-session');
  } catch (e) {
    return false;
  }
}

// ============================================================================
// WEB PORTAL ADMIN MANAGEMENT ACTIONS (Properties, Technicians, Requests)
// ============================================================================

export async function getProperties() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerClientInstance();
      const { data, error } = await supabase.from('properties').select('*').order('name');
      if (error) throw error;
      return data || [];
    } catch (e: any) {
      console.error('getProperties error:', e);
      return [];
    }
  }
  return [];
}

export async function getTechniciansAndCaretakers() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerClientInstance();
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .or('role.eq.technician,role.eq.caretaker')
        .order('name');
      if (error) throw error;
      return data || [];
    } catch (e: any) {
      console.error('getTechniciansAndCaretakers error:', e);
      return [];
    }
  }
  return [];
}

export async function getServiceRequests() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerClientInstance();
      const { data, error } = await supabase
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (e: any) {
      console.error('getServiceRequests error:', e);
      return [];
    }
  }
  return [];
}

export async function getServicesList() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerClientInstance();
      const { data, error } = await supabase.from('services').select('*').order('name');
      if (error) throw error;
      return data || [];
    } catch (e: any) {
      console.error('getServicesList error:', e);
      return [];
    }
  }
  return [];
}

export async function createWebProperty(input: {
  name: string;
  property_type: string;
  amc_plan?: string;
  address: string;
  city: string;
  total_units: number;
  amc_contract: any;
}) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerClientInstance();
      const { data, error } = await supabase
        .from('properties')
        .insert([{
          id: randomUUID(),
          ...input,
          amc_service_ids: ['s1', 's3', 's5', 's7']
        }])
        .select()
        .single();
      if (error) throw error;
      revalidatePath('/admin/dashboard');
      return { success: true, data };
    } catch (e: any) {
      console.error('createWebProperty error:', e);
      return { success: false, error: e.message || 'Database error occurred' };
    }
  }
  return { success: false, error: 'Database connection not configured' };
}

export async function createWebStaff(input: {
  name: string;
  email: string;
  phone: string;
  role: 'technician' | 'caretaker';
  skills?: string[];
  password?: string;
  property_id?: string | null;
}) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerClientInstance();
      const { data, error } = await supabase
        .from('profiles')
        .insert([{
          id: randomUUID(),
          name: input.name,
          email: input.email.trim().toLowerCase(),
          phone: input.phone,
          role: input.role,
          skills: input.skills || [],
          password: input.password || 'maintex123',
          property_id: input.property_id || null,
          available: true,
        }])
        .select()
        .single();
      if (error) throw error;
      revalidatePath('/admin/dashboard');
      return { success: true, data };
    } catch (e: any) {
      console.error('createWebStaff error:', e);
      return { success: false, error: e.message || 'Database error occurred' };
    }
  }
  return { success: false, error: 'Database connection not configured' };
}

export async function webAssignTechnician(requestId: string, technicianId: string) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerClientInstance();
      const { data, error } = await supabase
        .from('service_requests')
        .update({
          assigned_technician_id: technicianId,
          status: 'assigned',
          updated_at: new Date().toISOString(),
        })
        .eq('id', requestId)
        .select()
        .single();
      if (error) throw error;
      revalidatePath('/admin/dashboard');
      return { success: true, data };
    } catch (e: any) {
      console.error('webAssignTechnician error:', e);
      return { success: false, error: e.message || 'Database error occurred' };
    }
  }
  return { success: false, error: 'Database connection not configured' };
}

export async function webUpdateTicketStatus(requestId: string, status: string) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerClientInstance();
      const { data, error } = await supabase
        .from('service_requests')
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', requestId)
        .select()
        .single();
      if (error) throw error;
      revalidatePath('/admin/dashboard');
      return { success: true, data };
    } catch (e: any) {
      console.error('webUpdateTicketStatus error:', e);
      return { success: false, error: e.message || 'Database error occurred' };
    }
  }
  return { success: false, error: 'Database connection not configured' };
}

export async function getWorkLogs() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createServerClientInstance();
      const { data, error } = await supabase.from('work_logs').select('*');
      if (error) throw error;
      return data || [];
    } catch (e: any) {
      console.error('getWorkLogs error:', e);
      return [];
    }
  }
  return [];
}




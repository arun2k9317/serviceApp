import { NextResponse } from 'next/server';
import { z } from 'zod';
import { isSupabaseConfigured, createServerClientInstance } from '../../../lib/supabase';

const inquirySchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email().optional().or(z.literal('')),
  service_type: z.string().min(1),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = inquirySchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json({ success: false, errors: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    if (isSupabaseConfigured()) {
      const supabase = await createServerClientInstance();
      const { data, error } = await supabase.from('inquiries').insert([validation.data]).select();
      if (error) throw error;
      return NextResponse.json({ success: true, message: 'Inquiry registered', data });
    } else {
      return NextResponse.json({
        success: true,
        message: 'Inquiry registered (Demo Fallback Mode - mock saved)',
        data: validation.data,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  // Simple check: In production, require authentication or an API token
  try {
    if (isSupabaseConfigured()) {
      const supabase = await createServerClientInstance();
      const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return NextResponse.json({ success: true, data });
    }
    return NextResponse.json({ success: true, message: 'Supabase not connected. No queries available in Demo Mode.' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 });
  }
}

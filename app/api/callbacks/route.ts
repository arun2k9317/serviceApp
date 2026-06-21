import { NextResponse } from 'next/server';
import { z } from 'zod';
import { isSupabaseConfigured, createServerClientInstance } from '../../../lib/supabase';

const callbackSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  preferred_time: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = callbackSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ success: false, errors: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    if (isSupabaseConfigured()) {
      const supabase = await createServerClientInstance();
      const { data, error } = await supabase.from('callbacks').insert([validation.data]).select();
      if (error) throw error;
      return NextResponse.json({ success: true, message: 'Callback scheduled', data });
    } else {
      return NextResponse.json({
        success: true,
        message: 'Callback scheduled (Demo Fallback Mode - mock saved)',
        data: validation.data,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 });
  }
}

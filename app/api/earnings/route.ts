import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

// POST /api/earnings
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const type = body.type || 'unknown';
    const amount = Number(body.amount) || 0;
    const meta = body.meta || {};

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('platform_earnings')
      .insert([{ type, amount, meta }])
      .select('*')
      .limit(1);

    if (error) {
      console.error('Supabase insert error (earnings):', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, record: data?.[0] });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

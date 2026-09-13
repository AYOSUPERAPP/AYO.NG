import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

// POST /api/transactions
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user_id = body.user_id || null;
    const type = body.type || 'unknown';
    const amount = Number(body.amount) || 0;
    const meta = body.meta || {};

    if (!user_id) {
      return NextResponse.json({ error: 'Missing user_id' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('transactions')
      .insert([{ user_id, type, amount, meta }])
      .select('*')
      .limit(1);

    if (error) {
      console.error('Supabase insert error (transactions):', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, record: data?.[0] });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

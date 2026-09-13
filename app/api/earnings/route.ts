import { NextResponse } from 'next/server';
import { verifySupabaseToken } from '@/lib/auth';
import { insertPlatformEarning } from '@/lib/supabase-helpers';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const type = body.type || 'unknown';
    const amount = Number(body.amount) || 0;
    const meta = body.meta || {};

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // verify token if present to ensure only authenticated callers
    // Authorization header is expected by middleware; double-check here for safety
    const authHeader = (req as any).headers?.get ? (req as any).headers.get('authorization') : null;
    let user = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace(/^Bearer\s+/, '');
      user = await verifySupabaseToken(token);
    }

    // insert platform earning via server helper (uses service role key)
    const record = await insertPlatformEarning(type, amount, { ...meta, user: user?.id ?? null });

    return NextResponse.json({ success: true, record });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

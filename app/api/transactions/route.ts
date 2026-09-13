import { NextResponse } from 'next/server';
import { verifySupabaseToken } from '@/lib/auth';
import { insertTransaction } from '@/lib/supabase-helpers';

// POST /api/transactions
export async function POST(req: Request) {
  try {
    const body = await req.json();
    let user_id = body.user_id || null;
    const type = body.type || 'unknown';
    const amount = Number(body.amount) || 0;
    const meta = body.meta || {};

    // If middleware attached x-user-id, prefer that. Else verify token if provided.
    const headers: any = (req as any).headers;
    if (headers && typeof headers.get === 'function') {
      const xUser = headers.get('x-user-id');
      if (xUser) user_id = xUser;
    }

    if (!user_id) {
      // Try to verify Authorization header
      const authHeader = headers?.get ? headers.get('authorization') : null;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.replace(/^Bearer\s+/, '');
        const user = await verifySupabaseToken(token);
        if (user && user.id) user_id = user.id;
      }
    }

    if (!user_id) {
      return NextResponse.json({ error: 'Missing user_id or unauthorized' }, { status: 400 });
    }

    const record = await insertTransaction(user_id, type, amount, meta);

    return NextResponse.json({ success: true, record });
  } catch (err: any) {
    console.error('transactions POST error', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

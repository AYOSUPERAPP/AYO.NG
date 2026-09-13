import { NextResponse } from 'next/server';
import { verifySupabaseToken } from '../../../../lib/auth';
import { insertPlatformEarning, insertTransaction, serverSupabase } from '../../../../lib/supabase-helpers';

export async function POST(req: Request) {
  try {
    // verify Authorization header and user
    const authHeader = (req as any).headers?.get ? (req as any).headers.get('authorization') : null;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing authorization' }, { status: 401 });
    }
    const token = authHeader.replace(/^Bearer\s+/, '');
    const user = await verifySupabaseToken(token);
    if (!user || !user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const amount = Number(body.amount) || 0;
    const account = body.account || null;

    if (!amount || !account) {
      return NextResponse.json({ error: 'Missing amount or account' }, { status: 400 });
    }

    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) {
      return NextResponse.json({ error: 'Paystack secret not configured on server' }, { status: 500 });
    }

    // Call Paystack transfer endpoint
    const res = await fetch('https://api.paystack.co/transfer', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, recipient: account }),
    });

    const result = await res.json();
    if (!res.ok) {
      console.error('Paystack error', result);
      return NextResponse.json({ error: 'Paystack transfer failed', details: result }, { status: 502 });
    }

    // On success, insert platform earnings (30% split) and transaction record
    const platformShare = Math.round(amount * 0.3);
    const hostShare = amount - platformShare;

    const earning = await insertPlatformEarning('cashout', platformShare, { paystack: result });

    // record transaction for user cashout
    const tx = await insertTransaction(user.id, 'cashout', -amount, { paystack: result, hostShare });

    // Optionally decrement wallet atomically
    try {
      await serverSupabase.rpc('increment_wallet', { p_user_id: user.id, p_amount: -amount });
    } catch (err) {
      console.warn('Failed to decrement wallet via RPC', err);
      // Do not fail cashout — record the inconsistency for later reconciliation
    }

    return NextResponse.json({ success: true, paystack: result, earning, transaction: tx });
  } catch (err: any) {
    console.error('cashout error', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

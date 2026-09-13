import { NextResponse } from 'next/server';

// POST /api/paystack/cashout
// This route demonstrates server-only usage of PAYSTACK_SECRET_KEY.
// It returns a mocked success response. Do NOT expose PAYSTACK_SECRET_KEY in client code.
export async function POST(req: Request) {
  try {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) {
      return NextResponse.json({ error: 'Paystack secret not configured on server' }, { status: 500 });
    }

    const body = await req.json();
    const amount = Number(body.amount) || 0;
    const account = body.account || null;

    if (!amount || !account) {
      return NextResponse.json({ error: 'Missing amount or account' }, { status: 400 });
    }

    // In production: call Paystack transfer endpoint here using the secret.
    // Example (server-side only):
    // const response = await fetch('https://api.paystack.co/transfer', { method: 'POST', headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ amount, recipient: account }) });
    // const result = await response.json();

    // For demo / mock, return success without calling external API
    const mock = {
      status: 'success',
      message: 'Mock cashout executed',
      data: {
        id: `mock_${Date.now()}`,
        amount,
        account,
        processed_at: new Date().toISOString()
      }
    };

    return NextResponse.json({ success: true, result: mock });
  } catch (err) {
    console.error('paystack cashout error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

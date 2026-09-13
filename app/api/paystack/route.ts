import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, amount } = await req.json()
    
    if (!process.env.PAYSTACK_SECRET_KEY) {
      return NextResponse.json({ error: 'Paystack not configured' }, { status: 500 })
    }

    const res = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email || 'user@ayo.ng',
        amount: Math.round((amount || 1000) * 100),
        reference: `AYO-${Date.now()}`,
      }),
    })

    const data = await res.json()
    if (!data.status) return NextResponse.json({ error: data.message }, { status: 400 })

    return NextResponse.json(data.data, { status: 200 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ ok: true }, { status: 200 })
}

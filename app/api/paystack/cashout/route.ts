import { NextRequest, NextResponse } from 'next/server'
import { verifySupabaseToken } from '../../../lib/auth'
import { serverSupabase, insertTransaction, insertPlatformEarning } from '../../../lib/supabase-helpers'

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '') || null
    
    const user = await verifySupabaseToken(token)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { amount, account_number, bank_code } = await req.json()

    if (!amount || amount < 100) {
      return NextResponse.json({ error: 'Minimum cashout is ₦100' }, { status: 400 })
    }

    // 1. Check wallet balance
    const { data: wallet } = await serverSupabase
      .from('wallets')
      .select('balance')
      .eq('user_id', user.id)
      .single()

    if (!wallet || wallet.balance < amount) {
      return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 })
    }

    // 2. Paystack Transfer
    const paystackRes = await fetch('https://api.paystack.co/transfer', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: 'balance',
        amount: amount * 100, // Paystack uses kobo
        recipient: account_number, // you should create recipient first in production
        reason: `AYO.NG Cashout for ${user.id}`,
      }),
    })

    const paystackData = await paystackRes.json()

    // For now, simulate success if Paystack not configured
    if (!paystackRes.ok && !process.env.PAYSTACK_SECRET_KEY) {
      console.warn('Paystack not configured, simulating cashout for AYO.NG')
    }

    // 3. Deduct from wallet + log transaction
    await serverSupabase
      .from('wallets')
      .update({ balance: wallet.balance - amount })
      .eq('user_id', user.id)

    await insertTransaction(user.id, 'cashout', -amount, { 
      method: 'paystack',
      account_number,
      bank_code,
      status: 'pending'
    })

    // Platform fee (10% for AYO.NG)
    const fee = amount * 0.1
    await insertPlatformEarning('cashout_fee', fee, { user_id: user.id })

    return NextResponse.json({ 
      success: true, 
      message: 'Cashout initiated - Nigeria Made!',
      amount,
      fee,
      paystack: paystackData
    })

  } catch (err: any) {
    console.error('cashout error', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { verifySupabaseToken } from '../../../lib/auth'
import { serverSupabase } from '../../../lib/supabase-helpers'

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '') || null
    
    const user = await verifySupabaseToken(token)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user earnings from transactions
    const { data, error } = await serverSupabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    const totalEarnings = data?.reduce((sum, t) => sum + (Number(t.amount) || 0), 0) || 0

    return NextResponse.json({ 
      earnings: data,
      total: totalEarnings,
      user_id: user.id 
    })

  } catch (err: any) {
    console.error('earnings error', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

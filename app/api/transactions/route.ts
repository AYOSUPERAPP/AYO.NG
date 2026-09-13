import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    
    // Create client with user token
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } }
    })

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Use service key to fetch transactions
    const adminSupabase = createClient(supabaseUrl, supabaseServiceKey)
    
    const { data, error } = await adminSupabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ transactions: data || [] }, { status: 200 })
    
  } catch (error: any) {
    console.error('Transactions error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const authHeader = req.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'No token' }, { status: 401 })
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } }
    })

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const adminSupabase = createClient(supabaseUrl, supabaseServiceKey)
    
    const { data, error } = await adminSupabase
      .from('transactions')
      .insert({
        user_id: user.id,
        type: body.type,
        amount: body.amount,
        status: body.status || 'completed',
        reference: body.reference || `REF-${Date.now()}`
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ transaction: data }, { status: 200 })
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

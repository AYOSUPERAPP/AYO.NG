import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  // Return empty array for now - will connect Supabase later after deploy is GREEN
  return NextResponse.json({ transactions: [] }, { status: 200 })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    return NextResponse.json({ 
      success: true, 
      transaction: { id: Date.now().toString(), ...body }
    }, { status: 200 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

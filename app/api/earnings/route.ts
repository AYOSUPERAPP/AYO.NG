import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ earnings: [], total: 0 }, { status: 200 })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    return NextResponse.json({ success: true, earning: body }, { status: 200 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

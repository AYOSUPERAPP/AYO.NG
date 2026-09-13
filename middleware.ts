import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySupabaseToken } from './lib/auth';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  // Only guard API routes
  if (!pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const auth = req.headers.get('authorization') || '';
  if (!auth.startsWith('Bearer ')) {
    return new NextResponse(JSON.stringify({ error: 'Missing or invalid Authorization header' }), { status: 401, headers: { 'content-type': 'application/json' } });
  }

  const token = auth.replace(/^Bearer\s+/, '');
  const user = await verifySupabaseToken(token);
  if (!user || !user.id) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'content-type': 'application/json' } });
  }

  // Attach user id to the request as x-user-id for downstream routes
  const headers = new Headers(req.headers);
  headers.set('x-user-id', user.id);

  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: '/api/:path*',
};

// Centralized env validation - build-safe

type SupabaseEnv = {
  url: string;
  anonKey: string;
  serviceKey?: string;
  isConfigured: boolean;
}

let warned = false;

function warnOnce(message: string) {
  if (warned) return;
  warned = true;
  // Only warn in runtime, not during Vercel build
  if (process.env.NEXT_PHASE !== 'phase-production-build') {
    console.warn(`[Supabase] ${message}`);
  }
}

export function getSupabaseEnv(): SupabaseEnv {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  const isConfigured = Boolean(url && anonKey);

  if (!isConfigured) {
    warnOnce(
      `Missing env vars. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel Settings > Environment Variables. Build will use placeholder to stay GREEN.`
    );
  }

  return {
    // Use placeholder during build so `createClient` doesn't throw and break `npm run build`
    url: url || 'https://placeholder.supabase.co',
    anonKey: anonKey || 'placeholder-anon-key',
    serviceKey: serviceKey || undefined,
    isConfigured,
  };
}

export function isSupabaseConfigured() {
  return getSupabaseEnv().isConfigured;
}

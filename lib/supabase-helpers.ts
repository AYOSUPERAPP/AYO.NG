import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl) {
  console.warn('NEXT_PUBLIC_SUPABASE_URL is not set. Server Supabase client will not work until configured.');
}

if (!serviceRoleKey) {
  console.warn('SUPABASE_SERVICE_ROLE_KEY is not set. Server Supabase operations requiring elevated privileges will fail.');
}

export const serverSupabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

export async function incrementWallet(userId: string, amount: number) {
  if (!userId) throw new Error('userId required');
  const { data, error } = await serverSupabase.rpc('increment_wallet', { p_user_id: userId, p_amount: amount });
  if (error) throw error;
  return data;
}

export async function insertTransaction(user_id: string | null, type: string, amount: number, meta: Record<string, any> = {}) {
  const { data, error } = await serverSupabase
    .from('transactions')
    .insert([{ user_id, type, amount, meta }])
    .select('*')
    .limit(1);

  if (error) throw error;
  return data?.[0] ?? null;
}

export async function insertPlatformEarning(type: string, amount: number, meta: Record<string, any> = {}) {
  const { data, error } = await serverSupabase
    .from('platform_earnings')
    .insert([{ type, amount, meta }])
    .select('*')
    .limit(1);

  if (error) throw error;
  return data?.[0] ?? null;
}

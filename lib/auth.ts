export async function verifySupabaseToken(token: string | null) {
  if (!token) return null;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey) return null;

  try {
    const res = await fetch(`${supabaseUrl.replace(/\/$/, '')}/auth/v1/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: anonKey,
      },
    });

    if (!res.ok) return null;
    const user = await res.json();
    // expected shape: { id: '...', email: '...' }
    return user;
  } catch (err) {
    console.error('verifySupabaseToken error', err);
    return null;
  }
}

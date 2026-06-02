import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Client Supabase pour le serveur (Server Components, Route Handlers).
 */
export async function createSupabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    console.warn('[Supabase Server] Variables d\'env absentes — mode mock')
    return null
  }

  const cookieStore = await cookies()

  return createServerClient(url, anonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Server Component context : cookies en lecture seule
        }
      },
    },
  })
}

/**
 * Client Supabase avec service_role key (bypass RLS) — admin uniquement.
 * À utiliser UNIQUEMENT dans les API routes admin protégées.
 */
export function createSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    console.warn('[Supabase Admin] Variables d\'env absentes')
    return null
  }

  // Import dynamique pour ne charger qu'en serveur
  const { createClient } = require('@supabase/supabase-js')
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  })
}

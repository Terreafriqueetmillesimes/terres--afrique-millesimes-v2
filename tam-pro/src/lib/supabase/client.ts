import { createBrowserClient } from '@supabase/ssr'

/**
 * Client Supabase pour le navigateur (composants client).
 * Si les variables d'env ne sont pas définies, retourne null pour permettre
 * le développement local sans Supabase.
 */
export function createSupabaseBrowser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    console.warn('[Supabase] Variables d\'environnement absentes — mode mock')
    return null
  }

  return createBrowserClient(url, anonKey)
}

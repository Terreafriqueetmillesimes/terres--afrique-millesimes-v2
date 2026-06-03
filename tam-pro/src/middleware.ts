import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

/**
 * Middleware i18n (next-intl).
 * N'agit QUE sur la racine et les chemins localisés (/fr, /en, /es).
 * Les routes pro (/espace-chr, /espace-export, /admin) et d'auth
 * (/connexion, /inscription-*) ne sont PAS interceptées : elles passent
 * directement (la garde d'authentification sera rebranchée en Sprint 6).
 */
export default createMiddleware(routing)

export const config = {
  matcher: ['/', '/(fr|en|es)/:path*'],
}

import { NextRequest, NextResponse } from 'next/server'

/**
 * Middleware Next.js — vérifie l'authentification sur les routes protégées.
 * V1 mock : ne fait rien (les pages sont toutes accessibles pour démo).
 * À brancher Supabase en Phase 2.6+.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // V1 mock : laisse passer tout. À remplacer :
  // const supabase = createMiddlewareClient(req)
  // const { data: { session } } = await supabase.auth.getSession()
  //
  // if (pathname.startsWith('/espace-chr') && (!session || compte.type !== 'chr' || compte.statut !== 'actif')) {
  //   return NextResponse.redirect(new URL('/connexion', req.url))
  // }
  // (idem pour /espace-export et /admin)

  return NextResponse.next()
}

export const config = {
  matcher: ['/espace-chr/:path*', '/espace-export/:path*', '/admin/:path*'],
}

import { NextResponse } from 'next/server'

/**
 * POST /api/admin/refuser-compte
 * V1 mock — passe statut='refuse', envoie email avec motif.
 */
export async function POST(req: Request) {
  const formData = await req.formData()
  const compteId = formData.get('compte_id')
  const motif = formData.get('motif')

  console.log('[Mock] Compte refusé:', compteId, '· motif:', motif)
  return NextResponse.redirect(new URL('/admin/comptes', req.url))
}

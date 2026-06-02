import { NextResponse } from 'next/server'

/**
 * POST /api/admin/valider-compte
 * V1 mock — passe statut='actif', envoie email avec catalogue PDF.
 */
export async function POST(req: Request) {
  const formData = await req.formData()
  const compteId = formData.get('compte_id')

  // TODO Supabase + Resend (Phase 2.6+) :
  // - Update statut='actif', date_validation=NOW(), valide_par=admin.id
  // - Auto-assignation segment selon type_activite et pays
  // - Email "Compte validé" + catalogue PDF en PJ
  // - audit_log

  console.log('[Mock] Compte validé:', compteId)
  return NextResponse.redirect(new URL('/admin/comptes', req.url))
}

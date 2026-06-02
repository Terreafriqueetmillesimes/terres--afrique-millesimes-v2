import { NextResponse } from 'next/server'
import { inscriptionSchema } from '@/lib/validation/inscription'
// import { createSupabaseAdmin } from '@/lib/supabase/server'

/**
 * POST /api/inscription-chr
 * Crée un compte pro CHR avec statut 'en_attente'.
 * V1 : mock (pas de Supabase). À brancher en Phase 2.6+.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = inscriptionSchema.safeParse({ ...body, type: 'chr' })

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    // TODO Supabase (Phase 2.6) :
    // const supabase = createSupabaseAdmin()
    // const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
    //   email: parsed.data.email,
    //   password: parsed.data.mot_de_passe,
    //   email_confirm: true,
    // })
    // if (authError) throw authError
    // await supabase.from('comptes_pro').insert({
    //   auth_user_id: authUser.user.id,
    //   type: 'chr',
    //   statut: 'en_attente',
    //   raison_sociale: parsed.data.societe,
    //   nom_contact: parsed.data.nom_contact,
    //   email_pro: parsed.data.email,
    //   telephone: parsed.data.telephone,
    //   pays: parsed.data.pays,
    //   pays_nom: parsed.data.pays, // À enrichir avec table pays
    //   ville: 'N/A',
    //   type_activite: 'autre',
    // })
    //
    // // Emails Resend
    // await sendInscriptionRecue(parsed.data.email, parsed.data.societe)
    // await sendAlerteAdminInscription({ ...parsed.data, type: 'chr' })

    console.log('[Mock] Inscription CHR reçue:', parsed.data.email)

    return NextResponse.json({ success: true, statut: 'en_attente' })
  } catch (err) {
    console.error('[Inscription CHR] Erreur:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Erreur serveur' },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'
import { connexionSchema } from '@/lib/validation/connexion'
import { MOCK_COMPTES_PRO } from '@/lib/mock/data'

/**
 * POST /api/connexion
 * V1 mock — vérifie l'email contre les comptes mock et redirige selon le statut.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = connexionSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Champs invalides' }, { status: 400 })
    }

    const compte = MOCK_COMPTES_PRO.find((c) => c.email_pro === parsed.data.email)

    if (!compte) {
      return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 })
    }

    if (compte.statut === 'en_attente') {
      return NextResponse.json(
        { error: 'Compte en cours de validation', redirect: '/compte-en-attente' },
        { status: 403 }
      )
    }
    if (compte.statut === 'refuse') {
      return NextResponse.json(
        {
          error: `Inscription refusée. Motif : ${compte.motif_refus ?? 'non précisé'}`,
        },
        { status: 403 }
      )
    }

    // Statut 'actif' : redirige vers l'espace correspondant
    const redirect = compte.type === 'chr' ? '/espace-chr' : '/espace-export'
    return NextResponse.json({ success: true, redirect })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Erreur serveur' },
      { status: 500 }
    )
  }
}

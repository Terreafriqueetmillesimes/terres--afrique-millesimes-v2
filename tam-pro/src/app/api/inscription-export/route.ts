import { NextResponse } from 'next/server'
import { inscriptionSchema } from '@/lib/validation/inscription'

/**
 * POST /api/inscription-export
 * V1 mock — à brancher Supabase en Phase 2.6+.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = inscriptionSchema.safeParse({ ...body, type: 'export' })

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    console.log('[Mock] Inscription Export reçue:', parsed.data.email)

    return NextResponse.json({ success: true, statut: 'en_attente' })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Erreur serveur' },
      { status: 500 }
    )
  }
}

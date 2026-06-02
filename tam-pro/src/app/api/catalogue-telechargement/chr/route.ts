import { NextResponse } from 'next/server'

/**
 * GET /api/catalogue-telechargement/chr
 * V1 MOCK — simule le téléchargement du catalogue CHR (prix HT) et logge le KPI.
 *
 * TODO Phase ultérieure (Supabase) :
 *  - Vérifier session + compte.type === 'chr' + compte.statut === 'actif'
 *  - Récupérer le PDF actif (catalogues_pdf WHERE type='chr' AND actif=true) depuis Supabase Storage
 *  - INSERT INTO telechargements_catalogue (compte_id, type='chr', date)
 */
export async function GET() {
  console.log('[Mock] Téléchargement catalogue CHR demandé')

  const contenu = [
    'TERRES D’AFRIQUE & MILLÉSIMES — Catalogue CHR (prix HT)',
    'Version démonstration (mock).',
    '',
    'Le PDF réel sera servi depuis Supabase Storage après branchement.',
    'Cette réponse simule le téléchargement du catalogue professionnel CHR.',
  ].join('\n')

  return new NextResponse(contenu, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': 'attachment; filename="catalogue-chr-demo.txt"',
    },
  })
}

import { NextResponse } from 'next/server'

/**
 * GET /api/catalogue-telechargement/export
 * V1 MOCK — simule le téléchargement du catalogue Export (prix EXW) et logge le KPI.
 *
 * TODO Phase ultérieure (Supabase) :
 *  - Vérifier session + compte.type === 'export' + compte.statut === 'actif'
 *  - Récupérer le PDF actif (catalogues_pdf WHERE type='export' AND actif=true) depuis Supabase Storage
 *  - INSERT INTO telechargements_catalogue (compte_id, type='export', date)
 */
export async function GET() {
  console.log('[Mock] Téléchargement catalogue Export demandé')

  const contenu = [
    'TERRES D’AFRIQUE & MILLÉSIMES — Catalogue Export (prix EXW départ cave)',
    'Version démonstration (mock).',
    '',
    'Le PDF réel sera servi depuis Supabase Storage après branchement.',
    'Cette réponse simule le téléchargement du catalogue professionnel Export.',
  ].join('\n')

  return new NextResponse(contenu, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': 'attachment; filename="catalogue-export-demo.txt"',
    },
  })
}

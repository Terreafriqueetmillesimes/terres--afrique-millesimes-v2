import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { StatutBadge, type StatutCommande } from '@/components/ui/StatutBadge'

export const metadata = { title: 'Mes commandes · Export' }

type Commande = {
  ref: string
  date: string
  montant: string
  incoterm: string
  destination: string
  statut: StatutCommande
  suivi?: string
  documents: string[]
}

// V1 mock — remplacé par la table commandes_export (Supabase) dans un lot ultérieur.
const MOCK_COMMANDES: Commande[] = [
  {
    ref: 'PRO-2026-0014',
    date: '2026-05-20',
    montant: '18 200 €',
    incoterm: 'CIF',
    destination: 'Douala, Cameroun',
    statut: 'expediee',
    suivi: 'Conteneur MSCU-204xxxx · ETA 18/06',
    documents: ['Facture', 'BL', 'Certificat d’origine'],
  },
  {
    ref: 'PRO-2026-0011',
    date: '2026-05-08',
    montant: '24 800 €',
    incoterm: 'FOB',
    destination: 'Abidjan, Côte d’Ivoire',
    statut: 'en_preparation',
    suivi: 'Expédition prévue semaine 24',
    documents: ['Proforma'],
  },
  {
    ref: 'PRO-2026-0007',
    date: '2026-03-30',
    montant: '12 400 €',
    incoterm: 'EXW',
    destination: 'Dakar, Sénégal',
    statut: 'livree',
    documents: ['Facture', 'BL', 'Certificat d’origine'],
  },
]

export default function CommandesExportPage() {
  return (
    <div className="space-y-8">
      <header>
        <span className="surtitre mb-2"><i /> Espace Export <i /></span>
        <h1 className="text-4xl text-white">
          Suivi de mes <em className="italic text-terre-hover">commandes</em>
        </h1>
        <p className="text-gris-doux text-sm mt-2">
          {MOCK_COMMANDES.length} commande(s) · documents et statut conteneur.
        </p>
      </header>

      <div className="space-y-3">
        {MOCK_COMMANDES.map((c) => (
          <Card key={c.ref} univers="export" className="!p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="font-sc text-xs tracking-wider text-or-clair uppercase">
                  {c.ref} · {c.incoterm}
                </p>
                <p className="text-white text-lg mt-1">
                  {c.montant} <span className="text-sm text-gris-doux">· {c.destination}</span>
                </p>
                <p className="text-xs text-gris mt-1">
                  Commande du {new Date(c.date).toLocaleDateString('fr-FR')}
                  {c.suivi ? ` · ${c.suivi}` : ''}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {c.documents.map((d) => (
                    <span
                      key={d}
                      className="text-xs border border-terre/40 text-terre-clair px-2 py-1 hover:bg-terre/10 cursor-pointer"
                    >
                      ⬇ {d}
                    </span>
                  ))}
                </div>
              </div>
              <StatutBadge statut={c.statut} />
            </div>
          </Card>
        ))}
      </div>

      <Card className="!p-5 text-sm text-gris-doux">
        💡 Téléchargement des documents (factures, BL, certificats d’origine) — version
        démonstration. Branchement réel (Supabase Storage) dans un lot ultérieur.
      </Card>

      <Link href="/espace-export/demande-cotation" className="link-sc text-terre-hover">
        + Nouvelle cotation produits
      </Link>
    </div>
  )
}

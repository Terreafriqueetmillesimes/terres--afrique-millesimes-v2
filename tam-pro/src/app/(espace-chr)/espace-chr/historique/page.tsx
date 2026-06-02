import Link from 'next/link'
import { MOCK_COMPTES_PRO, MOCK_DEMANDES } from '@/lib/mock/data'
import { Card } from '@/components/ui/Card'
import { StatutBadge } from '@/components/ui/StatutBadge'

export const metadata = { title: 'Historique · CHR' }

const TYPE_LABEL: Record<string, string> = {
  devis: 'Devis',
  cotation: 'Cotation',
  rdv: 'Rendez-vous',
  echantillons: 'Échantillons',
}

export default function HistoriqueCHRPage() {
  const compte = MOCK_COMPTES_PRO.find((c) => c.id === 'compte-001')!
  const demandes = MOCK_DEMANDES.filter((d) => d.compte_id === compte.id)

  return (
    <div className="space-y-8">
      <header>
        <span className="surtitre mb-2"><i /> Espace CHR <i /></span>
        <h1 className="text-4xl text-white">
          Historique de mes <em className="italic text-bordeaux-hover">demandes</em>
        </h1>
        <p className="text-gris-doux text-sm mt-2">
          {demandes.length} demande(s) · {compte.societe}
        </p>
      </header>

      {demandes.length === 0 ? (
        <Card univers="chr" className="text-center text-gris-doux">
          Aucune demande pour le moment.
        </Card>
      ) : (
        <div className="space-y-3">
          {demandes.map((d) => (
            <Card key={d.id} univers="chr" className="!p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-sc text-xs tracking-wider text-or-clair uppercase">
                    {TYPE_LABEL[d.type] ?? d.type} · #{d.id}
                  </p>
                  <p className="text-xs text-gris mt-1">
                    {new Date(d.date_creation).toLocaleDateString('fr-FR')}
                  </p>
                  <p className="text-sm text-white mt-2">{d.message_client}</p>
                  {d.reponse_admin && (
                    <p className="text-sm text-gris-doux mt-3 border-l-2 border-bordeaux/50 pl-3">
                      <span className="font-sc text-[0.6rem] uppercase tracking-wider text-bordeaux-hover">
                        Réponse
                      </span>
                      <br />
                      {d.reponse_admin}
                    </p>
                  )}
                </div>
                <StatutBadge statut={d.statut} />
              </div>
            </Card>
          ))}
        </div>
      )}

      <Link href="/espace-chr/demande-devis" className="link-sc text-bordeaux-hover">
        + Nouvelle demande de devis
      </Link>
    </div>
  )
}

import Link from 'next/link'
import { MOCK_COMPTES_PRO, MOCK_DEMANDES } from '@/lib/mock/data'
import { Card } from '@/components/ui/Card'
import { StatutBadge } from '@/components/ui/StatutBadge'

export default function DashboardCHRPage() {
  const compte = MOCK_COMPTES_PRO.find((c) => c.id === 'compte-001')!
  const mesD = MOCK_DEMANDES.filter((d) => d.compte_id === compte.id).slice(0, 3)

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl text-white mb-1">
          Bonjour, <em className="italic text-or-clair">{compte.societe}</em>
        </h1>
        <p className="text-gris-doux text-sm">
          Segment : Restaurants · {compte.pays_nom} · Statut <StatutBadge statut={compte.statut} className="ml-1" />
        </p>
      </header>

      {/* Catalogue */}
      <Card univers="chr" className="!p-8">
        <p className="font-sc text-xs tracking-[0.3em] uppercase text-bordeaux-hover mb-2">Catalogue CHR</p>
        <h2 className="text-2xl text-white mb-1">Version 2026-Q2 · publié le 12/05/2026</h2>
        <p className="text-sm text-gris-doux mb-5">PDF haute qualité · prix HT · 24 cuvées sélectionnées</p>
        <Link
          href="/api/catalogue-telechargement/chr"
          className="link-sc bg-bordeaux text-white border border-bordeaux px-6 py-3 inline-block hover:bg-bordeaux-hover transition-colors"
        >
          Télécharger le PDF
        </Link>
      </Card>

      {/* 3 raccourcis */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link href="/espace-chr/demande-devis" className="block">
          <Card univers="chr" className="!p-6 cursor-pointer h-full">
            <p className="text-3xl mb-2">📝</p>
            <h3 className="text-lg text-white">Nouveau devis</h3>
            <p className="text-xs text-gris">≈ 5 min</p>
          </Card>
        </Link>
        <Link href="/espace-chr/demande-rdv" className="block">
          <Card univers="chr" className="!p-6 cursor-pointer h-full">
            <p className="text-3xl mb-2">📅</p>
            <h3 className="text-lg text-white">Nouveau RDV</h3>
            <p className="text-xs text-gris">≈ 2 min</p>
          </Card>
        </Link>
        <Link href="/espace-chr/historique" className="block">
          <Card univers="chr" className="!p-6 cursor-pointer h-full">
            <p className="text-3xl mb-2">📊</p>
            <h3 className="text-lg text-white">Mon historique</h3>
            <p className="text-xs text-gris">{MOCK_DEMANDES.filter((d) => d.compte_id === compte.id).length} demandes</p>
          </Card>
        </Link>
      </div>

      {/* Offres */}
      <section>
        <h2 className="surtitre mb-4"><i /> Offres ciblées pour vous</h2>
        <Card univers="chr">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-bordeaux-hover rounded-full" />
              <span className="text-white">Sélection Champagne Brut Réserve — <span className="text-bordeaux-hover">−15 %</span> jusqu'au 30/06</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-bordeaux-hover rounded-full" />
              <span className="text-white">Cuvée Lestage par caisse de 12 — préco automne 2026</span>
            </li>
          </ul>
        </Card>
      </section>

      {/* Dernières demandes */}
      <section>
        <h2 className="surtitre mb-4"><i /> Mes 3 dernières demandes</h2>
        <div className="space-y-2">
          {mesD.map((d) => (
            <div key={d.id} className="bg-noir-2 border border-or/15 p-4 flex items-center justify-between hover:border-or/30">
              <div>
                <p className="text-white font-corps text-sm">
                  <span className="font-sc text-xs tracking-wider text-or-clair uppercase mr-3">{d.type}</span>
                  #{d.id}
                </p>
                <p className="text-xs text-gris mt-1">{new Date(d.date_creation).toLocaleDateString('fr-FR')} · {d.message_client?.slice(0, 60)}…</p>
              </div>
              <StatutBadge statut={d.statut} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

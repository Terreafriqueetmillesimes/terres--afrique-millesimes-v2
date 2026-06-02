import Link from 'next/link'
import { MOCK_COMPTES_PRO } from '@/lib/mock/data'
import { Card } from '@/components/ui/Card'
import { StatutBadge } from '@/components/ui/StatutBadge'

export default function DashboardExportPage() {
  const compte = MOCK_COMPTES_PRO.find((c) => c.id === 'compte-004')!

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl text-white mb-1">
          Bonjour, <em className="italic text-or-clair">{compte.societe}</em>
        </h1>
        <p className="text-gris-doux text-sm">
          Importateur · {compte.pays_nom} · Statut <StatutBadge statut={compte.statut} className="ml-1" />
        </p>
      </header>

      <Card univers="export" className="!p-8">
        <p className="font-sc text-xs tracking-[0.3em] uppercase text-terre-hover mb-2">Catalogue Export</p>
        <h2 className="text-2xl text-white mb-1">Version 2026-Q2 · publié le 12/05/2026</h2>
        <p className="text-sm text-gris-doux mb-5">PDF haute qualité · prix EXW départ cave</p>
        <Link
          href="/api/catalogue-telechargement/export"
          className="link-sc bg-terre text-white border border-terre px-6 py-3 inline-block hover:bg-terre-hover transition-colors"
        >
          Télécharger le PDF
        </Link>
      </Card>

      <div className="grid md:grid-cols-4 gap-4">
        <Link href="/espace-export/cotation-transport" className="block">
          <Card univers="export" className="!p-6 cursor-pointer h-full text-center">
            <p className="text-3xl mb-2">🚢</p>
            <h3 className="text-base text-white">Cotation transport</h3>
          </Card>
        </Link>
        <Link href="/espace-export/demande-cotation" className="block">
          <Card univers="export" className="!p-6 cursor-pointer h-full text-center">
            <p className="text-3xl mb-2">📝</p>
            <h3 className="text-base text-white">Cotation produits</h3>
          </Card>
        </Link>
        <Link href="/espace-export/demande-echantillons" className="block">
          <Card univers="export" className="!p-6 cursor-pointer h-full text-center">
            <p className="text-3xl mb-2">🎁</p>
            <h3 className="text-base text-white">Échantillons</h3>
          </Card>
        </Link>
        <Link href="/espace-export/demande-rdv" className="block">
          <Card univers="export" className="!p-6 cursor-pointer h-full text-center">
            <p className="text-3xl mb-2">📅</p>
            <h3 className="text-base text-white">RDV commercial</h3>
          </Card>
        </Link>
      </div>

      <section>
        <h2 className="surtitre mb-4"><i /> Commandes en cours</h2>
        <div className="space-y-3">
          <Card univers="export" className="!p-5 flex items-center gap-4">
            <span className="text-2xl">📦</span>
            <div className="flex-1">
              <p className="text-white text-sm font-corps">PRO-2026-0014 · 18 200 € · ✈ Expédiée 28/05</p>
              <p className="text-xs text-gris-doux mt-1">
                <span className="underline cursor-pointer hover:text-or-clair">Facture</span>{' · '}
                <span className="underline cursor-pointer hover:text-or-clair">BL</span>{' · '}
                <span className="underline cursor-pointer hover:text-or-clair">Certificat d'origine</span>
              </p>
            </div>
            <StatutBadge statut="expediee" />
          </Card>
          <Card univers="export" className="!p-5 flex items-center gap-4">
            <span className="text-2xl">📦</span>
            <div className="flex-1">
              <p className="text-white text-sm font-corps">PRO-2026-0011 · 24 800 € · 🏭 En préparation</p>
              <p className="text-xs text-gris-doux mt-1">Expédition prévue semaine 24</p>
            </div>
            <StatutBadge statut="en_preparation" />
          </Card>
        </div>
      </section>

      <section>
        <h2 className="surtitre mb-4"><i /> Offres ciblées</h2>
        <Card univers="export">
          <p className="text-sm text-white">
            <span className="w-1.5 h-1.5 bg-terre-hover rounded-full inline-block mr-2" />
            Conteneur 20' mixte spécial Afrique de l'Ouest — <span className="text-terre-hover">−12 %</span>
          </p>
        </Card>
      </section>
    </div>
  )
}

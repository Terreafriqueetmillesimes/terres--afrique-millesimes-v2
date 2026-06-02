import { MOCK_PRODUITS } from '@/lib/mock/data'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export const metadata = { title: 'Catalogue Export' }

export default function CatalogueExportPage() {
  return (
    <div className="space-y-8">
      <header>
        <span className="surtitre mb-2"><i /> Catalogue Export · prix EXW <i /></span>
        <h1 className="text-4xl text-white">
          Catalogue <em className="italic text-terre-hover">Export Afrique</em>
        </h1>
        <p className="text-gris-doux text-sm mt-2">
          Version 2026-Q2 · départ cave Versailles · transport et douane non inclus
        </p>
      </header>

      <Card univers="export" className="!p-8 flex flex-col md:flex-row items-center gap-6">
        <span className="text-5xl">📕</span>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-xl text-white mb-1">Catalogue complet en PDF</h2>
          <p className="text-sm text-gris-doux">Tarifs EXW, MOQ, incoterms, fiches techniques</p>
        </div>
        <Button variant="terre">Télécharger le PDF</Button>
      </Card>

      <section>
        <h2 className="text-2xl text-white mb-4">Sélection 2026 — 3 cuvées signature</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {MOCK_PRODUITS.map((p) => (
            <Card key={p.sku} univers="export">
              <p className="font-sc text-[0.65rem] tracking-[0.3em] uppercase text-terre-hover mb-1">{p.appellation}</p>
              <h3 className="font-titre text-white text-xl mb-1">{p.nom}</h3>
              <p className="text-xs text-gris-doux italic mb-3">
                {p.domaine} · {p.millesime ? `Millésime ${p.millesime}` : 'Brut'} · {p.categorie}
              </p>
              <p className="font-titre text-or text-2xl">
                {p.prix_exw_export.toFixed(2)} € <span className="text-sm text-or-pale">EXW</span>
              </p>
              <p className="text-xs text-gris mt-1">Prix départ cave Versailles</p>
            </Card>
          ))}
        </div>
      </section>

      <Card className="!p-6 text-sm text-gris-doux">
        💡 <strong className="text-or-clair">MOQ &amp; logistique :</strong> minimum 10 cartons mixtes (60 btl).
        Incoterm EXW Versailles par défaut. Paiement 100 % à la commande par virement SWIFT.
        Délais 4 à 8 semaines selon destination.
      </Card>
    </div>
  )
}

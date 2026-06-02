import { MOCK_PRODUITS } from '@/lib/mock/data'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export const metadata = { title: 'Catalogue CHR' }

export default function CatalogueCHRPage() {
  return (
    <div className="space-y-8">
      <header>
        <span className="surtitre mb-2"><i /> Catalogue CHR · prix HT <i /></span>
        <h1 className="text-4xl text-white">
          Catalogue <em className="italic text-bordeaux-hover">CHR France</em>
        </h1>
        <p className="text-gris-doux text-sm mt-2">
          Version 2026-Q2 · publié le 12/05/2026 · 24 cuvées sélectionnées
        </p>
      </header>

      <Card univers="chr" className="!p-8 flex flex-col md:flex-row items-center gap-6">
        <span className="text-5xl">📕</span>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-xl text-white mb-1">Catalogue complet en PDF</h2>
          <p className="text-sm text-gris-doux">Tarifs HT, conditions générales pro, fiches techniques</p>
        </div>
        <Button variant="bordeaux">Télécharger le PDF</Button>
      </Card>

      <section>
        <h2 className="text-2xl text-white mb-4">Sélection 2026 — 3 cuvées signature</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {MOCK_PRODUITS.map((p) => (
            <Card key={p.sku} univers="chr">
              <p className="font-sc text-[0.65rem] tracking-[0.3em] uppercase text-bordeaux-hover mb-1">{p.appellation}</p>
              <h3 className="font-titre text-white text-xl mb-1">{p.nom}</h3>
              <p className="text-xs text-gris-doux italic mb-3">
                {p.domaine} · {p.millesime ? `Millésime ${p.millesime}` : 'Brut'} · {p.categorie}
              </p>
              <p className="font-titre text-or text-2xl">
                {p.prix_ht_chr.toFixed(2)} € <span className="text-sm text-or-pale">HT</span>
              </p>
              <p className="text-xs text-gris mt-1">Prix unitaire · tarifs dégressifs sur volume</p>
            </Card>
          ))}
        </div>
      </section>

      <Card className="!p-6 text-sm text-gris-doux">
        💡 <strong className="text-or-clair">Volumes &amp; conditions :</strong> les tarifs ci-dessus
        s'entendent à l'unité. Conditions dégressives à partir de 30 bouteilles. Paiement à 30 jours
        fin de mois. Pour un devis personnalisé, utilisez le formulaire dédié.
      </Card>
    </div>
  )
}

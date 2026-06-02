import { MOCK_PRODUITS } from '@/lib/mock/data'
import { Field, Select, Input, Textarea } from '@/components/ui/Input'
import { DemandeFormShell } from '@/components/forms/DemandeFormShell'

export const metadata = { title: 'Demande de devis · CHR' }

export default function DemandeDevisCHRPage() {
  return (
    <div className="space-y-8">
      <header>
        <span className="surtitre mb-2"><i /> Espace CHR <i /></span>
        <h1 className="text-4xl text-white">
          Demande de <em className="italic text-bordeaux-hover">devis</em>
        </h1>
        <p className="text-gris-doux text-sm mt-2">
          Réponse chiffrée HT sous 48&nbsp;h ouvrées · tarifs dégressifs sur volume.
        </p>
      </header>

      <DemandeFormShell univers="chr" submitLabel="Envoyer la demande" retourHref="/espace-chr">
        <Field label="Cuvée souhaitée" required>
          <Select name="produit" required defaultValue="">
            <option value="" disabled>Sélectionnez une cuvée</option>
            {MOCK_PRODUITS.map((p) => (
              <option key={p.sku} value={p.sku}>{p.nom} — {p.appellation}</option>
            ))}
            <option value="autre">Autre / plusieurs références</option>
          </Select>
        </Field>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Quantité (bouteilles)" required>
            <Input name="quantite" type="number" min={1} placeholder="ex. 60" required />
          </Field>
          <Field label="Conditionnement">
            <Select name="conditionnement" defaultValue="caisse-12">
              <option value="caisse-6">Caisse de 6</option>
              <option value="caisse-12">Caisse de 12</option>
              <option value="palette">Palette</option>
            </Select>
          </Field>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Livraison souhaitée">
            <Input name="date_livraison" type="date" />
          </Field>
          <Field label="Lieu de livraison">
            <Input name="lieu" placeholder="Ville / code postal" />
          </Field>
        </div>

        <Field label="Précisions" hint="Occasion, budget, accord mets-vins…">
          <Textarea name="message" placeholder="Décrivez votre besoin" />
        </Field>
      </DemandeFormShell>
    </div>
  )
}

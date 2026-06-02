import { Field, Select, Input, Textarea } from '@/components/ui/Input'
import { DemandeFormShell } from '@/components/forms/DemandeFormShell'
import { MOCK_PRODUITS, PAYS_LISTE } from '@/lib/mock/data'

export const metadata = { title: 'Cotation produits · Export' }

export default function DemandeCotationPage() {
  return (
    <div className="space-y-8">
      <header>
        <span className="surtitre mb-2"><i /> Espace Export <i /></span>
        <h1 className="text-4xl text-white">
          Cotation <em className="italic text-terre-hover">produits</em>
        </h1>
        <p className="text-gris-doux text-sm mt-2">
          Tarifs EXW départ cave · cotation personnalisée selon le volume.
        </p>
      </header>

      <DemandeFormShell univers="export" submitLabel="Demander la cotation" retourHref="/espace-export">
        <Field label="Cuvée" required>
          <Select name="produit" required defaultValue="">
            <option value="" disabled>Sélectionnez une cuvée</option>
            {MOCK_PRODUITS.map((p) => (
              <option key={p.sku} value={p.sku}>{p.nom} — {p.appellation}</option>
            ))}
            <option value="autre">Plusieurs références / catalogue complet</option>
          </Select>
        </Field>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Quantité (bouteilles)" required>
            <Input name="quantite" type="number" min={1} placeholder="ex. 1200" required />
          </Field>
          <Field label="Incoterm" required>
            <Select name="incoterm" required defaultValue="EXW">
              <option value="EXW">EXW</option>
              <option value="FOB">FOB</option>
              <option value="CIF">CIF</option>
            </Select>
          </Field>
        </div>

        <Field label="Pays de destination" required>
          <Select name="pays" required defaultValue="">
            <option value="" disabled>Sélectionnez</option>
            {PAYS_LISTE.map((p) => (
              <option key={p.code} value={p.code}>{p.nom}</option>
            ))}
          </Select>
        </Field>

        <Field label="Précisions" hint="Récurrence, packaging, étiquetage spécifique…">
          <Textarea name="message" placeholder="Votre message" />
        </Field>
      </DemandeFormShell>
    </div>
  )
}

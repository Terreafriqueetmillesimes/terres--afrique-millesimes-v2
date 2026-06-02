import { Field, Select, Input, Textarea } from '@/components/ui/Input'
import { DemandeFormShell } from '@/components/forms/DemandeFormShell'
import { MOCK_PRODUITS, PAYS_LISTE } from '@/lib/mock/data'

export const metadata = { title: 'Demande d’échantillons · Export' }

export default function DemandeEchantillonsPage() {
  return (
    <div className="space-y-8">
      <header>
        <span className="surtitre mb-2"><i /> Espace Export <i /></span>
        <h1 className="text-4xl text-white">
          Demande d’<em className="italic text-terre-hover">échantillons</em>
        </h1>
        <p className="text-gris-doux text-sm mt-2">
          Recevez nos cuvées de référence pour évaluation.
        </p>
      </header>

      <DemandeFormShell univers="export" submitLabel="Demander des échantillons" retourHref="/espace-export">
        <Field label="Cuvée souhaitée" required hint="Précisez d'autres références dans le message si besoin.">
          <Select name="produit" required defaultValue="">
            <option value="" disabled>Sélectionnez</option>
            {MOCK_PRODUITS.map((p) => (
              <option key={p.sku} value={p.sku}>{p.nom}</option>
            ))}
            <option value="assortiment">Assortiment découverte</option>
          </Select>
        </Field>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Adresse de livraison" required>
            <Input name="adresse" placeholder="Adresse complète" required />
          </Field>
          <Field label="Pays" required>
            <Select name="pays" required defaultValue="">
              <option value="" disabled>Sélectionnez</option>
              {PAYS_LISTE.map((p) => (
                <option key={p.code} value={p.code}>{p.nom}</option>
              ))}
            </Select>
          </Field>
        </div>

        <Field label="Message" hint="Références précises, contexte de dégustation…">
          <Textarea name="message" placeholder="Votre message" />
        </Field>
      </DemandeFormShell>
    </div>
  )
}

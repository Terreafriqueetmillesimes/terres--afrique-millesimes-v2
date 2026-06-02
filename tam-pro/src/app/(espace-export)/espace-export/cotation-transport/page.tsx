import { Field, Select, Input, Textarea } from '@/components/ui/Input'
import { DemandeFormShell } from '@/components/forms/DemandeFormShell'
import { PAYS_LISTE } from '@/lib/mock/data'

export const metadata = { title: 'Cotation transport · Export' }

export default function CotationTransportPage() {
  return (
    <div className="space-y-8">
      <header>
        <span className="surtitre mb-2"><i /> Espace Export <i /></span>
        <h1 className="text-4xl text-white">
          Cotation <em className="italic text-terre-hover">transport</em>
        </h1>
        <p className="text-gris-doux text-sm mt-2">
          Estimation logistique selon l'Incoterm et la destination.
        </p>
      </header>

      <DemandeFormShell univers="export" submitLabel="Demander la cotation" retourHref="/espace-export">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Incoterm souhaité" required>
            <Select name="incoterm" required defaultValue="EXW">
              <option value="EXW">EXW — Départ cave</option>
              <option value="FOB">FOB — Port d'embarquement</option>
              <option value="CIF">CIF — Coût, assurance, fret</option>
              <option value="DAP">DAP — Rendu destination</option>
              <option value="DDP">DDP — Rendu dédouané</option>
            </Select>
          </Field>
          <Field label="Pays de destination" required>
            <Select name="pays" required defaultValue="">
              <option value="" disabled>Sélectionnez</option>
              {PAYS_LISTE.map((p) => (
                <option key={p.code} value={p.code}>{p.nom}</option>
              ))}
            </Select>
          </Field>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Port / ville de destination" required>
            <Input name="destination" placeholder="ex. Abidjan, Douala…" required />
          </Field>
          <Field label="Volume estimé" required>
            <Select name="volume" required defaultValue="">
              <option value="" disabled>Sélectionnez</option>
              <option value="palettes">Quelques palettes</option>
              <option value="20">Conteneur 20'</option>
              <option value="40">Conteneur 40'</option>
            </Select>
          </Field>
        </div>

        <Field label="Précisions" hint="Délais, fréquence, marchandise spécifique…">
          <Textarea name="message" placeholder="Votre message" />
        </Field>
      </DemandeFormShell>
    </div>
  )
}

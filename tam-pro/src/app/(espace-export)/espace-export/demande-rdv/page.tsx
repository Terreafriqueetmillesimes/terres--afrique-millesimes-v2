import { Field, Select, Input, Textarea } from '@/components/ui/Input'
import { DemandeFormShell } from '@/components/forms/DemandeFormShell'

export const metadata = { title: 'Demande de RDV · Export' }

export default function DemandeRdvExportPage() {
  return (
    <div className="space-y-8">
      <header>
        <span className="surtitre mb-2"><i /> Espace Export <i /></span>
        <h1 className="text-4xl text-white">
          Rendez-vous <em className="italic text-terre-hover">commercial</em>
        </h1>
        <p className="text-gris-doux text-sm mt-2">
          Échangez avec notre responsable Export Afrique.
        </p>
      </header>

      <DemandeFormShell univers="export" submitLabel="Demander le RDV" retourHref="/espace-export">
        <Field label="Sujet" required>
          <Select name="sujet" required defaultValue="">
            <option value="" disabled>Sélectionnez</option>
            <option value="partenariat">Partenariat / distribution</option>
            <option value="commande">Préparation de commande</option>
            <option value="logistique">Logistique &amp; Incoterms</option>
            <option value="autre">Autre</option>
          </Select>
        </Field>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Date souhaitée" required>
            <Input name="date" type="date" required />
          </Field>
          <Field label="Format" required>
            <Select name="format" required defaultValue="visio">
              <option value="visio">Visioconférence</option>
              <option value="telephone">Téléphone</option>
            </Select>
          </Field>
        </div>

        <Field label="Message" hint="Fuseau horaire, participants, contexte…">
          <Textarea name="message" placeholder="Votre message" />
        </Field>
      </DemandeFormShell>
    </div>
  )
}

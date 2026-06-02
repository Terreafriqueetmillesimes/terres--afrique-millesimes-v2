import { Field, Select, Input, Textarea } from '@/components/ui/Input'
import { DemandeFormShell } from '@/components/forms/DemandeFormShell'

export const metadata = { title: 'Demande de RDV · CHR' }

export default function DemandeRdvCHRPage() {
  return (
    <div className="space-y-8">
      <header>
        <span className="surtitre mb-2"><i /> Espace CHR <i /></span>
        <h1 className="text-4xl text-white">
          Demande de <em className="italic text-bordeaux-hover">rendez-vous</em>
        </h1>
        <p className="text-gris-doux text-sm mt-2">
          Présentation de gamme, dégustation ou accompagnement carte des vins.
        </p>
      </header>

      <DemandeFormShell univers="chr" submitLabel="Demander le RDV" retourHref="/espace-chr">
        <Field label="Type de rendez-vous" required>
          <Select name="type_rdv" required defaultValue="">
            <option value="" disabled>Sélectionnez</option>
            <option value="presentation">Présentation de gamme</option>
            <option value="degustation">Dégustation</option>
            <option value="carte">Accompagnement carte des vins</option>
          </Select>
        </Field>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Date souhaitée" required>
            <Input name="date" type="date" required />
          </Field>
          <Field label="Créneau">
            <Select name="creneau" defaultValue="matin">
              <option value="matin">Matin</option>
              <option value="apres-midi">Après-midi</option>
            </Select>
          </Field>
        </div>

        <Field label="Format" required>
          <Select name="format" required defaultValue="visio">
            <option value="visio">Visioconférence</option>
            <option value="sur-place">Dans votre établissement</option>
            <option value="versailles">Dans nos bureaux (Versailles)</option>
          </Select>
        </Field>

        <Field label="Message" hint="Sujets à aborder, nombre de participants…">
          <Textarea name="message" placeholder="Votre message" />
        </Field>
      </DemandeFormShell>
    </div>
  )
}

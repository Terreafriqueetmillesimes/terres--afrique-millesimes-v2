'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { inscriptionSchema, type InscriptionInput } from '@/lib/validation/inscription'
import { PAYS_LISTE } from '@/lib/mock/data'
import { Input, Select, Field } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

type Props = {
  type: 'chr' | 'export'
}

export function InscriptionForm({ type }: Props) {
  const router = useRouter()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const isCHR = type === 'chr'
  const accent = isCHR ? 'bordeaux' : 'terre'
  const variantBtn = isCHR ? 'bordeaux' : 'terre'

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors({})
    setServerError(null)

    const formData = new FormData(e.currentTarget)
    const data: Record<string, FormDataEntryValue | boolean> = Object.fromEntries(formData)
    data.cgv_accepte = data.cgv_accepte === 'on'
    data.rgpd_accepte = data.rgpd_accepte === 'on'
    data.type = type

    const result = inscriptionSchema.safeParse(data)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setPending(true)
    try {
      const res = await fetch(`/api/inscription-${type}`, {
        method: 'POST',
        body: JSON.stringify(result.data),
        headers: { 'Content-Type': 'application/json' },
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j?.error ?? 'Erreur serveur')
      }
      router.push('/compte-en-attente')
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Société (raison sociale)" required error={errors.societe}>
          <Input name="societe" placeholder="SARL Restaurant Le Médoc" required maxLength={120} />
        </Field>
        <Field label="Nom du contact" required error={errors.nom_contact}>
          <Input name="nom_contact" placeholder="Jean Dupont" required maxLength={80} />
        </Field>
        <Field label="Email professionnel" required error={errors.email}>
          <Input name="email" type="email" placeholder="contact@societe.com" required />
        </Field>
        <Field label="Téléphone" required error={errors.telephone}>
          <Input name="telephone" type="tel" placeholder="+33 1 23 45 67 89" required />
        </Field>
        <Field label="Pays" required error={errors.pays}>
          <Select name="pays" defaultValue={isCHR ? 'FR' : ''} required>
            <option value="">— Sélectionnez —</option>
            {PAYS_LISTE.map((p) => (
              <option key={p.code} value={p.code}>{p.nom}</option>
            ))}
          </Select>
        </Field>
        <div className="hidden md:block" />
        <Field
          label="Mot de passe"
          required
          hint="Min 10 caractères, 1 majuscule, 1 chiffre, 1 caractère spécial"
          error={errors.mot_de_passe}
        >
          <Input name="mot_de_passe" type="password" required minLength={10} />
        </Field>
        <Field label="Confirmer le mot de passe" required error={errors.confirmation}>
          <Input name="confirmation" type="password" required minLength={10} />
        </Field>
      </div>

      <div className="mt-6 space-y-2">
        <label className="flex items-start gap-3 text-sm text-gris-doux cursor-pointer">
          <input type="checkbox" name="cgv_accepte" required className="mt-1 accent-or" />
          <span>
            J'accepte les{' '}
            <a href="/cgv" className="text-or-clair underline">conditions générales pro</a>
          </span>
        </label>
        {errors.cgv_accepte && <p className="text-xs text-red-400">{errors.cgv_accepte}</p>}
        <label className="flex items-start gap-3 text-sm text-gris-doux cursor-pointer">
          <input type="checkbox" name="rgpd_accepte" required className="mt-1 accent-or" />
          <span>
            J'accepte la{' '}
            <a href="/confidentialite" className="text-or-clair underline">politique de confidentialité (RGPD)</a>
          </span>
        </label>
        {errors.rgpd_accepte && <p className="text-xs text-red-400">{errors.rgpd_accepte}</p>}
      </div>

      {serverError && (
        <div className="mt-4 p-3 border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
          {serverError}
        </div>
      )}

      <div className="mt-8">
        <Button type="submit" variant={variantBtn} disabled={pending} className="w-full md:w-auto">
          {pending ? 'Envoi en cours…' : isCHR ? 'Créer mon compte CHR' : 'Créer mon compte Export'}
        </Button>
      </div>

      <p className="mt-6 text-xs text-gris italic">
        ℹ Votre demande sera étudiée par notre équipe sous 48 h ouvrées. Vous recevrez un e-mail
        de confirmation, puis vos identifiants après validation.
      </p>
    </form>
  )
}

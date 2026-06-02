'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { connexionSchema } from '@/lib/validation/connexion'
import { Input, Field } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function ConnexionForm() {
  const router = useRouter()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors({})
    setServerError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      email: String(formData.get('email') || ''),
      mot_de_passe: String(formData.get('mot_de_passe') || ''),
      se_souvenir: formData.get('se_souvenir') === 'on',
    }

    const result = connexionSchema.safeParse(data)
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
      const res = await fetch('/api/connexion', {
        method: 'POST',
        body: JSON.stringify(result.data),
        headers: { 'Content-Type': 'application/json' },
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        if (res.status === 403) {
          // Compte en attente ou refusé
          router.push(j?.redirect || '/compte-en-attente')
          return
        }
        throw new Error(j?.error ?? 'Identifiants invalides')
      }
      const json = await res.json()
      router.push(json.redirect || '/')
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <Field label="Email professionnel" required error={errors.email}>
        <Input name="email" type="email" autoComplete="email" required />
      </Field>
      <Field label="Mot de passe" required error={errors.mot_de_passe}>
        <Input name="mot_de_passe" type="password" autoComplete="current-password" required />
      </Field>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-gris-doux cursor-pointer">
          <input type="checkbox" name="se_souvenir" className="accent-or" />
          Se souvenir de moi
        </label>
        <Link href="/mot-de-passe-oublie" className="text-or-clair hover:text-or transition-colors">
          Mot de passe oublié ?
        </Link>
      </div>

      {serverError && (
        <div className="p-3 border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
          {serverError}
        </div>
      )}

      <Button type="submit" variant="or" disabled={pending} className="w-full">
        {pending ? 'Connexion…' : 'Se connecter'}
      </Button>

      <p className="text-center text-sm text-gris-doux pt-4 border-t border-or/15">
        Pas encore de compte ?{' '}
        <Link href="/inscription-chr" className="text-bordeaux-hover hover:text-bordeaux-clair">CHR</Link>
        {' · '}
        <Link href="/inscription-export" className="text-terre-hover hover:text-terre-clair">Export</Link>
      </p>
    </form>
  )
}

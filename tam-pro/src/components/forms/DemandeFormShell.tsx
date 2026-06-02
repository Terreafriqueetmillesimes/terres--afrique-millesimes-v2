'use client'

import Link from 'next/link'
import { useState, type ReactNode, type FormEvent } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

type Props = {
  univers: 'chr' | 'export'
  submitLabel: string
  retourHref: string
  children: ReactNode
}

/**
 * Coquille de formulaire de demande — V1 MOCK.
 * Aucun envoi réel : l'envoi affiche une confirmation locale.
 * À brancher sur /api (Supabase + Resend) dans un lot ultérieur.
 */
export function DemandeFormShell({ univers, submitLabel, retourHref, children }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const variant = univers === 'chr' ? 'bordeaux' : 'terre'
  const accent = univers === 'chr' ? 'text-bordeaux-hover' : 'text-terre-hover'

  if (submitted) {
    return (
      <Card univers={univers} className="!p-8 text-center">
        <p className="text-5xl mb-4">✓</p>
        <h2 className="text-2xl text-white mb-2">Demande enregistrée</h2>
        <p className="text-sm text-gris-doux mb-6 max-w-md mx-auto">
          Version démonstration (mock) — aucun envoi réel n'est effectué. En production,
          notre équipe vous répondrait sous 48&nbsp;h ouvrées.
        </p>
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <Button variant={variant} onClick={() => setSubmitted(false)}>
            Nouvelle demande
          </Button>
          <Link href={retourHref} className={`link-sc ${accent}`}>
            ← Retour au tableau de bord
          </Link>
        </div>
      </Card>
    )
  }

  return (
    <form onSubmit={(e: FormEvent) => { e.preventDefault(); setSubmitted(true) }}>
      <Card univers={univers} className="!p-8">
        {children}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button type="submit" variant={variant}>{submitLabel}</Button>
          <span className="text-xs text-gris italic">Démo — aucune donnée transmise</span>
        </div>
      </Card>
    </form>
  )
}

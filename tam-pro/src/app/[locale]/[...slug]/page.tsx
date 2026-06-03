import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { LegacyFrame } from '@/components/public/LegacyFrame'

// locale → sous-dossier de l'ancien site (FR à la racine, EN/ES en sous-dossiers)
const SUB: Record<string, string> = { fr: '', en: 'en', es: 'es' }

// Alias route moderne → nom de fichier d'origine
const FILE_ALIAS: Record<string, string> = {
  formations: 'formation',
}

const LEGACY_ROOT = path.join(process.cwd(), 'public', 'legacy')

/**
 * Injecte au tout début du <head> :
 *  - une balise <base> pour que les chemins relatifs (assets/...) résolvent
 *    vers /legacy/<sous-dossier>/ ;
 *  - un style qui masque l'ancien header/footer (le nouveau header/footer du
 *    site moderne les remplace) — appliqué AVANT le rendu, donc déterministe.
 */
function prepare(html: string, sub: string): string {
  const base = `/legacy/${sub ? `${sub}/` : ''}`
  const inject =
    `<base href="${base}">` +
    `<style>header,footer,.scroll-cue{display:none!important}` +
    `body{padding-top:0!important;margin:0}</style>`
  return html.replace(/(<head[^>]*>)/i, `$1${inject}`)
}

export default async function LegacyContentPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const sub = SUB[locale] ?? ''
  const requested = slug.join('/')
  const name = FILE_ALIAS[requested] ?? requested

  const target = path.join(LEGACY_ROOT, sub, `${name}.html`)
  if (!target.startsWith(LEGACY_ROOT) || !fs.existsSync(target)) {
    notFound()
  }

  const raw = fs.readFileSync(target, 'utf8')
  return <LegacyFrame html={prepare(raw, sub)} />
}

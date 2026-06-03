'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { LangSwitcher } from './LangSwitcher'

const NAV = [
  { href: '/', key: 'accueil' },
  { href: '/boutique', key: 'boutique' },
  { href: '/formations', key: 'formations' },
  { href: '/oenotourisme', key: 'oenotourisme' },
  { href: '/blog', key: 'blog' },
  { href: '/association', key: 'association' },
  { href: '/contact', key: 'contact' },
] as const

export function SiteHeader() {
  const t = useTranslations('nav')
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-noir/85 backdrop-blur-md border-b border-or/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Terres d'Afrique & Millésimes">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-tam-officiel.png" alt="Terres d'Afrique & Millésimes" className="h-14 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((i) => (
            <Link
              key={i.key}
              href={i.href}
              className="font-sc text-[0.72rem] tracking-[0.18em] uppercase text-gris-doux hover:text-or-clair transition-colors"
            >
              {t(i.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LangSwitcher />
          <a
            href="/connexion"
            className="hidden sm:inline-block font-sc text-[0.7rem] tracking-[0.2em] uppercase text-or border border-or/45 px-4 py-2 hover:bg-or hover:text-noir transition-all"
          >
            {t('espacePro')}
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden text-or-clair text-xl leading-none"
            aria-label="Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-or/15 bg-noir px-6 py-4 flex flex-col gap-3">
          {NAV.map((i) => (
            <Link
              key={i.key}
              href={i.href}
              onClick={() => setOpen(false)}
              className="font-sc text-xs tracking-[0.18em] uppercase text-gris-doux hover:text-or-clair"
            >
              {t(i.key)}
            </Link>
          ))}
          <a href="/connexion" className="font-sc text-xs tracking-[0.18em] uppercase text-or">
            {t('espacePro')}
          </a>
        </nav>
      )}
    </header>
  )
}

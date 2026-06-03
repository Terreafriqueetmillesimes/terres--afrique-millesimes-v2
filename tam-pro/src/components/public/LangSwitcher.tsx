'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

const LABELS: Record<string, string> = { fr: 'FR', en: 'EN', es: 'ES' }

export function LangSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="font-sc text-[0.7rem] tracking-[0.2em] text-or-clair uppercase px-2 py-1 hover:text-or transition-colors"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {LABELS[locale]} <span className="text-[0.6rem]">▾</span>
      </button>
      {open && (
        <ul className="absolute right-0 mt-1 bg-noir-2 border border-or/30 min-w-[3.5rem] z-50 shadow-xl">
          {routing.locales.map((l) => (
            <li key={l}>
              <button
                onClick={() => {
                  setOpen(false)
                  router.replace(pathname, { locale: l })
                }}
                className={`block w-full text-left px-3 py-2 font-sc text-[0.7rem] tracking-[0.2em] uppercase hover:bg-or/10 transition-colors ${
                  l === locale ? 'text-or' : 'text-gris-doux'
                }`}
              >
                {LABELS[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

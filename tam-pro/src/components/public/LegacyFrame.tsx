'use client'

import { useRef, useState } from 'react'

/**
 * Pont de contenu — rend une page réelle de l'ancien site (HTML transmis via `html`,
 * déjà nettoyé côté serveur : ancien header/footer masqués + <base> pour les assets).
 * srcDoc garantit que le style de masquage est appliqué AVANT le rendu (pas de
 * double en-tête, pas de dépendance au timing JS). Scripts, images, liens et
 * formulaires d'origine restent fonctionnels.
 */
export function LegacyFrame({ html }: { html: string }) {
  const ref = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(1400)

  function handleLoad() {
    try {
      const doc = ref.current?.contentDocument
      if (!doc) return
      const h = Math.max(
        doc.body?.scrollHeight ?? 0,
        doc.documentElement?.scrollHeight ?? 0
      )
      if (h > 0) setHeight(h + 32)
    } catch {
      /* hauteur par défaut si non accessible */
    }
  }

  return (
    <iframe
      ref={ref}
      srcDoc={html}
      onLoad={handleLoad}
      title="Terres d'Afrique & Millésimes"
      scrolling="no"
      className="w-full block border-0 bg-noir"
      style={{ height }}
    />
  )
}

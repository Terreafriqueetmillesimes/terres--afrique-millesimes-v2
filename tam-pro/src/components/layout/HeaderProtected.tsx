import Link from 'next/link'

type Props = {
  univers: 'chr' | 'export'
  raisonSociale: string
}

export function HeaderProtected({ univers, raisonSociale }: Props) {
  const label = univers === 'chr' ? 'Espace CHR' : 'Espace Export'

  return (
    <>
      <header className="px-8 py-5 flex justify-between items-center border-b border-or/20 bg-noir-2/50">
        <Link href={`/espace-${univers}`} className="inline-flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-or-vieilli to-or flex items-center justify-center text-noir font-titre text-lg font-semibold">
            T
          </div>
          <span className="font-sc text-xs tracking-[0.3em] uppercase text-or">{label}</span>
        </Link>
        <div className="flex items-center gap-6">
          <span className="font-corps text-sm text-or-pale">{raisonSociale}</span>
          <Link href="/api/deconnexion" className="link-sc text-gris-doux hover:text-or-clair">
            Déconnexion ⎋
          </Link>
        </div>
      </header>
      <div className={`univers-banner ${univers}`}>
        {univers === 'chr' ? 'Univers CHR · Bordeaux Vin' : 'Univers Export · Terre d\'Afrique'}
      </div>
    </>
  )
}

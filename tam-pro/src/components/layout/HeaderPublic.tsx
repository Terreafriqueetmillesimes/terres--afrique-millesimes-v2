import Link from 'next/link'

export function HeaderPublic() {
  const vitrineUrl = process.env.NEXT_PUBLIC_VITRINE_URL || 'https://terreafriqueetmillesimes.com'

  return (
    <header className="px-12 py-6 flex justify-between items-center border-b border-or/20 relative z-10">
      <Link href="/" className="inline-flex items-center gap-5">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-or-vieilli to-or flex items-center justify-center text-noir font-titre text-2xl font-semibold">
          T
        </div>
        <span className="hidden lg:inline-block font-sc text-xs tracking-[0.34em] text-or uppercase pl-5 border-l border-or/30">
          Espace Professionnel
        </span>
      </Link>
      <nav className="flex items-center gap-8">
        <a
          href={vitrineUrl}
          className="font-corps text-sm text-gris-doux tracking-wide hover:text-or-clair transition-colors"
        >
          ← Site vitrine
        </a>
        <Link
          href="/connexion"
          className="link-sc text-or border border-or/45 px-6 py-2.5 hover:bg-or hover:text-noir transition-all"
        >
          Se connecter
        </Link>
      </nav>
    </header>
  )
}

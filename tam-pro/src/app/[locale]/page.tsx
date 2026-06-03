import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('home')

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center text-center overflow-hidden">
      {/* Fond hero */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-loire.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-noir/75 via-noir/55 to-noir" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 max-w-3xl px-6 anim-fade-up">
        <span className="surtitre justify-center mb-6">
          <i />
          {t('surtitre')}
          <i />
        </span>
        <h1 className="font-titre text-white text-5xl md:text-7xl leading-tight mb-6">
          {t('titlePre')} <em className="italic text-or-clair">{t('titleEm')}</em>
          <br />
          {t('titlePost')}
        </h1>
        <p className="text-gris-doux text-lg max-w-2xl mx-auto mb-10">{t('lede')}</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/boutique"
            className="font-sc uppercase tracking-[0.2em] text-[0.78rem] bg-or text-noir px-8 py-4 hover:bg-or-clair transition-colors"
          >
            {t('ctaBuy')}
          </Link>
          <Link
            href="/oenotourisme"
            className="font-sc uppercase tracking-[0.2em] text-[0.78rem] text-or border border-or/45 px-8 py-4 hover:bg-or hover:text-noir transition-all"
          >
            {t('ctaExp')}
          </Link>
        </div>
      </div>

      <span className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 font-sc text-[0.65rem] tracking-[0.3em] text-or-clair/70 uppercase">
        {t('scroll')}
      </span>
    </section>
  )
}

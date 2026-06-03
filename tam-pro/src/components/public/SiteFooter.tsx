import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export function SiteFooter() {
  const t = useTranslations('footer')
  const nav = useTranslations('nav')

  return (
    <footer className="bg-noir border-t border-or/20 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid gap-10 md:grid-cols-4">
        {/* Maison */}
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-tam-officiel.png" alt="" className="h-16 w-auto mb-4" />
          <p className="font-titre italic text-or-clair text-lg">{t('baseline')}</p>
        </div>

        {/* Explorer */}
        <div>
          <h3 className="surtitre text-sm mb-4">{t('explorer')}</h3>
          <ul className="space-y-2 text-sm text-gris-doux">
            <li><Link href="/boutique" className="hover:text-or-clair">{nav('boutique')}</Link></li>
            <li><Link href="/formations" className="hover:text-or-clair">{nav('formations')}</Link></li>
            <li><Link href="/oenotourisme" className="hover:text-or-clair">{nav('oenotourisme')}</Link></li>
            <li><Link href="/blog" className="hover:text-or-clair">{nav('blog')}</Link></li>
            <li><Link href="/association" className="hover:text-or-clair">{nav('association')}</Link></li>
          </ul>
        </div>

        {/* Professionnels */}
        <div>
          <h3 className="surtitre text-sm mb-4">{t('professionnels')}</h3>
          <ul className="space-y-2 text-sm text-gris-doux">
            <li><a href="/espace-chr" className="hover:text-or-clair">{t('espaceChr')}</a></li>
            <li><a href="/espace-export" className="hover:text-or-clair">{t('espaceExport')}</a></li>
            <li><a href="/inscription-chr" className="hover:text-or-clair">{t('devenirPartenaire')}</a></li>
            <li><a href="/connexion" className="hover:text-or-clair">{t('connexion')}</a></li>
          </ul>
        </div>

        {/* Légal & Contact + Newsletter */}
        <div>
          <h3 className="surtitre text-sm mb-4">{t('legal')}</h3>
          <ul className="space-y-2 text-sm text-gris-doux mb-5">
            <li><Link href="/cgv" className="hover:text-or-clair">{t('cgv')}</Link></li>
            <li><Link href="/mentions-legales" className="hover:text-or-clair">{t('mentions')}</Link></li>
            <li><Link href="/contact" className="hover:text-or-clair">{nav('contact')}</Link></li>
          </ul>
          <p className="font-sc text-[0.7rem] tracking-[0.18em] uppercase text-or-clair mb-2">
            {t('newsletterTitle')}
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder={t('newsletterPlaceholder')}
              className="flex-1 bg-noir-3 border border-or/20 px-3 py-2 text-xs text-ivoire focus:border-or focus:outline-none placeholder:text-gris"
            />
            <button type="button" className="font-sc uppercase bg-or text-noir px-3 py-2 text-[0.62rem] tracking-[0.18em] hover:bg-or-clair transition-colors">
              {t('newsletterCta')}
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-or/10 py-5 text-center px-6">
        <p className="font-sc text-[0.7rem] text-gris tracking-[0.18em]">
          © 2026 Terres d'Afrique &amp; Millésimes — {t('siret')}
        </p>
        <p className="font-sc text-[0.62rem] text-[#7a766c] tracking-[0.16em] uppercase mt-2">
          {t('modere')}
        </p>
      </div>
    </footer>
  )
}

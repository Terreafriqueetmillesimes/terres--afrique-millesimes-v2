import Link from 'next/link'
import { HeaderPublic } from '@/components/layout/HeaderPublic'
import { Footer } from '@/components/layout/Footer'
import { ButtonLink } from '@/components/ui/Button'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <HeaderPublic />

      {/* HERO */}
      <section className="text-center px-8 pt-24 pb-12 max-w-4xl mx-auto anim-fade-up" style={{ animationDelay: '0.08s' }}>
        <span className="surtitre mb-6">
          <i /> Espace réservé · accès professionnel <i />
        </span>
        <h1 className="font-titre text-white text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6">
          L'espace partenaires<br />
          <em className="text-or-clair italic font-medium">Terres d'Afrique &amp; Millésimes</em>
        </h1>
        <p className="text-lg text-[#cfc9bb] max-w-2xl mx-auto">
          Une sélection privée, des tarifs dédiés, un accompagnement sur mesure pour les acteurs
          de la restauration, de la distribution et de l'export.
        </p>
        <div className="flex items-center justify-center gap-4 mt-8 text-or-vieilli">
          <span className="w-20 h-px bg-gradient-to-r from-transparent via-or-vieilli to-transparent" />
          <span className="text-sm tracking-[0.6em]">✦</span>
          <span className="w-20 h-px bg-gradient-to-r from-transparent via-or-vieilli to-transparent" />
        </div>
      </section>

      {/* CHOIX UNIVERS */}
      <section className="px-8 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

          {/* CHR France */}
          <article className="bg-gradient-to-b from-noir-2 to-noir border border-or/20 p-12 relative overflow-hidden anim-fade-up transition-all duration-500 hover:-translate-y-1.5 hover:border-bordeaux/55 hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)] group" style={{ animationDelay: '0.28s' }}>
            <span className="absolute top-0 left-0 right-0 h-[3px] bg-bordeaux-clair group-hover:h-[5px] transition-all" />
            <span className="absolute -top-[30%] -right-[30%] w-[60%] h-[60%] rounded-full opacity-[0.06] group-hover:opacity-[0.12] transition-opacity pointer-events-none" style={{ background: 'radial-gradient(circle, #8B1E2D, transparent 70%)' }} />

            <span className="inline-block font-sc text-[0.7rem] tracking-[0.38em] uppercase px-3.5 py-1.5 mb-6 border bg-bordeaux/18 text-bordeaux-clair border-bordeaux/55 relative z-[2]">
              CHR · France
            </span>
            <h2 className="font-titre text-white text-5xl leading-none mb-4 relative z-[2]">
              CHR<br /><em className="text-[#A52A3A] italic font-medium">France</em>
            </h2>
            <p className="font-titre italic text-or-pale text-lg mb-7 relative z-[2]">
              Tarifs professionnels HT, catalogue dédié, accompagnement commercial sur mesure.
            </p>
            <ul className="mb-8 relative z-[2] space-y-0">
              {['Restaurants', 'Hôtels & groupes hôteliers', 'Bars à vins & cocktails', 'Cavistes', 'Traiteurs & événementiel'].map((p) => (
                <li key={p} className="flex items-center gap-3 py-2 text-[#c4bfb2] text-[0.96rem] border-b border-dashed border-or/10 last:border-b-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-bordeaux-clair flex-shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-6 relative z-[2]">
              <ButtonLink variant="bordeaux" href="/inscription-chr">
                Créer mon compte CHR
              </ButtonLink>
              <Link href="/connexion" className="link-sc text-gris hover:text-or-clair">
                Me connecter <span className="inline-block ml-1">↗</span>
              </Link>
            </div>
          </article>

          {/* Export Afrique */}
          <article className="bg-gradient-to-b from-noir-2 to-noir border border-or/20 p-12 relative overflow-hidden anim-fade-up transition-all duration-500 hover:-translate-y-1.5 hover:border-terre/55 hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)] group" style={{ animationDelay: '0.42s' }}>
            <span className="absolute top-0 left-0 right-0 h-[3px] bg-terre-clair group-hover:h-[5px] transition-all" />
            <span className="absolute -top-[30%] -right-[30%] w-[60%] h-[60%] rounded-full opacity-[0.06] group-hover:opacity-[0.12] transition-opacity pointer-events-none" style={{ background: 'radial-gradient(circle, #A97142, transparent 70%)' }} />

            <span className="inline-block font-sc text-[0.7rem] tracking-[0.38em] uppercase px-3.5 py-1.5 mb-6 border bg-terre/18 text-terre-clair border-terre/55 relative z-[2]">
              Export · Afrique
            </span>
            <h2 className="font-titre text-white text-5xl leading-none mb-4 relative z-[2]">
              Export<br /><em className="text-[#C28B55] italic font-medium">Afrique</em>
            </h2>
            <p className="font-titre italic text-or-pale text-lg mb-7 relative z-[2]">
              Catalogue export, cotation transport, conditions logistiques et suivi des commandes par conteneur.
            </p>
            <ul className="mb-8 relative z-[2] space-y-0">
              {['Importateurs', 'Distributeurs & grossistes', 'Groupes hôteliers internationaux', 'Cavistes & spécialistes', 'Centrales d\'achat'].map((p) => (
                <li key={p} className="flex items-center gap-3 py-2 text-[#c4bfb2] text-[0.96rem] border-b border-dashed border-or/10 last:border-b-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-terre-clair flex-shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-6 relative z-[2]">
              <ButtonLink variant="terre" href="/inscription-export">
                Créer mon compte Export
              </ButtonLink>
              <Link href="/connexion" className="link-sc text-gris hover:text-or-clair">
                Me connecter <span className="inline-block ml-1">↗</span>
              </Link>
            </div>
          </article>

        </div>
      </section>

      {/* VALIDATION MENTION */}
      <section className="text-center px-8 py-16 border-t border-or/10 bg-gradient-to-b from-transparent to-noir-2/60 anim-fade-up" style={{ animationDelay: '0.7s' }}>
        <p className="font-titre italic text-or-clair text-2xl md:text-3xl max-w-3xl mx-auto leading-snug mb-4 before:content-['«'] before:text-or-vieilli before:text-[1.3em] before:mx-2 after:content-['»'] after:text-or-vieilli after:text-[1.3em] after:mx-2">
          Validation manuelle de votre compte sous 48 heures ouvrées.
        </p>
        <p className="text-sm text-gris-doux max-w-2xl mx-auto">
          Notre équipe vérifie vos documents et active votre accès personnalisé. Le{' '}
          <strong className="text-or font-medium">catalogue est ensuite envoyé par e-mail</strong>,
          accompagné de vos identifiants d'accès à l'espace partenaire.
        </p>
      </section>

      <Footer />
    </div>
  )
}

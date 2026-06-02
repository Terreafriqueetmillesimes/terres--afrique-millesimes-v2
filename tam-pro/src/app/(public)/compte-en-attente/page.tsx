import Link from 'next/link'
import { HeaderPublic } from '@/components/layout/HeaderPublic'
import { Footer } from '@/components/layout/Footer'

export const metadata = {
  title: 'Compte en attente de validation',
}

export default function CompteEnAttentePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderPublic />

      <main className="flex-1 px-6 py-24 max-w-2xl mx-auto text-center">
        <span className="surtitre mb-4"><i /> Inscription reçue <i /></span>
        <h1 className="font-titre text-white text-5xl mb-6">
          Votre compte est <em className="italic text-or-clair">en cours de validation</em>
        </h1>

        <div className="text-or-clair text-7xl mb-8">⧗</div>

        <p className="text-lg text-gris-doux mb-4 leading-relaxed">
          Notre équipe vérifie vos informations sous <strong className="text-or">48 heures
          ouvrées</strong>. Vous recevrez ensuite un e-mail confirmant la validation de votre
          compte, accompagné du catalogue.
        </p>
        <p className="text-sm text-gris italic mb-12">
          En attendant, votre tentative de connexion sera bloquée. Si vous n'avez pas reçu
          d'e-mail de confirmation d'inscription, vérifiez vos spams.
        </p>

        <Link
          href="/"
          className="link-sc text-or border border-or/45 px-6 py-3 inline-block hover:bg-or hover:text-noir transition-all"
        >
          Retour à l'accueil
        </Link>
      </main>

      <Footer />
    </div>
  )
}

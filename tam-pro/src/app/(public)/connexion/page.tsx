import { HeaderPublic } from '@/components/layout/HeaderPublic'
import { Footer } from '@/components/layout/Footer'
import { ConnexionForm } from '@/components/forms/ConnexionForm'

export const metadata = {
  title: 'Connexion',
}

export default function ConnexionPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderPublic />

      <main className="flex-1 px-6 py-20 max-w-md mx-auto w-full">
        <header className="text-center mb-8">
          <span className="surtitre mb-4"><i /> Espace pro <i /></span>
          <h1 className="text-4xl text-white">Connexion</h1>
        </header>

        <div className="bg-noir-2 border border-or/15 p-8">
          <ConnexionForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}

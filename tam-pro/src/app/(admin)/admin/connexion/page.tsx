import { ConnexionForm } from '@/components/forms/ConnexionForm'

export const metadata = { title: 'Connexion administrateur' }

export default function AdminConnexionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-noir">
      <main className="flex-1 px-6 py-20 max-w-md mx-auto w-full">
        <header className="text-center mb-8">
          <span className="surtitre mb-4"><i /> Administration <i /></span>
          <h1 className="text-4xl text-white">Espace admin</h1>
          <p className="text-sm text-gris-doux mt-2">Accès réservé à l'équipe TAM</p>
        </header>
        <div className="bg-noir-2 border border-or/30 p-8">
          <ConnexionForm />
        </div>
      </main>
    </div>
  )
}

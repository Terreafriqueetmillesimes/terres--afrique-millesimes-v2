import { HeaderPublic } from '@/components/layout/HeaderPublic'
import { Footer } from '@/components/layout/Footer'
import { InscriptionForm } from '@/components/forms/InscriptionForm'

export const metadata = {
  title: 'Créer mon compte CHR',
}

export default function InscriptionCHRPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderPublic />
      <div className="univers-banner chr">CHR France · Bordeaux Vin</div>

      <main className="flex-1 px-6 py-16 max-w-3xl mx-auto w-full">
        <header className="text-center mb-10">
          <span className="surtitre mb-4"><i /> Inscription <i /></span>
          <h1 className="text-4xl md:text-5xl text-white mb-3">
            Créer mon compte <em className="text-bordeaux-hover italic">CHR France</em>
          </h1>
          <p className="text-gris-doux text-base md:text-lg max-w-2xl mx-auto">
            Restaurants · Hôtels · Bars à vins · Cavistes · Traiteurs
          </p>
        </header>

        <div className="bg-noir-2 border border-or/15 p-8 md:p-10">
          <InscriptionForm type="chr" />
        </div>
      </main>

      <Footer />
    </div>
  )
}

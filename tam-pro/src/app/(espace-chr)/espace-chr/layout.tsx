import { HeaderProtected } from '@/components/layout/HeaderProtected'
import { Footer } from '@/components/layout/Footer'
import { Sidebar } from '@/components/layout/Sidebar'
import { MOCK_COMPTES_PRO } from '@/lib/mock/data'

const CHR_NAV = [
  { href: '/espace-chr', label: 'Tableau de bord', icon: '🏠' },
  { href: '/espace-chr/catalogue', label: 'Catalogue HT', icon: '📕' },
  { href: '/espace-chr/demande-devis', label: 'Demande de devis', icon: '📝' },
  { href: '/espace-chr/demande-rdv', label: 'Demande de RDV', icon: '📅' },
  { href: '/espace-chr/historique', label: 'Historique', icon: '📊' },
  { href: '/espace-chr/profil', label: 'Mon profil', icon: '👤' },
]

export default function EspaceCHRLayout({ children }: { children: React.ReactNode }) {
  // V1 mock : compte CHR actif (compte-001)
  const compte = MOCK_COMPTES_PRO.find((c) => c.id === 'compte-001')!

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderProtected univers="chr" raisonSociale={compte.societe} />
      <div className="flex-1 flex">
        <Sidebar univers="chr" items={CHR_NAV} />
        <main className="flex-1 p-8 max-w-6xl">{children}</main>
      </div>
      <Footer />
    </div>
  )
}

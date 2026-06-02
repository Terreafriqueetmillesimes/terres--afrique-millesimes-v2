import { HeaderProtected } from '@/components/layout/HeaderProtected'
import { Footer } from '@/components/layout/Footer'
import { Sidebar } from '@/components/layout/Sidebar'
import { MOCK_COMPTES_PRO } from '@/lib/mock/data'

const EXPORT_NAV = [
  { href: '/espace-export', label: 'Tableau de bord', icon: '🏠' },
  { href: '/espace-export/catalogue', label: 'Catalogue Export', icon: '📕' },
  { href: '/espace-export/conditions-logistiques', label: 'Conditions logistiques', icon: '📋' },
  { href: '/espace-export/cotation-transport', label: 'Cotation transport', icon: '🚢' },
  { href: '/espace-export/demande-cotation', label: 'Cotation produits', icon: '📝' },
  { href: '/espace-export/demande-echantillons', label: 'Échantillons', icon: '🎁' },
  { href: '/espace-export/commandes', label: 'Mes commandes', icon: '📦' },
  { href: '/espace-export/profil', label: 'Mon profil', icon: '👤' },
]

export default function EspaceExportLayout({ children }: { children: React.ReactNode }) {
  const compte = MOCK_COMPTES_PRO.find((c) => c.id === 'compte-004')!

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderProtected univers="export" raisonSociale={compte.societe} />
      <div className="flex-1 flex">
        <Sidebar univers="export" items={EXPORT_NAV} />
        <main className="flex-1 p-8 max-w-6xl">{children}</main>
      </div>
      <Footer />
    </div>
  )
}

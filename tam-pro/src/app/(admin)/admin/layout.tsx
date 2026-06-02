import Link from 'next/link'
import { Footer } from '@/components/layout/Footer'
import { Sidebar } from '@/components/layout/Sidebar'
import { MOCK_COMPTES_PRO } from '@/lib/mock/data'

const enAttente = MOCK_COMPTES_PRO.filter((c) => c.statut === 'en_attente').length

const ADMIN_NAV = [
  { href: '/admin', label: 'Tableau de bord', icon: '🏠' },
  { href: '/admin/comptes', label: 'Comptes', icon: '👥', badge: enAttente },
  { href: '/admin/catalogues', label: 'Catalogues', icon: '📕' },
  { href: '/admin/demandes-chr', label: 'Demandes CHR', icon: '📝' },
  { href: '/admin/demandes-export', label: 'Demandes Export', icon: '📝' },
  { href: '/admin/commandes-export', label: 'Commandes Export', icon: '📦' },
  { href: '/admin/segments', label: 'Segments CRM', icon: '🏷' },
  { href: '/admin/campagnes', label: 'Campagnes', icon: '📢' },
  { href: '/admin/audit', label: 'Audit log', icon: '📜' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-8 py-5 flex justify-between items-center border-b border-or/20 bg-noir-2/50">
        <Link href="/admin" className="inline-flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-or-vieilli to-or flex items-center justify-center text-noir font-titre text-lg font-semibold">
            T
          </div>
          <span className="font-sc text-xs tracking-[0.3em] uppercase text-or">Administration</span>
        </Link>
        <div className="flex items-center gap-6">
          <span className="font-corps text-sm text-or-pale">Marie Louise Ticki</span>
          <Link href="/api/deconnexion" className="link-sc text-gris-doux hover:text-or-clair">
            Déconnexion ⎋
          </Link>
        </div>
      </header>
      <div className="flex-1 flex">
        <Sidebar univers="admin" items={ADMIN_NAV} />
        <main className="flex-1 p-8 max-w-7xl">{children}</main>
      </div>
      <Footer />
    </div>
  )
}

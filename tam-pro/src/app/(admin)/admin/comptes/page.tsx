import Link from 'next/link'
import { MOCK_COMPTES_PRO } from '@/lib/mock/data'
import { Card } from '@/components/ui/Card'
import { StatutBadge } from '@/components/ui/StatutBadge'

export const metadata = { title: 'Gestion des comptes' }

export default function ComptesPage() {
  return (
    <div className="space-y-6">
      <header>
        <span className="surtitre mb-2"><i /> Comptes professionnels <i /></span>
        <h1 className="text-4xl text-white">
          Gestion des <em className="italic text-or-clair">comptes</em>
        </h1>
      </header>

      {/* Filtres */}
      <div className="flex flex-wrap gap-2">
        <button className="px-3 py-1.5 bg-or text-noir font-sc text-xs tracking-wider uppercase">
          Tous ({MOCK_COMPTES_PRO.length})
        </button>
        <button className="px-3 py-1.5 border border-or/40 text-or-clair font-sc text-xs tracking-wider uppercase hover:bg-or/10">
          En attente ({MOCK_COMPTES_PRO.filter((c) => c.statut === 'en_attente').length})
        </button>
        <button className="px-3 py-1.5 border border-emerald-500/40 text-emerald-400 font-sc text-xs tracking-wider uppercase hover:bg-emerald-500/10">
          Acceptés ({MOCK_COMPTES_PRO.filter((c) => c.statut === 'actif').length})
        </button>
        <button className="px-3 py-1.5 border border-red-500/40 text-red-400 font-sc text-xs tracking-wider uppercase hover:bg-red-500/10">
          Refusés ({MOCK_COMPTES_PRO.filter((c) => c.statut === 'refuse').length})
        </button>
      </div>

      <Card className="!p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-noir-3">
            <tr className="text-left font-sc text-xs tracking-wider uppercase text-or-pale">
              <th className="px-5 py-3">Société · Contact</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Pays</th>
              <th className="px-5 py-3">Inscription</th>
              <th className="px-5 py-3">Statut</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {MOCK_COMPTES_PRO.map((c) => (
              <tr key={c.id} className="border-t border-or/10 hover:bg-or/5 transition-colors">
                <td className="px-5 py-4">
                  <p className="text-white">{c.societe}</p>
                  <p className="text-xs text-gris">{c.nom_contact} · {c.email_pro}</p>
                </td>
                <td className="px-5 py-4">
                  <span className={`font-sc text-[0.65rem] uppercase tracking-wider px-2 py-1 border ${c.type === 'chr' ? 'text-bordeaux-hover border-bordeaux/55' : 'text-terre-hover border-terre/55'}`}>
                    {c.type === 'chr' ? 'CHR' : 'Export'}
                  </span>
                </td>
                <td className="px-5 py-4 text-gris-doux">{c.pays_nom}</td>
                <td className="px-5 py-4 text-xs text-gris-doux">
                  {new Date(c.date_inscription).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-5 py-4">
                  <StatutBadge statut={c.statut} />
                </td>
                <td className="px-5 py-4 text-right">
                  <Link href={`/admin/comptes/${c.id}`} className="link-sc text-or-clair hover:text-or">
                    Voir →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

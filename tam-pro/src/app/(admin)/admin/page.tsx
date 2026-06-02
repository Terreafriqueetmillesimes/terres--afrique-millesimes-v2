import Link from 'next/link'
import { KPICard } from '@/components/ui/KPICard'
import { StatutBadge } from '@/components/ui/StatutBadge'
import { Card } from '@/components/ui/Card'
import { KPI_MOCK, MOCK_COMPTES_PRO, MOCK_DEMANDES } from '@/lib/mock/data'

export default function AdminDashboardPage() {
  const enAttente = MOCK_COMPTES_PRO.filter((c) => c.statut === 'en_attente')
  const demandesDuJour = MOCK_DEMANDES.slice(0, 5)

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <span className="surtitre mb-2"><i /> Administration <i /></span>
          <h1 className="text-4xl text-white">Vue d'ensemble</h1>
        </div>
        <select className="bg-noir-2 border border-or/30 px-3 py-2 text-sm text-or-pale font-sc">
          <option>30 derniers jours</option>
          <option>7 derniers jours</option>
          <option>Total</option>
        </select>
      </header>

      {/* 6 KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <KPICard label="Comptes CHR créés" value={KPI_MOCK.comptes_chr.total} trend={{ value: KPI_MOCK.comptes_chr.trend }} />
        <KPICard label="Comptes Export créés" value={KPI_MOCK.comptes_export.total} trend={{ value: KPI_MOCK.comptes_export.trend }} />
        <KPICard label="Taux de validation" value={`${KPI_MOCK.taux_validation.value} %`} trend={{ value: KPI_MOCK.taux_validation.trend, suffix: ' pts' }} />
        <KPICard label="Demandes de devis" value={KPI_MOCK.demandes_devis.total} trend={{ value: KPI_MOCK.demandes_devis.trend }} />
        <KPICard label="Téléchargements catalogue" value={KPI_MOCK.telechargements_catalogue.total} trend={{ value: KPI_MOCK.telechargements_catalogue.trend }} />
        <KPICard label="Conversion devis → commande" value={`${KPI_MOCK.taux_conversion.value} %`} trend={{ value: KPI_MOCK.taux_conversion.trend, suffix: ' pts' }} />
      </div>

      {/* Comptes en attente */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="surtitre"><i /> Comptes en attente de validation ({enAttente.length})</h2>
          <Link href="/admin/comptes" className="link-sc text-or-clair hover:text-or">Voir tous →</Link>
        </div>
        <Card className="!p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-noir-3">
              <tr className="text-left font-sc text-xs tracking-wider uppercase text-or-pale">
                <th className="px-5 py-3">Société</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Pays</th>
                <th className="px-5 py-3">Inscription</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {enAttente.map((c) => (
                <tr key={c.id} className="border-t border-or/10 hover:bg-or/5">
                  <td className="px-5 py-3">
                    <p className="text-white">{c.societe}</p>
                    <p className="text-xs text-gris">{c.email_pro}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`font-sc text-[0.65rem] uppercase tracking-wider ${c.type === 'chr' ? 'text-bordeaux-hover' : 'text-terre-hover'}`}>
                      {c.type === 'chr' ? 'CHR' : 'Export'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gris-doux">{c.pays_nom}</td>
                  <td className="px-5 py-3 text-xs text-gris-doux">
                    {new Date(c.date_inscription).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link href={`/admin/comptes/${c.id}`} className="link-sc text-or-clair hover:text-or">
                      Voir →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>

      {/* Demandes du jour */}
      <section>
        <h2 className="surtitre mb-4"><i /> Demandes du jour ({demandesDuJour.length})</h2>
        <div className="space-y-2">
          {demandesDuJour.map((d) => (
            <Card key={d.id} className="!p-4 flex items-center gap-4">
              <span className="font-sc text-[0.65rem] uppercase tracking-wider text-or-pale">{d.type}</span>
              <span className="text-sm text-white">#{d.id}</span>
              <span className="text-xs text-gris flex-1 truncate">{d.message_client}</span>
              <StatutBadge statut={d.statut} />
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

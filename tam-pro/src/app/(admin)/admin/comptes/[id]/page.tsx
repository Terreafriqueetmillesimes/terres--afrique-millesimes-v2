import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MOCK_COMPTES_PRO } from '@/lib/mock/data'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { StatutBadge } from '@/components/ui/StatutBadge'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const compte = MOCK_COMPTES_PRO.find((c) => c.id === id)
  return { title: compte ? `Compte · ${compte.societe}` : 'Compte non trouvé' }
}

export default async function FicheComptePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const compte = MOCK_COMPTES_PRO.find((c) => c.id === id)
  if (!compte) notFound()

  return (
    <div className="space-y-6 max-w-4xl">
      <nav className="text-sm text-gris-doux">
        <Link href="/admin/comptes" className="hover:text-or-clair">← Tous les comptes</Link>
      </nav>

      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl text-white">🏢 {compte.societe}</h1>
          <p className="text-sm text-gris-doux mt-1">
            Inscrit le {new Date(compte.date_inscription).toLocaleDateString('fr-FR')} à{' '}
            {new Date(compte.date_inscription).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <StatutBadge statut={compte.statut} />
      </header>

      <Card>
        <h2 className="font-sc text-xs tracking-wider uppercase text-or-clair mb-4">Informations</h2>
        <dl className="grid md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
          <Info label="Type" value={
            <span className={`font-sc uppercase tracking-wider ${compte.type === 'chr' ? 'text-bordeaux-hover' : 'text-terre-hover'}`}>
              {compte.type === 'chr' ? 'CHR France' : 'Export Afrique'}
            </span>
          } />
          <Info label="Société" value={compte.societe} />
          <Info label="Contact" value={compte.nom_contact} />
          <Info label="Email" value={<a href={`mailto:${compte.email_pro}`} className="text-or-clair hover:underline">{compte.email_pro}</a>} />
          <Info label="Téléphone" value={compte.telephone} />
          <Info label="Pays" value={compte.pays_nom} />
          {compte.motif_refus && (
            <Info label="Motif de refus" value={<span className="text-red-400">{compte.motif_refus}</span>} />
          )}
        </dl>
      </Card>

      {/* Actions */}
      {compte.statut === 'en_attente' && (
        <Card>
          <h2 className="font-sc text-xs tracking-wider uppercase text-or-clair mb-4">Actions de validation</h2>
          <p className="text-sm text-gris-doux mb-5">
            Vérifiez les informations ci-dessus, puis validez ou refusez ce compte. Le client sera
            notifié par e-mail.
          </p>
          <div className="flex flex-wrap gap-3">
            <form action="/api/admin/valider-compte" method="POST">
              <input type="hidden" name="compte_id" value={compte.id} />
              <Button type="submit" variant="or" className="bg-emerald-500 border-emerald-500 hover:bg-emerald-600 hover:border-emerald-600 text-white">
                ✓ Valider le compte
              </Button>
            </form>
            <Button variant="outline-or" className="border-red-500/45 text-red-400 hover:bg-red-500/10 hover:text-red-300">
              ✗ Refuser (modal motif)
            </Button>
          </div>
        </Card>
      )}

      {compte.statut === 'actif' && (
        <Card>
          <h2 className="font-sc text-xs tracking-wider uppercase text-or-clair mb-2">Compte actif</h2>
          <p className="text-sm text-gris-doux">
            Validé le {compte.date_validation && new Date(compte.date_validation).toLocaleDateString('fr-FR')}.
          </p>
          <div className="mt-4">
            <Button variant="outline-or" className="border-gris/45 text-gris-doux">
              Suspendre le compte
            </Button>
          </div>
        </Card>
      )}

      {compte.statut === 'refuse' && (
        <Card>
          <p className="text-sm text-gris-doux">
            Compte refusé. Le client doit recréer un compte pour soumettre une nouvelle demande.
          </p>
        </Card>
      )}
    </div>
  )
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <>
      <dt className="text-gris">{label}</dt>
      <dd className="text-white mb-2">{value}</dd>
    </>
  )
}

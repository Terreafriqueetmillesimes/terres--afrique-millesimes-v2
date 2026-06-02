import { cn } from '@/lib/utils/cn'

export type StatutCompte = 'en_attente' | 'actif' | 'refuse' | 'suspendu'
export type StatutDemande = 'nouvelle' | 'en_cours' | 'repondue' | 'acceptee' | 'refusee_client' | 'convertie' | 'cloturee'
export type StatutCommande = 'confirmee' | 'paiement_recu' | 'en_preparation' | 'expediee' | 'livree' | 'annulee'

type Statut = StatutCompte | StatutDemande | StatutCommande

const labels: Record<Statut, string> = {
  // Compte
  en_attente: 'En attente',
  actif: 'Actif',
  refuse: 'Refusé',
  suspendu: 'Suspendu',
  // Demande
  nouvelle: 'Nouvelle',
  en_cours: 'En cours',
  repondue: 'Répondue',
  acceptee: 'Acceptée',
  refusee_client: 'Refusée',
  convertie: 'Convertie',
  cloturee: 'Clôturée',
  // Commande
  confirmee: 'Confirmée',
  paiement_recu: 'Paiement reçu',
  en_preparation: 'En préparation',
  expediee: 'Expédiée',
  livree: 'Livrée',
  annulee: 'Annulée',
}

const styles: Record<Statut, string> = {
  // Compte
  en_attente: 'bg-or/10 text-or-clair border-or/30',
  actif: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  refuse: 'bg-red-500/15 text-red-400 border-red-500/40',
  suspendu: 'bg-gris/15 text-gris-doux border-gris/40',
  // Demande
  nouvelle: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  en_cours: 'bg-or/10 text-or-clair border-or/30',
  repondue: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  acceptee: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
  refusee_client: 'bg-red-500/10 text-red-400 border-red-500/30',
  convertie: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
  cloturee: 'bg-gris/10 text-gris-doux border-gris/30',
  // Commande
  confirmee: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  paiement_recu: 'bg-or/15 text-or-clair border-or/40',
  en_preparation: 'bg-or/10 text-or-clair border-or/30',
  expediee: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  livree: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
  annulee: 'bg-red-500/10 text-red-400 border-red-500/30',
}

export function StatutBadge({ statut, className }: { statut: Statut; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 font-sc uppercase text-[0.65rem] border tracking-[0.18em]',
        styles[statut],
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {labels[statut]}
    </span>
  )
}

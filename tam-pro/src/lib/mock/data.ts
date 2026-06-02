/**
 * Données mock pour développement local sans Supabase.
 * À remplacer par des appels Supabase réels en Phase 2.6+.
 */

export type StatutCompte = 'en_attente' | 'actif' | 'refuse'

export type ComptePro = {
  id: string
  type: 'chr' | 'export'
  statut: StatutCompte
  societe: string
  nom_contact: string
  email_pro: string
  telephone: string
  pays: string
  pays_nom: string
  date_inscription: string
  date_validation?: string
  motif_refus?: string
}

export type Produit = {
  sku: string
  nom: string
  domaine: string
  region: string
  appellation: string
  categorie: string
  millesime?: number
  prix_ht_chr: number
  prix_exw_export: number
  prix_ttc_particulier: number
}

export type Demande = {
  id: string
  compte_id: string
  type: 'devis' | 'cotation' | 'rdv' | 'echantillons'
  statut: 'nouvelle' | 'en_cours' | 'repondue' | 'acceptee' | 'cloturee'
  date_creation: string
  message_client?: string
  reponse_admin?: string
}

export const MOCK_COMPTES_PRO: ComptePro[] = [
  {
    id: 'compte-001',
    type: 'chr',
    statut: 'actif',
    societe: 'Restaurant Le Médoc',
    nom_contact: 'Jean Dupont',
    email_pro: 'contact@lemedoc.fr',
    telephone: '+33 1 42 86 87 88',
    pays: 'FR',
    pays_nom: 'France',
    date_inscription: '2026-05-12T09:14:00Z',
    date_validation: '2026-05-13T10:30:00Z',
  },
  {
    id: 'compte-002',
    type: 'chr',
    statut: 'en_attente',
    societe: 'Le Riad Casa',
    nom_contact: 'Hicham Benali',
    email_pro: 'achats@riadcasa.ma',
    telephone: '+212 522 33 44 55',
    pays: 'MA',
    pays_nom: 'Maroc',
    date_inscription: '2026-05-27T11:02:00Z',
  },
  {
    id: 'compte-003',
    type: 'export',
    statut: 'en_attente',
    societe: 'Diallo SARL Import',
    nom_contact: 'Mohamed Diallo',
    email_pro: 'm.diallo@diallo-import.ci',
    telephone: '+225 07 12 34 56 78',
    pays: 'CI',
    pays_nom: 'Côte d\'Ivoire',
    date_inscription: '2026-05-27T09:14:00Z',
  },
  {
    id: 'compte-004',
    type: 'export',
    statut: 'actif',
    societe: 'Cameroun Wine Imports',
    nom_contact: 'Aïssa Nkomo',
    email_pro: 'aissa@cmrwine.cm',
    telephone: '+237 6 99 88 77 66',
    pays: 'CM',
    pays_nom: 'Cameroun',
    date_inscription: '2026-04-22T08:00:00Z',
    date_validation: '2026-04-23T14:20:00Z',
  },
  {
    id: 'compte-005',
    type: 'chr',
    statut: 'refuse',
    societe: 'Société test refus',
    nom_contact: 'Pierre Martin',
    email_pro: 'test@example.com',
    telephone: '+33 6 00 00 00 00',
    pays: 'FR',
    pays_nom: 'France',
    date_inscription: '2026-05-10T15:30:00Z',
    motif_refus: 'SIRET non vérifiable, activité non conforme.',
  },
]

export const MOCK_PRODUITS: Produit[] = [
  {
    sku: 'LESTAGE-2019',
    nom: 'Château Lestage Simon',
    domaine: 'Cru Bourgeois',
    region: 'Bordeaux',
    appellation: 'AOC Haut-Médoc',
    categorie: 'Vin rouge',
    millesime: 2019,
    prix_ht_chr: 21.5,
    prix_exw_export: 19.0,
    prix_ttc_particulier: 34.2,
  },
  {
    sku: 'BOUCHARD-2020',
    nom: 'Domaine Jean Bouchard',
    domaine: 'Vieilles Vignes',
    region: 'Bourgogne',
    appellation: 'AOC Gevrey-Chambertin',
    categorie: 'Vin rouge',
    millesime: 2020,
    prix_ht_chr: 51.0,
    prix_exw_export: 45.0,
    prix_ttc_particulier: 81.6,
  },
  {
    sku: 'CHARPENTIER-BRUT',
    nom: 'Champagne J. Charpentier',
    domaine: 'Cuvée Réserve',
    region: 'Champagne',
    appellation: 'AOC Champagne',
    categorie: 'Champagne',
    prix_ht_chr: 24.5,
    prix_exw_export: 22.0,
    prix_ttc_particulier: 39.0,
  },
]

export const MOCK_DEMANDES: Demande[] = [
  {
    id: 'D1247',
    compte_id: 'compte-001',
    type: 'devis',
    statut: 'repondue',
    date_creation: '2026-05-25T14:20:00Z',
    message_client: '12 bouteilles Lestage + 6 Champagne pour service Noël',
    reponse_admin: 'Devis envoyé, 1 240 € HT FCO Paris.',
  },
  {
    id: 'D1245',
    compte_id: 'compte-001',
    type: 'devis',
    statut: 'en_cours',
    date_creation: '2026-05-22T10:15:00Z',
    message_client: 'Demande prix volume cuvée Bouchard',
  },
  {
    id: 'D1242',
    compte_id: 'compte-001',
    type: 'rdv',
    statut: 'acceptee',
    date_creation: '2026-05-20T16:00:00Z',
    message_client: 'RDV présentation gamme automne',
    reponse_admin: 'RDV fixé le 04/06 à 15h dans nos bureaux Versailles.',
  },
]

export const KPI_MOCK = {
  comptes_chr: { total: 142, trend: 12 },
  comptes_export: { total: 87, trend: 8 },
  taux_validation: { value: 78, trend: 3 },
  demandes_devis: { total: 58, trend: 14 },
  telechargements_catalogue: { total: 203, trend: 47 },
  taux_conversion: { value: 34, trend: 5 },
}

export const PAYS_LISTE = [
  { code: 'FR', nom: 'France' },
  { code: 'BE', nom: 'Belgique' },
  { code: 'CH', nom: 'Suisse' },
  { code: 'LU', nom: 'Luxembourg' },
  { code: 'CM', nom: 'Cameroun' },
  { code: 'CI', nom: 'Côte d\'Ivoire' },
  { code: 'SN', nom: 'Sénégal' },
  { code: 'GA', nom: 'Gabon' },
  { code: 'MA', nom: 'Maroc' },
  { code: 'TN', nom: 'Tunisie' },
  { code: 'DZ', nom: 'Algérie' },
  { code: 'BJ', nom: 'Bénin' },
  { code: 'BF', nom: 'Burkina Faso' },
  { code: 'CD', nom: 'République démocratique du Congo' },
  { code: 'CG', nom: 'République du Congo' },
  { code: 'GH', nom: 'Ghana' },
  { code: 'KE', nom: 'Kenya' },
  { code: 'ML', nom: 'Mali' },
  { code: 'MR', nom: 'Mauritanie' },
  { code: 'NE', nom: 'Niger' },
  { code: 'NG', nom: 'Nigeria' },
  { code: 'RW', nom: 'Rwanda' },
  { code: 'TG', nom: 'Togo' },
  { code: 'TZ', nom: 'Tanzanie' },
  { code: 'UG', nom: 'Ouganda' },
  { code: 'ZA', nom: 'Afrique du Sud' },
  { code: 'AUTRE', nom: 'Autre pays' },
]

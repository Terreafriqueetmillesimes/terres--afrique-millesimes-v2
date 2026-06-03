-- ============================================================
-- TAM · Migration 0003 · Phase 2 — Socle e-commerce
-- Multi-devises, multi-paiements, commandes B2C, TVA, livraison.
-- CONFIG-DRIVEN : ajouter une devise / un pays / un moyen de paiement
-- = simple INSERT (voir 0004_phase2_seeds.sql), AUCUN changement de code.
-- ============================================================

-- ---------- DEVISES (table, pas enum → extensible) ----------
CREATE TABLE devises (
  code       TEXT PRIMARY KEY,              -- 'EUR','USD','XAF','XOF','CDF',...
  libelle    TEXT NOT NULL,
  symbole    TEXT NOT NULL,
  decimales  SMALLINT NOT NULL DEFAULT 2,   -- XAF/XOF/CDF = 0
  arrondi    NUMERIC NOT NULL DEFAULT 0.01, -- pas d'arrondi spécial = 0.01
  flottante  BOOLEAN NOT NULL DEFAULT FALSE,-- CDF = true (taux à actualiser)
  actif      BOOLEAN NOT NULL DEFAULT TRUE
);

-- Conversion = FALLBACK (les prix explicites par devise priment)
CREATE TABLE taux_change (
  devise_cible TEXT PRIMARY KEY REFERENCES devises(code),
  taux         NUMERIC NOT NULL,            -- 1 EUR = taux × devise_cible
  maj_le       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------- FOURNISSEURS DE PAIEMENT (table, pas enum) ----------
CREATE TABLE fournisseurs_paiement (
  code    TEXT PRIMARY KEY,                 -- 'stripe','paypal','orange_money','mtn_momo',
                                            -- (futurs: 'airtel_money','wave','mpesa'...)
  libelle TEXT NOT NULL,
  type    TEXT NOT NULL CHECK (type IN ('carte','wallet','mobile_money')),
  actif   BOOLEAN NOT NULL DEFAULT TRUE
);

-- ---------- PAYS (configuration centrale) ----------
CREATE TABLE pays (
  code           TEXT PRIMARY KEY,          -- ISO-2 : 'FR','US','CM','CI','SN','CG','GA','CD'
  nom            TEXT NOT NULL,
  devise_code    TEXT NOT NULL REFERENCES devises(code),
  zone_tva       TEXT NOT NULL CHECK (zone_tva IN ('FR','EXPORT')),
  -- 5 zones de livraison administrables + fallback
  zone_livraison TEXT NOT NULL CHECK (zone_livraison IN
                   ('FR','EU','AF_CENTRALE','AF_OUEST','AM_NORD','AUTRE')),
  actif          BOOLEAN NOT NULL DEFAULT TRUE
);

-- Moyens de paiement disponibles PAR PAYS (M2M)
CREATE TABLE pays_paiement (
  pays_code        TEXT NOT NULL REFERENCES pays(code) ON DELETE CASCADE,
  fournisseur_code TEXT NOT NULL REFERENCES fournisseurs_paiement(code) ON DELETE CASCADE,
  priorite         SMALLINT NOT NULL DEFAULT 100,  -- ordre d'affichage (petit = haut)
  PRIMARY KEY (pays_code, fournisseur_code)
);

-- ---------- PRODUITS : extension multi-type e-commerce ----------
ALTER TABLE produits
  ADD COLUMN IF NOT EXISTS slug                TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS type                TEXT NOT NULL DEFAULT 'vin'
      CHECK (type IN ('vin','champagne','spiritueux','livre_papier',
                      'livre_numerique','produit_numerique','formation',
                      'billet_evenement','adhesion')),
  ADD COLUMN IF NOT EXISTS tva_categorie       TEXT NOT NULL DEFAULT 'vin',
  ADD COLUMN IF NOT EXISTS livraison_categorie TEXT NOT NULL DEFAULT 'standard'
      CHECK (livraison_categorie IN ('aucune','standard','alcool')),
  ADD COLUMN IF NOT EXISTS poids_g             INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS stock               INTEGER,            -- NULL = illimité
  ADD COLUMN IF NOT EXISTS age_minimum         SMALLINT,           -- 18 pour alcool
  ADD COLUMN IF NOT EXISTS fichier_numerique   TEXT,               -- ebook (lien sécurisé)
  ADD COLUMN IF NOT EXISTS evenement           JSONB,              -- {date,lieu,jauge} billets
  ADD COLUMN IF NOT EXISTS mis_en_avant        BOOLEAN NOT NULL DEFAULT FALSE;

-- PRIX EXPLICITES PAR DEVISE (administrables back-office)
CREATE TABLE produit_prix (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  produit_id UUID NOT NULL REFERENCES produits(id) ON DELETE CASCADE,
  devise     TEXT NOT NULL REFERENCES devises(code),
  canal      TEXT NOT NULL DEFAULT 'particulier'
             CHECK (canal IN ('particulier','chr','export')),
  prix       NUMERIC(12,2) NOT NULL,
  inclut_tva BOOLEAN NOT NULL DEFAULT TRUE,  -- particulier=TTC, export=HT
  actif      BOOLEAN NOT NULL DEFAULT TRUE,
  UNIQUE (produit_id, devise, canal)
);
CREATE INDEX idx_produit_prix_produit ON produit_prix(produit_id);

-- ---------- TVA (France + Export, pas d'OSS en V1) ----------
CREATE TABLE tva_taux (
  categorie TEXT NOT NULL,                  -- vin, champagne, spiritueux, livre_papier,
                                            -- livre_numerique, formation, billet_evenement
  zone      TEXT NOT NULL CHECK (zone IN ('FR','EXPORT')),
  taux      NUMERIC(5,4) NOT NULL DEFAULT 0,
  exonere   BOOLEAN NOT NULL DEFAULT FALSE, -- EXPORT hors UE = true (vente HT)
  PRIMARY KEY (categorie, zone)
);

-- ---------- LIVRAISON (grille par zone × catégorie × poids) ----------
CREATE TABLE livraison_tarifs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  zone        TEXT NOT NULL CHECK (zone IN
                ('FR','EU','AF_CENTRALE','AF_OUEST','AM_NORD','AUTRE')),
  categorie   TEXT NOT NULL CHECK (categorie IN ('standard','alcool')),
  poids_max_g INTEGER NOT NULL,             -- borne haute de la tranche
  tarif       NUMERIC(10,2) NOT NULL,
  devise      TEXT NOT NULL DEFAULT 'EUR' REFERENCES devises(code),
  delai       TEXT,
  sur_devis   BOOLEAN NOT NULL DEFAULT FALSE, -- alcool international = TRUE
  actif       BOOLEAN NOT NULL DEFAULT TRUE
);

-- ---------- CLIENTS B2C (invités autorisés) ----------
CREATE TABLE clients (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,  -- NULL = invité
  email        TEXT NOT NULL,
  nom          TEXT,
  pays         TEXT REFERENCES pays(code),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------- COMMANDES B2C (Particulier) ----------
CREATE TABLE commandes (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference         TEXT UNIQUE NOT NULL,            -- TAM-2026-00042
  client_id         UUID REFERENCES clients(id) ON DELETE SET NULL,
  email             TEXT NOT NULL,
  devise            TEXT NOT NULL REFERENCES devises(code),
  pays_facturation  TEXT NOT NULL REFERENCES pays(code),
  pays_livraison    TEXT NOT NULL REFERENCES pays(code),
  adresse_livraison JSONB NOT NULL,
  tva_regime        TEXT NOT NULL CHECK (tva_regime IN ('france','export_hors_ue')),
  montant_ht        NUMERIC(12,2) NOT NULL DEFAULT 0,
  montant_tva       NUMERIC(12,2) NOT NULL DEFAULT 0,
  montant_livraison NUMERIC(12,2) NOT NULL DEFAULT 0,
  montant_total     NUMERIC(12,2) NOT NULL DEFAULT 0,
  statut            TEXT NOT NULL DEFAULT 'panier'
       CHECK (statut IN ('panier','en_attente_paiement','payee',
                         'en_preparation','expediee','livree','annulee','remboursee')),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_commandes_client ON commandes(client_id);
CREATE INDEX idx_commandes_statut ON commandes(statut);

CREATE TABLE commande_lignes (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  commande_id       UUID NOT NULL REFERENCES commandes(id) ON DELETE CASCADE,
  produit_id        UUID REFERENCES produits(id) ON DELETE SET NULL,
  libelle           TEXT NOT NULL,
  type_produit      TEXT NOT NULL,
  quantite          INTEGER NOT NULL CHECK (quantite > 0),
  prix_unitaire_ht  NUMERIC(12,2) NOT NULL,
  taux_tva          NUMERIC(5,4) NOT NULL DEFAULT 0,
  prix_unitaire_ttc NUMERIC(12,2) NOT NULL,
  poids_total_g     INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_commande_lignes_cmd ON commande_lignes(commande_id);

-- ---------- PAIEMENTS (multi-fournisseurs) ----------
CREATE TABLE paiements (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  commande_id     UUID NOT NULL REFERENCES commandes(id) ON DELETE CASCADE,
  fournisseur     TEXT NOT NULL REFERENCES fournisseurs_paiement(code),
  methode         TEXT NOT NULL CHECK (methode IN
                    ('carte','apple_pay','google_pay','paypal','mobile_money')),
  devise          TEXT NOT NULL REFERENCES devises(code),
  montant         NUMERIC(12,2) NOT NULL,
  statut          TEXT NOT NULL DEFAULT 'initie'
       CHECK (statut IN ('initie','en_attente','autorise','capture',
                        'reussi','echoue','rembourse')),
  transaction_ref TEXT,
  payload         JSONB,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  confirmed_at    TIMESTAMPTZ
);
CREATE INDEX idx_paiements_commande ON paiements(commande_id);

-- Idempotence des confirmations asynchrones (mobile money surtout)
CREATE TABLE paiement_webhooks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fournisseur TEXT NOT NULL REFERENCES fournisseurs_paiement(code),
  event_id    TEXT UNIQUE,                  -- anti double-traitement
  paiement_id UUID REFERENCES paiements(id) ON DELETE SET NULL,
  recu_le     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  data        JSONB NOT NULL
);

-- ---------- TÉLÉCHARGEMENTS NUMÉRIQUES (auto après paiement) ----------
CREATE TABLE telechargements (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  commande_ligne_id   UUID NOT NULL REFERENCES commande_lignes(id) ON DELETE CASCADE,
  produit_id          UUID REFERENCES produits(id) ON DELETE SET NULL,
  token               TEXT UNIQUE NOT NULL,         -- lien sécurisé unique
  fichier_url         TEXT NOT NULL,
  expire_le           TIMESTAMPTZ,                  -- NULL = sans expiration
  max_telechargements INTEGER NOT NULL DEFAULT 5,
  nb_telechargements  INTEGER NOT NULL DEFAULT 0,
  cree_le             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_telechargements_ligne ON telechargements(commande_ligne_id);
-- Généré automatiquement après paiement réussi pour les produits numériques
-- ('produit_numerique','livre_numerique' · livraison_categorie='aucune').

-- ---------- ADHÉSIONS (Classique / VIP / Ambassadeur · renouvellement annuel) ----------
CREATE TABLE adhesions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id           UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  niveau              TEXT NOT NULL CHECK (niveau IN ('classique','vip','ambassadeur')),
  produit_id          UUID REFERENCES produits(id),   -- l'offre (produit type 'adhesion')
  commande_id         UUID REFERENCES commandes(id),  -- paiement initial / renouvellement
  date_debut          DATE NOT NULL DEFAULT CURRENT_DATE,
  date_fin            DATE NOT NULL,                  -- +1 an : renouvellement annuel
  statut              TEXT NOT NULL DEFAULT 'active'
                      CHECK (statut IN ('active','expiree','annulee')),
  renouvellement_auto BOOLEAN NOT NULL DEFAULT TRUE,
  cree_le             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_adhesions_client ON adhesions(client_id);
CREATE INDEX idx_adhesions_statut ON adhesions(statut);
-- Offres = produits type='adhesion' → prix multi-devises via produit_prix.
-- Paiement en ligne (table paiements) ; renouvellement annuel via date_fin.

-- ============================================================
-- VUES BACK-OFFICE · reporting / KPIs administrables
-- ============================================================
-- CA réalisé = commandes payées ou plus avancées
CREATE VIEW vue_ca_par_pays AS
  SELECT pays_livraison AS pays, devise,
         COUNT(*)            AS nb_commandes,
         SUM(montant_total)  AS ca_total,
         AVG(montant_total)  AS panier_moyen
  FROM commandes
  WHERE statut IN ('payee','en_preparation','expediee','livree')
  GROUP BY pays_livraison, devise;

CREATE VIEW vue_ca_par_devise AS
  SELECT devise,
         COUNT(*)            AS nb_commandes,
         SUM(montant_total)  AS ca_total,
         AVG(montant_total)  AS panier_moyen
  FROM commandes
  WHERE statut IN ('payee','en_preparation','expediee','livree')
  GROUP BY devise;

CREATE VIEW vue_kpis_commandes AS
  SELECT COUNT(*)                       AS nb_commandes,
         COALESCE(SUM(montant_total),0) AS ca_total,
         COALESCE(AVG(montant_total),0) AS panier_moyen
  FROM commandes
  WHERE statut IN ('payee','en_preparation','expediee','livree');

-- Ventes par type : formations, livres, événements, adhésions, vins…
CREATE VIEW vue_ventes_par_type AS
  SELECT cl.type_produit, c.devise,
         SUM(cl.quantite)                        AS quantite,
         SUM(cl.prix_unitaire_ttc * cl.quantite) AS ca_ttc,
         COUNT(DISTINCT c.id)                    AS nb_commandes
  FROM commande_lignes cl
  JOIN commandes c ON c.id = cl.commande_id
  WHERE c.statut IN ('payee','en_preparation','expediee','livree')
  GROUP BY cl.type_produit, c.devise;

-- Demandes export (réutilise demandes + comptes_pro type='export')
CREATE VIEW vue_demandes_export AS
  SELECT d.type, d.statut, COUNT(*) AS nb
  FROM demandes d
  JOIN comptes_pro cp ON cp.id = d.compte_id
  WHERE cp.type = 'export'
  GROUP BY d.type, d.statut;

-- ---------- RLS (tables sensibles) ----------
ALTER TABLE commandes       ENABLE ROW LEVEL SECURITY;
ALTER TABLE commande_lignes ENABLE ROW LEVEL SECURITY;
ALTER TABLE paiements       ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients         ENABLE ROW LEVEL SECURITY;
ALTER TABLE telechargements ENABLE ROW LEVEL SECURITY;
ALTER TABLE adhesions       ENABLE ROW LEVEL SECURITY;
-- Tables de référence (devises, pays, produit_prix, tva_taux, livraison_tarifs,
-- fournisseurs_paiement, pays_paiement) : lecture publique, écriture admin.
-- Vues back-office : accès admin uniquement (policies au sprint P2-8).

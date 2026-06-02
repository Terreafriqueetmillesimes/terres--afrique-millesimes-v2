-- ============================================================
-- TAM PRO · Migration 0001 · Schéma initial complet
-- 15 tables + indexes + contraintes + RLS
-- ============================================================

-- 1. COMPTES PROFESSIONNELS (table centrale CHR + Export)
CREATE TABLE comptes_pro (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id         UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  type                 TEXT NOT NULL CHECK (type IN ('chr','export')),
  statut               TEXT NOT NULL DEFAULT 'en_attente'
                       CHECK (statut IN ('en_attente','actif','refuse','suspendu')),
  -- Identité société (6 champs alignés sur le formulaire simplifié V1)
  raison_sociale       TEXT NOT NULL,
  nom_contact          TEXT NOT NULL,
  email_pro            TEXT UNIQUE NOT NULL,
  telephone            TEXT NOT NULL,
  site_web             TEXT,
  -- Localisation
  pays                 TEXT NOT NULL,
  pays_nom             TEXT NOT NULL,
  ville                TEXT,
  zone_geographique    TEXT CHECK (zone_geographique IN (
                         'europe','afrique_ouest','afrique_centrale',
                         'afrique_australe','afrique_est','maghreb',
                         'amerique_nord','autre')),
  -- Profil commercial (V2 — optionnel V1)
  type_activite        TEXT CHECK (type_activite IN (
                         'restaurant','hotel','bar_a_vins','caviste',
                         'traiteur','distributeur','importateur',
                         'grossiste','groupe_hotelier','autre')),
  volume_achat_estime  TEXT CHECK (volume_achat_estime IN (
                         '<5k','5k-25k','25k-100k','100k-500k','>500k')),
  potentiel_annuel_eur NUMERIC(12,2),
  langue_preferee      TEXT NOT NULL DEFAULT 'fr',
  devise_preferee      TEXT NOT NULL DEFAULT 'EUR',
  -- Spécifique CHR
  siret                TEXT,
  -- Spécifique Export
  numero_fiscal        TEXT,
  registre_commerce    TEXT,
  licence_import       TEXT,
  justificatif_url     TEXT,
  -- Workflow
  motif_refus          TEXT,
  notes_admin          TEXT,
  date_inscription     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  date_validation      TIMESTAMPTZ,
  valide_par           UUID,
  derniere_connexion   TIMESTAMPTZ,
  derniere_activite    TIMESTAMPTZ,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_comptes_pro_statut ON comptes_pro(statut);
CREATE INDEX idx_comptes_pro_type ON comptes_pro(type);
CREATE INDEX idx_comptes_pro_pays ON comptes_pro(pays);
CREATE INDEX idx_comptes_pro_type_activite ON comptes_pro(type_activite);

CREATE OR REPLACE FUNCTION trg_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER comptes_pro_updated
  BEFORE UPDATE ON comptes_pro
  FOR EACH ROW EXECUTE FUNCTION trg_set_updated_at();

-- 2. ADMINISTRATEURS
CREATE TABLE admin_users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id  UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT UNIQUE NOT NULL,
  nom_complet   TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin','admin','commercial')),
  actif         BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. INTÉRÊTS
CREATE TABLE interets (
  id      TEXT PRIMARY KEY,
  libelle TEXT NOT NULL,
  ordre   INTEGER NOT NULL DEFAULT 0
);

-- 4. M2M comptes ↔ intérêts
CREATE TABLE compte_interets (
  compte_id  UUID REFERENCES comptes_pro(id) ON DELETE CASCADE,
  interet_id TEXT REFERENCES interets(id) ON DELETE CASCADE,
  PRIMARY KEY (compte_id, interet_id)
);

-- 5. SEGMENTS CRM
CREATE TABLE segments (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom           TEXT UNIQUE NOT NULL,
  description   TEXT,
  type          TEXT NOT NULL CHECK (type IN ('chr','export','transverse')),
  couleur_badge TEXT DEFAULT '#C9A84C',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. M2M comptes ↔ segments
CREATE TABLE compte_segments (
  compte_id  UUID REFERENCES comptes_pro(id) ON DELETE CASCADE,
  segment_id UUID REFERENCES segments(id) ON DELETE CASCADE,
  PRIMARY KEY (compte_id, segment_id)
);

-- 7. PRODUITS
CREATE TABLE produits (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku                      TEXT UNIQUE NOT NULL,
  nom                      TEXT NOT NULL,
  domaine                  TEXT,
  region                   TEXT,
  appellation              TEXT,
  categorie                TEXT,
  millesime                INTEGER,
  conditionnement          TEXT,
  photo_url                TEXT,
  description              TEXT,
  disponible_particuliers  BOOLEAN NOT NULL DEFAULT FALSE,
  disponible_chr           BOOLEAN NOT NULL DEFAULT FALSE,
  disponible_export        BOOLEAN NOT NULL DEFAULT FALSE,
  prix_ttc_particulier     NUMERIC(10,2),
  prix_ht_chr              NUMERIC(10,2),
  prix_exw_export          NUMERIC(10,2),
  actif                    BOOLEAN NOT NULL DEFAULT TRUE,
  created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. CATALOGUES PDF
CREATE TABLE catalogues_pdf (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type             TEXT NOT NULL CHECK (type IN ('chr','export')),
  version          TEXT NOT NULL,
  fichier_url      TEXT NOT NULL,
  taille_octets    BIGINT,
  actif            BOOLEAN NOT NULL DEFAULT TRUE,
  date_publication TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  uploade_par      UUID REFERENCES admin_users(id),
  UNIQUE (type, version)
);

CREATE UNIQUE INDEX idx_unique_catalogue_actif
  ON catalogues_pdf(type) WHERE actif = TRUE;

-- 9. DEMANDES
CREATE TABLE demandes (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  compte_id            UUID NOT NULL REFERENCES comptes_pro(id) ON DELETE CASCADE,
  type                 TEXT NOT NULL CHECK (type IN (
                         'devis','cotation_produits','cotation_transport',
                         'rdv','echantillons')),
  statut               TEXT NOT NULL DEFAULT 'nouvelle' CHECK (statut IN (
                         'nouvelle','en_cours','repondue','acceptee',
                         'refusee_client','convertie','cloturee')),
  payload              JSONB NOT NULL,
  message_client       TEXT,
  reponse_admin        TEXT,
  date_creation        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  date_reponse         TIMESTAMPTZ,
  repondu_par          UUID REFERENCES admin_users(id),
  commande_export_id   UUID
);
CREATE INDEX idx_demandes_compte ON demandes(compte_id);
CREATE INDEX idx_demandes_statut ON demandes(statut);
CREATE INDEX idx_demandes_type ON demandes(type);

-- 10. COMMANDES EXPORT
CREATE TABLE commandes_export (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero_proforma        TEXT UNIQUE NOT NULL,
  cotation_id            UUID REFERENCES demandes(id),
  compte_id              UUID NOT NULL REFERENCES comptes_pro(id),
  pays_destination       TEXT NOT NULL,
  valeur_totale          NUMERIC(12,2) NOT NULL,
  devise                 TEXT NOT NULL DEFAULT 'EUR',
  incoterm               TEXT CHECK (incoterm IN ('EXW','FOB','CIF','DAP','DDP')),
  statut                 TEXT NOT NULL DEFAULT 'confirmee' CHECK (statut IN (
                           'confirmee','paiement_recu','en_preparation',
                           'expediee','livree','annulee')),
  date_confirmation      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  date_paiement          TIMESTAMPTZ,
  date_expedition        TIMESTAMPTZ,
  date_livraison_prevue  TIMESTAMPTZ,
  date_livraison_reelle  TIMESTAMPTZ,
  commentaires_admin     TEXT,
  cree_par_admin         UUID REFERENCES admin_users(id)
);

ALTER TABLE demandes ADD CONSTRAINT fk_demandes_commande
  FOREIGN KEY (commande_export_id) REFERENCES commandes_export(id);

CREATE INDEX idx_commandes_export_compte ON commandes_export(compte_id);
CREATE INDEX idx_commandes_export_statut ON commandes_export(statut);

-- 11. DOCUMENTS COMMANDE
CREATE TABLE documents_commande (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  commande_id     UUID NOT NULL REFERENCES commandes_export(id) ON DELETE CASCADE,
  type            TEXT NOT NULL CHECK (type IN (
                    'proforma','facture','bl','certificat_origine','autre')),
  fichier_url     TEXT NOT NULL,
  nom_affichage   TEXT,
  uploade_par     UUID REFERENCES admin_users(id),
  date_upload     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. CAMPAGNES
CREATE TABLE campagnes (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titre               TEXT NOT NULL,
  contenu_html        TEXT,
  image_url           TEXT,
  cta_label           TEXT,
  cta_url             TEXT,
  date_debut          DATE NOT NULL,
  date_fin            DATE NOT NULL,
  actif               BOOLEAN NOT NULL DEFAULT TRUE,
  cree_par            UUID REFERENCES admin_users(id),
  nb_envois_realises  INTEGER NOT NULL DEFAULT 0,
  date_envoi          TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. M2M campagnes ↔ segments
CREATE TABLE campagne_segments (
  campagne_id UUID REFERENCES campagnes(id) ON DELETE CASCADE,
  segment_id  UUID REFERENCES segments(id) ON DELETE CASCADE,
  PRIMARY KEY (campagne_id, segment_id)
);

-- 14. TÉLÉCHARGEMENTS CATALOGUE (log KPI)
CREATE TABLE telechargements_catalogue (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  compte_id              UUID NOT NULL REFERENCES comptes_pro(id) ON DELETE CASCADE,
  catalogue_id           UUID NOT NULL REFERENCES catalogues_pdf(id) ON DELETE CASCADE,
  type                   TEXT NOT NULL CHECK (type IN ('chr','export')),
  date_telechargement    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip                     TEXT,
  user_agent             TEXT
);
CREATE INDEX idx_telechargements_compte ON telechargements_catalogue(compte_id);
CREATE INDEX idx_telechargements_date ON telechargements_catalogue(date_telechargement);

-- 15. AUDIT LOG
CREATE TABLE audit_log (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  acteur_id       UUID,
  acteur_type     TEXT NOT NULL CHECK (acteur_type IN ('admin','compte_pro','system')),
  action          TEXT NOT NULL,
  ressource_type  TEXT,
  ressource_id    UUID,
  details         JSONB,
  ip              TEXT,
  date_creation   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_audit_log_date ON audit_log(date_creation);
CREATE INDEX idx_audit_log_acteur ON audit_log(acteur_id);
CREATE INDEX idx_audit_log_action ON audit_log(action);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE comptes_pro ENABLE ROW LEVEL SECURITY;
ALTER TABLE demandes ENABLE ROW LEVEL SECURITY;
ALTER TABLE commandes_export ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents_commande ENABLE ROW LEVEL SECURITY;
ALTER TABLE telechargements_catalogue ENABLE ROW LEVEL SECURITY;
ALTER TABLE catalogues_pdf ENABLE ROW LEVEL SECURITY;

-- Comptes : un compte voit sa propre fiche
CREATE POLICY comptes_lecture_propre ON comptes_pro
  FOR SELECT USING (auth.uid() = auth_user_id);

-- Admins voient tout
CREATE POLICY comptes_admin_all ON comptes_pro
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE auth_user_id = auth.uid() AND actif = TRUE)
  );

-- Demandes : un compte voit ses demandes
CREATE POLICY demandes_lecture_propre ON demandes
  FOR SELECT USING (
    compte_id IN (SELECT id FROM comptes_pro WHERE auth_user_id = auth.uid())
  );

-- Commandes Export : un compte voit ses commandes
CREATE POLICY commandes_lecture_propre ON commandes_export
  FOR SELECT USING (
    compte_id IN (SELECT id FROM comptes_pro WHERE auth_user_id = auth.uid())
  );

-- Catalogues : compte actif du bon type peut lire
CREATE POLICY catalogues_lecture_actif ON catalogues_pdf
  FOR SELECT USING (
    actif = TRUE
    AND EXISTS (
      SELECT 1 FROM comptes_pro
      WHERE auth_user_id = auth.uid()
        AND statut = 'actif'
        AND type = catalogues_pdf.type
    )
  );

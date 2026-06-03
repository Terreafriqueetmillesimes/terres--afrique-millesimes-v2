-- ============================================================
-- TAM · Migration 0004 · Phase 2 — Données de référence (seeds)
-- Devises, pays, moyens de paiement, TVA, zones/tarifs livraison, adhésions.
-- Idempotent (ON CONFLICT DO NOTHING) : rejouable sans erreur.
-- ============================================================

-- ---------- DEVISES (5) ----------
INSERT INTO devises (code, libelle, symbole, decimales, arrondi, flottante) VALUES
  ('EUR','Euro','€',2,0.01,FALSE),
  ('USD','Dollar US','$',2,0.01,FALSE),
  ('XAF','Franc CFA (CEMAC)','FCFA',0,1,FALSE),
  ('XOF','Franc CFA (UEMOA)','FCFA',0,1,FALSE),
  ('CDF','Franc congolais','FC',0,1,TRUE)
ON CONFLICT (code) DO NOTHING;

-- Taux de change FALLBACK (1 EUR = taux × devise). XAF/XOF = parité fixe ; CDF flottant.
INSERT INTO taux_change (devise_cible, taux) VALUES
  ('USD',1.08),('XAF',655.957),('XOF',655.957),('CDF',2900)
ON CONFLICT (devise_cible) DO NOTHING;

-- ---------- FOURNISSEURS DE PAIEMENT (V1) ----------
INSERT INTO fournisseurs_paiement (code, libelle, type) VALUES
  ('stripe','Carte bancaire · Apple Pay · Google Pay (Stripe)','carte'),
  ('paypal','PayPal','wallet'),
  ('orange_money','Orange Money','mobile_money'),
  ('mtn_momo','MTN Mobile Money','mobile_money')
ON CONFLICT (code) DO NOTHING;
-- Futurs (activables par INSERT, sans code) : 'airtel_money','wave','mpesa'.

-- ---------- PAYS (FR + 6 africains + USA) ----------
INSERT INTO pays (code, nom, devise_code, zone_tva, zone_livraison) VALUES
  ('FR','France','EUR','FR','FR'),
  ('US','États-Unis','USD','EXPORT','AM_NORD'),
  ('CM','Cameroun','XAF','EXPORT','AF_CENTRALE'),
  ('GA','Gabon','XAF','EXPORT','AF_CENTRALE'),
  ('CG','Congo-Brazzaville','XAF','EXPORT','AF_CENTRALE'),
  ('CD','République démocratique du Congo','CDF','EXPORT','AF_CENTRALE'),
  ('CI','Côte d''Ivoire','XOF','EXPORT','AF_OUEST'),
  ('SN','Sénégal','XOF','EXPORT','AF_OUEST')
ON CONFLICT (code) DO NOTHING;

-- ---------- MOYENS DE PAIEMENT PAR PAYS ----------
INSERT INTO pays_paiement (pays_code, fournisseur_code, priorite) VALUES
  ('FR','stripe',10),('FR','paypal',20),
  ('US','stripe',10),('US','paypal',20),
  ('CM','orange_money',10),('CM','mtn_momo',20),('CM','stripe',30),('CM','paypal',40),
  ('CI','orange_money',10),('CI','mtn_momo',20),('CI','stripe',30),('CI','paypal',40),
  ('SN','orange_money',10),('SN','stripe',20),('SN','paypal',30),
  ('CG','mtn_momo',10),('CG','stripe',20),('CG','paypal',30),
  ('GA','stripe',10),('GA','paypal',20),
  ('CD','orange_money',10),('CD','stripe',20),('CD','paypal',30)
ON CONFLICT (pays_code, fournisseur_code) DO NOTHING;

-- ---------- TVA · France (taux V1) ----------
INSERT INTO tva_taux (categorie, zone, taux, exonere) VALUES
  ('vin','FR',0.2000,FALSE),
  ('champagne','FR',0.2000,FALSE),
  ('spiritueux','FR',0.2000,FALSE),
  ('livre_papier','FR',0.0550,FALSE),
  ('livre_numerique','FR',0.0550,FALSE),
  ('produit_numerique','FR',0.2000,FALSE),
  ('formation','FR',0.2000,FALSE),
  ('billet_evenement','FR',0.2000,FALSE),
  ('adhesion','FR',0.2000,FALSE)
ON CONFLICT (categorie, zone) DO NOTHING;

-- ---------- TVA · Export (exonéré, vente HT) ----------
INSERT INTO tva_taux (categorie, zone, taux, exonere)
SELECT categorie, 'EXPORT', 0, TRUE
FROM (VALUES
  ('vin'),('champagne'),('spiritueux'),('livre_papier'),('livre_numerique'),
  ('produit_numerique'),('formation'),('billet_evenement'),('adhesion')
) AS c(categorie)
ON CONFLICT (categorie, zone) DO NOTHING;

-- ---------- LIVRAISON · 5 zones (tarifs administrables) ----------
-- Numérique/service (livraison_categorie='aucune') = 0 € (aucune ligne nécessaire).
-- Alcool hors France = sur_devis (arbitrage : pas de paiement direct alcool export).
INSERT INTO livraison_tarifs (zone, categorie, poids_max_g, tarif, devise, delai, sur_devis) VALUES
  -- France
  ('FR','standard',2000,5.90,'EUR','48-72h',FALSE),
  ('FR','standard',5000,8.90,'EUR','48-72h',FALSE),
  ('FR','standard',30000,14.90,'EUR','48-72h',FALSE),
  ('FR','alcool',6000,12.90,'EUR','48-72h',FALSE),
  ('FR','alcool',18000,19.90,'EUR','48-72h',FALSE),
  -- Europe
  ('EU','standard',2000,12.90,'EUR','3-5j',FALSE),
  ('EU','standard',5000,19.90,'EUR','3-5j',FALSE),
  ('EU','standard',30000,34.90,'EUR','3-5j',FALSE),
  ('EU','alcool',9999999,0,'EUR','sur devis',TRUE),
  -- Afrique Centrale
  ('AF_CENTRALE','standard',2000,29.90,'EUR','7-15j',FALSE),
  ('AF_CENTRALE','standard',9999999,0,'EUR','sur devis',TRUE),
  ('AF_CENTRALE','alcool',9999999,0,'EUR','sur devis',TRUE),
  -- Afrique de l'Ouest
  ('AF_OUEST','standard',2000,29.90,'EUR','7-15j',FALSE),
  ('AF_OUEST','standard',9999999,0,'EUR','sur devis',TRUE),
  ('AF_OUEST','alcool',9999999,0,'EUR','sur devis',TRUE),
  -- Amérique du Nord
  ('AM_NORD','standard',2000,19.90,'EUR','5-10j',FALSE),
  ('AM_NORD','standard',5000,34.90,'EUR','5-10j',FALSE),
  ('AM_NORD','standard',9999999,0,'EUR','sur devis',TRUE),
  ('AM_NORD','alcool',9999999,0,'EUR','sur devis',TRUE)
ON CONFLICT DO NOTHING;

-- ---------- ADHÉSIONS (Classique / VIP / Ambassadeur) ----------
-- Offres = produits type 'adhesion' (prix multi-devises via produit_prix).
INSERT INTO produits (sku, nom, type, tva_categorie, livraison_categorie, poids_g, actif, slug) VALUES
  ('ADH-CLASSIQUE','Adhésion Classique','adhesion','adhesion','aucune',0,TRUE,'adhesion-classique'),
  ('ADH-VIP','Adhésion VIP','adhesion','adhesion','aucune',0,TRUE,'adhesion-vip'),
  ('ADH-AMBASSADEUR','Adhésion Ambassadeur','adhesion','adhesion','aucune',0,TRUE,'adhesion-ambassadeur')
ON CONFLICT (sku) DO NOTHING;

INSERT INTO produit_prix (produit_id, devise, canal, prix, inclut_tva)
SELECT p.id, v.devise, 'particulier', v.prix, TRUE
FROM produits p
JOIN (VALUES
  ('ADH-CLASSIQUE','EUR',50),   ('ADH-CLASSIQUE','USD',55),    ('ADH-CLASSIQUE','XAF',32000),
  ('ADH-VIP','EUR',150),        ('ADH-VIP','USD',165),         ('ADH-VIP','XAF',98000),
  ('ADH-AMBASSADEUR','EUR',500),('ADH-AMBASSADEUR','USD',545), ('ADH-AMBASSADEUR','XAF',327000)
) AS v(sku, devise, prix) ON v.sku = p.sku
ON CONFLICT (produit_id, devise, canal) DO NOTHING;

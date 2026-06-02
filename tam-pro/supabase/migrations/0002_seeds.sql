-- ============================================================
-- TAM PRO · Migration 0002 · Seeds initiaux
-- ============================================================

-- INTÉRÊTS
INSERT INTO interets (id, libelle, ordre) VALUES
  ('vin',         'Vin',         1),
  ('champagne',   'Champagne',   2),
  ('spiritueux',  'Spiritueux',  3),
  ('sans_alcool', 'Sans alcool', 4),
  ('formation',   'Formation',   5),
  ('oenotourisme','Œnotourisme', 6);

-- SEGMENTS de base
INSERT INTO segments (nom, type, description) VALUES
  ('Restaurants',          'chr',        'Restaurants gastronomiques'),
  ('Hôtels',               'chr',        'Hôtellerie'),
  ('Bars à vins',          'chr',        NULL),
  ('Cavistes',             'chr',        NULL),
  ('Traiteurs',            'chr',        NULL),
  ('Cameroun',             'export',     NULL),
  ('Côte d''Ivoire',       'export',     NULL),
  ('Sénégal',              'export',     NULL),
  ('Gabon',                'export',     NULL),
  ('Afrique de l''Ouest',  'export',     NULL),
  ('Afrique Centrale',     'export',     NULL),
  ('Importateurs',         'export',     NULL),
  ('Distributeurs',        'transverse', NULL);

-- PRODUITS (3 cuvées de référence)
INSERT INTO produits (
  sku, nom, domaine, region, appellation, categorie, millesime, conditionnement,
  disponible_particuliers, disponible_chr, disponible_export,
  prix_ttc_particulier, prix_ht_chr, prix_exw_export, actif
) VALUES
  ('LESTAGE-2019',     'Château Lestage Simon',  'Cru Bourgeois',    'Bordeaux',
   'AOC Haut-Médoc',   'vin_rouge', 2019, '75 cl',
   TRUE, TRUE, TRUE,
   34.20, 21.50, 19.00, TRUE),

  ('BOUCHARD-2020',    'Domaine Jean Bouchard',  'Vieilles Vignes',  'Bourgogne',
   'AOC Gevrey-Chambertin', 'vin_rouge', 2020, '75 cl',
   TRUE, TRUE, TRUE,
   81.60, 51.00, 45.00, TRUE),

  ('CHARPENTIER-BRUT', 'Champagne J. Charpentier', 'Cuvée Réserve',  'Champagne',
   'AOC Champagne',    'champagne', NULL, '75 cl',
   TRUE, TRUE, TRUE,
   39.00, 24.50, 22.00, TRUE);

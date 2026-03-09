-- ═══════════════════════════════════════════════════════════════
-- Auto-école Mortier — Schema Supabase
-- Exécuter dans Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- Table des demandes d'inscription
CREATE TABLE IF NOT EXISTS inscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  prenom TEXT NOT NULL,
  nom TEXT NOT NULL,
  telephone TEXT NOT NULL,
  email TEXT NOT NULL,
  age INTEGER,
  formation TEXT,
  financement TEXT,
  rdv_date DATE,
  rdv_creneau TEXT,
  statut TEXT DEFAULT 'nouveau' CHECK (statut IN ('nouveau', 'contacte', 'inscrit', 'annule')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table des avis (pour affichage dynamique)
CREATE TABLE IF NOT EXISTS avis (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  initiales TEXT NOT NULL,
  couleur TEXT DEFAULT '#c0451e',
  date_avis TEXT NOT NULL,
  note INTEGER DEFAULT 5 CHECK (note BETWEEN 1 AND 5),
  texte TEXT NOT NULL,
  badge TEXT,
  verifie BOOLEAN DEFAULT true,
  affiche BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE inscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE avis ENABLE ROW LEVEL SECURITY;

-- Politique : tout le monde peut créer une inscription
CREATE POLICY "public_insert_inscriptions" ON inscriptions
  FOR INSERT WITH CHECK (true);

-- Politique : lecture publique des avis affichés
CREATE POLICY "public_read_avis" ON avis
  FOR SELECT USING (affiche = true);

-- Politique : service_role peut tout faire
CREATE POLICY "service_all_inscriptions" ON inscriptions
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "service_all_avis" ON avis
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Index
CREATE INDEX IF NOT EXISTS idx_inscriptions_statut ON inscriptions(statut);
CREATE INDEX IF NOT EXISTS idx_inscriptions_created ON inscriptions(created_at DESC);

-- Insérer les avis existants
INSERT INTO avis (nom, initiales, couleur, date_avis, texte, badge) VALUES
  ('Jean B.', 'JB', '#c0451e', 'Oct 2023', 'S''il y a une auto-école que je peux conseiller, c''est bien celle-là. Le professionnalisme de Seyba balaie toute anxiété.', 'Permis BVM · Moniteur : Seyba'),
  ('Merya M.', 'MM', '#6366f1', 'Avr 2024', 'J''ai passé 5 ans à essayer dans d''autres auto-écoles. Il ne m''a fallu que 2 semaines ici. Je recommande à 100%.', 'Permis obtenu'),
  ('Jeff M.', 'JM', '#0891b2', 'Jan 2024', 'Après une auto-école catastrophique, j''ai découvert celle-ci comme un oasis. Oumy est l''âme de cette auto-école.', 'Permis BVM · Mention : Oumy'),
  ('Mireille G.', 'MG', '#16a34a', 'Déc 2023', 'Pour en avoir fait plusieurs, je sais de quoi je parle. Oumy a la conscience professionnelle que beaucoup devraient avoir.', 'Mention : Oumy & Seyba'),
  ('Keren K.', 'KK', '#f59e0b', 'Avr 2024', 'Permis du premier coup ! Super profs, cours bien complets, moniteurs à l''écoute.', '1er coup'),
  ('Larose L.', 'LL', '#7c3aed', 'Mars 2023', 'Seyba veille à ne pas vous faire payer plus d''heures que nécessaire. JE VOUS LA RECOMMANDE LES YEUX FERMÉS.', 'Permis BVA · Moniteur : Seyba')
ON CONFLICT DO NOTHING;

# TAM PRO — Espace partenaires professionnels

Application Next.js qui sera déployée sur `pro.terreafriqueetmillesimes.com`.
Indépendante du site vitrine `terreafriqueetmillesimes.com`.

## Stack

- **Next.js 15** (App Router, TypeScript, React 19)
- **Tailwind CSS 3**
- **Supabase** (auth + Postgres + Storage)
- **Resend** (emails transactionnels)
- **Zod** (validation)

## Architecture

```
src/
├── app/                 Pages Next.js (App Router)
│   ├── (public)         Landing, inscription, connexion
│   ├── (espace-chr)     Dashboard CHR (couleur Bordeaux Vin)
│   ├── (espace-export)  Dashboard Export (couleur Terre d'Afrique)
│   ├── (admin)          Back-office administrateur
│   └── api              Routes API serveur
├── components/          UI réutilisable
│   ├── layout
│   ├── forms
│   └── ui
├── lib/
│   ├── supabase         Clients Supabase
│   ├── resend           Client Resend
│   ├── emails           Templates React Email
│   ├── validation       Schémas Zod
│   └── utils
└── middleware.ts        Auth + RBAC
```

## Installation locale

```bash
# 1. Installer Node.js 22 LTS si pas déjà fait : https://nodejs.org
node --version  # doit afficher v22.x

# 2. Installer les dépendances
npm install

# 3. Copier le fichier d'environnement
copy .env.example .env.local

# 4. Renseigner les clés Supabase + Resend dans .env.local

# 5. Lancer en développement
npm run dev

# Ouvrir http://localhost:3000
```

## Charte visuelle (validée)

| Univers | Couleur primaire | Couleur secondaire | Hover |
|---|---|---|---|
| **Particuliers** (vitrine) | Or Champagne `#E8D9A8` | Or `#C9A84C` | — |
| **CHR France** | Bordeaux Vin `#6D071A` | `#8B1E2D` | `#A52A3A` |
| **Export Afrique** | Terre d'Afrique `#8B5A2B` | `#A97142` | `#C28B55` |

## Scripts

| Commande | Action |
|---|---|
| `npm run dev` | Serveur de dev (http://localhost:3000) |
| `npm run build` | Build de production |
| `npm start` | Serveur de production |
| `npm run lint` | Linter ESLint |
| `npm run type-check` | Vérif TypeScript |

## Déploiement

Plus tard (Phase 2.8). Sur Vercel via le dépôt Git séparé `tam-pro`.

## Liens

- Site vitrine : https://terreafriqueetmillesimes.com (inchangé)
- Documentation interne : voir `../docs/` (à venir)

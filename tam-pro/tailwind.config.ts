import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Charte signature TAM — noir + or
        noir: {
          DEFAULT: '#0A0908',
          2: '#16130e',
          3: '#1f1b14',
        },
        or: {
          DEFAULT: '#C9A84C',
          clair: '#F0D080',
          pale: '#FAF0D0',
          vieilli: '#A68A3E',
          champagne: '#E8D9A8',
        },
        ivoire: {
          DEFAULT: '#F5EFE0',
          2: '#E8DFC8',
        },
        gris: {
          DEFAULT: '#9a958a',
          doux: '#bdb8ab',
        },
        // Univers CHR — Bordeaux Vin (validé)
        bordeaux: {
          DEFAULT: '#6D071A',
          clair: '#8B1E2D',
          hover: '#A52A3A',
        },
        // Univers Export — Terre d'Afrique (validé)
        terre: {
          DEFAULT: '#8B5A2B',
          clair: '#A97142',
          hover: '#C28B55',
        },
      },
      fontFamily: {
        titre: ['var(--font-titre)', 'Georgia', 'serif'],
        sc: ['var(--font-sc)', 'Georgia', 'serif'],
        corps: ['var(--font-corps)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        sc: '0.32em',
        'sc-wide': '0.42em',
      },
    },
  },
  plugins: [],
}

export default config

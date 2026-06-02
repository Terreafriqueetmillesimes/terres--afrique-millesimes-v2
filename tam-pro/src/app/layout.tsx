import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Espace Pro · Terres d\'Afrique & Millésimes',
    template: '%s · TAM Pro',
  },
  description:
    'Espace partenaires professionnels Terres d\'Afrique & Millésimes. CHR France et Export Afrique. Validation manuelle sous 48 h.',
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}

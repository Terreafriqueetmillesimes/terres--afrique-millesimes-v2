const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // SAMEORIGIN : le site moderne intègre ses propres pages /legacy via iframe (pont de contenu)
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'same-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          // Note : l'indexation est gérée par page via la metadata `robots`
          // (site public = index ; espaces pro = noindex via le layout racine).
        ],
      },
    ]
  },
}

module.exports = withNextIntl(nextConfig)

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Statyczne eksportowanie aplikacji
  reactStrictMode: true, // Włącza tryb ścisły Reacta dla łatwiejszego debugowania
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Rozwiązuje problemy z niektórymi bibliotekami w przeglądarce
      config.resolve.fallback = { fs: false };
    }
    return config;
  },
  experimental: {
    optimizeCss: true,
  },
  async redirects() {
    return [
      {
        source: '/kalkulator_stawki',
        destination: '/kalkulator-stawki',
        permanent: true,
      },
      {
        source: '/wyliczenie_z_godzin',
        destination: '/wyliczenie-z-godzin',
        permanent: true,
      },
      {
        source: '/brutto_netto',
        destination: '/brutto-netto',
        permanent: true,
      },
      {
        source: '/karta_godzin',
        destination: '/karta-godzin',
        permanent: true,
      },
      {
        source: '/godziny',
        destination: '/wyliczenie-z-godzin',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://www.google-analytics.com https://apis.google.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "img-src 'self' data: https: https://www.google-analytics.com https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://www.googletagmanager.com",
              "frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://www.youtube.com",
              "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://*.upstash.io https://www.googletagmanager.com",
              "form-action 'self'",
              "base-uri 'self'",
              "object-src 'none'",
            ].join('; '),
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
      {
        source: '/:path*.pdf',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
          {
            key: 'Content-Disposition',
            value: 'inline',
          },
        ],
      },
    ]
  },
}

export default nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: 'export', // Statyczne eksportowanie aplikacji
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
        source: '/kalkulator_umowy_zlecenie',
        destination: '/kalkulator-umowy-zlecenie',
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
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://fundingchoicesmessages.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https: data:; connect-src 'self' https://www.googletagmanager.com https://pagead2.googlesyndication.com; frame-src 'self' https://pagead2.googlesyndication.com" }
        ]
      }
    ]
  },
};

export default nextConfig;

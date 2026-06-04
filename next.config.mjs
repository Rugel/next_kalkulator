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
        source: '/godziny',
        destination: '/wyliczenie-z-godzin',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;

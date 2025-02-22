/** @type {import('next').NextConfig} */
const nextConfig = {
    //output: 'export', // Statyczne eksportowanie aplikacji
    reactStrictMode: true, // Włącza tryb ścisły Reacta dla łatwiejszego debugowania
    webpack: (config, { isServer }) => {
      if (!isServer) {
        // Rozwiązuje problemy z niektórymi bibliotekami w przeglądarce
        config.resolve.fallback = { fs: false };
      }
      return config;
    },
  };
  
  export default nextConfig;
  
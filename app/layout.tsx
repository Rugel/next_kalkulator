import "./globals.css";
import Script from 'next/script';
import AnalyticsListener from './modules/analytics-listener';

export const metadata = {
  metadataBase: new URL('https://stawka-godzinowa.pl'),
  alternates: {
    canonical: '/',
  },
  title: "Kalkulator wynagrodzeń dla pracownika ze stawką godzinową",
  description: "Kalkulator wynagrodzeń 2025 obliczy kwotę netto lub brutto na podstawie godzin pracy, stawki godzinowej, świadczenia chorobowego, urlopu oraz dodatków",
  openGraph: {
    title: "Stawka godzinowa? - ten Kalkulator obliczy Twoje wynagrodzenie!",
    description: "Kalkulator wynagrodzeń 2025 obliczy kwotę netto lub brutto na podstawie godzin pracy, stawki godzinowej, świadczenia chorobowego, urlopu oraz dodatków",
    url: "https://stawka-godzinowa.pl",
    siteName: "Kalkulator Wynagrodzeń",
    images: [
      {
        url: "https://stawka-godzinowa.pl/image.webp",
        width: 1200,
        height: 630,
        alt: "Kalkulator Wynagrodzeń",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <meta name="google-site-verification" content="wWDCgkmW374nhFic4ZNADQdsdDPPJq4hrp3cdf81KXw" />
        {/* Global Site Tag */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-PHKBZYQPHS`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-PHKBZYQPHS', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <meta name="apple-mobile-web-app-title" content="Kalkulator Wynagrodzeń" />
        {/* Dane strukturalne dla SoftwareApplication */}
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Kalkulator Wynagrodzeń",
              "description": "Kalkulator wynagrodzeń 2025 obliczy kwotę netto lub brutto na podstawie godzin pracy, stawki godzinowej, świadczenia chorobowego, urlopu oraz dodatków",
              "url": "https://stawka-godzinowa.pl",
              "image": "https://stawka-godzinowa.pl/image.webp",
              "applicationCategory": "Finance",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "PLN",
              },
              "publisher": {
                "@type": "Organization",
                "name": "Stawka Godzinowa",
                "logo": "https://stawka-godzinowa.pl/logo.webp",
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.4", // Średnia ocena (np. od 1 do 5)
                "reviewCount": "7"
              }
            }),
          }}
        />
        {/* Skrypt AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8789064360135564"
          strategy="afterInteractive" // Ładuje skrypt po interaktywności strony
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <AnalyticsListener />
        {children}
      </body>
    </html>
  );
}

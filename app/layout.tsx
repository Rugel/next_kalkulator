import "./globals.css";
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin-ext'],
  display: 'swap',
  variable: '--font-roboto',
});

import Script from 'next/script';
import AnalyticsListener from './modules/analytics-listener';
import Weather from "./modules/weather";
import StarRating from "./modules/StarRating";
import Footer from "./modules/footer";
import { GlobalSpinner } from "./components/GlobalSpinner";

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL('https://stawka-godzinowa.pl'),
  alternates: {
    canonical: '/',
  },
  title: "Kalkulator Stawki Godzinowej 2026 - Oblicz Wynagrodzenie Netto/Brutto",
  description: "Najlepszy kalkulator wynagrodzeń 2026. Oblicz stawkę godzinową, pensję netto/brutto, uwzględniając nadgodziny, chorobowe i urlop. Sprawdź ile zarobisz na rękę!",
  keywords: "kalkulator wynagrodzeń 2026, stawka godzinowa, kalkulator płac, brutto netto, ile zarabiam, pensja na rękę, kalkulator nadgodzin",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Kalkulator Stawki Godzinowej 2026 - Oblicz Wynagrodzenie Netto/Brutto",
    description: "Najlepszy kalkulator wynagrodzeń 2026. Oblicz stawkę godzinową, pensję netto/brutto, uwzględniając nadgodziny, chorobowe i urlop.",
    url: "https://stawka-godzinowa.pl",
    siteName: "Kalkulator Stawki Godzinowej",
    images: [
      {
        url: "https://stawka-godzinowa.pl/image.webp",
        width: 1200,
        height: 630,
        alt: "Kalkulator Stawki Godzinowej",
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
        <meta name="apple-mobile-web-app-title" content="Kalkulator Stawki Godzinowej" />
        {/* Dane strukturalne dla SoftwareApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Kalkulator Stawki Godzinowej",
              "description": "Kalkulator wynagrodzeń obliczy kwotę netto lub brutto na podstawie godzin pracy, stawki godzinowej, świadczenia chorobowego, urlopu oraz dodatków",
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
                "ratingValue": "4.5",
                "reviewCount": "35"
              }
            }),
          }}
        />
        {/* Skrypt AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8789064360135564"
          crossOrigin="anonymous"
        />
      </head>
      <body className={roboto.className}>
        <GlobalSpinner>
          <AnalyticsListener />
          {children}
          <div className="widgets-container">
            <StarRating itemId={123} />
            <Weather />
          </div>
          <footer className="footer" style={{ backgroundColor: '#444', padding: '1rem', color: 'white', marginTop: '2rem' }}>
            <Footer />
          </footer>
        </GlobalSpinner>
      </body>
    </html>
  );
}

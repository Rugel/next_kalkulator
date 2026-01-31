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
import CommentsSection from "./modules/CommentsSection";
import Footer from "./modules/footer";
import { GlobalSpinner } from "./components/GlobalSpinner";
import WidgetsWrapper from "./components/WidgetsWrapper";
import ConditionalAdSense from "./components/ConditionalAdSense";

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
  title: "💰 Kalkulator Stawki Godzinowej 2026 - Brutto na Netto",
  description: "🧮 Oblicz swoją stawkę godzinową netto („na rękę”). Szybki kalkulator wynagrodzeń dla umowy o pracę i zlecenia. ✅ Sprawdź, ile realnie zarabiasz.",
  keywords: "kalkulator stawki godzinowej, stawka godzinowa, przelicznik wynagrodzenia, ile zarabiam na godzinę, kalkulator płac 2026",
  robots: {
    index: true,
    follow: true,
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
    title: "💰 Kalkulator Stawki Godzinowej 2026 - Brutto na Netto",
    description: "🧮 Oblicz swoją stawkę godzinową netto („na rękę”). Szybki kalkulator wynagrodzeń dla umowy o pracę i zlecenia. ✅ Sprawdź, ile realnie zarabiasz.",
    url: "https://stawka-godzinowa.pl",
    siteName: "Stawka Godzinowa",
    images: [
      {
        url: "https://stawka-godzinowa.pl/image.webp",
        width: 1200,
        height: 630,
        alt: "💰 Kalkulator Stawki Godzinowej 2026 - Brutto na Netto",
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
          charSet="utf-8"
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
        <meta name="apple-mobile-web-app-title" content="Stawka Godzinowa" />
        {/* Dane strukturalne dla WebSite i SoftwareApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Stawka Godzinowa",
              "url": "https://stawka-godzinowa.pl",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://stawka-godzinowa.pl/?s={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Stawka Godzinowa",
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
              }
            }),
          }}
        />
        <ConditionalAdSense />
      </head>
      <body className={roboto.className}>
        <GlobalSpinner>
          <AnalyticsListener />
          {children}
          <WidgetsWrapper>
            <div className="widgets-container">
              <div id="comments-section" style={{ width: '100%' }}>
                <CommentsSection itemId={123} />
              </div>
              <StarRating itemId={123} />
              <Weather />
            </div>
          </WidgetsWrapper>
          <footer className="footer" style={{ backgroundColor: '#444', padding: '1rem', color: 'white', marginTop: '2rem' }}>
            <Footer />
          </footer>
        </GlobalSpinner>
      </body>
    </html>
  );
}

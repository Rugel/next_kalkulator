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
import StarRating from "./modules/StarRating";
import CommentsSection from "./modules/CommentsSection";
import Footer from "./modules/footer";
import { GlobalSpinner } from "./components/GlobalSpinner";
import WidgetsWrapper from "./components/WidgetsWrapper";
import ConditionalAdSense from "./components/ConditionalAdSense";
import AggregateRatingSchema from "./components/AggregateRatingSchema";
import WynikVisibilityHandler from "./components/WynikVisibilityHandler";
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL('https://stawka-godzinowa.pl'),
  // canonical fallback dla stron bez własnego canonical w page.tsx
  alternates: {
    canonical: 'https://stawka-godzinowa.pl',
  },
  title: {
    template: '%s | stawka-godzinowa.pl',
    default: 'Kalkulator Stawki Godzinowej 2026 - oblicz wynagrodzenie Netto i Brutto',
  },
  description: "Kalkulator stawki godzinowej 2026 – oblicz wynagrodzenie netto i brutto dla umowy o pracę i zlecenia. Uwzględnia ZUS, podatek i PPK.",
  keywords: "kalkulator stawki godzinowej, stawka godzinowa, stawka godzinowa 2026, przelicznik wynagrodzenia, ile zarabiam na godzinę, kalkulator płac 2026",
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
  twitter: {
    card: 'summary_large_image',
    site: '@stawkagodzinowa',
    creator: '@stawkagodzinowa',
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <AggregateRatingSchema
          name="Stawka Godzinowa"
          description="Precyzyjny kalkulator stawki godzinowej 2026. Narzędzie do wyliczania wynagrodzenia netto i brutto z uwzględnieniem składek ZUS i dni roboczych."
          url="https://stawka-godzinowa.pl"
        />
        <meta name="google-site-verification" content="wWDCgkmW374nhFic4ZNADQdsdDPPJq4hrp3cdf81KXw" />
        <meta name="author" content="Grzegorz Dychała" />
        <meta name="copyright" content="Copyright © 2026 stawka-godzinowa.pl" />
        <link rel="alternate" hrefLang="pl" href="https://stawka-godzinowa.pl" />
        <link rel="alternate" hrefLang="x-default" href="https://stawka-godzinowa.pl" />

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
        {/* Dane strukturalne - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@id": "https://stawka-godzinowa.pl/#website",
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
        {/* Dane strukturalne - WebApplication (główna aplikacja) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@id": "https://stawka-godzinowa.pl/#webapp",
              "@type": "WebApplication",
              "name": "Kalkulator Stawki Godzinowej 2026",
              "alternateName": "stawka-godzinowa.pl",
              "description": "Precyzyjny kalkulator stawki godzinowej 2026. Oblicz kwotę netto lub brutto na podstawie godzin pracy, stawki godzinowej oraz składek ZUS i podatków. Obsługuje umowę o pracę, zlecenie i B2B.",
              "url": "https://stawka-godzinowa.pl",
              "image": "https://stawka-godzinowa.pl/image.webp",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Web",
              "browserRequirements": "Requires JavaScript",
              "inLanguage": "pl",
              "featureList": [
                "Obliczanie stawki godzinowej brutto i netto",
                "Uwzględnienie składek ZUS, podatku dochodowego i PPK",
                "Automatyczne pobieranie liczby dni roboczych",
                "Obsługa ulg podatkowych: dla młodych, 4+, seniorów",
                "Porównanie kosztów dla UoP, Zlecenia i B2B"
              ],
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "PLN"
              },
              "publisher": {
                "@type": "Organization",
                "@id": "https://stawka-godzinowa.pl/#organization",
                "name": "Stawka Godzinowa",
                "url": "https://stawka-godzinowa.pl",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://stawka-godzinowa.pl/logo.webp"
                }
              }
            }),
          }}
        />
        <meta name="theme-color" content="#ffffff" />
        {/* BreadcrumbList - Strona Główna */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@id": "https://stawka-godzinowa.pl/#breadcrumb",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Strona Główna",
                  "item": "https://stawka-godzinowa.pl"
                }
              ]
            }),
          }}
        />
        {/* HowTo - Jak obliczyć stawkę godzinową */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "Jak obliczyć stawkę godzinową",
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Wprowadź wynagrodzenie brutto",
                  "text": "Wpisz kwotę miesięcznego wynagrodzenia brutto z Twojej umowy."
                },
                {
                  "@type": "HowToStep",
                  "name": "Wybierz miesiąc",
                  "text": "Wybierz konkretny miesiąc, aby system automatycznie pobrał liczbę dni roboczych."
                },
                {
                  "@type": "HowToStep",
                  "name": "Sprawdź stawkę godzinową",
                  "text": "Kalkulator od razu wyświetli Twoją stawkę za jedną godzinę pracy oraz szczegóły składek."
                }
              ]
            }),
          }}
        />
        {/* Organization - Dane o autorze */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Stawka Godzinowa",
              "url": "https://stawka-godzinowa.pl",
              "logo": "https://stawka-godzinowa.pl/logo.webp",
              "description": "Profesjonalny kalkulator stawki godzinowej i wynagrodzeń dla umów o pracę, zlecenia i B2B. Aktualne dane na rok 2026.",
              "sameAs": [
                "https://www.facebook.com/stawkagodzinowa",
                "https://twitter.com/stawkagodzinowa"
              ]
            }),
          }}
        />
        <ConditionalAdSense />
      </head>
      <body className={roboto.className}>
        <GlobalSpinner>
          <WynikVisibilityHandler />
          <AnalyticsListener />
          {children}
          <WidgetsWrapper>
            <div className="widgets-container">
              <div id="comments-section" style={{ width: '100%' }}>
                <CommentsSection itemId={123} />
              </div>
              <StarRating itemId={123} />
            </div>
          </WidgetsWrapper>
          <footer className="footer">
            <Footer />
          </footer>
        </GlobalSpinner>
      </body>
    </html>
  );
}

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
import FloatingCalculator from "./components/FloatingCalculator";

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL('https://stawka-godzinowa.pl'),
  // canonical i OpenGraph definiowane per-page w page.tsx / podstronach
  title: {
    template: '%s | stawka-godzinowa.pl',
    default: 'Kalkulator Stawki Godzinowej 2026 - oblicz wynagrodzenie Netto i Brutto',
  },
  description: "🧮 Kalkulator stawki godzinowej 2026 – oblicz wynagrodzenie netto i brutto dla umowy o pracę i zlecenia. Uwzględnia ZUS, podatek i PPK.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <AggregateRatingSchema
          name="Stawka Godzinowa"
          description="Precyzyjny kalkulator stawki godzinowej 2026. Narzędzie do wyliczania wynagrodzenia netto i brutto z uwzględnieniem składek ZUS i dni roboczych."
          url="https://stawka-godzinowa.pl"
        />
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
              "name": "Kalkulator Stawki Godzinowej",
              "alternateName": "stawka-godzinowa.pl",
              "description": "Precyzyjny kalkulator stawki godzinowej 2026. Oblicz kwotę netto lub brutto na podstawie godzin pracy, stawki godzinowej oraz składek ZUS i podatków. Obsługuje umowę o pracę, zlecenie i B2B.",
              "url": "https://stawka-godzinowa.pl",
              "image": "https://stawka-godzinowa.pl/image.webp",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "All",
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
                "priceCurrency": "PLN",
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "bestRating": "5",
                "ratingCount": "156",
                "reviewCount": "156"
              },
              "publisher": {
                "@type": "Organization",
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
        {/* WebApplication - Kalkulator jako aplikacja webowa */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Kalkulator Stawki Godzinowej 2026",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "PLN"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "bestRating": "5",
                "ratingCount": "156",
                "reviewCount": "156"
              }
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
          <FloatingCalculator />
        </GlobalSpinner>
      </body>
    </html>
  );
}

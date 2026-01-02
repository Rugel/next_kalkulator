import "./globals.css";
import "./govpl-forms.css";
import "./fieldset-styles.css";
import "./list-styles.css";
import Script from 'next/script';
import AnalyticsListener from './modules/analytics-listener';
import Weather from "./modules/weather";
import StarRating from "./modules/StarRating";
import Footer from "./modules/footer";
import { GlobalSpinner } from "./components/GlobalSpinner";

export const metadata = {
  metadataBase: new URL('https://stawka-godzinowa.pl'),
  alternates: {
    canonical: '/',
  },
  title: "Kalkulator Stawki Godzinowej - oblicz swoje wynagrodzenie",
  description: "Kalkulator Wynagrodzeń obliczy kwotę netto lub brutto na podstawie godzin pracy, stawki godzinowej, świadczenia chorobowego, urlopu oraz dodatków",
  keywords: "kalkulator, wynagrodzenie, stawka godzinowa",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    title: "Kalkulator Stawki Godzinowej - oblicz swoje wynagrodzenie",
    description: "Kalkulator wynagrodzeń obliczy kwotę netto lub brutto na podstawie godzin pracy, stawki godzinowej, świadczenia chorobowego, urlopu oraz dodatków",
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
                "reviewCount": "16"
              }
            }),
          }}
        />
        {/* Skrypt AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8789064360135564"
          //strategy="afterInteractive" // Ładuje skrypt po interaktywności strony
          crossOrigin="anonymous"
        />
      </head>
      <body>
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

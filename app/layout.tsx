import "./globals.css";
import Script from 'next/script';
import AnalyticsListener from './modules/analytics-listener';

export const metadata = {
  metadataBase: new URL('https://stawka-godzinowa.pl'),
  alternates: {
    canonical: '/',
  },
  title: "Kalkulator wynagrodzeń dla pracownika ze stawką godzinową",
  description: "Kalkulator wynagrodzeń 2025 obliczy kwotę netto lub brutto na podstwie godzin pracy, stawki godzinowej, świadczenia chorobowego, urlopu oraz dodatków",
  openGraph: {
    title: "Stawka godzinowa? - ten Kalkulator obliczy Twoje wynagrodzenie!",
    description: "Kalkulator wynagrodzeń 2025 obliczy kwotę netto lub brutto na podstwie godzin pracy, stawki godzinowej, świadczenia corobowego, urlopu oraz dodatków",
    url: "https://stawka-godzinowa.pl",
    siteName: "Kalkulator Wynagrodzeń",
    images: [
      {
        url: "https://stawka-godzinowa.pl/image.png",
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
        {/* <link rel="canonical" href="https://stawka-godzinowa.pl/" />*/}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Kalkulator Wynagrodzeń",
              url: "https://stawka-godzinowa.pl",
              logo: "https://stawka-godzinowa.pl/logo.png",
            }),
          }}
        />

      </head>
      <body>
        <AnalyticsListener />
        {children}
      </body>
    </html>
  );
}

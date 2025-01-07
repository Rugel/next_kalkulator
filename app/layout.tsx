import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import AnalyticsListener from './modules/analytics-listener';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stawka godzinowa? - ten Kalkulator obliczy Twoje wynagrodzenie!",
  description: "Kalkulator wynagrodzeń 2025 obliczy kwotę netto lub brutto na podstwie godzin pracy, stawki godzinowej, świadczenia corobowego, urlopu oraz dodatków",
  keywords: "kalkulator, wynagodzenie, stawka godzinowa"
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
      </head>
      <body>
       <AnalyticsListener />
        {children}
      </body>
    </html>
  );
}

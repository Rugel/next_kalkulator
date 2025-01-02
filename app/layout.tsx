import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <body>
        {children}
      </body>
    </html>
  );
}

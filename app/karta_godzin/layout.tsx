import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL('https://stawka-godzinowa.pl'),
    alternates: {
        canonical: '/karta_godzin',
    },
    title: "Karta ewidencji czasu pracy - drukuj PDF dla dowolnego miesiąca",
    description: "Pobierz kartę ewidencji czasu pracy pracownika w celu jej wydruku dla wybranego dowolnego miesiąca roku - karta godzin pracy - pdf do wydruku",
    keywords: "karta, ewidencja, czas, praca",
    openGraph: {
        title: "Karta ewidencji czasu pracy - drukuj PDF dla dowolnego miesiąca",
        description: "Pobierz kartę ewidencji czasu pracy pracownika w celu jej wydruku dla wybranego dowolnego miesiąca roku - karta godzin pracy - pdf do wydruku",
        url: "https://stawka-godzinowa.pl/karta_godzin",
        siteName: "Karta ewidencji czasu pracy",
        images: [
          {
            url: "https://stawka-godzinowa.pl/karta_godzin_pracy.webp",
            width: 1200,
            height: 630,
            alt: "Karta godzin pracy"
          }
        ],
        locale: "pl_PL",
        type: "website",
      },
};

export default function KartaGodz({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>{children}</div>
    );
}
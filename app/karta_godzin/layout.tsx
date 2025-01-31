import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL('https://stawka-godzinowa.pl'),
    alternates: {
        canonical: '/karta_godzin',
    },
    title: "Karta ewidencji czasu pracy - generuj PDF lub drukuj dla dowolnego miesiąca",
    description: "Pobierz kartę ewidencji czasu pracy pracownika w celu jej wydruku dla wybranego dowolnego miesiąca roku - karta godzin pracy - pdf do wydruku",
    keywords: "karta, ewidencja, czas, praca"
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
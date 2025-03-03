import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    metadataBase: new URL("https://stawka-godzinowa.pl"),
    alternates: {
        canonical: "/brutto_netto",
    },
    title: "Przelicznik Wynagrodzenia Brutto na Netto",
    description: "Oblicz szybko swoje wynagrodzenie netto z brutto! Wybierz opcje, podaj kwotę brutto i sprawdź wynik w naszym kalkulatorze.",
    keywords: "kalkulator wynagrodzenia, brutto netto, przelicznik płac, wynagrodzenie netto, obliczenia płacowe, kalkulator płac 2025",
    openGraph: {
        title: "Przelicznik Wynagrodzenia Brutto na Netto",
        description: "Oblicz swoje wynagrodzenie netto z brutto za pomocą prostego kalkulatora online – szybkie i dokładne wyniki!",
        url: "https://stawka-godzinowa.pl/brutto_netto",
        siteName: "Stawka Godzinowa",
        images: [
            {
                url: "https://stawka-godzinowa.pl/brutto_netto.webp",
                width: 1200,
                height: 630,
                alt: "Przelicznik wynagrodzenia brutto na netto",
            },
        ],
        locale: "pl_PL",
        type: "website",
    },
};

export default function BruttoNettoLayout({ children }: { children: ReactNode }) {
    return <main>{children}</main>;
}
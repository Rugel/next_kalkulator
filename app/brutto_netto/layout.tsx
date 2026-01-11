import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    metadataBase: new URL("https://stawka-godzinowa.pl"),
    alternates: {
        canonical: "/brutto_netto",
    },
    robots: {
        index: true,
        follow: true,
    },
    title: "🖩 Kalkulator Wynagrodzenia Brutto na Netto",
    description: "Oblicz szybko swoje wynagrodzenie netto z kwoty brutto! Wybierz opcje, podaj wartość brutto i sprawdź wynik w Kalkulatorze.",
    keywords: "kalkulator wynagrodzenia, brutto netto, przelicznik płac, wynagrodzenie netto, obliczenia płacowe, kalkulator płac 2025",
    openGraph: {
        title: "Przelicznik Wynagrodzenia Brutto na Netto",
        description: "Oblicz swoje wynagrodzenie netto z brutto za pomocą prostego kalkulatora online – szybkie i dokładne wyniki!",
        url: "https://stawka-godzinowa.pl/brutto_netto",
        siteName: "Kalkulator Stawki Godzinowej",
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
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Strona Główna",
                "item": "https://stawka-godzinowa.pl"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Przelicznik Brutto na Netto",
                "item": "https://stawka-godzinowa.pl/brutto_netto"
            }
        ]
    };

    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Przelicznik Brutto na Netto",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "url": "https://stawka-godzinowa.pl/brutto_netto",
        "description": "Oblicz swoje wynagrodzenie netto z kwoty brutto szybko i dokładnie.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "PLN"
        }
    };

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "Jak przeliczyć wynagrodzenie brutto na netto",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Ustalenie wynagrodzenia brutto",
                "text": "Wynagrodzenie brutto to kwota z umowy o pracę przed potrąceniami."
            },
            {
                "@type": "HowToStep",
                "name": "Odliczenie składek społecznych",
                "text": "Odjęcie składek na ubezpieczenie emerytalne, rentowe i chorobowe (łącznie 13,71%)."
            },
            {
                "@type": "HowToStep",
                "name": "Obliczenie składki zdrowotnej",
                "text": "Wyliczenie 9% podstawy wymiaru składki."
            },
            {
                "@type": "HowToStep",
                "name": "Ustalenie dochodu",
                "text": "Odjęcie kosztów uzyskania przychodu od podstawy."
            },
            {
                "@type": "HowToStep",
                "name": "Obliczenie zaliczki na podatek",
                "text": "Zastosowanie skali podatkowej (12% lub 32%) i kwoty zmniejszającej podatek."
            },
            {
                "@type": "HowToStep",
                "name": "Obliczenie netto",
                "text": "Odjęcie od brutto wszystkich składek i zaliczki na podatek, aby otrzymać kwotę 'na rękę'."
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, webAppSchema, howToSchema]) }}
            />
            {children}
        </>
    );
}
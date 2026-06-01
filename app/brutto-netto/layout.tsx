import type { Metadata } from "next";
import type { ReactNode } from "react";
import AggregateRatingSchema from "../components/AggregateRatingSchema";

export const metadata: Metadata = {
    metadataBase: new URL("https://stawka-godzinowa.pl"),
    alternates: {
        canonical: "/brutto-netto",
        languages: {
            'pl': 'https://stawka-godzinowa.pl/brutto-netto',
        },
    },
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
    title: "Kalkulator wynagrodzeń Brutto Netto 2026 - Oblicz Płace UoP",
    description: "Profesjonalny kalkulator wynagrodzeń brutto netto 2026. Szybko oblicz swoją płacę na rękę (UoP) uwzględniając PPK, progi podatkowe i ulgi podatkowe.",
    keywords: "kalkulator wynagrodzeń brutto netto, przelicznik wynagrodzenia, brutto netto, wynagrodzenie netto, kalkulator płac 2026, umowa o pracę",
    openGraph: {
        title: "Kalkulator wynagrodzeń Brutto Netto",
        description: "Oblicz swoje wynagrodzenie netto z brutto za pomocą szybkiego kalkulatora online. Dokładne wyniki dla umowy o pracę.",
        url: "https://stawka-godzinowa.pl/brutto-netto",
        siteName: "Stawka Godzinowa",
        images: [
            {
                url: "https://stawka-godzinowa.pl/brutto_netto.webp",
                width: 1200,
                height: 630,
                alt: "Kalkulator wynagrodzeń brutto netto",
            },
        ],
        locale: "pl_PL",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Kalkulator wynagrodzeń Brutto Netto",
        description: "Oblicz swoje wynagrodzenie netto z brutto za pomocą szybkiego kalkulatora online. Dokładne wyniki dla umowy o pracę.",
        images: ["https://stawka-godzinowa.pl/brutto_netto.webp"],
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
                "item": "https://stawka-godzinowa.pl/brutto-netto"
            }
        ]
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

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Jak najszybciej obliczyć wynagrodzenie netto?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Najszybszym sposobem jest skorzystanie z naszego kalkulatora wynagrodzeń brutto netto. Wystarczy wpisać kwotę brutto z umowy, a system automatycznie odejmie składki ZUS, zdrowotną oraz zaliczkę na podatek PIT."
                }
            },
            {
                "@type": "Question",
                "name": "Co to jest kwota wolna od podatku w 2026 roku?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "W 2026 roku kwota wolna od podatku wynosi 30 000 zł rocznie. Przekłada się to na miesięczną kwotę zmniejszającą podatek w wysokości 300 zł, o ile pracownik złoży u pracodawcy deklarację PIT-2."
                }
            },
            {
                "@type": "Question",
                "name": "Czy kalkulator uwzględnia wpłaty na PPK?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Tak, nasz kalkulator pozwala zaznaczyć udział w Pracowniczych Planach Kapitałowych (PPK) i uwzględnia potrącenie części pracownika (standardowo 2%) przy wyliczaniu kwoty netto."
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, howToSchema, faqSchema]) }}
            />
            <nav aria-label="Breadcrumb" className="breadcrumb">
                <ol>
                    <li><a href="https://stawka-godzinowa.pl">Strona Główna</a></li>
                    <li aria-current="page">Przelicznik Brutto na Netto</li>
                </ol>
            </nav>
            {children}
        </>
    );
}
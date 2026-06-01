import type { Metadata } from "next";
import AggregateRatingSchema from "../components/AggregateRatingSchema";

export const metadata: Metadata = {
    metadataBase: new URL('https://stawka-godzinowa.pl'),
    alternates: {
        canonical: '/kalkulator-b2b',
        languages: {
            'pl': 'https://stawka-godzinowa.pl/kalkulator-b2b',
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
    title: "Kalkulator B2B 2026 - Ryczałt, Liniowy, Skala - Oblicz Netto",
    description: "Kompleksowy kalkulator B2B na 2026 rok. Porównaj Ryczałt, Podatek Liniowy i Skalę Podatkową. Oblicz ZUS, składkę zdrowotną i realny zysk netto swojej firmy.",
    keywords: "kalkulator b2b, kalkulator wynagrodzeń 2026, samozatrudnienie, ryczałt vs liniowy, składki zus 2026, podatek b2b, faktura netto",
    openGraph: {
        title: "Kalkulator B2B 2026 - Sprawdź ile zarobisz na rękę",
        description: "Oblicz swój zysk netto na B2B. Aktualne stawki ZUS i podatki na rok 2026. Porównaj formy opodatkowania.",
        url: "https://stawka-godzinowa.pl/kalkulator-b2b",
        siteName: "Stawka Godzinowa",
        images: [
            {
                url: "https://stawka-godzinowa.pl/kalkulator_b2b.webp",
                width: 1200,
                height: 630,
                alt: "Kalkulator B2B 2026",
            },
        ],
        locale: "pl_PL",
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Kalkulator B2B 2026 - Sprawdź ile zarobisz na rękę",
        description: "Oblicz swój zysk netto na B2B. Aktualne stawki ZUS i podatki na rok 2026. Porównaj formy opodatkowania.",
        images: ["https://stawka-godzinowa.pl/kalkulator_b2b.webp"],
    }
};

export default function B2BLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
                "name": "Kalkulator B2B",
                "item": "https://stawka-godzinowa.pl/kalkulator-b2b"
            }
        ]
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Jaką formę opodatkowania wybrać na B2B w 2026 roku?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Wybór zależy od wysokości przychodów i kosztów. Ryczałt (np. 12% dla IT) jest często korzystny przy niskich kosztach. Podatek liniowy (19%) opłaca się przy wysokich dochodach, a skala podatkowa (12%/32%) pozwala korzystać z kwoty wolnej 30 tys. zł i ulg prorodzinnych."
                }
            },
            {
                "@type": "Question",
                "name": "Ile wynosi składka zdrowotna na B2B w 2026 r.?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Na skali podatkowej wynosi 9% dochodu. Na podatku liniowym jest to 4,9% dochodu. Na ryczałcie składka zdrowotna jest stała i zależy od progu przychodów rocznych."
                }
            },
            {
                "@type": "Question",
                "name": "Czy B2B wlicza się do stażu pracy?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Od 2026 roku planowane są zmiany wliczające okresy prowadzenia działalności do stażu pracy, od którego zależą uprawnienia pracownicze (np. wymiar urlopu), pod warunkiem opłacania składek emerytalno-rentowych."
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }}
            />
            <nav aria-label="Breadcrumb" className="breadcrumb">
                <ol>
                    <li><a href="https://stawka-godzinowa.pl">Strona Główna</a></li>
                    <li aria-current="page">Kalkulator B2B</li>
                </ol>
            </nav>
            {children}
        </>
    );
}

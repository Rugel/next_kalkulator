import type { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL('https://stawka-godzinowa.pl'),
    alternates: {
        canonical: '/kalkulator-b2b',
    },
    robots: {
        index: true,
        follow: true,
    },
    title: "Kalkulator B2B 2026 - Oblicz Netto, ZUS i Podatek (Ryczałt, Liniowy)",
    description: "Darmowy kalkulator wynagrodzeń B2B na 2026 rok. Porównaj Ryczałt, Podatek Liniowy i Skalę. Oblicz ZUS, składkę zdrowotną i zysk netto 'na rękę'.",
    keywords: "kalkulator b2b, kalkulator wynagrodzeń 2026, samozatrudnienie, ryczałt vs liniowy, składki zus 2026, podatek b2b, faktura netto",
    openGraph: {
        title: "Kalkulator B2B 2026 - Sprawdź ile zarobisz na rękę",
        description: "Oblicz swój zysk netto na B2B. Aktualne stawki ZUS i podatki na rok 2026. Porównaj formy opodatkowania.",
        url: "https://stawka-godzinowa.pl/kalkulator-b2b",
        siteName: "Kalkulator Wynagrodzeń",
        images: [
            {
                url: "https://stawka-godzinowa.pl/image.webp",
                width: 1200,
                height: 630,
                alt: "Kalkulator B2B 2026",
            },
        ],
        locale: "pl_PL",
        type: "website"
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

    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Kalkulator B2B 2026",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "url": "https://stawka-godzinowa.pl/kalkulator-b2b",
        "description": "Narzędzie do obliczania wynagrodzenia netto dla przedsiębiorców (B2B) w Polsce na rok 2026.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "PLN"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, webAppSchema]) }}
            />
            {children}
        </>
    );
}

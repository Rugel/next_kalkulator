import type { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL('https://stawka-godzinowa.pl'),
    alternates: {
        canonical: '/kalkulator-umowy-zlecenie',
    },
    title: "Kalkulator Umowy Zlecenie 2026 - Oblicz Netto, ZUS i PIT",
    description: "Darmowy kalkulator umowy zlecenie na rok 2026. Oblicz wynagrodzenie netto, składki ZUS i zaliczkę na podatek. Uwzględnia 'Zerowy PIT' dla młodych i status studenta.",
    keywords: "kalkulator umowy zlecenie, umowa zlecenie 2026, wynagrodzenie netto, kalkulator płac, pit-2, zwolnienie z podatku, student zlecenia, składki zus zlecenie",
    openGraph: {
        title: "Kalkulator Umowy Zlecenie 2026 - Sprawdź ile dostaniesz na rękę",
        description: "Oblicz swoje wynagrodzenie netto z umowy zlecenie. Najnowsze wskaźniki na rok 2026. Uwzględnia ulgę dla młodych i koszty autorskie.",
        url: "https://stawka-godzinowa.pl/kalkulator-umowy-zlecenie",
        siteName: "Kalkulator Wynagrodzeń",
        images: [
            {
                url: "https://stawka-godzinowa.pl/image.webp",
                width: 1200,
                height: 630,
                alt: "Kalkulator Umowy Zlecenie",
            },
        ],
        locale: "pl_PL",
        type: "website"
    }
};

export default function ZlecenieLayout({
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
                "name": "Kalkulator Umowy Zlecenie",
                "item": "https://stawka-godzinowa.pl/kalkulator-umowy-zlecenie"
            }
        ]
    };

    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Kalkulator Umowy Zlecenie",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "url": "https://stawka-godzinowa.pl/kalkulator-umowy-zlecenie",
        "description": "Oblicz wynagrodzenie netto z umowy zlecenia. Aktualne stawki i przepisy na rok 2026.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "PLN"
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Ile wynosi minimalna stawka godzinowa na zleceniu w 2026 roku?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Od 1 stycznia 2026 roku minimalna stawka godzinowa dla umowy zlecenia wynosi 31,40 zł brutto."
                }
            },
            {
                "@type": "Question",
                "name": "Czy student do 26 roku życia płaci podatek od zlecenia?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Nie, studenci i uczniowie, którzy nie ukończyli 26 lat, są zwolnieni zarówno ze składek ZUS, jak i z podatku dochodowego. Kwota brutto jest równa kwocie netto."
                }
            },
            {
                "@type": "Question",
                "name": "Czy umowa zlecenie liczy się do stażu pracy?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Tak, od 2026 roku okresy pracy na umowie zlecenie (od których odprowadzano składki emerytalne i rentowe) wliczają się do pracowniczego stażu pracy."
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, webAppSchema, faqSchema]) }}
            />
            {children}
        </>
    );
}

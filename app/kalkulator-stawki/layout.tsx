import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CURRENT_YEAR } from "../lib/current-year";

export const metadata: Metadata = {
    metadataBase: new URL('https://stawka-godzinowa.pl'),
    alternates: {
        canonical: '/kalkulator-stawki',
        languages: {
            'pl': 'https://stawka-godzinowa.pl/kalkulator-stawki',
        },
    },
    robots: {
        index: true,
        follow: true,
    },
    title: `Kalkulator stawki godzinowej ${CURRENT_YEAR} - oblicz wynagrodzenie Netto i Brutto`,
    description: `Kalkulator stawki godzinowej ${CURRENT_YEAR}. Oblicz wynagrodzenie netto i brutto dla UoP i zlecenia. Uwzględnia ZUS, podatek oraz PPK. Sprawdź, ile zarabiasz!`,
    openGraph: {
        title: `Kalkulator stawki godzinowej ${CURRENT_YEAR} - oblicz wynagrodzenie Netto i Brutto`,
        description: `Oblicz swoją stawkę godzinową brutto i netto w ${CURRENT_YEAR} roku. Uwzględniamy ZUS, podatek dochodowy i PPK. Precyzyjny kalkulator wynagrodzeń.`,
        url: "https://stawka-godzinowa.pl/kalkulator-stawki",
        siteName: "Stawka Godzinowa",
        images: [
            {
                url: "https://stawka-godzinowa.pl/image.webp",
                width: 1200,
                height: 630,
                alt: `Kalkulator Stawki Godzinowej ${CURRENT_YEAR} – netto i brutto`,
            },
        ],
        locale: "pl_PL",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: `Kalkulator Stawki Godzinowej ${CURRENT_YEAR} | stawka-godzinowa.pl`,
        description: `Oblicz swoją stawkę godzinową netto i brutto – szybko i precyzyjnie. Dane na ${CURRENT_YEAR} rok.`,
        images: ["https://stawka-godzinowa.pl/image.webp"],
    },
};

export default function KalkulatorStawkiLayout({ children }: { children: ReactNode }) {
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
                "name": "Kalkulator Stawki Godzinowej",
                "item": "https://stawka-godzinowa.pl/kalkulator-stawki"
            }
        ]
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `Jak obliczyć stawkę godzinową w ${CURRENT_YEAR} roku?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Aby obliczyć stawkę godzinową, podziel miesięczne wynagrodzenie brutto przez liczbę godzin pracy w miesiącu (zwykle 168h). Nasz kalkulator automatycznie uwzględnia składki ZUS, podatek PIT i PPK.`
                }
            },
            {
                "@type": "Question",
                "name": `Ile wynosi minimalna stawka godzinowa w ${CURRENT_YEAR} roku?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `W ${CURRENT_YEAR} roku minimalne wynagrodzenie na umowie o pracę wynosi 4806 zł brutto miesięcznie, co daje około 28,61 zł brutto za godzinę. Na umowie zlecenie minimalna stawka to 31,40 zł brutto.`
                }
            },
            {
                "@type": "Question",
                "name": "Czy kalkulator uwzględnia wszystkie składki ZUS?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Tak, kalkulator uwzględnia składki emerytalne (9,76%), rentowe (1,5%), chorobowe (2,45%) oraz zdrowotne (9%). Dodatkowo oblicza wpłaty pracodawcy na PPK."
                }
            },
            {
                "@type": "Question",
                "name": "Jak przeliczyć kwotę netto na stawkę godzinową?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Najpierw ustal kwotę brutto swojego wynagrodzenia za pomocą przelicznika brutto-netto, a następnie podziel ją przez liczbę godzin przepracowanych w miesiącu. Kalkulator stawki godzinowej zrobi to za Ciebie automatycznie."
                }
            },
            {
                "@type": "Question",
                "name": "Czy stawka godzinowa zależy od rodzaju umowy?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Tak, sposób wyliczania składek różni się między Umową o Pracę (UoP), Umową Zlecenie a B2B. Kalkulator jest zoptymalizowany pod kątem Umowy o Pracę. Dla innych form dostępne są osobne kalkulatory."
                }
            },
            {
                "@type": "Question",
                "name": `Jakie są koszty pracodawcy przy umowie o pracę w ${CURRENT_YEAR} roku?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Całkowity koszt pracodawcy dla umowy o pracę w ${CURRENT_YEAR} roku to wynagrodzenie brutto powiększone o składki emerytalną (9,76%), rentową (6,5%), wypadkową (~1,67%), Fundusz Pracy (2,45%) i FGŚP (0,1%) oraz obowiązkowe wpłaty na PPK (1,5%). Łącznie to około 20,48% powyżej brutto.`
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
                    <li aria-current="page">Kalkulator Stawki Godzinowej</li>
                </ol>
            </nav>
            {children}
        </>
    );
}
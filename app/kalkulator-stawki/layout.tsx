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
<<<<<<< HEAD

=======
>>>>>>> d28cb36628c5d1a11c546be266935f8adf86a7d2
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
    title: `Kalkulator stawki godzinowej ${CURRENT_YEAR} - oblicz wynagrodzenie Netto i Brutto`,
    description: `Kalkulator stawki godzinowej ${CURRENT_YEAR}. Oblicz wynagrodzenie netto i brutto dla UoP i zlecenia. Uwzględnia ZUS, podatek oraz PPK. Sprawdź, ile zarabiasz!`,
    keywords: `kalkulator stawki godzinowej, stawka godzinowa, stawka godzinowa ${CURRENT_YEAR}, przelicznik wynagrodzenia, ile zarabiam na godzinę, kalkulator płac ${CURRENT_YEAR}, kalkulator wynagrodzeń`,
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

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "Jak obliczyć stawkę godzinową",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Wprowadź wynagrodzenie brutto",
                "text": "Wpisz kwotę miesięcznego wynagrodzenia brutto z Twojej umowy."
            },
            {
                "@type": "HowToStep",
                "name": "Wybierz miesiąc",
                "text": "Wybierz konkretny miesiąc, aby system automatycznie pobrał liczbę dni roboczych."
            },
            {
                "@type": "HowToStep",
                "name": "Sprawdź stawkę godzinową",
                "text": "Kalkulator od razu wyświetli Twoją stawkę za jedną godzinę pracy oraz szczegóły składek."
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, howToSchema]) }}
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
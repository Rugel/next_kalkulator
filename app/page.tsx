import HomePage from "./home-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kalkulator stawki godzinowej 2026 - oblicz wynagrodzenie Netto i Brutto",
    description:
        "🧮 Kalkulator stawki godzinowej 2026 – oblicz wynagrodzenie netto i brutto dla umowy o pracę i zlecenia. Uwzględnia ZUS, podatek i PPK. ✅ Sprawdź, ile zarabiasz na godzinę!",
    keywords:
        "kalkulator stawki godzinowej, stawka godzinowa, stawka godzinowa 2026, przelicznik wynagrodzenia, ile zarabiam na godzinę, kalkulator płac 2026, kalkulator wynagrodzeń",
    alternates: {
        canonical: "https://stawka-godzinowa.pl",
    },
    openGraph: {
        title: "Kalkulator stawki godzinowej 2026 - oblicz wynagrodzenie Netto i Brutto",
        description:
            "Oblicz swoją stawkę godzinową brutto i netto w 2026 roku. Uwzględniamy ZUS, podatek dochodowy i PPK. Precyzyjny kalkulator wynagrodzeń.",
        url: "https://stawka-godzinowa.pl",
        siteName: "Stawka Godzinowa",
        images: [
            {
                url: "https://stawka-godzinowa.pl/image.webp",
                width: 1200,
                height: 630,
                alt: "Kalkulator Stawki Godzinowej 2026 – netto i brutto",
            },
        ],
        locale: "pl_PL",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Kalkulator Stawki Godzinowej 2026 | stawka-godzinowa.pl",
        description:
            "Oblicz swoją stawkę godzinową netto i brutto – szybko i precyzyjnie. Dane na 2026 rok.",
        images: ["https://stawka-godzinowa.pl/image.webp"],
    },
};

export default function Page() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Ile wynosi najniższa stawka godzinowa w 2026 roku?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "W 2026 roku minimalna stawka godzinowa dla umowy zlecenia wynosi 31,40 zł brutto, a minimalne wynagrodzenie na UoP to 4806 zł brutto."
                }
            },
            {
                "@type": "Question",
                "name": "Jak przeliczyć kwotę brutto na stawkę godzinową?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Podziel miesięczne wynagrodzenie brutto przez liczbę dni roboczych w miesiącu, a następnie przez 8 godzin dziennie."
                }
            },
            {
                "@type": "Question",
                "name": "Czy stawka godzinowa zależy od liczby dni w miesiącu?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Tak, przy stałej pensji miesięcznej Twoja stawka godzinowa jest wyższa w miesiącach z mniejszą liczbą dni roboczych (np. luty)."
                }
            }
        ]
    };
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <HomePage />
        </>
    );
}

import HomePage from "../home-page";
import SchemaOrg from "../components/SchemaOrg";
import type { Metadata } from "next";
import { CURRENT_YEAR } from "../lib/current-year";

export const metadata: Metadata = {
    title: `Kalkulator stawki godzinowej ${CURRENT_YEAR} - oblicz wynagrodzenie Netto i Brutto`,
    description:
        `Kalkulator stawki godzinowej ${CURRENT_YEAR}. Oblicz wynagrodzenie netto i brutto dla UoP i zlecenia. Uwzględnia ZUS, podatek oraz PPK. Sprawdź, ile zarabiasz!`,
    keywords:
        `kalkulator stawki godzinowej, stawka godzinowa, stawka godzinowa ${CURRENT_YEAR}, przelicznik wynagrodzenia, ile zarabiam na godzinę, kalkulator płac ${CURRENT_YEAR}, kalkulator wynagrodzeń`,
    alternates: {
        canonical: "https://stawka-godzinowa.pl/kalkulator-stawki",
    },
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: `Kalkulator stawki godzinowej ${CURRENT_YEAR} - oblicz wynagrodzenie Netto i Brutto`,
        description:
            `Oblicz swoją stawkę godzinową brutto i netto w ${CURRENT_YEAR} roku. Uwzględniamy ZUS, podatek dochodowy i PPK. Precyzyjny kalkulator wynagrodzeń.`,
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
        description:
            `Oblicz swoją stawkę godzinową netto i brutto – szybko i precyzyjnie. Dane na ${CURRENT_YEAR} rok.`,
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
            }
        ]
    };

    return (
        <>
            <SchemaOrg />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <HomePage />
        </>
    );
}

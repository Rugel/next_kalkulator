import HomePage from "./strona-glowna/home-page";
import SchemaOrg from "./components/SchemaOrg";
import type { Metadata } from "next";
import { CURRENT_YEAR } from "./lib/current-year";

export const metadata: Metadata = {
    // `absolute` pomija template z layoutu ('%s | stawka-godzinowa.pl'),
    // aby zachować pełną kontrolę nad długością tytułu w SERP (limit ~60 znaków).
    title: {
        absolute: `Kalkulator stawki godzinowej ${CURRENT_YEAR} – netto i brutto online`,
    },
    description:
        `Darmowy kalkulator stawki godzinowej ${CURRENT_YEAR}: oblicz wynagrodzenie netto i brutto z uwzględnieniem ZUS, podatku i PPK. Sprawdź, ile zarabiasz na godzinę!`,
    keywords: [
        'kalkulator stawki godzinowej',
        `stawka godzinowa ${CURRENT_YEAR}`,
        'przelicznik wynagrodzenia',
        'kalkulator wynagrodzeń',
        'wynagrodzenie netto i brutto',
        'kalkulator brutto netto',
        'kalkulator umowy zlecenia',
        'kalkulator B2B',
        'składki ZUS',
        'PPK',
    ].join(', '),
    alternates: {
        canonical: "https://stawka-godzinowa.pl",
        languages: {
            'pl': 'https://stawka-godzinowa.pl',
            'x-default': 'https://stawka-godzinowa.pl',
        },
    },
    openGraph: {
        title: `Kalkulator stawki godzinowej ${CURRENT_YEAR} – netto i brutto`,
        description:
            "Oblicz stawkę godzinową brutto i netto online. ZUS, podatek i PPK uwzględnione. Sprawdź, ile zarabiasz na godzinę!",
        url: "https://stawka-godzinowa.pl",
        siteName: "Stawka Godzinowa",
        images: [
            {
                url: "https://stawka-godzinowa.pl/image.webp",
                width: 1200,
                height: 630,
                alt: `Kalkulator stawki godzinowej ${CURRENT_YEAR} – wynagrodzenie netto i brutto`,
            },
        ],
        locale: "pl_PL",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: `Kalkulator stawki godzinowej ${CURRENT_YEAR} – netto i brutto`,
        description:
            "Oblicz stawkę godzinową brutto i netto online. ZUS, podatek i PPK uwzględnione. Sprawdź, ile zarabiasz na godzinę!",
        images: ["https://stawka-godzinowa.pl/image.webp"],
    },
};

export default function Page() {
    return (
        <>
            <SchemaOrg />
            <nav aria-label="Breadcrumb" className="breadcrumb">
                <ol>
                    <li aria-current="page">Strona Główna</li>
                </ol>
            </nav>
            <HomePage />
        </>
    );
}

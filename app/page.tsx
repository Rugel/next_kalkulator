import HomePage from "./strona-glowna/home-page";
import SchemaOrg from "./components/SchemaOrg";
import type { Metadata } from "next";
import { CURRENT_YEAR } from "./lib/current-year";

export const metadata: Metadata = {
    title: `Stawka Godzinowa - Kalkulatory wynagrodzeń ${CURRENT_YEAR}`,
    description:
        `Stawka Godzinowa to narzędzia do obliczania wynagrodzeń: kalkulator stawki godzinowej, przelicznik brutto-netto, kalkulator umowy zlecenie, B2B i inflacji.`,
    keywords:
        `kalkulator stawki godzinowej, kalkulator wynagrodzeń, przelicznik brutto netto, kalkulator B2B, kalkulator umowy zlecenie, kalkulator inflacji, stawka godzinowa ${CURRENT_YEAR}`,
    alternates: {
        canonical: "https://stawka-godzinowa.pl",
    },
    openGraph: {
        title: `Stawka Godzinowa - Kalkulatory wynagrodzeń ${CURRENT_YEAR}`,
        description:
            "Kompletny zestaw narzędzi do obliczania wynagrodzeń: kalkulator stawki godzinowej, przelicznik brutto-netto, kalkulator umowy zlecenie, B2B i inflacji.",
        url: "https://stawka-godzinowa.pl",
        siteName: "Stawka Godzinowa",
        images: [
            {
                url: "https://stawka-godzinowa.pl/image.webp",
                width: 1200,
                height: 630,
                alt: `Stawka Godzinowa - Kalkulatory wynagrodzeń ${CURRENT_YEAR}`,
            },
        ],
        locale: "pl_PL",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: `Stawka Godzinowa - Kalkulatory wynagrodzeń ${CURRENT_YEAR}`,
        description:
            "Kompletny zestaw narzędzi do obliczania wynagrodzeń: kalkulator stawki godzinowej, przelicznik brutto-netto, kalkulator umowy zlecenie, B2B i inflacji.",
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

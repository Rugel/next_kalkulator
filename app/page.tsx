import HomePage from "./strona-glowna/home-page";
import SchemaOrg from "./components/SchemaOrg";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Stawka Godzinowa - Kalkulatory wynagrodzeń 2026",
    description:
        "Stawka Godzinowa to kompletny zestaw narzędzi do obliczania wynagrodzeń. Kalkulator stawki godzinowej, przelicznik brutto-netto, kalkulator umowy zlecenie, B2B i inflacji.",
    keywords:
        "kalkulator stawki godzinowej, kalkulator wynagrodzeń, przelicznik brutto netto, kalkulator B2B, kalkulator umowy zlecenie, kalkulator inflacji, stawka godzinowa 2026",
    alternates: {
        canonical: "https://stawka-godzinowa.pl",
    },
    openGraph: {
        title: "Stawka Godzinowa - Kalkulatory wynagrodzeń 2026",
        description:
            "Kompletny zestaw narzędzi do obliczania wynagrodzeń. Kalkulator stawki godzinowej, przelicznik brutto-netto, kalkulator umowy zlecenie, B2B i inflacji.",
        url: "https://stawka-godzinowa.pl",
        siteName: "Stawka Godzinowa",
        images: [
            {
                url: "https://stawka-godzinowa.pl/image.webp",
                width: 1200,
                height: 630,
                alt: "Stawka Godzinowa - Kalkulatory wynagrodzeń 2026",
            },
        ],
        locale: "pl_PL",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Stawka Godzinowa - Kalkulatory wynagrodzeń 2026",
        description:
            "Kompletny zestaw narzędzi do obliczania wynagrodzeń. Kalkulatory UoP, zlecenia, B2B i inflacji.",
        images: ["https://stawka-godzinowa.pl/image.webp"],
    },
};

export default function Page() {
    return (
        <>
            <SchemaOrg />
            <HomePage />
        </>
    );
}
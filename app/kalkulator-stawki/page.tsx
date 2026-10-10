import HomePage from "../home-page";
import type { Metadata } from "next";
import { CURRENT_YEAR } from "../lib/current-year";

export const metadata: Metadata = {
    title: `Kalkulator stawki godzinowej ${CURRENT_YEAR} - oblicz wynagrodzenie Netto i Brutto`,
    description:
        `Kalkulator stawki godzinowej ${CURRENT_YEAR}. Oblicz wynagrodzenie netto i brutto dla UoP i zlecenia. Uwzględnia ZUS, podatek oraz PPK. Sprawdź, ile zarabiasz!`,
    alternates: {
        canonical: "https://stawka-godzinowa.pl/kalkulator-stawki",
    },
    robots: {
        index: true,
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
    return <HomePage />;
}
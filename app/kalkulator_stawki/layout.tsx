import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL('https://stawka-godzinowa.pl'),
    alternates: {
        canonical: '/kalkulator_stawki',
    },
    title: "Kalkulator stawki godzinowej",
    description: "Wyliczenie stawki godzinowej netto z miesięcznego wynagrodzenia brutto - wystarczy podać kwotę i wpisać liczbę dni roboczych w danym miesiącu.",
    keywords: "kalkulator, wynagodzenie, stawka godzinowa",
    openGraph: {
        title: "Kalkulator stawki godzinowej",
        description: "Wyliczenie stawki godzinowej netto z miesięcznego wynagrodzenia brutto - wystarczy podać kwotę i wpisać liczbę dni roboczych w danym miesiącu.",
        url: "https://stawka-godzinowa.pl/kalkulator_stawki",
        siteName: "Kalkulator stawki godzinowej",
        images: [
            {
                url: "https://stawka-godzinowa.pl/stawka_godzinowa.webp",
                width: 1200,
                height: 630,
                alt: "Stawka godzinowa",
            },
        ],
        locale: "pl_PL",
        type: "website"
    }
};

export default function StaGodz({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>{children}</div>
    );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL('https://stawka-godzinowa.pl'),
    alternates: {
        canonical: '/kalkulator_stawki',
    },
    title: "Stawka godzinowa? => ten Kalkulator obliczy Twoje wynagrodzenie!",
    description: "Wyliczenie stawki godzinowej brutto z miesięcznego wynagrodzenia brutto - wystarczy podać kwotę i wpisać liczbę dni roboczych w danym miesiącu.",
    keywords: "kalkulator wynagrodzeń, stawka godzinowa, pensja, wypłata, brutto, netto, przelicznik ",
    openGraph: {
        title: "Stawka godzinowa? => ten Kalkulator obliczy Twoje wynagrodzenie!",
        description: "Wyliczenie stawki godzinowej brutto z miesięcznego wynagrodzenia brutto - wystarczy podać kwotę i wpisać liczbę dni roboczych w danym miesiącu.",
        url: "https://stawka-godzinowa.pl/kalkulator_stawki",
        siteName: "Kalkulator Wynagrodzeń",
        images: [
            {
                url: "https://stawka-godzinowa.pl/image.webp",
                width: 1200,
                height: 630,
                alt: "Kalkulator Stawki Godzinowej",
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

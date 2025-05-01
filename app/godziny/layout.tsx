import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL('https://stawka-godzinowa.pl'),
    alternates: {
        canonical: '/godziny',
    },
    title: "Kalkulator Wynagrodzeń dla Pracownika ze Stawką Godzinową",
    description: "Kalkulator wynagrodzeń 2025 obliczy kwotę netto lub brutto na podstawie godzin pracy, stawki godzinowej, świadczenia chorobowego, urlopu oraz dodatków",
    keywords: "kalkulator, wynagodzenie, stawka godzinowa",
    openGraph: {
        title: "Kalkulator Wynagrodzeń dla Pracownika ze Stawką Godzinową",
        description: "Kalkulator wynagrodzeń 2025 obliczy kwotę netto lub brutto na podstawie godzin pracy, stawki godzinowej, świadczenia chorobowego, urlopu oraz dodatków",
        url: "https://stawka-godzinowa.pl/godziny",
        siteName: "Kalkulator Wynagordzeń",
        images: [
            {
                url: "https://stawka-godzinowa.pl/image.webp",
                width: 1200,
                height: 630,
                alt: "Kalkulator Wynagrodzeń",
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

import type { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL('https://stawka-godzinowa.pl'),
    alternates: {
        canonical: '/wyliczenie_z_godzin',
    },
    title: "Kalkulator Wynagrodzeń z Godzin Pracy 2026 - Oblicz Płace UoP",
    description: "Oblicz wynagrodzenie netto z godzin pracy. Kalkulator uwzględnia stawkę godzinową, nadgodziny, dni wolne, urlop oraz zwolnienie chorobowe (UoP).",
    keywords: "wyliczenie pensji z godzin, kalkulator godzin pracy, obliczanie wynagrodzenia z przepracowanych godzin, kalkulator płac uop",
    openGraph: {
        title: "Kalkulator Wynagrodzeń - Oblicz Pensję z Godzin Pracy",
        description: "Najlepszy kalkulator wynagrodzeń 2026. Oblicz pensję na podstawie przepracowanych godzin, uwzględniając wszystkie dodatki i potrącenia.",
        url: "https://stawka-godzinowa.pl/wyliczenie_z_godzin",
        siteName: "Kalkulator Stawki Godzinowej",
        images: [
            {
                url: "https://stawka-godzinowa.pl/image.webp",
                width: 1200,
                height: 630,
                alt: "Kalkulator Wynagrodzeń z godzin",
            },
        ],
        locale: "pl_PL",
        type: "website",
    },
};

export default function WyliczenieLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}

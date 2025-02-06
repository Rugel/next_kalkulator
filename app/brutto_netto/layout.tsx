import type { Metadata } from "next";


export const metadata: Metadata = {
    metadataBase: new URL('https://stawka-godzinowa.pl'),
    alternates: {
        canonical: '/brutto_netto',
    },
    title: "Przelicznik wynagrodzenia brutto na netto",
    description: "Kalkulator przeliczy wynagrodzenie brutto na netto - wystarczy zaznaczyć właściwe opcje i podać kwotę brutto.",
    keywords: "kalkulator, wynagodzenie, brutto, netto",
    openGraph: {
        title: "Przelicznik wynagrodzenia brutto na netto",
        description: "Kalkulator przeliczy wynagrodzenie brutto na netto - wystarczy zaznaczyć właściwe opcje i podać kwotę brutto.",
        url: "https://stawka-godzinowa.pl/brutto_netto",
        siteName: "Przelicznik brutto na netto",
        images: [
            {
                url: "https://stawka-godzinowa.pl/brutto_na_netto.webp",
                width: 1200,
                height: 630,
                alt: "Brutto na netto"
            }
        ],
        locale: "pl_PL",
        type: "website",
    },
};

export default function BaN({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>{children}</div>
    );
}

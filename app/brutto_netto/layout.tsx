import type { Metadata } from "next";


export const metadata: Metadata = {
    metadataBase: new URL('https://stawka-godzinowa.pl'),
    alternates: {
        canonical: '/brutto_netto',
    },
    title: "Przelicznik wynagrodzenia brutto na netto",
    description: "Kalkulator przeliczy wynagrodzenie brutto na netto - wystarczy zaznaczyć właściwe opcje i podać kwotę brutto.",
    keywords: "kalkulator, wynagodzenie, brutto, netto",
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

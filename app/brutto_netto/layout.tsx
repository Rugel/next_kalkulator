import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Przelicznik wynagrodzenia brutto na netto",
    description: "Kalkulator przeliczy wynagrodzenie brutto na netto - wystarczy zaznaczyć właściwe opcje i podać kwotę brutto.",
    keywords: "kalkulator, wynagodzenie, brutto, netto"
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

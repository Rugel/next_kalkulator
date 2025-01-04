import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Kalkulator stawki godzinowej",
    description: "Wyliczenie stawki godzinowej netto z miesięcznego wynagrodzenia brutto - wystarczy podać kwotę i wpisać liczbę dni roboczych w danym miesiącu.",
    keywords: "kalkulator, wynagodzenie, stawka godzinowa"
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

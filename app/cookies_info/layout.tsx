import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL('https://stawka-godzinowa.pl'),
    title: "Informacja o cookies",
    description: "Strona przedstawia informacje na temat plików cookies używanych na stronie internetowej",
    keywords: "cookies, ciasteczka, polityka, prywatność",
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: "Informacja o cookies | stawka-godzinowa.pl",
        description: "Strona przedstawia informacje na temat plików cookies używanych na stronie internetowej",
        url: "https://stawka-godzinowa.pl/cookies_info",
        siteName: "Stawka Godzinowa",
        locale: "pl_PL",
        type: "website",
    },
};

export default function Cookies_info({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>{children}</div>
    );
}
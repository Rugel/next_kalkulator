import type { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL('https://stawka-godzinowa.pl'),
    title: "Informacja o cookies",
    description: "Strona przedstawia informacje na temat plików cookies używanych na stronie internetowej",
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

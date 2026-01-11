import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL('https://stawka-godzinowa.pl'),
    alternates: {
        canonical: '/kalkulator_stawki',
    },
    robots: {
        index: true,
        follow: true,
    },
    title: "Stawka godzinowa? => ten Kalkulator obliczy Twoje wynagrodzenie!",
    description: "Wyliczenie stawki godzinowej brutto z miesięcznego wynagrodzenia brutto - wystarczy podać kwotę i wpisać liczbę dni roboczych w danym miesiącu.",
    keywords: "kalkulator wynagrodzeń, stawka godzinowa, pensja, wypłata, brutto, netto, przelicznik ",
    openGraph: {
        title: "Stawka godzinowa? => ten Kalkulator obliczy Twoje wynagrodzenie!",
        description: "Wyliczenie stawki godzinowej brutto z miesięcznego wynagrodzenia brutto - wystarczy podać kwotę i wpisać liczbę dni roboczych w danym miesiącu.",
        url: "https://stawka-godzinowa.pl/kalkulator_stawki",
        siteName: "Kalkulator Stawki Godzinowej",
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
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Strona Główna",
                "item": "https://stawka-godzinowa.pl"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Kalkulator Stawki Godzinowej",
                "item": "https://stawka-godzinowa.pl/kalkulator_stawki"
            }
        ]
    };

    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Kalkulator Stawki Godzinowej",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "url": "https://stawka-godzinowa.pl/kalkulator_stawki",
        "description": "Oblicz swoją stawkę godzinową na podstawie wynagrodzenia miesięcznego brutto.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "PLN"
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [{
            "@type": "Question",
            "name": "Jak obliczyć stawkę godzinową brutto?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Aby obliczyć stawkę godzinową, podziel miesięczne wynagrodzenie brutto przez liczbę dni roboczych w miesiącu, a następnie wynik podziel przez 8 (zakładając 8-godzinny dzień pracy)."
            }
        }]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, webAppSchema, faqSchema]) }}
            />
            {children}
        </>
    );
}

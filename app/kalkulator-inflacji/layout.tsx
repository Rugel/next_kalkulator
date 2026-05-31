import type { Metadata } from "next";
import AggregateRatingSchema from "../components/AggregateRatingSchema";

export const metadata: Metadata = {
    metadataBase: new URL('https://stawka-godzinowa.pl'),
    alternates: {
        canonical: '/kalkulator-inflacji',
    },
    robots: {
        index: true,
        follow: true,
    },
    title: "Kalkulator Inflacji w latach 1982-2050 | Oblicz wartość pieniądza",
    description: "Sprawdź inflację skumulowaną w Polsce od 1982 roku. Oblicz wartość swoich oszczędności po uwzględnieniu inflacji i denominacji. Prognozy do 2050 roku.",
    keywords: "kalkulator inflacji, inflacja w Polsce, siła nabywcza pieniądza, GUS inflacja, denominacja 1995, kalkulator wartości pieniądza, prognoza inflacji",
    openGraph: {
        title: "Kalkulator Inflacji w latach 1982-2050 | Oblicz wartość pieniądza",
        description: "Przelicz wartość pieniądza z uwzględnieniem historycznej inflacji GUS oraz prognoz na przyszłość. Obsługuje denominację z 1995 roku.",
        url: "https://stawka-godzinowa.pl/kalkulator-inflacji",
        siteName: "Stawka Godzinowa",
        images: [
            {
                url: "https://stawka-godzinowa.pl/kalkulator_inflacji.webp",
                width: 1200,
                height: 630,
                alt: "Kalkulator Inflacji",
            },
        ],
        locale: "pl_PL",
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Kalkulator Inflacji w latach 1982-2050 | Oblicz wartość pieniądza",
        description: "Przelicz wartość pieniądza z uwzględnieniem historycznej inflacji GUS oraz prognoz na przyszłość. Obsługuje denominację z 1995 roku.",
        images: ["https://stawka-godzinowa.pl/kalkulator_inflacji.webp"],
    }
};

export default function InflationLayout({
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
                "name": "Kalkulator Inflacji",
                "item": "https://stawka-godzinowa.pl/kalkulator-inflacji"
            }
        ]
    };

    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Kalkulator Inflacji",
        "description": "Narzędzie do obliczania skumulowanej inflacji w Polsce od 1982 roku oraz prognozowania przyszłej wartości pieniądza.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "url": "https://stawka-godzinowa.pl/kalkulator-inflacji",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "PLN"
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Jak obliczyć inflację skumulowaną w Polsce od 1982 roku?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Aby obliczyć inflację skumulowaną, należy przemnożyć przez siebie roczne wskaźniki cen (CPI) publikowane przez GUS. Nasz kalkulator robi to automatycznie, uwzględniając również denominację złotego z 1995 roku."
                }
            },
            {
                "@type": "Question",
                "name": "Ile warte było 100 złotych w 1990 roku?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Wartość 100 złotych z 1990 roku po uwzględnieniu denominacji (10 000:1) oraz inflacji odpowiada bardzo małej części dzisiejszego złotego. Przykładowo, 1 000 000 starych złotych (PLZ) przed 1995 rokiem to równowartość dzisiejszych stu nowych złotych (PLN) plus skumulowany wzrost cen."
                }
            },
            {
                "@type": "Question",
                "name": "Czy kalkulator uwzględnia denominację z 1995 roku?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Tak, nasz kalkulator automatycznie wykrywa, czy wybrany okres obejmuje 1 stycznia 1995 r. i stosuje przeliczenie w stosunku 10 000 starych złotych (PLZ) = 1 nowy złoty (PLN)."
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, webAppSchema, faqSchema]) }}
            />
            <AggregateRatingSchema
                name="Kalkulator Inflacji"
                description="Oblicz wartość pieniądza w czasie. Dane historyczne GUS od 1982 roku oraz prognozy do 2050 roku."
                url="https://stawka-godzinowa.pl/kalkulator-inflacji"
            />
            {children}
        </>
    );
}

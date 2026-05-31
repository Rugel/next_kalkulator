import type { Metadata } from "next";
import AggregateRatingSchema from "../components/AggregateRatingSchema";

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
        siteName: "Stawka Godzinowa",
        images: [
            {
                url: "https://stawka-godzinowa.pl/wyliczenie_z_godzin.webp",
                width: 1200,
                height: 630,
                alt: "Kalkulator Wynagrodzeń z godzin",
            },
        ],
        locale: "pl_PL",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Kalkulator Wynagrodzeń - Oblicz Pensję z Godzin Pracy",
        description: "Najlepszy kalkulator wynagrodzeń 2026. Oblicz pensję na podstawie przepracowanych godzin, uwzględniając wszystkie dodatki i potrącenia.",
        images: ["https://stawka-godzinowa.pl/wyliczenie_z_godzin.webp"],
    },
};

export default function WyliczenieLayout({
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
                "name": "Wyliczenie z Godzin Pracy",
                "item": "https://stawka-godzinowa.pl/wyliczenie_z_godzin"
            }
        ]
    };


    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "Jak obliczyć wynagrodzenie z godzin pracy",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Wprowadź liczbę godzin",
                "text": "Wpisz łączną liczbę godzin przepracowanych w miesiącu."
            },
            {
                "@type": "HowToStep",
                "name": "Podaj stawkę godzinową",
                "text": "Wprowadź swoją stawkę brutto za jedną godzinę pracy."
            },
            {
                "@type": "HowToStep",
                "name": "Uwzględnij urlop i chorobowe",
                "text": "Wpisz liczbę dni urlopu oraz ewentualnego zwolnienia lekarskiego."
            },
            {
                "@type": "HowToStep",
                "name": "Sprawdź wynik netto",
                "text": "Kalkulator automatycznie wyliczy kwotę 'na rękę' po odliczeniu składek i podatku."
            }
        ]
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Co to jest kalkulator wynagrodzeń z godzin?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "To narzędzie pozwalające precyzyjnie wyliczyć pensję netto na podstawie rzeczywistej liczby przepracowanych godzin, stawki godzinowej oraz przysługujących urlopów i zwolnień lekarskich."
                }
            },
            {
                "@type": "Question",
                "name": "Jak obliczyć stawkę godzinową z wynagrodzenia brutto?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Aby uzyskać stawkę godzinową, podziel miesięczne wynagrodzenie brutto przez liczbę godzin roboczych w danym miesiącu (np. 168h)."
                }
            },
            {
                "@type": "Question",
                "name": "Czy kalkulator uwzględnia PIT-2 w 2026 roku?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Tak, nasz kalkulator uwzględnia najnowsze przepisy dotyczące PIT-2 i kwoty wolnej od podatku, co pozwala na dokładne wyliczenie wypłaty netto."
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, howToSchema, faqSchema]) }}
            />
            <AggregateRatingSchema
                name="Kalkulator Wynagrodzeń z Godzin"
                description="Zaawansowany kalkulator wynagrodzeń obliczający płacę netto na podstawie przepracowanych godzin, stawki, urlopów i chorobowego."
                url="https://stawka-godzinowa.pl/wyliczenie_z_godzin"
            />
            {children}
        </>
    );
}

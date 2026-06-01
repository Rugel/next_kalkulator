import type { Metadata } from "next";
import AggregateRatingSchema from "../components/AggregateRatingSchema";
import "./print.css";

export const metadata: Metadata = {
    metadataBase: new URL('https://stawka-godzinowa.pl'),
    alternates: {
        canonical: '/karta-godzin',
        languages: {
            'pl': 'https://stawka-godzinowa.pl/karta-godzin',
        },
    },
    robots: {
        index: true,
        follow: true,
    },
    title: "Karta ewidencji czasu pracy do druku - Generator PDF 2026",
    description: "Pobierz i wydrukuj profesjonalną kartę ewidencji czasu pracy do druku. Darmowy generator PDF dla pracowników i pracodawców. Miesięczna ewidencja zgodna z przepisami.",
    keywords: "karta ewidencji czasu pracy do druku, ewidencja czasu pracy pdf, generator karty godzin, miesięczny arkusz ewidencji, lista obecności pracownika do druku",
    openGraph: {
        title: "Karta ewidencji czasu pracy - drukuj PDF dla dowolnego miesiąca",
        description: "Pobierz kartę ewidencji czasu pracy pracownika w celu jej wydruku dla wybranego dowolnego miesiąca roku - karta godzin pracy - pdf do wydruku",
        url: "https://stawka-godzinowa.pl/karta-godzin",
        siteName: "Stawka Godzinowa",
        images: [
            {
                url: "https://stawka-godzinowa.pl/karta_godzin_pracy.webp",
                width: 1200,
                height: 630,
                alt: "Karta godzin pracy"
            }
        ],
        locale: "pl_PL",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Karta ewidencji czasu pracy - drukuj PDF dla dowolnego miesiąca",
        description: "Pobierz kartę ewidencji czasu pracy pracownika w celu jej wydruku dla wybranego dowolnego miesiąca roku - karta godzin pracy - pdf do wydruku",
        images: ["https://stawka-godzinowa.pl/karta_godzin_pracy.webp"],
    },
};

export default function KartaGodzinLayout({
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
                "name": "Karta Ewidencji Czasu Pracy",
                "item": "https://stawka-godzinowa.pl/karta-godzin"
            }
        ]
    };


    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "Jak wygenerować kartę godzin pracy",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Wybór miesiąca",
                "text": "Wybierz rok i miesiąc, dla którego chcesz wygenerować kartę."
            },
            {
                "@type": "HowToStep",
                "name": "Personalizacja (opcjonalnie)",
                "text": "Dodaj logo firmy w celu personalizacji wydruku."
            },
            {
                "@type": "HowToStep",
                "name": "Wydruk lub Zapis",
                "text": "Użyj przycisku Drukuj, aby wydrukować kartę lub zapisać ją jako plik PDF."
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, howToSchema]) }}
            />
            <nav aria-label="Breadcrumb" className="breadcrumb">
                <ol>
                    <li><a href="https://stawka-godzinowa.pl">Strona Główna</a></li>
                    <li aria-current="page">Karta Ewidencji Czasu Pracy</li>
                </ol>
            </nav>
            {children}
        </>
    );
}
import type { Metadata } from "next";
import AggregateRatingSchema from "../components/AggregateRatingSchema";
import "./print.css";

export const metadata: Metadata = {
    metadataBase: new URL('https://stawka-godzinowa.pl'),
    alternates: {
        canonical: '/karta_godzin',
    },
    robots: {
        index: true,
        follow: true,
    },
    title: "Karta Ewidencji Czasu Pracy - Generator PDF do wydruku",
    description: "Darmowy generator karty ewidencji czasu pracy pracownika. Wygeneruj i wydrukuj gotowy arkusz PDF dla dowolnego miesiąca roku. Prosto i szybko.",
    keywords: "generator karty ewidencji czasu pracy, karta godzin pracy pdf, ewidencja czasu pracy 2026, darmowy druk ewidencji, lista obecności pdf",
    openGraph: {
        title: "Karta ewidencji czasu pracy - drukuj PDF dla dowolnego miesiąca",
        description: "Pobierz kartę ewidencji czasu pracy pracownika w celu jej wydruku dla wybranego dowolnego miesiąca roku - karta godzin pracy - pdf do wydruku",
        url: "https://stawka-godzinowa.pl/karta_godzin",
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
                "item": "https://stawka-godzinowa.pl/karta_godzin"
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
            <AggregateRatingSchema
                name="Generator Karty Ewidencji Czasu Pracy"
                description="Wygeneruj i wydrukuj kartę ewidencji czasu pracy (PDF) dla dowolnego miesiąca."
                url="https://stawka-godzinowa.pl/karta_godzin"
                category="BusinessApplication"
            />
            {children}
        </>
    );
}
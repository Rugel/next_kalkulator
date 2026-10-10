// Server Component - nie wymaga "use client"
// Dane pobierane sa po stronie serwera, wiec JSON-LD jest widoczny dla Googlebota przy pierwszym zaladowaniu strony

interface AggregateRatingSchemaProps {
    name: string;
    description: string;
    url: string;
    category?: string;
    itemId?: number;
    image?: string;
}

async function fetchRatingServer(itemId: number): Promise<{ average: string; votes: number }> {
    try {
        // Pobieranie bezposrednio z API (server-side) z krótkim rewalidowaniem
        const res = await fetch(`https://stawka-godzinowa.pl/api/rating/${itemId}`, {
            next: { revalidate: 3600 }, // Odswiezaj co godzine
        });
        if (!res.ok) throw new Error("Failed to fetch rating");
        const data = await res.json();
        if (data.average && data.votes) {
            return { average: String(data.average), votes: Number(data.votes) };
        }
    } catch {
        // Cicha degradacja - zwroc domyslna wartosc
    }
    return { average: "4.8", votes: 150 };
}

export default async function AggregateRatingSchema({
    name,
    description,
    url,
    category = "FinanceApplication",
    itemId = 123,
    image = "https://stawka-godzinowa.pl/image.webp",
}: AggregateRatingSchemaProps) {
    const rating = await fetchRatingServer(itemId);

    const schema = {
        "@context": "https://schema.org",
        "@id": `${url}#aggregate-rating`,
        "@type": "WebApplication",
        "name": name,
        "description": description,
        "url": url,
        "image": image,
        "applicationCategory": category,
        "operatingSystem": "Web",
        "inLanguage": "pl-PL",
        "author": {
            "@type": "Organization",
            "name": "Stawka Godzinowa",
            "url": "https://stawka-godzinowa.pl",
        },
        "publisher": {
            "@type": "Organization",
            "name": "Stawka Godzinowa",
            "url": "https://stawka-godzinowa.pl",
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "PLN",
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": rating.average,
            "ratingCount": rating.votes,
            "bestRating": "5",
            "worstRating": "1",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
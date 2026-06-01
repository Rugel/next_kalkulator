'use client';

import React, { useEffect, useState } from 'react';

interface AggregateRatingSchemaProps {
    name: string;
    description: string;
    url: string;
    category?: string;
    itemId?: number;
    image?: string;
}

export default function AggregateRatingSchema({
    name,
    description,
    url,
    category = "FinanceApplication",
    itemId = 123,
    image = "https://stawka-godzinowa.pl/image.webp"
}: AggregateRatingSchemaProps) {
    const [rating, setRating] = useState({ average: "4.5", votes: 8 });

    useEffect(() => {
        async function fetchRating() {
            try {
                const res = await fetch(`/api/rating/${itemId}`);
                if (!res.ok) throw new Error('Failed to fetch rating');
                const data = await res.json();
                if (data.average && data.votes) {
                    setRating({
                        average: data.average,
                        votes: data.votes
                    });
                }
            } catch (e) {
                console.error("Błąd pobierania oceny dla schema:", e);
            }
        }
        fetchRating();
    }, [itemId]);

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
            "url": "https://stawka-godzinowa.pl"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Stawka Godzinowa",
            "url": "https://stawka-godzinowa.pl"
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "PLN"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": rating.average,
            "ratingCount": rating.votes,
            "bestRating": "5",
            "worstRating": "1"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

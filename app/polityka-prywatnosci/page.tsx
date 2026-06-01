import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polityka prywatności – stawka-godzinowa.pl",
  description: "Polityka prywatności serwisu stawka-godzinowa.pl. Dowiedz się, jakie dane zbieramy, w jakim celu i jakie przysługują Ci prawa (RODO).",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "https://stawka-godzinowa.pl/polityka-prywatnosci",
  },
};

export default function PolitykaPrywatnosci() {
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
        "name": "Polityka Prywatności",
        "item": "https://stawka-godzinowa.pl/polityka-prywatnosci"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1rem", lineHeight: 1.7 }}>
      <h1>Polityka Prywatności</h1>
      <p><em>Ostatnia aktualizacja: 31 maja 2026 r.</em></p>

      <h2>1. Administrator danych</h2>
      <p>
        Administratorem danych osobowych jest Grzegorz Dychała,
        prowadzący serwis <strong>stawka-godzinowa.pl</strong>.
        Kontakt: kontakt&#64;stawka-godzinowa.pl
      </p>

      <h2>2. Jakie dane zbieramy</h2>
      <p>Serwis może zbierać następujące dane:</p>
      <ul>
        <li><strong>Komentarze:</strong> imię lub nick oraz treść komentarza podane dobrowolnie przez użytkownika.</li>
        <li><strong>Dane analityczne:</strong> anonimowe dane o ruchu (Google Analytics) – adres IP, przeglądarka, czas wizyty.</li>
        <li><strong>Pliki cookies:</strong> niezbędne do działania serwisu oraz analityczne (Google Analytics).</li>
      </ul>

      <h2>3. Cel i podstawa przetwarzania</h2>
      <ul>
        <li>Wyświetlanie komentarzy – art. 6 ust. 1 lit. a RODO (zgoda).</li>
        <li>Analiza ruchu i poprawa serwisu – art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes).</li>
      </ul>

      <h2>4. Okres przechowywania danych</h2>
      <p>
        Komentarze są przechowywane do czasu ich usunięcia przez administratora
        lub na żądanie użytkownika. Dane analityczne są przechowywane przez
        Google Analytics przez 14 miesięcy.
      </p>

      <h2>5. Prawa użytkownika</h2>
      <p>
        Masz prawo do: dostępu do danych, ich sprostowania, usunięcia,
        ograniczenia przetwarzania oraz wniesienia skargi do Prezesa UODO
        (uodo.gov.pl).
      </p>

      <h2>6. Pliki cookies</h2>
      <p>
        Serwis używa plików cookies niezbędnych do działania oraz cookies
        analitycznych Google Analytics. Możesz wyłączyć cookies w ustawieniach
        przeglądarki, jednak może to wpłynąć na działanie serwisu.
      </p>

      <h2>7. Przekazywanie danych</h2>
      <p>
        Dane analityczne są przetwarzane przez Google LLC w ramach usługi
        Google Analytics, zgodnie z ich polityką prywatności dostępną na
        policies.google.com.
      </p>
    </main>
    </>
  );
}
export default function SchemaOrg() {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Jak przeliczyć kwotę netto na stawkę godzinową?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Najpierw ustal kwotę brutto swojego wynagrodzenia za pomocą przelicznika brutto-netto, a następnie podziel ją przez liczbę godzin przepracowanych w miesiącu. Kalkulator stawki godzinowej zrobi to za Ciebie automatycznie."
        }
      },
      {
        "@type": "Question",
        "name": "Ile godzin pracy ma typowy miesiąc?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Średnio w miesiącu przypada około 168 godzin pracy (21 dni roboczych x 8 godzin). Liczba ta zmienia się w zależności od świąt i układu kalendarza w 2026 roku."
        }
      },
      {
        "@type": "Question",
        "name": "Czy stawka godzinowa zależy od rodzaju umowy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tak, sposób wyliczania składek różni się między Umową o Pracę (UoP), Umową Zlecenie a B2B. Kalkulator jest zoptymalizowany pod kątem Umowy o Pracę. Dla innych form dostępne są osobne kalkulatory: kalkulator zlecenia i kalkulator B2B."
        }
      },
      {
        "@type": "Question",
        "name": "Jak obliczyć stawkę godzinową z netto (na rękę)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Aby obliczyć stawkę godzinową z kwoty netto, musisz najpierw ubruttowić swoją pensję uwzględniając składki ZUS i podatek. Wpisz kwotę w kalkulator – automatycznie przeliczy wartości w obie strony."
        }
      },
      {
        "@type": "Question",
        "name": "Ile wynosi minimalna stawka godzinowa w 2026 roku?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "W 2026 roku minimalna stawka godzinowa dla umowy zlecenie wynosi 31,40 zł brutto. Dla umowy o pracę minimalne wynagrodzenie miesięczne wynosi 4806 zł brutto, co przy 168 godzinach pracy daje 28,61 zł brutto za godzinę."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}

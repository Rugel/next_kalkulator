import { CURRENT_YEAR } from '../lib/current-year';

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
          "text": `Średnio w miesiącu przypada około 168 godzin pracy (21 dni roboczych x 8 godzin). Liczba ta zmienia się w zależności od świąt i układu kalendarza w ${CURRENT_YEAR} roku.`
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
        "name": `Ile wynosi minimalna stawka godzinowa w ${CURRENT_YEAR} roku?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `W ${CURRENT_YEAR} roku minimalna stawka godzinowa dla umowy zlecenie wynosi 31,40 zł brutto. Dla umowy o pracę minimalne wynagrodzenie miesięczne wynosi 4806 zł brutto, co przy 168 godzinach pracy daje 28,61 zł brutto za godzinę.`
        }
      },
      {
        "@type": "Question",
        "name": `Jakie zmiany w składkach ZUS wchodzą w życie w ${CURRENT_YEAR} roku?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `W ${CURRENT_YEAR} roku obowiązują nowe progi i stawki składek ZUS. Składka emerytalna wynosi 9,76%, rentowa 1,5%, a chorobowa 2,45% wynagrodzenia brutto. Pracodawca dodatkowo opłaca składkę wypadkową, Fundusz Pracy i FGŚP. Dokładne wyliczenia uwzględnia nasz kalkulator wynagrodzeń.`
        }
      },
      {
        "@type": "Question",
        "name": `Jakie są koszty pracodawcy przy umowie o pracę w ${CURRENT_YEAR} roku?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Całkowity koszt pracodawcy dla umowy o pracę w ${CURRENT_YEAR} roku to wynagrodzenie brutto powiększone o składki emerytalną (9,76%), rentową (6,5%), wypadkową (~1,67%), Fundusz Pracy (2,45%) i FGŚP (0,1%) oraz obowiązkowe wpłaty na PPK (1,5%). Łącznie to około 20,48% powyżej brutto.`
        }
      },
      {
        "@type": "Question",
        "name": `Czy mogę obliczyć wynagrodzenie netto dla różnych typów umów w ${CURRENT_YEAR} roku?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Tak, nasza strona oferuje osobne kalkulatory dla każdego typu umowy: kalkulator umowy o pracę (UoP), kalkulator umowy zlecenie, kalkulator B2B oraz przelicznik brutto-netto. Każdy uwzględnia specyficzne dla danej formy zatrudnienia składki i stawki podatkowe obowiązujące w ${CURRENT_YEAR} roku.`
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
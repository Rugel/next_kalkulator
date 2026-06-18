'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Menu from '../modules/Menu';
import { CURRENT_YEAR } from '../lib/current-year';
import styles from './HomePage.module.css';

const TABLE_ROWS: [string, string, string, string, string, string, string][] = [
    ['Umowa o pracę (UoP)', '4806 zł / mc', 'Wysokie', '12%', 'Najwyższa', 'Niska', 'Stabilna, dla osób ceniących bezpieczeństwo'],
    ['Umowa zlecenie', '31,40 zł / godz.', 'Niskie', '12%', 'Ograniczona', 'Wysoka', 'Dobra przy mniejszej liczbie godzin'],
    ['B2B (działalność gosp.)', 'Dowolna (rynkowa)', 'Pełne (własny ZUS)', '12% lub 19%', 'Brak', 'Najwyższa', 'Najlepsza przy wyższych stawkach (>85–90 zł/h)'],
];

const FAQ_ITEMS = [
    {
        question: "Jak przeliczyć kwotę brutto na stawkę godzinową?",
        answer: "Najpierw ustal kwotę brutto swojego wynagrodzenia za pomocą przelicznika brutto-netto, a następnie podziel ją przez liczbę godzin przepracowanych w miesiącu. Ten kalkulator stawki godzinowej zrobi to za Ciebie automatycznie – wystarczy wpisać wynagrodzenie i liczbę godzin."
    },
    {
        question: "Ile godzin pracy ma typowy miesiąc w 2026 roku?",
        answer: "Średnio w miesiącu przypada około 168 godzin pracy (21 dni roboczych x 8 godzin). W 2026 roku liczba dni roboczych w miesiącu waha się od 19 do 23, w zależności od świąt i układu kalendarza. Kalkulator automatycznie pobiera aktualną liczbę dni roboczych dla wybranego miesiąca."
    },
    {
        question: "Czy stawka godzinowa zależy od rodzaju umowy?",
        answer: "Tak, sposób wyliczania składek ZUS i podatku różni się między Umową o Pracę (UoP), Umową Zlecenie a B2B. Dla UoP składki są wyższe, ale zapewniają pełną ochronę socjalną. Dla zlecenia składki są niższe, a dla B2B przedsiębiorca sam opłaca ZUS. Każda forma ma dedykowany kalkulator na tej stronie."
    },
    {
        question: "Jak obliczyć stawkę godzinową z kwoty netto (na rękę)?",
        answer: "Aby obliczyć stawkę godzinową z kwoty netto, musisz najpierw ubruttowić swoją pensję uwzględniając składki ZUS i podatek dochodowy. Wpisz kwotę netto w kalkulatorze – automatycznie przeliczy wartości w obie strony i pokaże stawkę godzinową."
    },
    {
        question: "Ile wynosi minimalna stawka godzinowa w 2026 roku?",
        answer: "W 2026 roku minimalna stawka godzinowa dla umowy zlecenie wynosi 31,40 zł brutto. Dla umowy o pracę minimalne wynagrodzenie miesięczne wynosi 4806 zł brutto, co przy standardowych 168 godzinach pracy daje około 28,61 zł brutto za godzinę. Pamiętaj, że koszty pracodawcy są wyższe od wynagrodzenia brutto pracownika."
    },
    {
        question: "Jakie składki ZUS są potrącane z wynagrodzenia w 2026?",
        answer: "Z wynagrodzenia na umowie o pracę potrącane są: składka emerytalna (9,76%), rentowa (1,5%), chorobowa (2,45%) oraz zdrowotna (9%). Pracodawca dodatkowo opłaca składki: emerytalną (9,76%), rentową (6,5%), wypadkową (~1,67%), FP i FGŚP. Ten kalkulator uwzględnia wszystkie te składki automatycznie."
    }
];

export default function HomePage() {
    return (
        <>
            <Menu currentPage="strona-glowna" />
            <header>
                <div id="tytul">
                    <h1>Kalkulator stawki godzinowej {CURRENT_YEAR} – Oblicz ile naprawdę zarabiasz</h1>
                    <p className="seo-intro">
                        Szukasz wiarygodnego sposobu, aby sprawdzić <strong>realną wartość swojej stawki godzinowej</strong>?
                        Witaj na stawka-godzinowa.pl &ndash; praktycznym i aktualnym narzędziu, które pomaga precyzyjnie przeliczać wynagrodzenie
                        i obliczyć <strong>ile zarabiasz na godzinę</strong>.
                    </p>
                    <p className="seo-intro" style={{ marginTop: '1rem' }}>
                        W {CURRENT_YEAR} roku minimalne wynagrodzenie na umowie o pracę wynosi <strong>4806 zł brutto miesięcznie</strong>,
                        a minimalna stawka godzinowa na umowie zlecenie to <strong>31,40 zł brutto</strong>.
                        Sprawdź, ile wynosi Twoja rzeczywista stawka godzinowa netto po odliczeniu składek ZUS i podatku.
                    </p>
                </div>
            </header>

            <main>
                {/* --- Dlaczego warto znać stawkę --- */}
                <section className={styles.whySection} aria-labelledby="why-heading">
                    <h2 id="why-heading" className={styles.sectionTitle}>Dlaczego warto znać swoją stawkę godzinową?</h2>
                    <div className={styles.whyContent}>
                        <div className={styles.whyTextWrapper}>
                            <p className={styles.whyText}>
                                Znajomość prawdziwej stawki godzinowej pozwala lepiej negocjować warunki zatrudnienia,
                                porównywać oferty i świadomie planować finanse. Nasz <strong>przelicznik wynagrodzenia</strong> działa dla{' '}
                                <strong>umowy o pracę</strong>, <strong>umowy zlecenie</strong> oraz pomaga porównać z{' '}
                                <strong>działalnością gospodarczą (B2B)</strong>.
                            </p>
                            <p className={styles.whyText} style={{ marginTop: '1rem' }}>
                                Dzięki kalkulatorowi dowiesz się, ile wynoszą <strong>koszty pracodawcy UoP</strong> w {CURRENT_YEAR} roku,
                                jakie <strong>składki ZUS {CURRENT_YEAR}</strong> są potrącane z Twojego wynagrodzenia oraz jaka jest
                                różnica między wynagrodzeniem brutto a netto w zależności od formy zatrudnienia.
                            </p>
                        </div>
                        <div className={styles.whyImageWrapper}>
                            <Image
                                src="/image.webp"
                                alt={`Kalkulator stawki godzinowej ${CURRENT_YEAR} – oblicz wynagrodzenie netto i brutto`}
                                width={600}
                                height={315}
                                className={styles.whyImage}
                                priority
                                fetchPriority="high"
                            />
                        </div>
                    </div>
                </section>

                {/* --- Tabela porównawcza --- */}
                <section className={styles.tableSection} aria-labelledby="table-heading">
                    <h2 id="table-heading" className={styles.sectionTitle}>Porównanie form zatrudnienia w {CURRENT_YEAR} roku</h2>
                    <div className={styles.tableWrapper}>
                        <table className={styles.comparisonTable}>
                            <thead>
                                <tr>
                                    <th>Forma zatrudnienia</th>
                                    <th>Min. wynagrodzenie / stawka</th>
                                    <th>Składki ZUS (pracownik)</th>
                                    <th>Podatek PIT</th>
                                    <th>Ochrona socjalna</th>
                                    <th>Elastyczność</th>
                                    <th>Ogólna opłacalność</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TABLE_ROWS.map((row, i) => (
                                    <tr key={i}>
                                        {row.map((cell, j) => (
                                            <td key={j}>{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className={styles.tableNote}>
                        Tabela pokazuje orientacyjne wartości. Dokładne koszty zależą od indywidualnej sytuacji
                        (ulgi, próg podatkowy, składka zdrowotna, <strong>opodatkowanie umowy zlecenie</strong> itp.).
                    </p>
                </section>

                {/* --- Jak działa --- */}
                <section className={styles.howSection} aria-labelledby="how-heading">
                    <h2 id="how-heading" className={styles.sectionTitle}>Jak działa nasz kalkulator?</h2>
                    <p className={styles.howText}>
                        Wystarczy wpisać miesięczne wynagrodzenie brutto, wybrać rodzaj umowy i liczbę godzin
                        pracy w miesiącu – narzędzie przelicza wszystkie składki i podatki automatycznie.
                    </p>
                    <ol className={styles.howList}>
                        <li><strong>Krok 1:</strong> Wprowadź miesięczne wynagrodzenie brutto z Twojej umowy.</li>
                        <li><strong>Krok 2:</strong> Wybierz miesiąc – system automatycznie pobierze liczbę dni roboczych.</li>
                        <li><strong>Krok 3:</strong> Sprawdź swoją realną stawkę godzinową netto i szczegóły składek.</li>
                    </ol>
                </section>

                {/* --- Karty kalkulatorów --- */}
                <section className={styles.cardsSection} aria-labelledby="cards-heading">
                    <h2 id="cards-heading" className={styles.sectionTitle}>Kalkulatory wynagrodzeń</h2>
                    <div className={styles.cardsGrid}>
                        <Link href="/kalkulator-stawki" className={styles.card} aria-label="Kalkulator stawki godzinowej dla umowy o pracę">
                            <div className={styles.cardIcon} aria-hidden="true">💼</div>
                            <h3 className={styles.cardTitle}>Kalkulator stawki godzinowej (UoP)</h3>
                            <p className={styles.cardDesc}>
                                Oblicz stawkę godzinową na podstawie miesięcznego wynagrodzenia brutto.
                                Uwzględnia ZUS, podatek i PPK.
                            </p>
                        </Link>

                        <Link href="/wyliczenie-z-godzin" className={styles.card} aria-label="Wyliczenie wynagrodzenia z godzin pracy">
                            <div className={styles.cardIcon} aria-hidden="true">⏱️</div>
                            <h3 className={styles.cardTitle}>Wyliczenie z godzin pracy (UoP)</h3>
                            <p className={styles.cardDesc}>
                                Oblicz pensję netto na podstawie faktycznie przepracowanych godzin,
                                nadgodzin, urlopu i chorobowego.
                            </p>
                        </Link>

                        <Link href="/brutto-netto" className={styles.card} aria-label="Przelicznik brutto netto dla umowy o pracę">
                            <div className={styles.cardIcon} aria-hidden="true">🔄</div>
                            <h3 className={styles.cardTitle}>Przelicznik Brutto/Netto (UoP)</h3>
                            <p className={styles.cardDesc}>
                                Szybko przelicz wynagrodzenie brutto na netto i odwrotnie
                                dla umowy o pracę.
                            </p>
                        </Link>

                        <Link href="/kalkulator-umowy-zlecenie" className={styles.card} aria-label="Kalkulator umowy zlecenie ze składkami ZUS">
                            <div className={styles.cardIcon} aria-hidden="true">📝</div>
                            <h3 className={styles.cardTitle}>Kalkulator Umowy Zlecenie</h3>
                            <p className={styles.cardDesc}>
                                Sprawdź koszty i wynagrodzenie netto dla umowy zlecenia
                                z uwzględnieniem składek ZUS.
                            </p>
                        </Link>

                        <Link href="/kalkulator-b2b" className={styles.card} aria-label="Kalkulator B2B ryczałt i podatek liniowy">
                            <div className={styles.cardIcon} aria-hidden="true">🏢</div>
                            <h3 className={styles.cardTitle}>Kalkulator B2B</h3>
                            <p className={styles.cardDesc}>
                                Oblicz opłacalność działalności gospodarczej – ryczałt,
                                podatek liniowy i skala podatkowa.
                            </p>
                        </Link>

                        <Link href="/kalkulator-inflacji" className={styles.card} aria-label="Kalkulator inflacji 1982-2050">
                            <div className={styles.cardIcon} aria-hidden="true">📈</div>
                            <h3 className={styles.cardTitle}>Kalkulator Inflacji</h3>
                            <p className={styles.cardDesc}>
                                Sprawdź, jak inflacja zmieniła wartość pieniędzy w latach 1982-2050.
                            </p>
                        </Link>

                        <Link href="/karta-godzin" className={styles.card} aria-label="Karta godzin pracy do wydruku PDF">
                            <div className={styles.cardIcon} aria-hidden="true">📋</div>
                            <h3 className={styles.cardTitle}>Karta godzin pracy</h3>
                            <p className={styles.cardDesc}>
                                Pobierz i wydrukuj PDF z miesięczną ewidencją czasu pracy dla pracownika.
                            </p>
                        </Link>
                    </div>
                </section>

                {/* --- Sekcja FAQ (widoczna dla użytkownika) --- */}
                <section className={styles.faqSection} aria-labelledby="faq-heading">
                    <h2 id="faq-heading" className={styles.sectionTitle}>Najczęściej zadawane pytania – kalkulator stawki godzinowej</h2>
                    <div className={styles.faqList}>
                        {FAQ_ITEMS.map((item, index) => (
                            <details key={index} className={styles.faqItem}>
                                <summary className={styles.faqQuestion}>{item.question}</summary>
                                <p className={styles.faqAnswer}>{item.answer}</p>
                            </details>
                        ))}
                    </div>
                </section>

                {/* --- Dla kogo jest ten kalkulator? --- */}
                <section className={styles.audienceSection} aria-labelledby="audience-heading">
                    <h2 id="audience-heading" className={styles.sectionTitle}>Dla kogo jest ten kalkulator wynagrodzeń?</h2>
                    <div className={styles.audienceContent}>
                        <p>
                            Ten zestaw kalkulatorów został zaprojektowany dla każdego, kto chce precyzyjnie obliczyć swoje wynagrodzenie:
                        </p>
                        <ul className={styles.audienceList}>
                            <li><strong>Pracownicy etatowi (UoP)</strong> – sprawdź realną wartość swojej stawki godzinowej po odliczeniu składek ZUS i podatku.</li>
                            <li><strong>Zleceniobiorcy</strong> – oblicz wynagrodzenie netto na umowie zlecenie z uwzględnieniem niższych składek ZUS.</li>
                            <li><strong>Przedsiębiorcy (B2B)</strong> – porównaj opłacalność działalności gospodarczej z innymi formami zatrudnienia.</li>
                            <li><strong>Rekruterzy i HR</strong> – szybko przeliczaj stawki i przygotowuj oferty dla kandydatów.</li>
                            <li><strong>Studenci i absolwenci</strong> – sprawdź ile możesz zarobić na pierwszej pracy, korzystając z ulgi dla młodych.</li>
                        </ul>
                    </div>
                </section>

                {/* --- O nas (rozbudowany) --- */}
                <section className={styles.aboutSection} aria-labelledby="about-heading">
                    <h2 id="about-heading" className={styles.sectionTitle}>Teksty i kalkulatory przygotowane przez specjalistów</h2>
                    <div className="desc">
                        <p>
                            Treści na stronie stawka-godzinowa.pl są opracowywane we współpracy ze specjalistami
                            ds. payrollu i księgowości. Dane są aktualizowane na bieżąco i zgodnie z obowiązującymi
                            przepisami (stan na czerwiec 2026).
                        </p>
                        <p>
                            Nasze kalkulatory uwzględniają aktualne stawki minimalnego wynagrodzenia, progi podatkowe,
                            składki ZUS, ulgę dla młodych (do 26. roku życia), ulgę 4+ (dla rodzin z co najmniej
                            czworgiem dzieci) oraz ulgę dla seniorów. Wszystkie wyliczenia są zgodne z obowiązującymi
                            przepisami prawa pracy i podatkowego na rok 2026.
                        </p>
                        <p>
                            <strong>Źródło:</strong> Ministerstwo Rodziny i Polityki Społecznej,
                            Rozporządzenie Rady Ministrów, Zakład Ubezpieczeń Społecznych (ZUS).
                        </p>
                        <p>
                            Materiały mają charakter informacyjny i nie stanowią porady prawnej ani podatkowej.
                            W celu uzyskania indywidualnej interpretacji przepisów zalecamy kontakt z biurem rachunkowym
                            lub doradcą podatkowym.
                        </p>
                    </div>
                </section>

            </main>
        </>
    );
}
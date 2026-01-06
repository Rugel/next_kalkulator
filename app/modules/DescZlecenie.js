import React from "react";
import Link from "next/link";
import AdSenseInArticle from "./AdSenseInArticle";

const DescZlecenie = () => {
    return (
        <section className='desc'>
            <div>
                <h2>Kalkulator Umowy Zlecenie – Oblicz Wynagrodzenie Netto</h2>
                <br />
                <strong>
                    Skorzystaj z naszego darmowego kalkulatora umowy zlecenie, aby szybko i precyzyjnie obliczyć kwotę, którą otrzymasz &quot;na rękę&quot;.
                    Narzędzie uwzględnia aktualne przepisy podatkowe na rok 2026, w tym zwolnienia dla osób do 26. roku życia oraz status studenta.
                    Minimalna stawka godzinowa od 1 stycznia 2026 r. wynosi 31,40 zł brutto.
                </strong>
                <p>
                    Umowa zlecenie to jedna z najpopularniejszych form zatrudnienia w Polsce, często wybierana przez studentów oraz osoby szukające elastycznych warunków pracy.
                    Wysokość wynagrodzenia netto zależy od wielu czynników, takich jak status ubezpieczonego, wiek czy dobrowolna składka chorobowa.
                </p>
                <p>
                    Nasz kalkulator pozwala sprawdzić, jakie składki ZUS (emerytalne, rentowe, zdrowotne) zostaną potrącone z Twojego wynagrodzenia brutto oraz jak wysoką zaliczkę na podatek dochodowy (PIT) odprowadzi zleceniodawca.
                </p>

                <AdSenseInArticle adSlot={2380441709} />

                <h3>Jak działa kalkulator umowy zlecenie?</h3>
                <p>
                    Aby uzyskać wynik, wystarczy wprowadzić kwotę brutto z umowy oraz zaznaczyć odpowiednie opcje w formularzu:
                </p>
                <ul>
                    <li>
                        <strong>Status studenta/ucznia poniżej 26 roku życia:</strong> Najkorzystniejsza opcja podatkowa. Jeśli posiadasz ten status, Twoje wynagrodzenie brutto jest równe wynagrodzeniu netto (brak składek ZUS i podatku).
                    </li>
                    <li>
                        <strong>Osoba do 26 roku życia (Zerowy PIT):</strong> Skorzystaj z ulgi &quot;Bez PIT dla młodych&quot;. Płacisz składki ZUS, ale jesteś zwolniony z podatku dochodowego.
                    </li>
                    <li>
                        <strong>Dobrowolne ubezpieczenie chorobowe:</strong> Zaznacz, jeśli chcesz opłacać składkę chorobową (2,45%), co daje prawo do płatnego zwolnienia lekarskiego (L4). Składka jest dobrowolna przy umowie zlecenie.
                    </li>
                    <li>
                        <strong>Kwota zmniejszająca podatek (PIT-2):</strong> Zleceniobiorcy mogą złożyć PIT-2, co pozwala na comiesięczne pomniejszanie zaliczki na podatek o 300 zł (kwota wolna od podatku 30 000 zł).
                    </li>
                    <li>
                        <strong>Autorskie koszty uzyskania przychodu (50%):</strong> Opcja dla twórców i artystów, pozwalająca na znaczne obniżenie podstawy opodatkowania, co skutkuje wyższym wynagrodzeniem netto.
                    </li>
                </ul>

                <h3>Umowa Zlecenie a Składki ZUS</h3>
                <p>
                    Standardowa umowa zlecenie podlega obowiązkowym ubezpieczeniom społecznym (emerytalne, rentowe) oraz ubezpieczeniu zdrowotnemu.
                    Wyjątkiem jest sytuacja, gdy umowa zlecenie nie jest Twoim jedynym tytułem do ubezpieczeń (np. pracujesz też na etacie z pensją minimalną) lub jesteś studentem przed ukończeniem 26 lat.
                </p>
                <p>
                    <strong>Ważna zmiana od 2026 roku:</strong> Okresy pracy na umowie zlecenie są teraz wliczane do pracowniczego stażu pracy. Oznacza to, że czas przepracowany na zleceniu (po 31 grudnia 2025 r.) będzie miał wpływ na wymiar urlopu wypoczynkowego, nagrody jubileuszowe oraz dodatek stażowy w przyszłym zatrudnieniu na etacie. Warunkiem jest opłacanie składek na ubezpieczenia emerytalne i rentowe.
                </p>
                <AdSenseInArticle adSlot={2380441709} />
                <p>
                    Pamiętaj, że ostateczna kwota wypłaty może się różnić w zależności od indywidualnej sytuacji podatkowej.
                    Nasz kalkulator dostarcza szacunkowych wyliczeń zgodnych z powszechnie obowiązującymi zasadami.
                </p>
            </div>
        </section>
    );
};

export default DescZlecenie;

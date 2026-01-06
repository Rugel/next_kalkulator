import React from "react";
import Link from "next/link";
import AdSenseInArticle from "./AdSenseInArticle";

const DescB2B = () => {
    return (
        <section className='desc'>
            <div>
                <h2>Kalkulator B2B 2026 – Oblicz Zysk Netto i ZUS</h2>
                <br />
                <strong>
                    Nasz kalkulator B2B na rok 2026 pozwala precyzyjnie oszacować realny zysk z prowadzonej działalności gospodarczej.
                    Narzędzie uwzględnia prognozowane składki ZUS na 2026 rok, w tym drastyczny wzrost podstawy wymiaru składek (prognozowane przeciętne wynagrodzenie 9420 zł).
                </strong>
                <p>
                    Samozatrudnienie (B2B) pozostaje popularną formą współpracy, szczególnie w branży IT i usługach kreatywnych.
                    Wybór odpowiedniej formy opodatkowania (Ryczałt, Podatek Liniowy, Zasady Ogólne) jest kluczowy dla optymalizacji podatkowej.
                </p>

                <AdSenseInArticle adSlot={2380441709} />

                <h3>Składki ZUS w 2026 roku – Co się zmienia?</h3>
                <p>
                    Rok 2026 przynosi znaczący wzrost składek ZUS dla przedsiębiorców. Podstawa wymiaru składek (60% prognozowanego przeciętnego wynagrodzenia) wzrośnie, co przełoży się na wyższe miesięczne obciążenia.
                    Szacuje się, że pełny ZUS (bez składki zdrowotnej) wyniesie niemal 2000 zł miesięcznie.
                </p>

                <h3>Formy Opodatkowania – Co wybrać?</h3>
                <ul>
                    <li>
                        <strong>Ryczałt Ewidencjonowany:</strong> Często najkorzystniejszy dla programistów (12%) i innych specjalistów. Płacisz podatek od przychodu, nie odliczasz kosztów, a składka zdrowotna jest zryczałtowana (zależna od rocznego przychodu).
                    </li>
                    <li>
                        <strong>Podatek Liniowy (19%):</strong> Stała stawka podatku niezależnie od dochodu. Opłacalne przy wysokich dochodach (powyżej 120 tys. zł rocznie), jeśli masz wysokie koszty lub nie kwalifikujesz się na niskie stawki ryczałtu. Składka zdrowotna 4,9% (z możliwością odliczenia do limitu).
                    </li>
                    <li>
                        <strong>Zasady Ogólne (Skala 12%/32%):</strong> Opłacalne przy niższych dochodach lub jeśli rozliczasz się wspólnie z małżonkiem. Kwota wolna od podatku wynosi 30 000 zł. Składka zdrowotna 9% (nieodliczalna).
                    </li>
                </ul>

                <AdSenseInArticle adSlot={2380441709} />

                <p>
                    Pamiętaj, że ostateczny wybór formy opodatkowania powinien być skonsultowany z księgowym lub doradcą podatkowym.
                    Nasz kalkulator służy do celów poglądowych i pomaga w szybkim porównaniu różnych scenariuszy finansowych.
                </p>
            </div>
        </section>
    );
};

export default DescB2B;

import React from 'react';
import AdSenseInArticle from "./AdSenseInArticle";

const DescInflacja = () => {
    return (
        <section className='desc'>
            <div>
                <h2>Kalkulator Inflacji – Sprawdź wartość pieniądza w czasie</h2>
                <br />
                <strong>
                    Skorzystaj z naszego narzędzia, aby dowiedzieć się, jak zmieniała się siła nabywcza złotego na przestrzeni lat.
                    Kalkulator uwzględnia oficjalne dane GUS od 1982 roku oraz pozwala na prognozowanie przyszłej inflacji aż do 2050 roku.
                </strong>
                <p>
                    Inflacja to proces wzrostu ogólnego poziomu cen towarów i usług w gospodarce. W praktyce oznacza to, że za tę samą
                    kwotę pieniędzy z czasem możemy kupić coraz mniej produktów. Zrozumienie tego mechanizmu jest kluczowe dla
                    świadomego planowania finansów osobistych oraz inwestycji.
                </p>

                <AdSenseInArticle adSlot={2380441709} />

                <h3>Jak działa kalkulator inflacji?</h3>
                <p>
                    Nasz kalkulator to zaawansowane narzędzie, które łączy dane historyczne z możliwością symulacji przyszłości:
                </p>
                <ul>
                    <li>
                        <strong>Dane historyczne (1982-2025):</strong> Korzystamy z oficjalnych, średniorocznych wskaźników cen towarów i usług konsumpcyjnych (CPI) publikowanych przez Główny Urząd Statystyczny.
                    </li>
                    <li>
                        <strong>Denominacja z 1995 roku:</strong> System automatycznie przelicza kwoty sprzed 1 stycznia 1995 r., uwzględniając wymianę waluty w stosunku 10 000 starych złotych (PLZ) do 1 nowego złotego (PLN).
                    </li>
                    <li>
                        <strong>Prognozy do 2050 roku:</strong> Pozwala na wprowadzenie własnej, założonej stopy inflacji dla lat po 2025 roku, co umożliwia planowanie bardzo odległych celów finansowych.
                    </li>
                </ul>

                <AdSenseInArticle adSlot={2380441709} />

                <h3>Dlaczego warto monitorować inflację?</h3>
                <p>
                    Wiedza o inflacji pozwala realnie ocenić wzrost płac oraz rentowność oszczędności. Jeśli Twoja pensja wzrosła o 5%,
                    ale inflacja w tym samym roku wyniosła 10%, to w rzeczywistości Twoja siła nabywcza spadła.
                </p>
                <p>
                    <strong>Przykład historyczny:</strong> W latach 1989-1990 Polska zmagała się z hiperinflacją. Kwoty, które
                    dzisiaj wydają się zawrotne (np. miliony złotych), w tamtym czasie starczały na podstawowe zakupy. Nasz kalkulator
                    pozwala naocznie prześledzić ten proces i zrozumieć skalę zmian gospodarczych w Polsce.
                </p>

                <div style={{ backgroundColor: '#f9f9f9', padding: '1rem', borderLeft: '4px solid #4A90E2', marginTop: '1rem', fontSize: '0.9rem' }}>
                    <p style={{ margin: 0 }}>
                        <em>Uwaga: Obliczenia mają charakter edukacyjny i poglądowy. Rzeczywisty wpływ inflacji na portfel zależy od indywidualnego koszyka zakupowego każdego konsumenta.</em>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default DescInflacja;

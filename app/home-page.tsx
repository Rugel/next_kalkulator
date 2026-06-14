'use client';
import Link from 'next/link';
import React from 'react';
import LocalStorageHelper from './lib/localStorageClass';
import Input from './modules/input';
import Swal from 'sweetalert2';
import AdSense from './modules/AdSense';
import AdSenseInArticle from './modules/AdSenseInArticle';
import Menu from './modules/Menu';
import { calculateWorkingDays } from './utils/workdays';
import stylesList from "./components/ResultsList.module.css";
import stylesInput from "./modules/Input.module.css";
import CheckBox from './modules/CheckBox';
import stylesFieldset from "./components/Fieldset.module.css";


class StaGodz extends React.Component {
    state = {
        brutto: LocalStorageHelper.get('stawka_brutto', 0),
        workdays: LocalStorageHelper.get('stawka_workdays', 0),
        isConfirmed: LocalStorageHelper.get('stawka_isConfirmed', false),
        isConfirmedPpk: LocalStorageHelper.get('stawka_isConfirmedPpk', false),
        isConfirmedU26: LocalStorageHelper.get('stawka_isConfirmedU26', false),
        isConfirmeWorkplace: LocalStorageHelper.get('stawka_isConfirmeWorkplace', false),
        isTaxFreeExcluded: LocalStorageHelper.get('stawka_isTaxFreeExcluded', false),
    }

    componentDidUpdate() {
        LocalStorageHelper.set('stawka_brutto', this.state.brutto);
        LocalStorageHelper.set('stawka_isConfirmed', this.state.isConfirmed);
        LocalStorageHelper.set('stawka_isConfirmedPpk', this.state.isConfirmedPpk);
        LocalStorageHelper.set('stawka_isConfirmedU26', this.state.isConfirmedU26);
        LocalStorageHelper.set('stawka_isConfirmeWorkplace', this.state.isConfirmeWorkplace);
        LocalStorageHelper.set('stawka_isTaxFreeExcluded', this.state.isTaxFreeExcluded);
    }

    async componentDidMount() {
        // Calculate working days for current month on initial load
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11
        const workingDays = calculateWorkingDays(currentYear, currentMonth);
        this.setState({ workdays: workingDays });
        // Save workdays to localStorage when calculated
        LocalStorageHelper.set('stawka_workdays', workingDays);
    }

    handleChangeBrutto = (e: { target: { value: number; }; }) => { if (e.target.value >= 0) { this.setState({ brutto: e.target.value }) } else { this.setState({ brutto: 0 }) } if (e.target.value < 0) { Swal.fire({ text: "Liczba nie może być ujemna", icon: 'warning' }) } }
    handleChangeWorkdays = (e: { target: { value: number; }; }) => { this.setState({ workdays: e.target.value }); if ((e.target.value > 2 && e.target.value < 19) || e.target.value > 23 || e.target.value < 0) { Swal.fire({ text: 'Liczba musi się mieścić w przedziale 19 - 23', icon: 'warning' }) } }

    handleChangeConfirm = () => { this.setState({ isConfirmed: !this.state.isConfirmed }) }
    handleChangeConfirmPpk = () => { this.setState({ isConfirmedPpk: !this.state.isConfirmedPpk }) }
    handleChangeConfirmU26 = () => { this.setState({ isConfirmedU26: !this.state.isConfirmedU26 }) }
    handleChangeConfirmWorkplace = () => { this.setState({ isConfirmeWorkplace: !this.state.isConfirmeWorkplace }) }
    handleChangeTaxFreeExcluded = () => { this.setState({ isTaxFreeExcluded: !this.state.isTaxFreeExcluded }) }

    handleMonthSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const [year, month] = e.target.value.split('-');
        if (year && month) {
            const workingDays = calculateWorkingDays(parseInt(year), parseInt(month));
            this.setState({ workdays: workingDays });
        }
    }

    render() {
        const { workdays } = this.state;
        let brutto = Number(this.state.brutto);

        //wyliczenie składek
        let ppk;
        let ppk_bru;
        if (this.state.isConfirmedPpk) { ppk = 0; ppk_bru = brutto } else {
            ppk = Math.round(brutto * 0.02 * 100) / 100;
            ppk_bru = Math.round(brutto * 1.015 * 100) / 100;
        }
        if (brutto < 0) { brutto = 0 };

        let zus;
        zus = Math.round(brutto * 0.1371 * 100) / 100;
        let kos_doch = 250;
        if (brutto < 250) { kos_doch = brutto }
        if (this.state.isConfirmeWorkplace) { kos_doch = 300 }
        const pod_zdr = brutto - zus;
        let zdr = Math.round(pod_zdr * 0.09 * 100) / 100;

        //wyliczenie podstawy do zaliczki
        let pod_zal = ppk_bru - zus - kos_doch;

        //wyliczenie zaliczki na podatek dochodowy
        if (pod_zal < 0) { pod_zal = 0 };
        let kw_zm = 3600;
        let zal_pod;
        let kw_wolna = 300;
        if (this.state.isTaxFreeExcluded) { kw_wolna = 0 };

        if (brutto - 85528 < 30000 && brutto - 85528 > 0) { kw_zm = Math.round((brutto - 85528) * 0.12) };
        if (this.state.isConfirmed) { zal_pod = Math.round(pod_zal * 0.32) - kw_wolna }
        else { zal_pod = Math.round(pod_zal * 0.12) - kw_wolna };
        if (zal_pod < 0 || (this.state.isConfirmedU26 && brutto <= 85528)) { zal_pod = 0 } else if (this.state.isConfirmedU26 && brutto > 85528 && brutto <= 205528) { zal_pod = Math.round((brutto - 85528) * 0.12) - kw_zm } else if (this.state.isConfirmedU26 && brutto > 205528) { zal_pod = Math.round(10800 + (brutto - 205528) * 0.32) };
        const pod_ppk = Math.round((ppk_bru - brutto) * 100) / 100;

        // Koszty pracodawcy
        const zus_pracodawca = Math.round(brutto * 0.2048 * 100) / 100;
        const koszt_pracodawcy = Math.round((brutto + zus_pracodawca + pod_ppk) * 100) / 100;

        let netto: any = Math.round((brutto - zus - zdr - zal_pod - ppk) * 100) / 100;
        let nettoStr = netto.toString();
        nettoStr = nettoStr.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        nettoStr = nettoStr.replace('.', ',');

        let rate: any = workdays > 0 ? Math.round((brutto / workdays / 8) * 100) / 100 : 0;
        rate = rate.toString();
        rate = rate.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        rate = rate.replace('.', ',');
        const Rate = () => rate;

        const Wynik = () => { return (<p className="wynik">Stawka godzinowa brutto:<br /><span style={{ color: '#FD5B35', fontSize: '1.5em', letterSpacing: '2px', display: 'inline-block', margin: '2px 0' }}><Rate /></span> zł / godz</p>) }

        return (
            <>
                <Menu currentPage="stawka" />
                <header>
                    <div id="tytul">
                        <h1>Kalkulator Stawki Godzinowej 2026 - oblicz wynagrodzenie Netto i Brutto</h1>
                        <p className="seo-intro">
                            Kalkulator stawki godzinowej pozwala błyskawicznie przeliczyć miesięczne wynagrodzenie brutto na stawkę za godzinę pracy. Uwzględniamy składki ZUS, podatek dochodowy i PPK – zarówno dla umowy o pracę, jak i zlecenia.
                        </p>
                    </div>
                </header>
                <main>
                    <section>
                        <h2 style={{ textAlign: 'center', margin: '3rem 0 0' }}>Oblicz Swoją Stawkę Godzinową</h2>
                        <form id="calculator-form" aria-label="Kalkulator stawki godzinowej" className={stylesInput.calculatorForm} onSubmit={(e) => e.preventDefault()}>
                            <div className={stylesInput.formGroup}>
                                <Input name='hours' content='Podaj miesięczne wynagrodzenie brutto' method={this.handleChangeBrutto} plhld={this.state.brutto} number={1} />
                            </div>
                            <div className={stylesInput.formGroup}>
                                <Input name='rate' content='Podaj liczbę dni roboczych w danym miesiącu' plhld={this.state.workdays} method={this.handleChangeWorkdays} number={2} monthSelector={true} onMonthSelect={this.handleMonthSelect} defaultMonthValue={new Date().toISOString().slice(0, 7)} />
                            </div>
                        </form>
                        <section>
                            <AdSense
                                adClient="ca-pub-8789064360135564"
                                adSlot="4100717483"
                            />
                            <h2 style={{ textAlign: 'center', margin: '3rem 0 0' }}>Szczegóły wynagrodzenia</h2>
                            <div className={stylesList.list}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">Nazwa</th>
                                            <th scope="col">Wartość</th>
                                            <th scope="col">Waluta</th>
                                        </tr>
                                    </thead>
                                    <tbody><tr><td><b>wysokość wynagrodzenia brutto:</b></td><td className={stylesList.count}><b>{brutto}</b></td><td><b>zł</b></td></tr>
                                        <tr><td>składka na ubezpieczenie społeczne:</td><td className={stylesList.count}>{zus}</td><td>zł</td></tr>
                                        <tr><td>składka na ubezpieczenie zdrowotne: </td><td className={stylesList.count}>{zdr}</td><td>zł</td></tr>
                                        <tr><td>zaliczka na podatek dochodowy:</td><td className={stylesList.count}>{zal_pod}</td><td>zł</td></tr>
                                        <tr><td>składka na PPK:</td><td className={stylesList.count}>{ppk}</td><td>zł</td></tr>
                                        <tr><td>kwota wpłaty finansowana przez pracodowcę na konto PPK pracownika:</td><td className={stylesList.count}>{pod_ppk}</td><td>zł</td></tr>
                                        <tr style={{ borderTop: '2px solid #ddd' }}><td><b>Całkowity koszt pracodawcy:</b></td><td className={stylesList.count}><b>{koszt_pracodawcy}</b></td><td><b>zł</b></td></tr>
                                        <tr><td><b>Kwota netto (do wypłaty):</b></td><td className={stylesList.count}><b>{nettoStr}</b></td><td><b>zł</b></td></tr>
                                    </tbody>
                                </table>
                                <br /><p className={stylesList.small}><i>* prezentowane kwoty składek na ubezpieczenie społeczne i zdrowotne wynikają jedynie z potrąceń wynagrodzenia brutto pracownika - pracodawca dodatkowo finansuje  składki pracownika zgodnie z obowiązującymi przepisami</i></p>
                            </div>
                        </section>
                        <article>
                            <h2 id="minimalna-stawka">Ile wynosi najniższa stawka godzinowa w 2026 roku?</h2>
                            <div className='desc'>
                                <p>
                                    W 2026 roku w Polsce obowiązują dwie różne wartości dotyczące płacy minimalnej, w zależności od rodzaju zawartej umowy:
                                </p>
                                <ul>
                                    <li><strong>Umowa Zlecenie:</strong> Ustawowa <strong>minimalna stawka godzinowa</strong> wynosi <strong>31,40 zł brutto</strong> (od 1 stycznia 2026 r. zgodnie z rozporządzeniem <a href="https://www.gov.pl/web/rodzina" target="_blank" rel="noopener noreferrer">Ministerstwa Rodziny i Polityki Społecznej</a>).</li>
                                    <li><strong>Umowa o Pracę:</strong> Minimalne wynagrodzenie miesięczne wynosi <strong>4806 zł brutto</strong>.</li>
                                </ul>
                                <p><strong>Jak przeliczyć minimalne wynagrodzenie na stawkę godzinową przy UoP?</strong><br />
                                    W przypadku umowy o pracę, Twoja faktyczna stawka za godzinę zależy od liczby przepracowanych godzin w danym miesiącu. Aby ją obliczyć, należy podzielić kwotę 4806 zł przez wymiar czasu pracy (np. 168h).
                                    Przykładowo, w miesiącu mającym 21 dni roboczych (168h), minimalna stawka godzinowa na UoP wynosi 28,61 zł brutto. W miesiącach z inną liczbą dni roboczych, ta wartość ulegnie zmianie, mimo że Twoja pensja miesięczna pozostanie taka sama.</p>
                            </div>

                            <h2>Jak Obliczyć Stawkę Godzinową?</h2>
                            <div className='desc'>
                                <p>
                                    Przeliczanie kwoty brutto wynagrodzenia na stawkę godzinową brutto dla 40-godzinnego systemu pracy jest proste.<br />
                                    Wystarczy użyć <strong>kalkulatora stawki godzinowej</strong> lub przeprowadzić obliczenia ręcznie: podziel miesięczne wynagrodzenie brutto przez ilość dni roboczych w miesiącu, a następnie podzielić wynik przez 8.
                                    Przykładowo, jeśli miesięczne wynagrodzenie brutto wynosi 8000 zł, a w danym miesiącu jest 20 dni roboczych, to stawka godzinowa brutto wynosi 8000 zł / 20 / 8 h = 50 zł/h. Jeśli interesuje Cię konkretnie wynagrodzenie &quot;na rękę&quot;, wybierz <Link href="/brutto-netto">przelicznik brutto-netto</Link>.
                                </p>
                                <AdSenseInArticle adSlot={8969900782} />
                                <p>
                                    Warto zauważyć, że powyższy schemat uwzględnia tylko podstawowe składniki wynagrodzenia.
                                    Warto skorzystać z <strong>kalkulatora wynagrodzeń</strong>, aby uwzględnić dodatki, premie czy diety, które należy dodać do miesięcznego wynagrodzenia brutto przed przeliczeniem na stawkę godzinową.
                                </p>
                            </div>

                            <h3>Dlaczego warto korzystać z kalkulatora stawki godzinowej?</h3>
                            <div className='desc'>
                                <p>
                                    Znajomość swojej stawki za godzinę pracy jest kluczowa przy negocjacjach płacowych, planowaniu budżetu domowego oraz porównywaniu ofert pracy.
                                    <Link href="/karta-godzin">Karta ewidencji czasu pracy</Link> – pobierz i wydrukuj PDF z miesięczną ewidencją czasu pracy dla pracownika.<br />
                                    <Link href="/wyliczenie-z-godzin">Wyliczenie wynagrodzenia z godzin pracy</Link> – oblicz pensję netto na podstawie faktycznie przepracowanych godzin, nadgodzin, urlopu i chorobowego.<br />
                                    <Link href="/kalkulator-inflacji">Kalkulator Inflacji w latach 1982-2050</Link> – sprawdź, jak inflacja zmieniła wartość Twoich pieniędzy w czasie.<br /><br />
                                    Ten <strong>kalkulator stawki godzinowej</strong> zapewnia:
                                </p>
                                <ul>
                                    <li><strong>Precyzję:</strong> Uwzględnia realną liczbę dni roboczych w konkretnym miesiącu roku 2026.</li>
                                    <li><strong>Szybkość:</strong> Wynik otrzymujesz natychmiast po wpisaniu kwoty brutto.</li>
                                    <li><strong>Kompleksowość:</strong> Możesz sprawdzić nie tylko stawkę brutto, ale również dowiedzieć się, ile dostaniesz &quot;na rękę&quot; (netto).</li>
                                </ul>
                            </div>

                            <h3>Najczęstsze pytania (FAQ) o kalkulator stawki godzinowej</h3>
                            <div className='desc'>
                                <p><strong>Jak przeliczyć kwotę netto na stawkę godzinową?</strong><br />
                                    Najpierw ustal kwotę brutto swojego wynagrodzenia (pomoże Ci w tym przelicznik brutto-netto), a następnie podziel ją przez liczbę godzin przepracowanych w miesiącu. Ten <strong>kalkulator stawki godzinowej</strong> zrobi to za Ciebie automatycznie.</p>

                                <p><strong>Ile godzin pracy ma typowy miesiąc?</strong><br />
                                    Średnio w miesiącu przypada około 168 godzin pracy (21 dni roboczych x 8 godzin). Jednak liczba ta zmienia się w zależności od świąt i układu kalendarza w 2026 roku.</p>

                                <p><strong>Czy stawka godzinowa zależy od rodzaju umowy?</strong><br />
                                    Tak, sposób wyliczania składek różni się między Umową o Pracę (UoP), Umową Zlecenie a B2B. Ten kalkulator jest zoptymalizowany pod kątem <strong>Umowy o Pracę</strong>. Jeśli pracujesz na innej podstawie, sprawdź nasz <Link href="/kalkulator-umowy-zlecenie">kalkulator zlecenia</Link> lub <Link href="/kalkulator-b2b">kalkulator B2B</Link>.</p>

                                <p><strong>Jak obliczyć stawkę godzinową z netto (na rękę)?</strong><br />
                                    Aby obliczyć stawkę godzinową z kwoty netto, musisz najpierw &quot;ubruttowić&quot; swoją pensję, uwzględniając składki ZUS i podatek. Najprościej zrobić to, wpisując kwotę w nasz kalkulator, który automatycznie przelicza wartości w obie strony.</p>
                            </div>

                            <h2>Kiedy warto skorzystać z kalkulatora stawki godzinowej?</h2>
                            <div className='desc'>
                                <p>
                                    <strong>Kalkulator stawki godzinowej</strong> to niezbędne narzędzie w wielu sytuacjach zawodowych. Oto najczęstsze przypadki, gdy warto z niego skorzystać:
                                </p>
                                <ul>
                                    <li><strong>Porównywanie ofert pracy:</strong> Gdy rozważasz kilka propozycji zatrudnienia, przeliczenie wynagrodzenia na stawkę godzinową pozwala obiektywnie porównać oferty z różnymi pensjami miesięcznymi i systemami pracy.</li>
                                    <li><strong>Negocjacje płacowe:</strong> Znajomość swojej aktualnej stawki za godzinę ułatwia prowadzenie rozmów o podwyżkę. Możesz precyzyjnie argumentować, dlaczego zasługujesz na wyższe wynagrodzenie.</li>
                                    <li><strong>Przejście na inny typ umowy:</strong> Jeśli planujesz zmienić umowę o pracę na zlecenie lub działalność gospodarczą (B2B), kalkulator pomoże Ci ustalić odpowiednią stawkę, aby utrzymać lub poprawić swoje zarobki.</li>
                                    <li><strong>Planowanie budżetu domowego:</strong> Wiedza o tym, ile zarabiasz za godzinę pracy, pomaga w lepszym zarządzaniu finansami osobistymi i podejmowaniu świadomych decyzji zakupowych.</li>
                                    <li><strong>Wycena dodatkowych godzin:</strong> Przy pracy w nadgodzinach lub weekendy, znajomość bazowej stawki godzinowej pozwala obliczyć należne Ci wynagrodzenie z uwzględnieniem dodatków (np. 50% lub 100%).</li>
                                </ul>
                            </div>

                            <h2>Porównanie stawki godzinowej dla różnych typów umów</h2>
                            <div className='desc'>
                                <p>
                                    Wybór rodzaju umowy znacząco wpływa na sposób obliczania wynagrodzenia. Poniżej przedstawiamy kluczowe różnice między najpopularniejszymi formami współpracy:
                                </p>
                                <h3>Umowa o Pracę (UoP)</h3>
                                <ul>
                                    <li>Stałe miesięczne wynagrodzenie brutto (np. 5000 zł)</li>
                                    <li>Stawka godzinowa zmienia się w zależności od liczby dni roboczych w miesiącu</li>
                                    <li>Składki ZUS (13,71%) i podatek dochodowy odliczane automatycznie</li>
                                    <li>Pełna ochrona socjalna: urlop, zwolnienia lekarskie, odprawy</li>
                                    <li><strong>Kalkulator stawki godzinowej</strong> uwzględnia wszystkie potrącenia, pokazując rzeczywistą wartość Twojej godziny pracy</li>
                                </ul>

                                <h3>Umowa Zlecenie</h3>
                                <ul>
                                    <li>Wynagrodzenie ustalane jako stawka godzinowa (min. 31,40 zł brutto w 2026 r.)</li>
                                    <li>Brak automatycznych odprowadzeń ZUS (jeśli zleceniobiorca ma już tytuł do ubezpieczenia)</li>
                                    <li>Zaliczka na podatek dochodowy: 12% minus kwota wolna (300 zł)</li>
                                    <li>Brak urlopu płatnego i ochrony przed wypowiedzeniem</li>
                                    <li>Elastyczność w ustalaniu godzin pracy</li>
                                </ul>

                                <h3>Działalność gospodarcza (B2B)</h3>
                                <ul>
                                    <li>Pełna swoboda w ustalaniu stawki godzinowej</li>
                                    <li>Możliwość wyboru formy opodatkowania: ryczałt, podatek liniowy 19%, skala podatkowa</li>
                                    <li>Składki ZUS na własną rękę (od ok. 1600 zł miesięcznie)</li>
                                    <li>Możliwość odliczania kosztów uzyskania przychodu</li>
                                    <li>Wymaga prowadzenia księgowości</li>
                                </ul>

                                <p>
                                    Ten <strong>kalkulator wynagrodzeń</strong> koncentruje się na umowie o pracę, ale znajomość stawki godzinowej brutto pozwala również oszacować, jaką kwotę powinieneś zaproponować przy innych formach współpracy, aby utrzymać podobny poziom dochodów netto.
                                </p>
                            </div>

                            <h3>Jak wykorzystać kalkulator stawki godzinowej w negocjacjach płacowych?</h3>
                            <div className='desc'>
                                <p>
                                    Znajomość swojej stawki za godzinę to potężne narzędzie w rozmowach o wynagrodzenie. Oto praktyczne porady, jak ją wykorzystać:
                                </p>
                                <ul>
                                    <li><strong>Przygotuj dane rynkowe:</strong> Użyj <strong>kalkulatora stawki godzinowej</strong>, aby przeliczyć zarówno swoją obecną pensję, jak i średnie zarobki w branży. To pomoże Ci określić, czy Twoja stawka jest konkurencyjna.</li>
                                    <li><strong>Podkreśl wartość dodaną:</strong> Podczas negocjacji zamiast mówić &quot;chcę więcej&quot;, powiedz &quot;moja aktualna stawka wynosi X zł/h, a na podstawie moich kompetencji i osiągnięć, rynkowa stawka dla tej pozycji to Y zł/h&quot;.</li>
                                    <li><strong>Uwzględnij koszty pracodawcy:</strong> Pamiętaj, że pracodawca płaci dodatkowo składki ZUS (około 20% Twojego brutto). Kalkulator pokazuje te wartości, co pozwala lepiej zrozumieć całkowity koszt Twojego zatrudnienia.</li>
                                    <li><strong>Negocjuj świadomie premie:</strong> Jeśli firma oferuje system premiowy zamiast podwyżki, przelicz wartość premii na stawkę godzinową, aby ocenić, czy to korzystna oferta.</li>
                                    <li><strong>Obiektywne zestawienie ofert:</strong> Przy zmianie pracy używaj kalkulatora do porównania propozycji. Pamiętaj, że niższa pensja miesięczna przy mniejszej wymaganym wymiarze czasu oznacza czasami wyższą stawkę za godzinę pracy.</li>
                                </ul>
                            </div>

                            <h3>Kluczowe parametry i zmiany w 2026 roku</h3>
                            <div className='desc'>
                                <p>
                                    W 2026 roku Twoje wynagrodzenie jest kształtowane przez nowe stawki płacy minimalnej oraz kontynuację zasad podatkowych obowiązujących od lat:
                                </p>
                                <ul>
                                    <li><strong>Nowa płaca minimalna (UoP):</strong> Od stycznia 2026 r. minimalne wynagrodzenie wzrosło do <strong>4806 zł brutto</strong>. Przekłada się to na około 28,61 zł za godzinę (przy 168h pracy).</li>
                                    <li><strong>Nowa stawka minimalna (Zlecenie):</strong> Dla osób na umowie zlecenia minimalna stawka wzrosła do <strong>31,40 zł brutto</strong> za godzinę.</li>
                                    <li><strong>Kwota wolna od podatku (bez zmian):</strong> Nadal obowiązuje kwota wolna 30 000 zł rocznie, co w przeliczeniu na zaliczki miesięczne daje 300 zł ulgi podatkowej.</li>
                                    <li><strong>Składka zdrowotna (bez zmian):</strong> Pozostaje na poziomie 9% podstawy wymiaru i nadal nie podlega odliczeniu od podatku.</li>
                                    <li><strong>PPK (zasady stałe):</strong> Podstawowa składka pracownika to niezmiennie 2% wynagrodzenia brutto, o ile nie złożono rezygnacji.</li>
                                </ul>
                                <p>
                                    Ten <strong>kalkulator stawki godzinowej 2026</strong> uwzględnia zarówno te nowości, jak i stałe parametry systemowe, zapewniając precyzyjny wynik &quot;na rękę&quot;.
                                </p>
                            </div>
                        </article>
                    </section>
                    <Wynik />
                </main>
                <AdSense
                    adClient="ca-pub-8789064360135564"
                    adSlot="6368891825"
                />
            </>
        )
    }
}
export default StaGodz;

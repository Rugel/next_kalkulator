'use client';

import React from 'react';
import Link from 'next/link';
import LocalStorageHelper from '../lib/localStorageClass';
import Input from '../modules/input';
import Swal from 'sweetalert2';
import AdSense from '../modules/AdSense';
import AdSenseInArticle from '../modules/AdSenseInArticle';
import CheckBox from '../modules/CheckBox';
import Menu from '../modules/Menu';
import stylesFieldset from "../components/Fieldset.module.css";
import stylesList from "../components/ResultsList.module.css";
import stylesInput from "../modules/Input.module.css";
import CommentScrollLink from '../components/CommentScrollLink';


class BruttoNetto extends React.Component {
  state = {
    BaN: LocalStorageHelper.get('bn_BaN', 0),
    isConfirmed: LocalStorageHelper.get('bn_isConfirmed', false),
    isConfirmedPpk: LocalStorageHelper.get('bn_isConfirmedPpk', false),
    isConfirmedU26: LocalStorageHelper.get('bn_isConfirmedU26', false),
    isConfirmeWorkplace: LocalStorageHelper.get('bn_isConfirmeWorkplace', false),
    isTaxFreeExcluded: LocalStorageHelper.get('bn_isTaxFreeExcluded', false),
  }

  componentDidUpdate() {
    LocalStorageHelper.set('bn_BaN', this.state.BaN);
    LocalStorageHelper.set('bn_isConfirmed', this.state.isConfirmed);
    LocalStorageHelper.set('bn_isConfirmedPpk', this.state.isConfirmedPpk);
    LocalStorageHelper.set('bn_isConfirmedU26', this.state.isConfirmedU26);
    LocalStorageHelper.set('bn_isConfirmeWorkplace', this.state.isConfirmeWorkplace);
    LocalStorageHelper.set('bn_isTaxFreeExcluded', this.state.isTaxFreeExcluded);
  }

  handleChangeBaN = (e: { target: { value: number; }; }) => { if (e.target.value >= 0) { this.setState({ BaN: e.target.value }) } else if (e.target.value < 0) { this.setState({ BaN: 0 }); Swal.fire({ text: 'Kwota nie może być ujemna', icon: 'warning' }) } }

  handleChangeConfirm = () => { this.setState({ isConfirmed: !this.state.isConfirmed }) }

  handleChangeConfirmPpk = () => { this.setState({ isConfirmedPpk: !this.state.isConfirmedPpk }) }

  handleChangeConfirmU26 = () => { this.setState({ isConfirmedU26: !this.state.isConfirmedU26 }) }

  handleChangeConfirmWorkplace = () => { this.setState({ isConfirmeWorkplace: !this.state.isConfirmeWorkplace }) }

  handleChangeTaxFreeExcluded = () => { this.setState({ isTaxFreeExcluded: !this.state.isTaxFreeExcluded }) }

  render() {
    let brutto = Number(this.state.BaN);
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
    netto = netto.toString();
    netto = netto.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    netto = netto.replace('.', ',');

    const Netto = () => netto;
    const Wynik = () => { return (<p className="wynik" aria-live="polite">Kwota netto wynosi:<br /><span style={{ color: 'red', fontSize: '1.5em', letterSpacing: '2px', display: 'inline-block', margin: '2px 0' }}><Netto /></span> zł<br /></p>) }
    return (
      <>
        <Menu currentPage="brutto_netto" />
        <header>
          <Wynik />
          <div id="tytul">
            <h1>Kalkulator Brutto na Netto</h1>
          </div>
        </header>

        <main>
          <section>
            <fieldset className={stylesFieldset.fieldset}><legend className={stylesFieldset.legend}><strong><u>wstępne opcje</u></strong></legend>
              <div className={stylesFieldset.box}>
                <CheckBox Id={'ppk'} OnChange={this.handleChangeConfirmPpk} Checked={this.state.isConfirmedPpk} Text={'nie uczestniczę w PPK'} /><br /><br />
                <CheckBox Id={'u26'} OnChange={this.handleChangeConfirmU26} Checked={this.state.isConfirmedU26} Text={'korzystam przynajmniej z jednej z wymienionych ulg: „dla młodych do 26 roku życia”, „dla rodzin 4+”,  „na powrót”, „dla pracujących seniorów”'} /><br /><br />
                <CheckBox Id={'workplace'} OnChange={this.handleChangeConfirmWorkplace} Checked={this.state.isConfirmeWorkplace} Text={'zakład pracy znajduje się poza miejscowością zamieszkania'} /><br /><br />
                <CheckBox Id={'taxfree'} OnChange={this.handleChangeTaxFreeExcluded} Checked={this.state.isTaxFreeExcluded} Text={'nie odliczaj kwoty wolnej od podatku (ulga 300 zł)'} /><br /><br />
                <CheckBox Id={'box'} OnChange={this.handleChangeConfirm} Checked={this.state.isConfirmed} Text={'zaliczka na podatek dochodowy jest pobierana wg drugiego progu skali podatkowej'} />
              </div>
            </fieldset>
          </section>
          <section>
            <h2 style={{ textAlign: 'center', margin: '3rem 0 0' }}>Przelicz Brutto na Netto</h2>
            <form id="calculator-form" className={stylesInput.calculatorForm} onSubmit={(e) => e.preventDefault()}>
              <div className={stylesInput.formGroup}><Input name='BnN' content="Podaj kwotę brutto w celu obliczenia kwoty netto" method={this.handleChangeBaN} plhld={this.state.BaN} number={1} /></div>
            </form>
            <article>
              <AdSense
                adClient="ca-pub-8789064360135564" // Twój identyfikator AdSense
                adSlot="3545619061" // ID jednostki reklamowej
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
                    <tr><td><b>Kwota netto (do wypłaty):</b></td><td className={stylesList.count}><b>{netto}</b></td><td><b>zł</b></td></tr>
                  </tbody>
                </table>
                <br /><p className={stylesList.small}><i>* prezentowane kwoty składek na ubezpieczenie społeczne i zdrowotne wynikają jedynie z potrąceń wynagrodzenia brutto pracownika - pracodawca dodatkowo finansuje  składki pracownika zgodnie z obowiązującymi przepisami</i></p>
              </div></article>
          </section>
          <article>
            <h2>O kalkulatorze wynagrodzeń Brutto na Netto</h2>
            <div className='desc'>
              <p>Użycie <strong>kalkulatora wynagrodzeń BRUTTO na NETTO</strong> wymaga zaznaczenia odpowiednich pozycji we &quot;wstępnych opcjach&quot; oraz wpisania żądanej do przeliczenia kwoty brutto.</p>
              <p>Przeliczenie wynagrodzenia brutto na netto dokonuje się na podstawie aktualnych stawek podatkowych oraz składek na ubezpieczenia społeczne i zdrowotne. Oto ogólny,  uproszczony opis jak to działa:</p>
              <AdSenseInArticle adSlot={5569743645} />
              <h3>Jak Działa Przeliczanie Brutto na Netto?</h3>
              <div className='desc'>
                <h4>1. Ustalenie wynagrodzenia brutto</h4>
                <p>Wynagrodzenie brutto to kwota, którą pracownik otrzymuje od pracodawcy przed odliczeniem podatków i składek na ubezpieczenia społeczne. Jest to kwota, która widnieje w umowie o pracę.</p>
                <h4>2. Odliczenie składek na ubezpieczenie społeczne</h4>
                <p>Składki na ubezpieczenia społeczne to kwoty, które są automatycznie potrącane z wynagrodzenia brutto. W Polsce składki te obejmują ubezpieczenie emerytalne (9,76%), rentowe (1,5%) i chorobowe (2,45%). Te procenty są obliczane od Twojego wynagrodzenia brutto - razem jest to 13,71%.</p>
                <h4>3. Obliczenie składki na ubezpieczenie zdrowotne</h4>
                <p>Kwota pozostała po odjęciu składek społecznych staje się podstawą do obliczenie składki zdrowotnej, której wymiar wynosi 9% - narazie jej nie odliczamy od podstawy.</p>
                <h4>4. Ustalenie dochodu pracownika</h4>
                <p>Od wcześniej obliczonej podstawy odejmujemy tzw. koszty uzyskania dochodu, które w zależności od miejsca wykonywania pracy obecnie wynoszą 250 zł lub 300 zł. Po dokonaniu tego odliczenia otrzymujemy <strong>dochód.</strong></p>
                <h4>5. Obliczenie zaliczki na podatek dochodowy</h4>
                <p>Wspomnianą zaliczkę obliczamy według obowiązującej skali podatkowj. Obecnie dla pierwszego progu podatkowego jest to 12 % dochodu minus kwota zmniejszająca podatek wynikająca z powszechnej ulgi czyli 300 zł. Tak obliczoną kwotę pracodawca przekazuje do urzędu skarbowego.</p>
                <h4>6. Obliczenie wynagrodzenia netto</h4>
                <p>Ostatni krok sprowadza się do dokonania odejmowania - od kwoty otrzymanej w kroku nr. 2 czyli po odliczeniu od kwoty brutto składek na ubezpieczenie społeczne, odejmujemy składkę zdrowotną obliczoną w kroku nr. 3, a następnie zaliczkę na podatek dochodowy obliczoną w kroku nr. 5. Tak otrzymana kwota jest <strong>kwotą netto.</strong></p>
              </div>

              <h3>Dlaczego warto korzystać z kalkulatora wynagrodzeń brutto netto?</h3>
              <div className='desc'>
                <p>
                  Samodzielne obliczenie pensji "na rękę" może być skomplikowane ze względu na liczne zmienne, takie jak składki ZUS, podatek dochodowy, czy uczestnictwo w Pracowniczych Planach Kapitałowych (PPK).
                  Nasz <strong>kalkulator wynagrodzeń brutto netto</strong> pozwala na błyskawiczne uzyskanie precyzyjnego wyniku, uwzględniając najnowsze przepisy podatkowe obowiązujące w 2026 roku.
                </p>
                <ul>
                  <li><strong>Oszczędność czasu:</strong> Nie musisz ręcznie liczyć skomplikowanych procentów i kwot wolnych.</li>
                  <li><strong>Zawsze aktualne dane:</strong> Narzędzie uwzględnia aktualną skalę podatkową i limity składek.</li>
                  <li><strong>Personalizacja wyników:</strong> Kalkulator bierze pod uwagę Twoją indywidualną sytuację, np. pracę poza miejscem zamieszkania czy korzystanie z ulgi dla młodych.</li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Sprawdź również nasze <Link href="/kalkulator-stawki">kalkulator stawki godzinowej</Link> lub 
                  <Link href="/kalkulator-b2b"> kalkulator B2B</Link> dla porównania różnych form zatrudnienia.
                </p>
              </div>

              <h3>Najczęstsze pytania (FAQ) o kalkulator wynagrodzeń brutto netto</h3>
              <div className='desc'>
                <p><strong>Czym różni się wynagrodzenie brutto od netto?</strong><br />
                  Wynagrodzenie brutto to kwota zapisana w Twojej umowie. Netto to kwota, która faktycznie trafia na Twoje konto po odjęciu wszystkich składek (emerytalnych, rentowych, chorobowych, zdrowotnych) oraz zaliczek na podatek dochodowy.</p>

                <p><strong>Czy kalkulator uwzględnia PPK?</strong><br />
                  Tak, nasz <strong>kalkulator wynagrodzeń brutto netto</strong> pozwala na zaznaczenie opcji uczestnictwa w PPK, co ma wpływ na finalną kwotę wypłaty.</p>

                <p><strong>Jakie dane muszę podać w kalkulatorze?</strong><br />
                  Wystarczy podać kwotę brutto i określić parametry takie jak wiek (do 26 lat), miejsce zamieszkania (koszty uzyskania przychodu) oraz to, czy rozliczasz się według pierwszego czy drugiego progu podatkowego.</p>

                <p><strong>Czy kalkulator jest darmowy?</strong><br />
                  Tak, udostępniamy ten <strong>kalkulator wynagrodzeń</strong> całkowicie bezpłatnie, aby każdy mógł szybko sprawdzić swoje realne zarobki.</p>
              </div>
            </div>
          </article>
        </main>
        <AdSense
          adClient="ca-pub-8789064360135564" // Twój identyfikator AdSense
          adSlot="7987991607" // ID jednostki reklamowej
        />
      </>
    )
  }
}
export default BruttoNetto;

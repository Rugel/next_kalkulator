'use client';

import React from 'react';
import Input from '../modules/input';
//import Counter from '../modules/counter';
import Weather from '../modules/weather';
import Swal from 'sweetalert2';
import Link from 'next/link';
import Cookie from '../modules/cookies';

class BnN extends React.Component {
  state = {
    BaN: 0,
    isConfirmed: false,
    isConfirmedPpk: false,
    isConfirmedU26: false,
    isConfirmeWorkplace: false,
  }

  handleChangeBaN = (e: { target: { value: number; }; }) => { if (e.target.value >= 0) { this.setState({ BaN: e.target.value }) } else if (e.target.value < 0) { this.setState({ BaN: 0 }); Swal.fire({text: 'Kwota nie może być ujemna', icon: 'warning'}) } }

  handleChangeConfirm = () => { this.setState({ isConfirmed: !this.state.isConfirmed }) }

  handleChangeConfirmPpk = () => { this.setState({ isConfirmedPpk: !this.state.isConfirmedPpk }) }

  handleChangeConfirmU26 = () => { this.setState({ isConfirmedU26: !this.state.isConfirmedU26 }) }

  handleChangeConfirmWorkplace = () => { this.setState({ isConfirmeWorkplace: !this.state.isConfirmeWorkplace }) }

  render() {
    let brutto = this.state.BaN;
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
    if (brutto - 85528 < 30000 && brutto - 85528 > 0) { kw_zm = Math.round((brutto - 85528) * 0.12) };
    if (this.state.isConfirmed) { zal_pod = Math.round(pod_zal * 0.32) - 300 }
    else { zal_pod = Math.round(pod_zal * 0.12) - 300 };
    if (zal_pod < 0 || (this.state.isConfirmedU26 && brutto <= 85528)) { zal_pod = 0 } else if (this.state.isConfirmedU26 && brutto > 85528 && brutto <= 205528) { zal_pod = Math.round((brutto - 85528) * 0.12) - kw_zm } else if (this.state.isConfirmedU26 && brutto > 205528) { zal_pod = Math.round(10800 + (brutto - 205528) * 0.32) };
    const pod_ppk = Math.round((ppk_bru - brutto) * 100) / 100;

    let netto: any = Math.round((brutto - zus - zdr - zal_pod - ppk) * 100) / 100;
    netto = netto.toString();
    netto = netto.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    netto = netto.replace('.', ',');

    const Netto = () => netto;
    const Wynik = () => { return (<p className="wynik">Kwota netto wynosi:<br /><span style={{ color: 'red', fontSize: '1.5em', letterSpacing: '2px' }}><Netto /></span> zł</p>) }
    return (
      <div>
        <header><Wynik />
          <div id="tytul">
            <u><h1>Kalkulator Wynagrodzeń</h1></u><br /><div className='box'>
              <nav>
                <ul className='menu'>
                  <li><Link href="/">wyliczenie z godzin pracy</Link></li>
                  <li><span style={{ boxShadow: '0 5px' }}>przelicznik BRUTTO/NETTO</span></li>
                  <li><Link href={'/kalkulator_stawki'}>kalkulator stawki godz.</Link></li>
                  <li><Link href={'/karta_godzin'}>karta godzin pracy</Link></li>
                </ul>
                {/*<Counter />*/}
              </nav>
            </div>
          </div>

        </header>
        <fieldset><legend><strong><u>wstępne opcje</u></strong></legend>
          <div className='box'>
            <label><input type='checkbox' id="ppk" onChange={this.handleChangeConfirmPpk} checked={this.state.isConfirmedPpk} />nie uczestniczę w PPK</label><br /><br />
            <label><input type='checkbox' id="u26" onChange={this.handleChangeConfirmU26} checked={this.state.isConfirmedU26} />korzystam przynajmniej z jednej z wymienionych ulg:<br /> - dla młodych do 26 roku życia<br /> - dla rodzin 4+<br /> - na powrót<br /> - dla pracujących seniorów</label><br /><br />
            <label><input type='checkbox' id="workplace" onChange={this.handleChangeConfirmWorkplace} checked={this.state.isConfirmeWorkplace} />zakład pracy znajduje się poza miejscowością zamieszkania</label><br /><br />
            <label><input type='checkbox' id="box" onChange={this.handleChangeConfirm} checked={this.state.isConfirmed} />zaliczka na podatek dochodowy jest pobierana wg drugiego progu skali podatkowej</label>
          </div>
        </fieldset>
        <section>
          <div id='constInp'><u><Input name='BnN' content="Podaj kwotę brutto w celu obliczenia kwoty netto" method={this.handleChangeBaN} plhld={undefined} /></u></div>
          <article>
            <div className="list"><p><i><b><u>tabela kwot:</u></b></i></p>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Nazwa</th>
                    <th scope="col">Wartość</th>
                    <th scope="col">Waluta</th>
                  </tr>
                </thead>
                <tbody><tr><td>wysokość wynagrodzenia brutto:</td><td className="count">{brutto}</td><td>zł</td></tr>
                  <tr><td>składka na ubezpieczenie społeczne:</td><td className="count">{zus}</td><td>zł</td></tr>
                  <tr><td>składka na ubezpieczenie zdrowotne: </td><td className="count">{zdr}</td><td>zł</td></tr>
                  <tr><td>zaliczka na podatek dochodowy:</td><td className="count">{zal_pod}</td><td>zł</td></tr>
                  <tr><td>składka na PPK:</td><td className="count">{ppk}</td><td>zł</td></tr>
                  <tr><td>kwota wpłaty finansowana przez pracodowcę na konto PPK pracownika:</td><td className="count">{pod_ppk}</td><td>zł</td></tr>
                </tbody>
              </table>
              <br /><p className="small"><i>* prezentowane kwoty składek na ubezpieczenie społeczne i zdrowotne wynikają jedynie z potrąceń wynagrodzenia brutto pracownika - pracodawca dodatkowo finansuje  składki pracownika zgodnie z obowiązującymi przepisami</i></p>
            </div></article>
          <article>
            <div className='desc'>
              <p>Użycie <strong>przelicznika BRUTTO na NETTO</strong> wymaga zaznaczenia odpowiednich pozycji we &quot;wstępnych opcjach&quot; oraz wpisania żądanej do przeliczenia kwoty brutto.</p>
              <p>Przeliczenie wynagrodzenia brutto na netto dokonuje się na podstawie aktualnych stawek podatkowych oraz składek na ubezpieczenia społeczne i zdrowotne. Oto ogólny,  uproszczony opis jak to działa:</p>
              <div className='desc'>
                <p>
                  <strong>
                    1. Ustalenie wynagrodzenia brutto
                  </strong>
                  . Wynagrodzenie brutto to kwota, którą pracownik otrzymuje od pracodawcy przed odliczeniem podatków i składek na ubezpieczenia społeczne. Jest to kwota, która widnieje w umowie o pracę.
                </p>
                <p>
                  <strong>
                    2. Odliczenie składek na ubezpieczenie społeczne
                  </strong>
                  . Składki na ubezpieczenia społeczne to kwoty, które są automatycznie potrącane z wynagrodzenia brutto. W Polsce składki te obejmują ubezpieczenie emerytalne (9,76%), rentowe (1,5%) i chorobowe (2,45%). Te procenty są obliczane od Twojego wynagrodzenia brutto - razem jest to 13,71%.
                </p>
                <p>
                  <strong>
                    3. Obliczenie składki na ubezpieczenie zdrowotne
                  </strong>
                  . Kwota pozostała po odjęciu składek społecznych staje się podstawą do obliczenie składki zdrowotnej, której wymiar wynosi 9% - narazie jej nie odliczamy od podstawy.
                </p>
                <p>
                  <strong>
                    4. Ustalenie dochodu pracownika
                  </strong>
                  . Od wcześniej obliczonej podstawy odejmujemy tzw. koszty uzyskania dochodu, które w zależności od miejsca wykonywania pracy obecnie wynoszą 250 zł lub 300 zł. Po dokonaniu tego odliczenia otrzymujemy <strong>dochód.</strong>
                </p>
                <p>
                  <strong>
                    5. Obliczenie zaliczki na podatek dochodowy
                  </strong>
                  . Wspomnianą zaliczkę obliczamy według obowiązującej skali podatkowj. Obecnie dla pierwszego progu podatkowego jest to 12 % dochodu minus kwota zmniejszająca podatek wynikająca z powszechnej ulgi czyli 300 zł. Tak obliczoną kwotę pracodawca przekazuje do urzędu skarbowego.
                </p>
                <p>
                  <strong>
                    6. Obliczenie wynagrodzenia netto
                  </strong>
                  . Ostatni krok sprowadza się do dokonania odejmowania - od kwoty otrzymanej w kroku nr. 2 czyli po odliczeniu od kwoty brutto składek na ubezpieczenie społeczne, odejmujemy składkę zdrowotną obliczoną w kroku nr. 3, a następnie zaliczkę na podatek dochodowy obliczoną w kroku nr. 5. Tak otrzymana kwota jest <strong>kwotą netto.</strong>
                </p>
              </div>
            </div>
          </article>
        </section>
        <Weather />
        <Cookie />
      </div>
    )
  }
}
export default BnN;

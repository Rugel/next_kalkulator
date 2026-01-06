'use client';
import React from 'react';
import Input from '../modules/input';
import Swal from 'sweetalert2';
import Cookie from '../modules/cookies';
import AdSense from '../modules/AdSense';
import AdSenseInArticle from '../modules/AdSenseInArticle';
import Menu from '../modules/Menu';
import { calculateWorkingDays } from '../utils/workdays';
import stylesList from "../components/ResultsList.module.css";
import stylesInput from "../modules/Input.module.css";



import CheckBox from '../modules/CheckBox';
import stylesFieldset from "../components/Fieldset.module.css";

class StaGodz extends React.Component {
  state = {
    brutto: 0,
    workdays: 0,
    isConfirmed: false,
    isConfirmedPpk: false,
    isConfirmedU26: false,
    isConfirmeWorkplace: false,
    isTaxFreeExcluded: false,
  }

  componentDidMount() {
    // Calculate working days for current month on initial load
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11
    const workingDays = calculateWorkingDays(currentYear, currentMonth);
    this.setState({ workdays: workingDays });
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

    let rate: any = Math.round((brutto / workdays / 8) * 100) / 100;
    rate = rate.toString();
    rate = rate.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    rate = rate.replace('.', ',');
    const Rate = () => rate;

    const Wynik = () => { return (<p className="wynik">Stawka godzinowa brutto wynosi:<br /><span style={{ color: '#FD5B35', fontSize: '1.5em', letterSpacing: '2px' }}><Rate /></span> zł / godz</p>) }

    return (
      <>
        <header><Wynik />
          <div id="tytul">
            <u><h1>Kalkulator Stawki Godzinowej</h1></u>
          </div>
        </header>
        <Menu currentPage="stawka" />
        <AdSense
          adClient="ca-pub-8789064360135564" // Twój identyfikator AdSense
          adSlot="4100717483" // ID jednostki reklamowej
        />
        <main>
          <fieldset className={stylesFieldset.fieldset}><legend className={stylesFieldset.legend}><strong><u>wstępne opcje</u></strong></legend>
            <div className={stylesFieldset.box}>
              <CheckBox Id={'ppk'} OnChange={this.handleChangeConfirmPpk} Checked={this.state.isConfirmedPpk} Text={'nie uczestniczę w PPK'} /><br /><br />
              <CheckBox Id={'u26'} OnChange={this.handleChangeConfirmU26} Checked={this.state.isConfirmedU26} Text={'korzystam przynajmniej z jednej z wymienionych ulg: „dla młodych do 26 roku życia”, „dla rodzin 4+”,  „na powrót”, „dla pracujących seniorów”'} /><br /><br />
              <CheckBox Id={'workplace'} OnChange={this.handleChangeConfirmWorkplace} Checked={this.state.isConfirmeWorkplace} Text={'zakład pracy znajduje się poza miejscowością zamieszkania'} /><br /><br />
              <CheckBox Id={'taxfree'} OnChange={this.handleChangeTaxFreeExcluded} Checked={this.state.isTaxFreeExcluded} Text={'nie odliczaj kwoty wolnej od podatku (ulga 300 zł)'} /><br /><br />
              <CheckBox Id={'box'} OnChange={this.handleChangeConfirm} Checked={this.state.isConfirmed} Text={'zaliczka na podatek dochodowy jest pobierana wg drugiego progu skali podatkowej'} />
            </div>
          </fieldset>
          <section>
            <h2 style={{ textAlign: 'center', margin: '1.5rem 0 1rem 0' }}>Oblicz Swoją Stawkę Godzinową</h2>
            <form id="calculator-form" className={stylesInput.calculatorForm} onSubmit={(e) => e.preventDefault()}>
              <div className={stylesInput.formGroup}>
                <Input name='hours' content='Podaj miesięczne wynagrodzenie brutto' method={this.handleChangeBrutto} plhld={undefined} number={1} />
              </div>
              <div className={stylesInput.formGroup}>
                <Input name='rate' content='Podaj liczbę dni roboczych w danym miesiącu' plhld={this.state.workdays} method={this.handleChangeWorkdays} number={2} monthSelector={true} onMonthSelect={this.handleMonthSelect} defaultMonthValue={new Date().toISOString().slice(0, 7)} />
              </div>
            </form>
            <section>
              <h2 style={{ textAlign: 'center', margin: '1.5rem 0 1rem 0' }}>Wyniki Obliczeń</h2>
              <div className={stylesList.list}><p><i><b><u>tabela kwot:</u></b></i></p>
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
              <h2>Jak Obliczyć Stawkę Godzinową?</h2>
              <div className='desc'>
                <p>
                  Przeliczanie kwoty brutto wynagrodzenia na stawkę godzinową brutto dla 40-godzinnego systemu pracy jest proste.<br /> Wystarczy podzielić miesięczne wynagrodzenie brutto przez ilość dni roboczych w miesiącu, a następnie podzielić wynik przez 8. Przykładowo, jeśli miesięczne wynagrodzenie brutto wynosi 8000 zł, a w danym miesiącu jest 20 dni roboczych, to stawka godzinowa brutto wynosi 8000 zł / 20 / 8 h = 50 zł/h.
                </p>
                <AdSenseInArticle adSlot={8969900782} />
                <p>
                  Warto zauważyć, że powyższy schemat uwzględnia tylko podstawowe składniki wynagrodzenia, takie jak podstawa, dodatki i premie. W przypadku, gdy wynagrodzenie brutto zawiera dodatkowe składniki, takie jak np. diety, należy je dodać do miesięcznego wynagrodzenia brutto przed przeliczeniem na stawkę godzinową brutto.
                </p>
              </div>
            </article>
          </section>
        </main>
        <AdSense
          adClient="ca-pub-8789064360135564" // Twój identyfikator AdSense
          adSlot="6368891825" // ID jednostki reklamowej
        />
        <Cookie />
      </>
    )
  }
}
export default StaGodz;


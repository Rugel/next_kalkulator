'use client';


import React from 'react';
import Input from './modules/input';
import Footer from './modules/footer';
import Desc from './modules/descryption';
import Counter from './modules/counter';
import Swal from 'sweetalert2';
import Weather from './modules/weather';
import Link from 'next/link';

class MainCom extends React.Component {
  state = {
    hours: 0,
    rate: 0,
    workdays: 21,
    satsun: 0,
    hollydays: 0,
    illnessworkdays: 0,
    illnessweekenddays: 0,
    avaragehours: 168,
    avaragemoney: 7444.39,
    add: 0,
    BaN: 0,
    isConfirmed: false,
    isConfirmedPpk: false,
    isConfirmedU26: false,
    isConfirmeWorkplace: false,
  }

  handleChangeGodziny = (e: { target: { value: number; }; }) => { if (e.target.value >= 0 && e.target.value <= 744) { this.setState({ hours: e.target.value }) } else { this.setState({ hours: 168 }) } if (e.target.value < 0 || e.target.value > 744) { Swal.fire({ text: "Liczba musi się mieścić w przedziale 0 - 744", icon: "warning" }) } }

  handleChangeStawka = (e: { target: { value: number; }; }) => { if (e.target.value >= 0) { this.setState({ rate: e.target.value }) } else { this.setState({ rate: 0 }); Swal.fire({ text: 'Liczba nie może być ujemna', icon: 'warning' }) } }

  handleChangeWorkdays = (e: { target: { value: number; }; }) => { if (e.target.value >= 19 && e.target.value < 24) { this.setState({ workdays: e.target.value }) } else { this.setState({ workdays: 21 }) } if ((e.target.value > 2 && e.target.value < 19) || e.target.value > 23 || e.target.value < 0) { Swal.fire({ text: 'Liczba musi się mieścić w przedziale 19 - 23', icon: 'warning' }) } }

  handleChangeSatsun = (e: { target: { value: number; }; }) => { if (e.target.value > 0 && e.target.value <= 288) { this.setState({ satsun: e.target.value }) } else { this.setState({ satsun: 0 }) } if (e.target.value < 0 || e.target.value > 288) { Swal.fire({text:'Liczba musi się mieścić w przedziale 0 - 288', icon:'warning'}) } }

  handleChangeUrlop = (e: { target: { value: number; }; }) => { if (e.target.value > 0 && e.target.value <= this.state.workdays) { this.setState({ hollydays: e.target.value }) } else { this.setState({ hollydays: 0 }) } if (e.target.value < 0 || e.target.value > 23) { Swal.fire({text:'Liczba nie może być większa od liczby dni roboczych', icon:'warning'}) } }

  handleChangeCh1 = (e: { target: { value: number; }; }) => { if (e.target.value > 0 && e.target.value <= this.state.workdays) { this.setState({ illnessworkdays: e.target.value }) } else { this.setState({ illnessworkdays: 0 }) } if ( e.target.value < 0 || e.target.value > 23) { Swal.fire({text:'Liczba nie może być większa od liczby dni roboczych', icon:'warning'}) } }

  handleChangeCh2 = (e: { target: { value: number; }; }) => { if (e.target.value > 0 && e.target.value <= 12) { this.setState({ illnessweekenddays: e.target.value }) } else { this.setState({ illnessweekenddays: 0 }) } if (e.target.value < 0 || e.target.value > 12) { Swal.fire({text:'Liczba musi się mieścić w przedziale 0 - 12', icon:'warning'}) } }

  handleChangeSrGodz = (e: { target: { value: number; }; }) => { if (e.target.value > 0 && e.target.value <= 744) { this.setState({ avaragehours: e.target.value }) } else { this.setState({ avaragehours: 168 }) } if (e.target.value < 0 || e.target.value > 744) { Swal.fire({text:'Liczba musi się mieścić w przedziale 0 - 744', icon:'warning'}) } }

  handleChangeSrWyp = (e: { target: { value: number; }; }) => { if (e.target.value > 0) { this.setState({ avaragemoney: e.target.value }) } else { this.setState({ avaragemoney: 7005.76 }) } if (e.target.value < 0) { Swal.fire({text:'Kwota nie może być ujemna', icon:'warning'}) } }

  handleChangeAdd = (e: { target: { value: number; }; }) => { if (e.target.value >= 0) { this.setState({ add: e.target.value }) } else if (e.target.value < 0) { this.setState({ add: 0 }); Swal.fire({text:'Kwota nie może być ujemna', icon:'warning'}) } }

  handleChangeBaN = (e: { target: { value: number; }; }) => { if (e.target.value >= 0) { this.setState({ BaN: e.target.value }) } else if (e.target.value < 0) { this.setState({ BaN: 0 }); Swal.fire({text:'Kwota nie może być ujemna', icon:'warning'})} }

  handleChangeConfirm = () => { this.setState({ isConfirmed: !this.state.isConfirmed }) }

  handleChangeConfirmPpk = () => { this.setState({ isConfirmedPpk: !this.state.isConfirmedPpk }) }

  handleChangeConfirmU26 = () => { this.setState({ isConfirmedU26: !this.state.isConfirmedU26 }) }

  handleChangeConfirmWorkplace = () => { this.setState({ isConfirmeWorkplace: !this.state.isConfirmeWorkplace }) }
  handleChangeCity = (e: { target: { value: string | any[]; }; }) => { if (e.target.value.length > 0) { this.setState({ city: e.target.value, active: false }) } else { this.setState({ city: "Warszawa", active: true }) } }

  handleClickLocal = (e: any) => {
    let showPosition = function (this: any, position: { coords: { latitude: any; longitude: any; }; }) {
      this.setState({ lat: position.coords.latitude, lon: position.coords.longitude, active: true });
      //document.getElementById('town').value = null;
    }
    showPosition = showPosition.bind(this);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }

  render() {
    const { hours, rate, workdays, satsun, hollydays, illnessworkdays, illnessweekenddays, avaragehours, avaragemoney, add } = this.state;

    let workd = workdays - hollydays - illnessworkdays;
    let nadgodz = hours - workd * 8;
    if (nadgodz < 0) { nadgodz = 0 };

    //wyliczenie kwoty brutto z godzin
    const count = () => { return (hours * rate + nadgodz * rate * 0.5 + satsun * rate * 0.5 + hollydays * 8 * avaragemoney / avaragehours + illnessworkdays * avaragemoney / 30 * 0.8 + illnessweekenddays * avaragemoney / 30 * 0.8 + add * 1) };
    let brutto = Math.round(count() * 100) / 100;

    //warunek dla przelicznika Brutto na Netto
    if (this.state.BaN) { brutto = this.state.BaN };

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
    let zal_pod;
    if (this.state.isConfirmed) { zal_pod = Math.round(pod_zal * 0.32) - 300 }
    else { zal_pod = Math.round(pod_zal * 0.12) - 300 };
    if (zal_pod < 0 || (this.state.isConfirmedU26 && brutto <= 85528 && !this.state.isConfirmed)) { zal_pod = 0 };
    const pod_ppk = Math.round((ppk_bru - brutto) * 100) / 100;
    let netto: any = Math.round((brutto - zus - zdr - zal_pod - ppk) * 100) / 100;
    netto = netto.toString();
    netto = netto.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    netto = netto.replace('.', ',');
    const Netto = () => netto;

    const Wynik = () => { return (<p className="wynik">Miesięczne wynagrodzenie netto:<br /><span style={{ color: '#FD5B35', fontSize: '1.5em', letterSpacing: '2px' }}><Netto /></span> zł</p>) }

    return <div>
      <header><Wynik />
        <nav><div id="tytul">
          <u><h1>Kalkulator Wynagrodzeń</h1></u><br />
          <div className='box'>
            <ul className='menu'>
              <li><span style={{ boxShadow: '0 5px' }}>wyliczenie z godzin pracy</span></li>
              <li><Link href="/brutto_netto">przelicznik BRUTTO/NETTO</Link></li>
              <li>kalkulator stawki godz.</li>
              <li>karta godzin pracy</li>
            </ul>
            <Counter />
          </div>
        </div>
        </nav>
      </header>
      <fieldset><legend><strong><u>wstępne opcje</u></strong></legend>
        <div className='box'>
          <label><input type='checkbox' id="ppk" onChange={this.handleChangeConfirmPpk} checked={this.state.isConfirmedPpk} />brak uczestnictwa w PPK</label><br /><br />
          <label><input type='checkbox' id="u26" onChange={this.handleChangeConfirmU26} checked={this.state.isConfirmedU26} />wiek poniżej 26 lat</label><br /><br />
          <label><input type='checkbox' id="workplace" onChange={this.handleChangeConfirmWorkplace} checked={this.state.isConfirmeWorkplace} />zakład pracy znajduje się poza miejscowością zamieszkania</label><br /><br />
          <label><input type='checkbox' id="box" onChange={this.handleChangeConfirm} checked={this.state.isConfirmed} />zaliczka na podatek dochodowy jest pobierana wg drugiego progu skali podatkowej</label>
        </div>
      </fieldset>

      <section><ol id="list">

        <li><Input name='hours' content='Łączna liczba przepracowanych godzin w danym miesiącu' method={this.handleChangeGodziny} plhld={undefined} /></li>

        <li><Input name='rate' content='Stawka godzinowa brutto' method={this.handleChangeStawka} plhld={undefined} /></li>

        <li><Input name='workdays' content='Liczba dni roboczych danego miesiąca' method={this.handleChangeWorkdays} plhld={this.state.workdays} /></li>

        <li><Input name='sunsat' content='Liczba godzin przepracowanych w dni wolne od pracy' method={this.handleChangeSatsun} plhld={undefined} /></li>

        <li><Input name='hollydays' content='Liczba dni spędzonych na urlopie' method={this.handleChangeUrlop} plhld={undefined} /></li>

        <li><Input name='illworkdays' content='Liczba dni roboczych spędzonych na zwolnieniu lekarskim' method={this.handleChangeCh1} plhld={undefined} /></li>

        <li><Input name='illfreedays' content='Licza dni wolnych od pracy spędzonych na zwolnieniu lekarskim' method={this.handleChangeCh2} plhld={undefined} /></li>

        <li><Input name='avaragehours' content='Srednia miesięczna liczba przepracowanych godzin (z ostatnich kilku miesięcy)' method={this.handleChangeSrGodz} plhld={this.state.workdays * 8} /></li>

        <li><Input name='avaragemoney' content='Srednia miesięczna kwota brutto wynagrodzenia (z ostatnich kilku miesięcy)' method={this.handleChangeSrWyp} plhld={this.state.avaragemoney} /></li>

        <li><Input name='addmoney' content='Kwota brutto ewentualnych dodatków typu: premia, mieszkaniówka' method={this.handleChangeAdd} plhld={undefined} /></li>
      </ol>


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
          </div></article></section>
      <Desc />
      <footer>
        <Weather />
      </footer>
    </div>
  }
}
export default MainCom;

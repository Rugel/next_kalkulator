'use client';


import React from 'react';
import Input from './modules/input';
import Footer from './modules/footer';
import Desc from './modules/descryption';
import Counter from './modules/counter';
import wind from '/public/icons/wind.svg';
import temp from '/public/icons/temperature.svg';
import clouds from '/public/icons/clouds.svg';
import pressure from '/public/icons/pressure.svg';
import summer from '/public/icons/summer.svg';
import vision from '/public/icons/vision.svg';
import geo from '/public/icons/geo-alt.svg';


const apiKey = process.env.NEXT_PUBLIC_API_KEY;

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
    temp: "brak danych",
    wiatr: "brak danych",
    stan: "brak danych",
    cisnienie: "brak danych",
    clouds: "brak danych",
    visibility: "brak danych",
    // icon: "",
    time: "brak danych",
    city: "Warszawa",
    cityOk: "Warszawa",
    country: "PL",
    lat: "",
    lon: "",
    active: false,

  }


  componentDidMount() {
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    fetch
      (`${url}?q=${this.state.city}&units=metric&lang=pl&appid=${apiKey}`)
      .then(response => response.json())
      .then(dane => this.setState({ temp: dane.main.temp, wiatr: dane.wind.speed, stan: dane.weather[0].description, cisnienie: dane.main.pressure, visibility: dane.visibility, clouds: dane.clouds.all, time: new Date(dane.dt * 1000).toLocaleTimeString() })
      )
  }

  componentDidUpdate(prevProps: any, prevState: { active: boolean; lat: any; city: string; }) {
    const apiWork = (dane: { name: any; main: { temp: number; pressure: number; }; wind: { speed: number; }; weather: { description: string; }[]; visibility: number; clouds: { all: any; }; dt: number; sys: { country: any; }; }) => this.setState({ cityOk: dane.name, temp: dane.main.temp, wiatr: dane.wind.speed, stan: dane.weather[0].description, cisnienie: dane.main.pressure, visibility: dane.visibility, clouds: dane.clouds.all, time: new Date(dane.dt * 1000).toLocaleTimeString(), country: dane.sys.country });
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    if (prevState.active !== this.state.active || prevState.lat !== this.state.lat) {
      fetch(`${url}?lat=${this.state.lat}&lon=${this.state.lon}&units=metric&lang=pl&appid=${apiKey}`)
        .then(response => response.json())
        .then(apiWork)
    }
    else if (prevState.city !== this.state.city) {
      fetch(`${url}?q=${this.state.city}&units=metric&lang=pl&appid=${apiKey}`)
        .then(response => response.json())
        .then(apiWork)
    }
  }

  handleChangeGodziny = (e: { target: { value: number; }; }) => { if (e.target.value >= 0 && e.target.value <= 744) { this.setState({ hours: e.target.value }) } else { this.setState({ hours: 168 }) }/* if (e.target.value < 0 || e.target.value > 744) { swal("Liczba musi się mieścić w przedziale 0 - 744") }*/ }

  handleChangeStawka = (e: { target: { value: number; }; }) => { if (e.target.value >= 0) { this.setState({ rate: e.target.value }) }/* else { this.setState({ rate: 0 }); swal('Liczba nie może być ujemna') }*/ }

  handleChangeWorkdays = (e: { target: { value: number; }; }) => { if (e.target.value >= 19 && e.target.value < 24) { this.setState({ workdays: e.target.value }) } else { this.setState({ workdays: 21 }) }/* if ((e.target.value > 2 && e.target.value < 19) || e.target.value > 23 || e.target.value < 0) { swal('Liczba musi się mieścić w przedziale 19 - 23') }*/ }

  handleChangeSatsun = (e: { target: { value: number; }; }) => { if (e.target.value > 0 && e.target.value <= 288) { this.setState({ satsun: e.target.value }) } else { this.setState({ satsun: 0 }) }/* if (e.target.value < 0 || e.target.value > 288) { swal('Liczba musi się mieścić w przedziale 0 - 288') }*/ }

  handleChangeUrlop = (e: { target: { value: number; }; }) => { if (e.target.value > 0 && e.target.value <= this.state.workdays) { this.setState({ hollydays: e.target.value }) } else { this.setState({ hollydays: 0 }) }/* if (e.target.value < 0 || e.target.value > this.state.workdays) { swal('Liczba nie może być większa od liczby dni roboczych') }*/ }

  handleChangeCh1 = (e: { target: { value: number; }; }) => { if (e.target.value > 0 && e.target.value <= this.state.workdays) { this.setState({ illnessworkdays: e.target.value }) } else { this.setState({ illnessworkdays: 0 }) }/* if (e.target.value < 0 || e.target.value > this.state.workdays) { swal('Liczba nie może być większa od liczby dni roboczych') }*/ }

  handleChangeCh2 = (e: { target: { value: number; }; }) => { if (e.target.value > 0 && e.target.value <= 12) { this.setState({ illnessweekenddays: e.target.value }) } else { this.setState({ illnessweekenddays: 0 }) }/* if (e.target.value < 0 || e.target.value > 12) { swal('Liczba musi się mieścić w przedziale 0 - 12') }*/ }

  handleChangeSrGodz = (e: { target: { value: number; }; }) => { if (e.target.value > 0 && e.target.value <= 744) { this.setState({ avaragehours: e.target.value }) } else { this.setState({ avaragehours: 168 }) }/* if (e.target.value < 0 || e.target.value > 744) { swal('Liczba musi się mieścić w przedziale 0 - 744') }*/ }

  handleChangeSrWyp = (e: { target: { value: number; }; }) => { if (e.target.value > 0) { this.setState({ avaragemoney: e.target.value }) } else { this.setState({ avaragemoney: 7005.76 }) }/* if (e.target.value < 0) { swal('Kwota nie może być ujemna') }*/ }

  handleChangeAdd = (e: { target: { value: number; }; }) => { if (e.target.value >= 0) { this.setState({ add: e.target.value }) } else if (e.target.value < 0) { this.setState({ add: 0 });/* swal('Kwota nie może być ujemna')*/ } }

  handleChangeBaN = (e: { target: { value: number; }; }) => { if (e.target.value >= 0) { this.setState({ BaN: e.target.value }) } else if (e.target.value < 0) { this.setState({ BaN: 0 });/* swal('Kwota nie może być ujemna')*/ } }

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
              <li>przelicznik BRUTTO/NETTO</li>
              <li>kalkulator stawki godz.</li>
              <li>karta godzin pracy</li> 
            </ul>
            <Counter/>
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
      <footer><div><label><span style={{ fontSize: "18px", color: "#ffffff" }}>Pogoda w Twoim mieście: </span><br /><input id='town' className="input" type="text" placeholder={this.state.cityOk} autoComplete="off" style={{ width: "8em", height: "2.3em" }} onChange={this.handleChangeCity}></input></label><button type='button' aria-label='gps_local' onClick={this.handleClickLocal} style={{ width: "2.7em", height: "3.0em", borderRadius: "15%", outline: "none", marginLeft: "1em", backgroundImage: `url(${geo})`, backgroundRepeat: "no-repeat", position: "relative", top: "1em" }} /><br /><br />Aktualna pogoda dla miasta <span className='span'>{this.state.cityOk} - {this.state.country}</span> <span className='span' style={{ fontWeight: "300" }}>({this.state.time})</span>:<br /><img className='icon' src={temp} alt="temperature" /> temp.: <span className='span'>{this.state.temp} &#176;C</span><img className='icon' src={wind} alt="wind" /> wiatr: <span className='span'>{this.state.wiatr} m/s</span><br /> <img className='icon' src={summer} alt="summer" /> stan: <span className='span'>{this.state.stan}</span> <img className='icon' src={pressure} alt="pressure" />  ciśnienie: <span className='span'>{this.state.cisnienie} hPa</span><br /> <img className='icon' src={vision} alt="visibillity" /> widoczność: <span className='span'>{this.state.visibility} m</span> <img className='icon' src={clouds} alt="clouds" /> zachmurzenie:  <span className='span'>{this.state.clouds} %</span><br /><Footer /></div></footer>
    </div>
  }
}
export default MainCom;

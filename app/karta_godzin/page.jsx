'use client';
import React from 'react';
import Counter from '../modules/counter';
import Weather from '../modules/weather';
import Link from 'next/link';
import Image from 'next/image';
import { posix } from 'path';
import { useEffect } from 'react';

class KartaGodz extends React.Component {

  state = {
    inputVal: '',
    logo: ''
  }

  InputHandleChange = (e) => { this.setState({ inputVal: e.target.value }) };
  LogoHandlleChange = (e) => { const file = e.target.files[0]; this.setState({ logo: file }) };

  render() {
    const RenderImage = () => { if (this.state.logo) { const url = URL.createObjectURL(this.state.logo); return (<Image id='logo' width='150' height='180' src={url} alt='logo' />) } else { return null } };
    const Logo = () => <div id='logInp'><label htmlFor="file"><em>dodaj logo lub zdjęcie</em></label><br /><input type="file" id="file" onChange={this.LogoHandlleChange} accept="image/*" /><br /><b>wybrano: </b>{this.state.logo.name}</div>;
    const Title = () => <div id='title'><h1>Karta Godzin Pracy</h1></div>;
    const text = this.state.inputVal;
    let month = text.slice(5, 7) * 1;
    let year = text.slice(0, 4) * 1;
    if (year < 1) { year = null };
    const data = new Date();
    let rok = data.getFullYear();
    const m = month + ((year - rok) * 12);
    rok = year;
    let miesiac = (data.setMonth(m - 1));
    data.setDate(1);
    miesiac = data.getMonth();
    let nummie = miesiac + 1;
    if (nummie < 10) {
      nummie = '0' + nummie;
    }
    const day = data.getDay();
    const sobota = 7 - day;
    const niedziela = 1 - day;
    let monthPre = month < 10 && month > 0 ? `0${month}` : month;
    let monthStr = month;
    switch (monthStr) {
      case 1: monthStr = "styczeń";
        break;
      case 2: monthStr = "luty";
        break;
      case 3: monthStr = "marzec";
        break;
      case 4: monthStr = "kwiecień";
        break;
      case 5: monthStr = "maj";
        break;
      case 6: monthStr = "czerwiec";
        break;
      case 7: monthStr = "lipiec";
        break;
      case 8: monthStr = "sierpień";
        break;
      case 9: monthStr = "wrzesień";
        break;
      case 10: monthStr = "październik";
        break;
      case 11: monthStr = "listopad";
        break;
      case 12: monthStr = "grudzień";
        break;
      default: monthStr = <span style={{ fontWeight: 300 }}><em>nie wybrano miesiąca!</em></span>
    }
    let table = [];
    let l;
    if (monthStr === "luty" && year % 400 === 0) {
      l = 29
    }
    else if (monthStr === "luty" && year % 100 === 0) {
      l = 28
    }

    else if (monthStr === "luty" && year % 4 === 0) {
      l = 29
    }
    else if (monthStr === "luty" && year % 4 !== 0) {
      l = 28
    }
    else if (monthStr === "styczeń" || monthStr === "marzec" || monthStr === "maj" || monthStr === "lipiec" || monthStr === "sierpień" || monthStr === "październik" || monthStr === "grudzień") {
      l = 31
    }
    else {
      l = 30
    }
    for (let i = 1; i <= l; i++) {
      if ((i === niedziela || i === niedziela + 7 || i === niedziela + 14 || i === niedziela + 21 || i === niedziela + 28 || i === niedziela + 35) || (i === 1 && (monthStr === "styczeń" || monthStr === "maj" || monthStr === "listopad")) || (i === 6 && monthStr === "styczeń") || (i === 3 && monthStr === "maj") || (i === 15 && monthStr === "sierpień") || (i === 11 && monthStr === "listopad") || (i === 25 && monthStr === "grudzień") || (i === 26 && monthStr === "grudzień")) {
        table.push(<tr key={i} className='holyday'><td><b>{i}</b>.{monthPre}.{year}</td><td></td><td></td><td></td><td></td><td></td></tr>)
      }
      else if (i === sobota || i === sobota + 7 || i === sobota + 14 || i === sobota + 21 || i === sobota + 28) { table.push(<tr key={i} className='saturday'><td><b>{i}</b>.{monthPre}.{year}</td><td></td><td></td><td></td><td></td><td></td></tr>) }
      else { table.push(<tr key={i} className='normal'><td><b>{i}</b>.{monthPre}.{year}</td><td></td><td></td><td></td><td></td><td></td></tr>) }
    };
    const Input = () => <div id='input'><label><input type='month' name='input' onChange={this.InputHandleChange} value={this.state.inputVal} /><br /><em>wybierz żądany miesiąc</em></label></div>;
    const Month = () => <div id='month'><b>{monthStr} {year}</b></div>;

    const Print = () => {useEffect(() => {if (typeof window !== "undefined") { }
      }, []);
      return <div id='print'><label><button onClick={print}>🖨️Drukuj</button><br /><em>aby zapisać do pliku należy wybrać w urządzeniach &quot;zapisz jako PDF&quot;</em></label></div>;
    }

    //const Print = () => { if (typeof window !== "undefined") {return <div id='print'><label><button onClick={window.print}>🖨️Drukuj</button><br /><em>aby zapisać do pliku należy wybrać w urządzeniach &quot;zapisz jako PDF&quot;</em></label></div> } else { null } };

    const Enploy = () => <div id='enploy'><em>pracownik:</em><hr className='hr' /><br /><em>stanowisko:</em><hr className='hr' /><br /></div>
    const Rows = () => table.map((e) => e);
    const Table = () => <table id='table'>
      <thead>
        <tr>
          <th>DATA</th>
          <th>ROZPO.</th>
          <th>ZAKOŃ.</th>
          <th>GODZ.</th>
          <th id='podpis'>PODPIS</th>
          <th id='uwagi'>UWAGI</th>
        </tr>
      </thead>
      <tbody>
        <Rows />
        <tr><td className='noborder'></td><td className='noborder'></td><td className='noborder'><b>SUMA:</b></td><td></td><td className='noborder'></td><td className='noborder'></td></tr>
      </tbody>
    </table>
    const Podpis = () => <div id='sign'><hr id='sign_hr' /><em>podpis przełożonego</em></div>;
    if (this.state.inputVal) { document.title = `${monthStr} ${rok} - karta godz. 📋` };
    const Wynik = () => { return (<div className="wynik">Karta Godzin Pracy<br /><span style={{ color: '#FD5B35', fontSize: '1.5em', letterSpacing: '2px' }}><Month /></span></div>) }

    return (
      <div className="content">
        <header>
          <Wynik />
          <div id="tytul">
            <u><h1>Kalkulator Wynagrodzeń</h1></u><br />
            <div className='box'>
              <nav aria-label="breadcrumb">
                <ul className='menu'>
                  <li><Link href={'/'} >wyliczenie z godzin pracy</Link></li>
                  <li><Link href={'/brutto_netto'}>przelicznik BRUTTO/NETTO</Link></li>
                  <li><Link href={'/kalkulator_stawki'}>kalkulator stawki godz.</Link></li>
                  <li><span style={{ boxShadow: '0 5px' }}>karta godzin pracy</span></li>
                </ul>
                <Counter />
              </nav>
            </div>
          </div>
        </header>
        <RenderImage />
        <Input />
        <Logo />
        <Print />
        <Title />
        <Month />
        <Enploy />
        <Table />
        <Podpis />
        <article>
          <div className='desc'>
            <p>
              Na tej stronie powyżej wygenerujesz oryginalnie zaprojektowaną <b>Kartę Godzin Pracy</b>, która może pełnić funkcję <b>karty ewidencji czasu pracy pracownika</b> - to zaledwie trzy kliknięcia by to zrobić:</p>
            <ul>
              <li> wybór miesiąca w danym roku, dla którego chcemy uzyskać kartę</li>
              <li>opcjonalnie w celu lepszej personalizacji możemy dodać logo firmy lub jakąś grafikę</li>
              <li>użyć przycisku &quot;Drukuj&quot; i z opcji wybrać drukarkę w celu fizycznego wydruku lub wybrać opcję zapisu pliku na urządzeniu w formacie &quot;PDF&quot;, by np. przesłać go za pomocą e-mail</li>
            </ul>
            <p>Utworzony plik ma formę tabeli, gdzie kolejne jej wiersze reprezentują dni miesiąca. Dla lepszej przejrzystości formularza wiersze sobót mają kolor niebieski a niedziel i świąt stałych - kolor czerwony. Można generować pliki dla dowolnych miesięcy lat przeszłych, jak i przyszłych.</p>
          </div>
          <Weather />
        </article>
      </div>
    );
  }
}
export default KartaGodz;
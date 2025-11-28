'use client';
import React from 'react';
import Image from 'next/image';
import Print from '../modules/print';
import Cookie from '../modules/cookies';
import AdSense from '../modules/AdSense';
import AdSenseInArticle from '../modules/AdSenseInArticle';
import Menu from '../modules/Menu';
import { getMovableHolidays } from './holidays';

const data = new Date();
let rok = data.getFullYear();
let mies = data.getMonth() + 1;
mies < 10 ? mies = `0${mies}` : mies;

class KartaGodz extends React.Component {

  state = {
    inputVal: `${rok}-${mies}`,
    logo: ''
  }

  InputHandleChange = (e) => { this.setState({ inputVal: e.target.value }) };
  LogoHandlleChange = (e) => { const file = e.target.files[0]; this.setState({ logo: file }) };

  render() {
    const RenderImage = () => { if (this.state.logo) { const url = URL.createObjectURL(this.state.logo); return (<div id='logo'><Image fill style={{ objectFit: 'scale-down' }} src={url} alt='logo' /></div>) } else { return null } };
    const Logo = () => <div id='logInp'><label htmlFor="file"><em>dodaj logo lub zdjęcie</em></label><br /><input type="file" id="file" onChange={this.LogoHandlleChange} accept="image/*" /><br /><b>wybrano: </b>{this.state.logo.name}</div>;
    const Title = () => <div id='title'><h2>Karta Godzin Pracy</h2></div>;
    const text = this.state.inputVal;
    let month = text.slice(5, 7) * 1;
    let year = text.slice(0, 4) * 1;
    if (year < 1) { year = null };

    // Create a fresh Date object for the selected month (don't mutate global data)
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const day = firstDayOfMonth.getDay(); // 0 = Sunday, 6 = Saturday

    // Calculate which day numbers are Saturdays and Sundays
    // If day = 0 (Sunday), first Sunday is day 1, first Saturday is day 7
    // If day = 6 (Saturday), first Saturday is day 1, first Sunday is day 2
    const sobota = day === 6 ? 1 : (7 - day);
    const niedziela = day === 0 ? 1 : (8 - day);
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

    // Get movable holidays for the current year
    const movableHolidays = getMovableHolidays(year);

    // Helper function to check if current day is a movable holiday
    const isMovableHoliday = (day, currentMonth) => {
      return movableHolidays.some(holiday => holiday.day === day && holiday.month === currentMonth);
    };

    for (let i = 1; i <= l; i++) {
      // Check if day is Sunday or fixed holiday or movable holiday
      const isSunday = (i === niedziela || i === niedziela + 7 || i === niedziela + 14 || i === niedziela + 21 || i === niedziela + 28 || i === niedziela + 35);
      const isFixedHoliday = (i === 1 && (monthStr === "styczeń" || monthStr === "maj" || monthStr === "listopad")) || (i === 6 && monthStr === "styczeń") || (i === 3 && monthStr === "maj") || (i === 15 && monthStr === "sierpień") || (i === 11 && monthStr === "listopad") || (i === 25 && monthStr === "grudzień") || (i === 26 && monthStr === "grudzień");
      const isMovable = isMovableHoliday(i, month);

      if (isSunday || isFixedHoliday || isMovable) {
        table.push(<tr key={i} className='holyday'><td><b>{i}</b>.{monthPre}.{year}</td><td></td><td></td><td></td><td></td><td></td></tr>)
      }
      else if (i === sobota || i === sobota + 7 || i === sobota + 14 || i === sobota + 21 || i === sobota + 28) { table.push(<tr key={i} className='saturday'><td><b>{i}</b>.{monthPre}.{year}</td><td></td><td></td><td></td><td></td><td></td></tr>) }
      else { table.push(<tr key={i} className='normal'><td><b>{i}</b>.{monthPre}.{year}</td><td></td><td></td><td></td><td></td><td></td></tr>) }
    };
    const Input = () => <div id='input'>
      <div className="input-wrapper">
        <label htmlFor="month-input" className="input-label">
          <em>wybierz żądany miesiąc</em>
        </label>
        <input id="month-input" type='month' name='input' onChange={this.InputHandleChange} value={this.state.inputVal} className="input" />
      </div>
    </div>;
    const Month = () => <div id='month'><b>{monthStr} {year}</b></div>;
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
    const Wynik = () => { return (<div className="wynik">Karta Godzin Pracy<br /><span style={{ color: '#FD5B35', fontSize: '1.5em', letterSpacing: '2px' }}><Month /></span></div>) }

    return (
      <>
        <header>
          <Wynik />
          <div id="tytul">
            <u><h1>Kalkulator Wynagrodzeń</h1></u>
          </div>
        </header>
        <Menu currentPage="karta_godzin" />
        <AdSense
          adClient="ca-pub-8789064360135564" // Twój identyfikator AdSense
          adSlot="3856131321" // ID jednostki reklamowej
        />
        <main>
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
              <AdSenseInArticle adSlot={5751543216} />
              <ul>
                <li> wybór miesiąca w danym roku, dla którego chcemy uzyskać kartę</li>
                <li>opcjonalnie w celu lepszej personalizacji możemy dodać logo firmy lub jakąś grafikę</li>
                <li>użyć przycisku &quot;Drukuj&quot; i z opcji wybrać drukarkę w celu fizycznego wydruku lub wybrać opcję zapisu pliku na urządzeniu w formacie &quot;PDF&quot;, by np. przesłać go za pomocą e-mail</li>
              </ul>
              <p>Utworzony plik ma formę tabeli, gdzie kolejne jej wiersze reprezentują dni miesiąca. Dla lepszej przejrzystości formularza wiersze sobót mają kolor niebieski a niedziel i świąt stałych - kolor czerwony. Można generować pliki dla dowolnych miesięcy lat przeszłych, jak i przyszłych.</p>
            </div>
          </article>
        </main>
        <AdSense
          adClient="ca-pub-8789064360135564" // Twój identyfikator AdSense
          adSlot="7166660680" // ID jednostki reklamowej
        />
        <Cookie />
      </>
    );
  }
}
export default KartaGodz;

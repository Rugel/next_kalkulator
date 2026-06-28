'use client';
import React from 'react';
import LocalStorageHelper from '../lib/localStorageClass';
import Image from 'next/image';
import Print from '../modules/print';
// import AdSense from '../modules/AdSense';
// import AdSenseInArticle from '../modules/AdSenseInArticle';
import Menu from '../modules/Menu';
import stylesList from "../components/ResultsList.module.css";
import stylesInput from "../modules/Input.module.css";
import { getMovableHolidays } from './holidays';
import styles from './page.module.css';
import CommentScrollLink from '../components/CommentScrollLink';

const data = new Date();
let rok = data.getFullYear();
let mies = data.getMonth() + 1;
mies < 10 ? mies = `0${mies}` : mies;

class KartaGodz extends React.Component {

  state = {
    inputVal: LocalStorageHelper.get('karta_inputVal', `${rok}-${mies}`),
    logo: ''
  }

  componentDidUpdate() {
    LocalStorageHelper.set('karta_inputVal', this.state.inputVal);
  }

  InputHandleChange = (e) => { this.setState({ inputVal: e.target.value }) };
  LogoHandlleChange = (e) => { const file = e.target.files[0]; this.setState({ logo: file }) };

  render() {
    const RenderImage = () => { if (this.state.logo) { const url = URL.createObjectURL(this.state.logo); return (<div className={styles.logo}><Image fill style={{ objectFit: 'scale-down' }} src={url} alt='Logo firmy na karcie ewidencji czasu pracy' /></div>) } else { return null } };

    const Title = () => <div className={styles.title}><h2>EWIDENCJA CZASU PRACY</h2></div>;
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
      const isFixedHoliday = (i === 1 && (monthStr === "styczeń" || monthStr === "maj" || monthStr === "listopad")) || (i === 6 && monthStr === "styczeń") || (i === 3 && monthStr === "maj") || (i === 15 && monthStr === "sierpień") || (i === 11 && monthStr === "listopad") || (i === 24 && monthStr === "grudzień") || (i === 25 && monthStr === "grudzień") || (i === 26 && monthStr === "grudzień");
      const isMovable = isMovableHoliday(i, month);

      if (isSunday || isFixedHoliday || isMovable) {
        table.push(<tr key={i} className={styles.holyday}><td>{i < 10 ? `0${i}` : i}.{monthPre}.{year}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>)
      }
      else if (i === sobota || i === sobota + 7 || i === sobota + 14 || i === sobota + 21 || i === sobota + 28) { table.push(<tr key={i} className={styles.saturday}><td>{i < 10 ? `0${i}` : i}.{monthPre}.{year}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>) }
      else { table.push(<tr key={i} className='normal'><td>{i < 10 ? `0${i}` : i}.{monthPre}.{year}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>) }
    };
    const Input = () => (
      <div className={stylesInput.formGroup}>
        <div className={stylesInput.inputWrapper}>
          <label htmlFor="month-input" className={stylesInput.inputLabel}>
            <em>wybierz żądany miesiąc</em>
          </label>
          <input
            id="month-input"
            type='month'
            name='input'
            onChange={this.InputHandleChange}
            value={this.state.inputVal}
            className={stylesInput.input}
          />
        </div>
      </div>
    );

    const Logo = () => (
      <div className={stylesInput.formGroup}>
        <div className={stylesInput.inputWrapper}>
          <label htmlFor="file" className={stylesInput.inputLabel}>
            <em>dodaj logo lub zdjęcie</em>
          </label>
          <input
            type="file"
            id="file"
            onChange={this.LogoHandlleChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <label
            htmlFor="file"
            className={stylesInput.input}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backgroundColor: '#f8f9fa',
              fontWeight: '500',
              color: '#495057'
            }}
          >
            {this.state.logo ? (
              <span>📁 {this.state.logo.name}</span>
            ) : (
              <span>📤 Wybierz plik...</span>
            )}
          </label>
        </div>
      </div>
    );

    const Controls = () => (
      <div className={`${stylesInput.calculatorForm} ${styles.controls}`}>
        <Input />
        <Logo />
        <div className={stylesInput.formGroup}>
          <div className={stylesInput.inputWrapper} style={{ alignItems: 'center', textAlign: 'center' }}>
            <Print />
          </div>
        </div>
      </div>
    );

    const Month = () => <div className={styles.month}><b>za miesiąc {monthStr} {year} roku</b></div>;
    const Enploy = () => <div className={styles.enploy}>
      <div className={styles.enployRow}>
        <div className={styles.enployCol}>
          <div className={styles.line}></div><span className={styles.label}>Imię i nazwisko pracownika:</span>
        </div>
        <div className={styles.enployCol}>
          <div className={styles.line}></div><span className={styles.label}>Stanowisko:</span>
        </div>
      </div>
      <div className={styles.enployRow}>
        <div className={styles.enployCol}>
          <div className={styles.line}></div><span className={styles.label}>Jednostka organizacyjna:</span>
        </div>
      </div>
    </div>
    const Rows = () => table.map((e) => e);
    const Table = () => <table className={styles.table}>
      <thead>
        <tr>
          <th rowSpan="2" className={styles.headerDate}>DATA</th>
          <th colSpan="3">GODZINY PRACY</th>
          <th colSpan="3">W TYM:</th>
          <th colSpan="2">ZWOLNIENIA I NIEOBECNOŚCI</th>
          <th rowSpan="2">UWAGI</th>
        </tr>
        <tr>
          <th className={styles.headerTime}>wejście</th>
          <th className={styles.headerTime}>wyjście</th>
          <th className={styles.headerSmall}>suma</th>
          <th className={styles.headerSmall}>noce</th>
          <th className={styles.headerSmall}>nadgodz.</th>
          <th className={styles.headerSmall}>niedz. i święta</th>
          <th className={styles.headerSmall}>rodzaj</th>
          <th className={styles.headerSmall}>wymiar</th>
        </tr>
      </thead>
      <tbody>
        <Rows />
        <tr className={styles.sumRow}>
          <td colSpan="3" className={styles.sumLabel}><b>SUMA:</b></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td colSpan="3" className={styles.noborder}></td>
        </tr>
      </tbody>
    </table>
    const Legend = () => (
      <div className={styles.legend}>
        <p><b>kody nieobecności:</b> W - dzień wolny (5-dniowy tydz. pracy), N - niedziela / święto, X - wolny z harmonogramu, U / UW - urlop wypoczynkowy, UNŻ / UŻ - na żądanie, ZO - zwolnienie okolicznościowe, UM - macierzyński, UR - rodzicielski, UO - ojcowski, UB - bezpłatny, CH - chorobowe (L4), Op - opieka, W5 - wolne za sobotę, WNŚ - wolne za niedzielę/święto, NN - nieusprawiedliwiona nieobecność, ZW - zwolnienie (nieodprac.), WP - zwolnienie do odpracowania, Dyż / Dyz - dyżur, Z - zaległości.</p>
      </div>
    );
    const Podpis = () => <div className={styles.signSection}>
      <div className={styles.signItem}>
        <hr className={styles.signHrFull} />
        <em>podpis pracownika</em>
      </div>
      <div className={styles.signItem}>
        <hr className={styles.signHrFull} />
        <em>podpis przełożonego</em>
      </div>
    </div>;
    const Wynik = () => { return (<p className="wynik" aria-live="polite">Karta godzin pracy dla:<br /><span style={{ color: '#FD5B35', fontSize: '1.5em', letterSpacing: '2px', display: 'inline-block', margin: '2px 0' }}>{monthStr} {year}</span></p>) }

    return (
      <>
        <Menu currentPage="karta_godzin" />
        <header>
          <div id="tytul">
            <h1>Karta godzin pracy</h1>
          </div>
          <Wynik />
        </header>
        {/* <AdSense
          adClient="ca-pub-8789064360135564"
          adSlot="3856131321"
        /> */}
        <main>
          <div id="printable-content" className={styles.printableWrapper}>
            <RenderImage />
            <Title />
            <Month />
            <Enploy />
            <Table />
            <Legend />
            <Podpis />
          </div>
          <Controls />
          <article className="desc">
            <h2>Karta ewidencji czasu pracy do druku – darmowy generator PDF</h2>

            <p>
              Szukasz gotowego rozwiązania do rejestrowania czasu pracy swoich pracowników? Ten darmowy generator pozwala w kilka sekund przygotować kompletną <b>kartę ewidencji czasu pracy</b>. Narzędzie zostało stworzone z myślą o pracodawcach, działach HR oraz osobach samozatrudnionych, które potrzebują rzetelnego i czytelnego dokumentu zgodnego z aktualnymi wymogami.</p>

            {/* <AdSenseInArticle adSlot={5751543216} /> */}

            <h3>Dlaczego warto wybrać tę kartę godzin pracy?</h3>
            <p>Prowadzenie ewidencji to obowiązek każdego pracodawcy, niezależnie od liczby zatrudnionych osób. Ten generator ułatwia to zadanie, oferując:</p>
            <ul>
              <li><b>Pełną czytelność:</b> Tabela została zoptymalizowana tak, aby po wydruku na formacie A4 wszystkie dane były wyraźne i uporządkowane.</li>
              <li><b>Wyróżnienie dni wolnych:</b> System automatycznie zaznacza soboty (kolor niebieski) oraz niedziele i święta (kolor czerwony), co minimalizuje ryzyko pomyłek przy wypełnianiu.</li>
              <li><b>Szczegółowe kolumny:</b> Karta zawiera pola na godziny wejścia i wyjścia, sumę przepracowanego czasu, godziny nocne, nadgodziny oraz pracę w dni wolne.</li>
              <li><b>Sekcję nieobecności:</b> Specjalne miejsce na wpisanie rodzaju i wymiaru zwolnień (np. urlop, chorobowe, opieka).</li>
            </ul>

            <h3>Ewidencja czasu pracy 2026 – co musi zawierać?</h3>
            <p>Zgodnie z przepisami prawa pracy, <b>karta godzin pracy</b> powinna odzwierciedlać faktyczny czas wykonywania zadań przez pracownika. Nasz <b>arkusz ewidencji czasu pracy PDF</b> posiada dedykowane miejsca na:</p>
            <ul>
              <li>Dokładną datę (dzień miesiąca).</li>
              <li>Godziny rozpoczęcia i zakończenia pracy.</li>
              <li>Łączną liczbę godzin przepracowanych w danej dobie.</li>
              <li>Wyszczególnienie godzin nadliczbowych oraz pracy w porze nocnej.</li>
              <li>Oznaczenie dni wolnych od pracy wraz z tytułem ich udzielenia.</li>
            </ul>

            <h3>Jak utworzyć kartę godzin pracy?</h3>
            <div >
              <ol className={stylesList.list}>
                <li><b>Wybierz okres:</b> Wskaż rok oraz miesiąc, dla którego chcesz wygenerować zestawienie.</li>
                <li><b>Personalizuj:</b> Możesz dodać logo swojej firmy, co sprawi, że dokument będzie wyglądał bardziej oficjalnie.</li>
                <li><b>Generuj i drukuj:</b> Kliknij przycisk &quot;Drukuj kartę&quot;, aby natychmiast wysłać dokument na drukarkę, lub &quot;Zapisz kartę&quot;, aby pobrać <b>plik PDF</b> na dysk.</li>
              </ol>
            </div>

            <p>Ten generator to idealne rozwiązanie, gdy potrzebna jest szybka <b>lista obecności do druku</b> lub formalna <b>karta ewidencji czasu pracy</b>. Dzięki optymalizacji wysokości i szerokości tabeli, dokument zawsze mieści się na jednej stronie, co pozwala na wygodne archiwizowanie dokumentacji pracowniczej w segregatorach.</p>

            <p>Korzystanie z tego narzędzia jest całkowicie bezpłatne. Możesz generować dowolną liczbę kart dla wszystkich swoich pracowników, mając pewność, że każda z nich będzie wyglądać profesjonalnie i estetycznie. Rzetelna dokumentacja kadrowa to podstawa bezpieczeństwa prawnego Twojej firmy.</p>
          </article>
        </main>
        {/* <AdSense
          adClient="ca-pub-8789064360135564"
          adSlot="7166660680"
        /> */}
      </>
    );
  }
}
export default KartaGodz;

'use client';
import React from 'react';
import Input from '../modules/input';
import Swal from 'sweetalert2';
import Link from 'next/link';
import Cookie from '../modules/cookies';
import StarRating from '../modules/StarRating';


class StaGodz extends React.Component {
    state = {
        brutto: 0,
        workdays: 21,
    }

    handleChangeBrutto = (e: { target: { value: number; }; }) => { if (e.target.value >= 0) { this.setState({ brutto: e.target.value }) } else { this.setState({ brutto: 0 }) } if (e.target.value < 0) { Swal.fire({ text: "Liczba nie może być ujemna", icon: 'warning' }) } }


    handleChangeWorkdays = (e: { target: { value: number; }; }) => { if (e.target.value >= 19 && e.target.value < 24) { this.setState({ workdays: e.target.value }) } else { this.setState({ workdays: 21 }) } if ((e.target.value > 2 && e.target.value < 19) || e.target.value > 23 || e.target.value < 0) { Swal.fire({ text: 'Liczba musi się mieścić w przedziale 19 - 23', icon: 'warning' }) } }

    render() {
        const { workdays, brutto } = this.state;

        //wyliczenie składek
        let ppk;
        let ppk_bru;
        ppk = Math.round(brutto * 0.02 * 100) / 100;
        ppk_bru = Math.round(brutto * 1.015 * 100) / 100;
        let zus;
        zus = Math.round(brutto * 0.1371 * 100) / 100;
        let kos_doch = 250;
        if (brutto < 250) { kos_doch = brutto }
        kos_doch = 300
        const pod_zdr = brutto - zus;
        let zdr = Math.round(pod_zdr * 0.09 * 100) / 100;

        //wyliczenie podstawy do zaliczki
        let pod_zal = ppk_bru - zus - kos_doch;

        //wyliczenie zaliczki na podatek dochodowy
        if (pod_zal < 0) { pod_zal = 0 };
        let zal_pod;
        zal_pod = Math.round(pod_zal * 0.32) - 300
        if (zal_pod < 0 && brutto <= 85528) { zal_pod = 0 };
        const pod_ppk = Math.round((ppk_bru - brutto) * 100) / 100;
        let rate: any = Math.round((brutto / workdays / 8) * 100) / 100;
        rate = rate.toString();
        rate = rate.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        rate = rate.replace('.', ',');
        const Rate = () => rate;

        const Wynik = () => { return (<p className="wynik">Stawka godzinowa brutto wynosi:<br /><span style={{ color: '#FD5B35', fontSize: '1.5em', letterSpacing: '2px' }}><Rate /></span> zł / godz</p>) }

        return (
            <div>
                <header><Wynik />
                    <div id="tytul">
                        <u><h1>Kalkulator Wynagrodzeń</h1></u><br />
                        <div className='box'>
                            <nav aria-label="breadcrumb">
                                <ul className='menu'>
                                    <li><Link href='/' >wyliczenie z godzin pracy</Link></li>
                                    <li><Link href='/brutto_netto'>przelicznik BRUTTO/NETTO</Link></li>
                                    <li><span style={{ boxShadow: '0 5px' }}>kalkulator stawki godz.</span></li>
                                    <li><Link href='/karta_godzin'>karta godzin pracy</Link></li>
                                </ul>
                                <StarRating itemId={123} />
                                {/*<Counter />*/}
                            </nav>
                        </div>
                    </div>
                </header>
                <main>
                    <section>
                        <ol id="list">
                            <li><Input name='hours' content='Podaj miesięczne wynagrodzenie brutto' method={this.handleChangeBrutto} plhld={undefined} /></li>
                            <li><Input name='rate' content='Podaj liczbę dni roboczych w danym miesiącu' plhld={21} method={this.handleChangeWorkdays} /></li>
                        </ol>
                        <section>
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
                            </div>
                        </section>
                        <article>
                            <div className='desc'>
                                <p>
                                    Przeliczanie kwoty brutto wynagrodzenia na stawkę godzinową brutto dla 40-godzinnego systemu pracy jest proste.<br /> Wystarczy podzielić miesięczne wynagrodzenie brutto przez ilość dni roboczych w miesiącu, a następnie podzielić wynik przez 8. Przykładowo, jeśli miesięczne wynagrodzenie brutto wynosi 8000 zł, a w danym miesiącu jest 20 dni roboczych, to stawka godzinowa brutto wynosi 8000 zł / 20 / 8 h = 50 zł/h.
                                </p>
                                <p>
                                    Warto zauważyć, że powyższy schemat uwzględnia tylko podstawowe składniki wynagrodzenia, takie jak podstawa, dodatki i premie. W przypadku, gdy wynagrodzenie brutto zawiera dodatkowe składniki, takie jak np. diety, należy je dodać do miesięcznego wynagrodzenia brutto przed przeliczeniem na stawkę godzinową brutto.
                                </p>
                            </div>
                        </article>
                    </section>
                </main>
                <Cookie />
            </div>
        )
    }
}
export default StaGodz;
'use client';
import React, { useState, useEffect } from 'react';
import Input from '../modules/input';
import CheckBox from '../modules/CheckBox';
import Menu from '../modules/Menu';
import AdSense from '../modules/AdSense';
import { calculateZlecenie } from '../utils/zlecenie_logic';
import DescZlecenie from '../modules/DescZlecenie';
import stylesFieldset from "../components/Fieldset.module.css";
import stylesList from "../components/ResultsList.module.css";
import stylesInput from "../modules/Input.module.css";
import CommentScrollLink from '../components/CommentScrollLink';

const ZleceniePage = () => {
    const [brutto, setBrutto] = useState(0);
    const [isStudentU26, setIsStudentU26] = useState(false);
    const [isU26, setIsU26] = useState(false);
    const [isChorobowe, setIsChorobowe] = useState(false);
    const [isPit2, setIsPit2] = useState(true); // Default Yes for PIT-2 usually? Or No. Let's start false or match main page options style. Main page defaults to false usually.
    const [costsRate50, setCostsRate50] = useState(false);
    const [results, setResults] = useState(calculateZlecenie(0, {}));

    useEffect(() => {
        const options = {
            isStudentU26,
            isU26,
            isChorobowe,
            isPit2,
            costsRate: costsRate50 ? 0.5 : 0.2
        };
        setResults(calculateZlecenie(brutto, options));
    }, [brutto, isStudentU26, isU26, isChorobowe, isPit2, costsRate50]);

    const handleBruttoChange = (e) => {
        let val = parseFloat(e.target.value);
        if (isNaN(val) || val < 0) val = 0;
        setBrutto(val);
    };

    // Format helpers
    const formatCurrency = (val) => {
        if (val === undefined || val === null) return "0.00";
        return val.toFixed(2).replace('.', ',');
    };

    const NettoDisplay = () => {
        let n = formatCurrency(results.netto);
        return <span style={{ color: 'red', fontSize: '1.5em', letterSpacing: '2px', display: 'inline-block', margin: '2px 0' }}>{n}</span>;
    };

    return (
        <>
            <header>
                <p className="wynik">Miesięczne wynagrodzenie netto:<br /><NettoDisplay /> zł<br /><CommentScrollLink /></p>
                <div id="tytul">
                    <h1>Kalkulator Umowa Zlecenie</h1>
                </div>
            </header>
            <Menu currentPage="zlecenie" />



            <main>
                <fieldset className={stylesFieldset.fieldset}>
                    <legend className={stylesFieldset.legend}><strong><u>Opcje</u></strong></legend>
                    <div className={stylesFieldset.box}>
                        <CheckBox
                            Id="studentU26"
                            OnChange={() => setIsStudentU26(!isStudentU26)}
                            Checked={isStudentU26}
                            Text="Status studenta/ucznia poniżej 26 roku życia (Zerowy ZUS i PIT)"
                        /><br /><br />

                        <CheckBox
                            Id="u26"
                            OnChange={() => setIsU26(!isU26)}
                            Checked={isU26}
                            Text="Osoba do 26 roku życia (Zerowy PIT)"
                        /><br /><br />

                        <CheckBox
                            Id="chorobowe"
                            OnChange={() => setIsChorobowe(!isChorobowe)}
                            Checked={isChorobowe}
                            Text="Dobrowolne ubezpieczenie chorobowe (ZUS)"
                        /><br /><br />

                        <CheckBox
                            Id="pit2"
                            OnChange={() => setIsPit2(!isPit2)}
                            Checked={isPit2}
                            Text="Kwota zmniejszająca podatek (PIT-2)"
                        /><br /><br />

                        <CheckBox
                            Id="copyright"
                            OnChange={() => setCostsRate50(!costsRate50)}
                            Checked={costsRate50}
                            Text="Autorskie koszty uzyskania przychodu (50%)"
                        />
                    </div>
                </fieldset>

                <section>
                    <h2 style={{ textAlign: 'center', margin: '3rem 0 0' }}>Wprowadź Dane</h2>
                    <form id="zlecenie-form" className={stylesInput.calculatorForm} onSubmit={(e) => e.preventDefault()}>
                        <div className={stylesInput.formGroup}>
                            <Input
                                name="brutto"
                                content="Kwota Brutto na umowie"
                                method={handleBruttoChange}
                                plhld={brutto || undefined}
                                number={1}
                            />
                        </div>
                    </form>

                    <article>
                        <AdSense
                            adClient="ca-pub-8789064360135564"
                            adSlot="8251150836"
                        />
                        <h2 style={{ textAlign: 'center', margin: '3rem 0 0' }}>Szczegóły Wynagrodzenia</h2>
                        <div className={stylesList.list}>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Nazwa</th>
                                        <th scope="col">Wartość</th>
                                        <th scope="col">Waluta</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>Wynagrodzenie Brutto:</td><td className={stylesList.count}>{results.brutto}</td><td>zł</td></tr>
                                    <tr><td>Ubezpieczenie Emerytalne:</td><td className={stylesList.count}>{results.emerytalne}</td><td>zł</td></tr>
                                    <tr><td>Ubezpieczenie Rentowe:</td><td className={stylesList.count}>{results.rentowe}</td><td>zł</td></tr>
                                    <tr><td>Ubezpieczenie Chorobowe:</td><td className={stylesList.count}>{results.chorobowe}</td><td>zł</td></tr>
                                    <tr><td>Suma składek ZUS:</td><td className={stylesList.count}>{results.razemZus}</td><td>zł</td></tr>
                                    <tr><td>Ubezpieczenie Zdrowotne:</td><td className={stylesList.count}>{results.zdrowotne}</td><td>zł</td></tr>
                                    <tr><td>Koszty Uzyskania Przychodu:</td><td className={stylesList.count}>{results.koszty}</td><td>zł</td></tr>
                                    <tr><td>Podstawa Opodatkowania:</td><td className={stylesList.count}>{results.podstawaOpodatkowania}</td><td>zł</td></tr>
                                    <tr><td>Zaliczka na Podatek (PIT):</td><td className={stylesList.count}>{results.podatek}</td><td>zł</td></tr>
                                    <tr><td><strong>Do Wypłaty (Netto):</strong></td><td className={stylesList.count}><strong>{results.netto}</strong></td><td>zł</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </article>
                </section>

                <DescZlecenie />
                <AdSense
                    adClient="ca-pub-8789064360135564"
                    adSlot="4009249960"
                />
            </main>
        </>
    );
};

export default ZleceniePage;

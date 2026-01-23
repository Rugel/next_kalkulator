'use client';
import React, { useState, useEffect } from 'react';
import Input from '../modules/input';
import CheckBox from '../modules/CheckBox';
import Menu from '../modules/Menu';
import AdSense from '../modules/AdSense';
import DescB2B from '../modules/DescB2B';
import { calculateB2B } from '../utils/b2b_logic';
import stylesFieldset from "../components/Fieldset.module.css";
import stylesList from "../components/ResultsList.module.css";
import stylesInput from "../modules/Input.module.css";
import CommentScrollLink from '../components/CommentScrollLink';

const B2BPage = () => {
    // State
    const [revenue, setRevenue] = useState(10000);
    const [costs, setCosts] = useState(0);
    const [taxType, setTaxType] = useState('liniowy'); // skala, liniowy, ryczalt
    const [zusVariant, setZusVariant] = useState('duzy_zus'); // ulga_start, preferencyjny, duzy_zus
    const [isChorobowe, setIsChorobowe] = useState(true);
    const [ryczaltRate, setRyczaltRate] = useState(0.12); // default 12%

    const [results, setResults] = useState(calculateB2B(0, 0, 'liniowy', {}));

    // Effect to calculate
    useEffect(() => {
        const options = {
            zusVariant,
            isChorobowe,
            ryczaltRate,
            isFp: true
        };
        const res = calculateB2B(revenue, costs, taxType, options);
        setResults(res);
    }, [revenue, costs, taxType, zusVariant, isChorobowe, ryczaltRate]);

    // Handlers
    const handleRevenue = (e) => setRevenue(parseFloat(e.target.value) || 0);
    const handleCosts = (e) => setCosts(parseFloat(e.target.value) || 0);

    const formatMoney = (val) => val ? val.toFixed(2).replace('.', ',') : "0,00";

    const ratesRyczalt = [0.17, 0.15, 0.14, 0.125, 0.12, 0.10, 0.085, 0.055, 0.03];

    return (
        <>
            <header>
                <p className="wynik">Dochód netto wynosi:<br />
                    <span style={{ color: 'red', fontSize: '1.5em', letterSpacing: '2px', display: 'inline-block', margin: '2px 0' }}>
                        {formatMoney(results.netto)}
                    </span> zł<br />
                    <CommentScrollLink />
                </p>
                <div id="tytul">
                    <u><h1>Kalkulator B2B 2026</h1></u>
                </div>
            </header>
            <Menu currentPage="b2b" />



            <main>
                <fieldset className={stylesFieldset.fieldset}>
                    <legend className={stylesFieldset.legend}><strong><u>Konfiguracja</u></strong></legend>
                    <div className={stylesFieldset.box}>

                        <label className={stylesInput.inputLabel}>Forma Opodatkowania:</label>
                        <select
                            className={stylesInput.input}
                            style={{ width: '100%', padding: '8px', marginBottom: '15px' }}
                            value={taxType}
                            onChange={(e) => setTaxType(e.target.value)}
                        >
                            <option value="skala">Zasady Ogólne (Skala Podatkowa 12%/32%)</option>
                            <option value="liniowy">Podatek Liniowy (19%)</option>
                            <option value="ryczalt">Ryczałt Ewidencjonowany</option>
                        </select>

                        {taxType === 'ryczalt' && (
                            <>
                                <label className={stylesInput.inputLabel}>Stawka Ryczałtu:</label>
                                <select
                                    className={stylesInput.input}
                                    style={{ width: '100%', padding: '8px', marginBottom: '15px' }}
                                    value={ryczaltRate}
                                    onChange={(e) => setRyczaltRate(parseFloat(e.target.value))}
                                >
                                    {ratesRyczalt.map(r => (
                                        <option key={r} value={r}>{(r * 100).toFixed(1)}%</option>
                                    ))}
                                </select>
                            </>
                        )}

                        <label className={stylesInput.inputLabel}>Składki ZUS:</label>
                        <select
                            className={stylesInput.input}
                            style={{ width: '100%', padding: '8px', marginBottom: '15px' }}
                            value={zusVariant}
                            onChange={(e) => setZusVariant(e.target.value)}
                        >
                            <option value="ulga_start">Ulga na Start (Tylko zdrowotna)</option>
                            <option value="preferencyjny">Preferencyjny ZUS (24 m-ce)</option>
                            <option value="duzy_zus">Duży ZUS (Standard)</option>
                        </select>

                        <CheckBox
                            Id="chorobowe"
                            OnChange={() => setIsChorobowe(!isChorobowe)}
                            Checked={isChorobowe}
                            Text="Dobrowolne ubezpieczenie chorobowe"
                        />
                    </div>
                </fieldset>

                <section>
                    <h2 style={{ textAlign: 'center', margin: '3rem 0 0' }}>Dane Finansowe (Miesięczne)</h2>
                    <form className={stylesInput.calculatorForm} onSubmit={e => e.preventDefault()}>
                        <div className={stylesInput.formGroup}>
                            <Input
                                name="revenue"
                                content="Przychód Netto (bez VAT)"
                                method={handleRevenue}
                                plhld={revenue}
                                number={1}
                            />
                        </div>
                        {taxType !== 'ryczalt' && (
                            <div className={stylesInput.formGroup}>
                                <Input
                                    name="costs"
                                    content="Koszty prowadzenia działalności"
                                    method={handleCosts}
                                    plhld={costs}
                                    number={2}
                                />
                            </div>
                        )}
                    </form>

                    <article>
                        <AdSense
                            adClient="ca-pub-8789064360135564"
                            adSlot="8251150836"
                        />
                        <h2 style={{ textAlign: 'center', margin: '3rem 0 0' }}>Wyniki Szczegółowe</h2>
                        <div className={stylesList.list}>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Pozycja</th>
                                        <th scope="col">Kwota</th>
                                        <th scope="col">Waluta</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>Przychód:</td><td className={stylesList.count}>{formatMoney(results.revenue)}</td><td>zł</td></tr>
                                    {taxType !== 'ryczalt' && <tr><td>Koszty:</td><td className={stylesList.count}>{formatMoney(results.costs)}</td><td>zł</td></tr>}
                                    <tr><td>Ubezpieczenie Emerytalne:</td><td className={stylesList.count}>{formatMoney(results.zus.emerytalne)}</td><td>zł</td></tr>
                                    <tr><td>Ubezpieczenie Rentowe:</td><td className={stylesList.count}>{formatMoney(results.zus.rentowe)}</td><td>zł</td></tr>
                                    <tr><td>Ubezpieczenie Chorobowe:</td><td className={stylesList.count}>{formatMoney(results.zus.chorobowe)}</td><td>zł</td></tr>
                                    <tr><td>Ubezpieczenie Wypadkowe:</td><td className={stylesList.count}>{formatMoney(results.zus.wypadkowe)}</td><td>zł</td></tr>
                                    <tr><td>Fundusz Pracy:</td><td className={stylesList.count}>{formatMoney(results.zus.fp)}</td><td>zł</td></tr>
                                    <tr><td><strong>Suma ZUS (Społeczne):</strong></td><td className={stylesList.count}><strong>{formatMoney(results.zus.total)}</strong></td><td>zł</td></tr>
                                    <tr><td>Ubezpieczenie Zdrowotne:</td><td className={stylesList.count}>{formatMoney(results.healthContribution)}</td><td>zł</td></tr>
                                    <tr><td>Podstawa Opodatkowania:</td><td className={stylesList.count}>{formatMoney(results.taxBase)}</td><td>zł</td></tr>
                                    <tr><td>Podatek Dochodowy:</td><td className={stylesList.count}>{formatMoney(results.tax)}</td><td>zł</td></tr>
                                    <tr><td><strong>Zysk Netto (Czysty dochód):</strong></td><td className={stylesList.count} style={{ color: 'green', fontSize: '1.1em' }}><strong>{formatMoney(results.netto)}</strong></td><td>zł</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </article>
                </section>

                <DescB2B />
                <AdSense
                    adClient="ca-pub-8789064360135564"
                    adSlot="4009249960"
                />
            </main>
        </>
    );
};

export default B2BPage;

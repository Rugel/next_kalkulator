'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Menu from '../modules/Menu';
import AdSense from '../modules/AdSense';
import Input from '../modules/input';
import { calculateInflation, CalculationResult, HISTORICAL_INFLATION } from '../utils/inflation_logic';
import DescInflacja from '../modules/DescInflacja';
import Swal from 'sweetalert2';
import stylesFieldset from "../components/Fieldset.module.css";
import stylesList from "../components/ResultsList.module.css";
import stylesInput from "../modules/Input.module.css";
import CommentScrollLink from '../components/CommentScrollLink';

const InflationCalculatorPage = () => {
    const [amount, setAmount] = useState(100);
    const [startYear, setStartYear] = useState(2024);
    const [endYear, setEndYear] = useState(2025);
    const [futureInflation, setFutureInflation] = useState(2.5);
    const [results, setResults] = useState<CalculationResult[]>([]);
    const [alertShown, setAlertShown] = useState(false);

    const isDenominationCrossed = useMemo(() => {
        const min = Math.min(startYear, endYear);
        const max = Math.max(startYear, endYear);
        return min < 1995 && max >= 1995;
    }, [startYear, endYear]);

    useEffect(() => {
        const res = calculateInflation(amount, startYear, endYear, futureInflation);
        setResults(res);
        // Reset alert state when start year changes
        setAlertShown(false);
    }, [amount, startYear, endYear, futureInflation]);

    const handleAmountClick = () => {
        if (startYear < 1995 && !alertShown) {
            Swal.fire({
                title: 'Uwaga!',
                text: 'Zwróć uwagę, że wprowadzasz kwotę w PLZ (tzw. „starych złotych") sprzed denominacji.',
                icon: 'warning',
                confirmButtonText: 'Rozumiem',
                confirmButtonColor: '#764ba2'
            });
            setAlertShown(true);
        }
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = parseFloat(e.target.value);
        if (isNaN(val)) val = 0;
        setAmount(val);
    };

    const handleFutureInflationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = parseFloat(e.target.value);
        if (isNaN(val)) val = 0;
        setFutureInflation(val);
    };

    const formatCurrency = (val: number) => {
        // If the value is very small (typical for pre-denomination conversions), show more decimals
        const fractionDigits = val > 0 && val < 0.1 ? 4 : 2;
        return val.toLocaleString('pl-PL', {
            minimumFractionDigits: fractionDigits,
            maximumFractionDigits: fractionDigits
        });
    };

    const getCurrencyLabel = (year: number) => {
        return year < 1995 ? 'zł (PLZ)' : 'zł (PLN)';
    };

    const yearOptions = useMemo(() => {
        const years = [];
        for (let y = 1982; y <= 2050; y++) {
            years.push(y);
        }
        return years;
    }, []);

    const finalResult = results.length > 0 ? results[results.length - 1] : null;

    const ResultDisplay = () => {
        if (!finalResult) return null;
        return (
            <span style={{ color: 'red', fontSize: '1.5em', letterSpacing: '2px', display: 'inline-block', margin: '2px 0' }}>
                {formatCurrency(finalResult.currentValue)}
            </span>
        );
    };

    return (
        <>
            <Menu currentPage="inflacja" />
            <header>
                <div id="tytul">
                    <h1>Kalkulator Inflacji</h1>
                </div>
                <p className="wynik">
                    Kwota po uwzględnieniu inflacji:<br />
                    <ResultDisplay /> {getCurrencyLabel(endYear)}
                </p>
            </header>

            <main>
                <fieldset className={stylesFieldset.fieldset}>
                    <legend className={stylesFieldset.legend}><strong><u>Konfiguracja obliczeń</u></strong></legend>
                    <div className={stylesFieldset.box}>
                        <div className={stylesInput.formGroup}>
                            <label className={stylesInput.inputLabel}>Rok początkowy (rok posiadania kwoty):</label>
                            <select
                                className={stylesInput.input}
                                value={startYear}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    const val = parseInt(e.target.value);
                                    if (val > endYear) {
                                        Swal.fire({
                                            title: 'Błąd!',
                                            text: 'Rok początkowy nie może być późniejszy niż rok końcowy.',
                                            icon: 'error',
                                            confirmButtonText: 'Rozumiem',
                                            confirmButtonColor: '#764ba2'
                                        });
                                    } else {
                                        setStartYear(val);
                                    }
                                }}
                            >
                                {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </div>

                        <div className={stylesInput.formGroup}>
                            <label className={stylesInput.inputLabel}>Rok końcowy (rok docelowy):</label>
                            <select
                                className={stylesInput.input}
                                value={endYear}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    const val = parseInt(e.target.value);
                                    if (val < startYear) {
                                        Swal.fire({
                                            title: 'Błąd!',
                                            text: 'Rok końcowy nie może być wcześniejszy niż rok początkowy.',
                                            icon: 'error',
                                            confirmButtonText: 'Rozumiem',
                                            confirmButtonColor: '#764ba2'
                                        });
                                    } else {
                                        setEndYear(val);
                                    }
                                }}
                            >
                                {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </div>

                        <div className={stylesInput.formGroup}>
                            <div onClick={handleAmountClick}>
                                <Input
                                    name="amount"
                                    content={`Kwota do przeliczenia (w ${getCurrencyLabel(startYear)})`}
                                    method={handleAmountChange}
                                    plhld={amount}
                                />
                            </div>
                        </div>
                        {startYear < 1995 && (
                            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '-1rem', marginBottom: '1rem', padding: '0 1rem' }}>
                                * Wartości dla roku {startYear} są podawane w „starych złotych" (PLZ) sprzed denominacji.
                            </p>
                        )}

                        {(startYear > 2025 || endYear > 2025) && (
                            <div className={stylesInput.formGroup}>
                                <Input
                                    name="futureInflation"
                                    content="Przewidywana inflacja roczna (%) dla lat po 2025"
                                    method={handleFutureInflationChange}
                                    plhld={futureInflation}
                                />
                            </div>
                        )}
                    </div>
                </fieldset>

                <section>
                    <article>
                        <AdSense
                            adClient="ca-pub-8789064360135564"
                            adSlot="8251150836"
                        />

                        <h2 style={{ textAlign: 'center', margin: '3rem 0 1rem' }}>Szczegółowe Wyniki</h2>

                        {finalResult && (
                            <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: '10px' }}>
                                <p style={{ fontSize: '1.1rem' }}>
                                    <strong>{formatCurrency(amount)} {getCurrencyLabel(startYear)}</strong> w roku <strong>{startYear}</strong>
                                    {endYear > startYear ? ' będzie warte ' : ' było warte '}
                                    <strong>{formatCurrency(finalResult.currentValue)} {getCurrencyLabel(endYear)}</strong> w roku <strong>{endYear}</strong>.
                                </p>
                                <p style={{ color: '#2c3e50', fontSize: '1.2rem', marginTop: '1.5rem' }}>
                                    {endYear >= startYear ? 'Skumulowana inflacja' : 'Skumulowany wzrost cen'} w tym okresie wynosi:
                                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#d32f2f', marginLeft: '0.5rem' }}>
                                        {Math.abs(((finalResult.cumulativeMultiplier - 1) * 100)).toFixed(2)}%
                                    </span>
                                    {finalResult.cumulativeMultiplier < 1 && <span style={{ fontSize: '0.9rem', color: '#666', marginLeft: '0.5rem' }}> (spadek siły nabywczej)</span>}
                                    {finalResult.cumulativeMultiplier > 1 && endYear < startYear && <span style={{ fontSize: '0.9rem', color: '#666', marginLeft: '0.5rem' }}> (w relacji do roku {endYear})</span>}
                                </p>
                            </div>
                        )}

                        {isDenominationCrossed && (
                            <div style={{ backgroundColor: '#fff4e5', padding: '1rem', borderRadius: '10px', borderLeft: '5px solid #ffa117', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#663c00' }}>
                                <strong>⚠️ Uwaga: Obliczenia uwzględniają denominację z 1995 roku.</strong><br />
                                Wybrany okres obejmuje datę 1 stycznia 1995 r., kiedy to wprowadzono nowego złotego (PLN) w relacji
                                <strong> 10 000 starych złotych (PLZ) = 1 nowy złoty (PLN)</strong>.
                                Kalkulator automatycznie przeliczył wartości, dzieląc kwoty sprzed 1995 roku przez 10 000.
                            </div>
                        )}

                        <div className={stylesList.list}>
                            <p>Tabela zmian rok po roku:</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Rok</th>
                                        <th scope="col">Inflacja (%)</th>
                                        <th scope="col">Wartość Kwoty</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.map((res: CalculationResult) => (
                                        <tr key={res.year} style={res.isPredicted ? { backgroundColor: '#fff9e6' } : {}}>
                                            <td>{res.year} {res.isPredicted ? '(prognoza)' : ''}</td>
                                            <td className={stylesList.count}>{res.inflation.toFixed(1)}%</td>
                                            <td className={stylesList.count}>{formatCurrency(res.currentValue)} {getCurrencyLabel(res.year)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </article>
                </section>

                <DescInflacja />
                <AdSense
                    adClient="ca-pub-8789064360135564"
                    adSlot="4009249960"
                />
            </main>
        </>
    );
};

export default InflationCalculatorPage;
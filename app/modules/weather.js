'use client';

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from './Weather.module.css';

import wind from '/public/icons/wind.svg';
import tempIcon from '/public/icons/temperature.svg';
import clouds from '/public/icons/clouds.svg';
import pressure from '/public/icons/pressure.svg';
import summer from '/public/icons/summer.svg';
import vision from '/public/icons/vision.svg';
import geo from '/public/icons/geo-alt.svg';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export default function Weather() {
    const [weatherData, setWeatherData] = useState({
        temp: "brak danych",
        wiatr: "brak danych",
        stan: "brak danych",
        cisnienie: "brak danych",
        clouds: "brak danych",
        visibility: "brak danych",
        time: "brak danych",
        city: "Warszawa",
        cityOk: "Warszawa",
        country: "PL",
    });

    const [coords, setCoords] = useState({ lat: null, lon: null });
    const [active, setActive] = useState(false);
    const [isLocating, setIsLocating] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Track loading state for skeleton

    const fetchWeather = useCallback(async (queryType, queryValue) => {
        const url = 'https://api.openweathermap.org/data/2.5/weather';
        let query = '';

        if (queryType === 'city') {
            query = `q=${queryValue}`;
        } else if (queryType === 'coords') {
            query = `lat=${queryValue.lat}&lon=${queryValue.lon}`;
        }

        try {
            const res = await fetch(`${url}?${query}&units=metric&lang=pl&appid=${apiKey}`);
            const dane = await res.json();

            if (dane.cod === 200) {
                setWeatherData(prev => ({
                    ...prev,
                    temp: dane.main.temp,
                    wiatr: dane.wind.speed,
                    stan: dane.weather[0].description,
                    cisnienie: dane.main.pressure,
                    visibility: dane.visibility,
                    clouds: dane.clouds.all,
                    time: new Date(dane.dt * 1000).toLocaleTimeString(),
                    cityOk: dane.name,
                    country: dane.sys.country
                }));
            }
        } catch (error) {
            console.error("Weather fetch error:", error);
        } finally {
            setIsLocating(false);
            setIsLoading(false); // Data loaded
        }
    }, []);

    // Initial fetch for default city
    useEffect(() => {
        fetchWeather('city', 'Warszawa');
    }, [fetchWeather]);

    // Fetch on city change (debounced ideally, but simple here)
    useEffect(() => {
        if (!active && weatherData.city) {
            const timer = setTimeout(() => {
                fetchWeather('city', weatherData.city);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [weatherData.city, active, fetchWeather]);

    // Fetch on coords change
    useEffect(() => {
        if (active && coords.lat && coords.lon) {
            fetchWeather('coords', coords);
        }
    }, [coords, active, fetchWeather]);

    const handleChangeCity = (e) => {
        const val = e.target.value;
        if (val.length > 0) {
            setWeatherData(prev => ({ ...prev, city: val }));
            setActive(false);
        } else {
            setWeatherData(prev => ({ ...prev, city: "Warszawa" }));
            setActive(true); // Fallback logic from original code, though slightly confusing
        }
    };

    const handleClickLocal = () => {
        if (navigator.geolocation) {
            setIsLocating(true);
            navigator.geolocation.getCurrentPosition((position) => {
                setCoords({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
                setActive(true);
                // Clear input visually if needed, though controlled input is better
                setWeatherData(prev => ({ ...prev, city: '' }));
            }, (error) => {
                console.error("Geolocation error:", error);
                setIsLocating(false);
            });
        }
    };

    // Skeleton loader component
    const SkeletonRow = () => (
        <tr>
            <td className={styles.iconCell}>
                <div style={{ width: '1.5em', height: '1.5em', backgroundColor: '#e0e0e0', borderRadius: '4px' }}></div>
            </td>
            <td>
                <div style={{ width: '100px', height: '14px', backgroundColor: '#e0e0e0', borderRadius: '4px' }}></div>
            </td>
            <td>
                <div style={{ width: '80px', height: '14px', backgroundColor: '#e0e0e0', borderRadius: '4px' }}></div>
            </td>
        </tr>
    );

    return (
        <div className={styles.weatherContainer}>
            <h2 className={styles.header}>
                Pogoda w Twoim mieście:
            </h2>

            <div className={styles.inputGroup}>
                <input
                    className={styles.cityInput}
                    type="text"
                    placeholder={weatherData.cityOk}
                    value={weatherData.city === 'Warszawa' ? '' : weatherData.city}
                    onChange={handleChangeCity}
                    autoComplete="off"
                />
                <div
                    className={styles.geoIcon}
                    onClick={!isLocating ? handleClickLocal : undefined}
                    title="Localized Weather"
                >
                    {isLocating ? (
                        <div className={styles.spinner}></div>
                    ) : (
                        <Image
                            src={geo}
                            alt="GPS"
                            width={40}
                            height={40}
                        />
                    )}
                </div>
            </div>

            {isLoading ? (
                <>
                    <h3 className={styles.subHeader}>
                        <div style={{ width: '300px', height: '16px', backgroundColor: '#e0e0e0', borderRadius: '4px', margin: '0 auto' }}></div>
                    </h3>
                    <table className={styles.weatherTable}>
                        <tbody>
                            <SkeletonRow />
                            <SkeletonRow />
                            <SkeletonRow />
                            <SkeletonRow />
                            <SkeletonRow />
                            <SkeletonRow />
                        </tbody>
                    </table>
                </>
            ) : (
                <>
                    <h3 className={styles.subHeader}>
                        Aktualna pogoda dla miasta <span className={styles.value}>{weatherData.cityOk} - {weatherData.country}</span> ({weatherData.time})
                    </h3>

                    <table className={styles.weatherTable}>
                        <tbody>
                            <tr>
                                <td className={styles.iconCell}>
                                    <Image className={styles.weatherIcon} src={summer} alt="summer" width={24} height={24} />
                                </td>
                                <td>
                                    <span className={styles.label}>Stan:</span>
                                </td>
                                <td>
                                    <span className={styles.value}>{weatherData.stan}</span>
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.iconCell}>
                                    <Image className={styles.weatherIcon} src={tempIcon} alt="temperature" width={24} height={24} />
                                </td>
                                <td>
                                    <span className={styles.label}>Temperatura:</span>
                                </td>
                                <td>
                                    <span className={styles.value}>{weatherData.temp} &#176;C</span>
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.iconCell}>
                                    <Image className={styles.weatherIcon} src={wind} alt="wind" width={24} height={24} />
                                </td>
                                <td>
                                    <span className={styles.label}>Wiatr:</span>
                                </td>
                                <td>
                                    <span className={styles.value}>{weatherData.wiatr} m/s</span>
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.iconCell}>
                                    <Image className={styles.weatherIcon} src={pressure} alt="pressure" width={24} height={24} />
                                </td>
                                <td>
                                    <span className={styles.label}>Ciśnienie:</span>
                                </td>
                                <td>
                                    <span className={styles.value}>{weatherData.cisnienie} hPa</span>
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.iconCell}>
                                    <Image className={styles.weatherIcon} src={vision} alt="visibility" width={24} height={24} />
                                </td>
                                <td>
                                    <span className={styles.label}>Widoczność:</span>
                                </td>
                                <td>
                                    <span className={styles.value}>{weatherData.visibility} m</span>
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.iconCell}>
                                    <Image className={styles.weatherIcon} src={clouds} alt="clouds" width={24} height={24} />
                                </td>
                                <td>
                                    <span className={styles.label}>Zachmurzenie:</span>
                                </td>
                                <td>
                                    <span className={styles.value}>{weatherData.clouds} %</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}
'use client';

import React, { useEffect, useState } from 'react';

function Counter() {
    const [visitCounts, setVisitCounts] = useState({ dailyCount: 0, totalCount: 0, cookie: 'not set', cookieSet: 'false' });

    useEffect(() => {
        // Pobierz liczbę odwiedzin z serwera PHP
        fetch('https://sharp-porpoise-41500.upstash.io')
            .then(response => response.json())  // Oczekujemy odpowiedzi w formacie JSON
            .then(data => {
                setVisitCounts(data);  // Ustawiamy stan komponentu na otrzymane wartości
            })
            .catch(error => console.error('Error fetching visit counts:', error));  // Obsługa błędów
    }, []);

    return (

        <fieldset className='counts'>
            <legend className="legend">użytkownicy</legend>
            <p>dzisiaj: <span style={{color:"red"}}>{visitCounts.dailyCount}</span><br/>
            ogółem: <span style={{color:"red"}}>{visitCounts.totalCount}</span></p>
        </fieldset>
    );
}

export default Counter;

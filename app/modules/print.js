import React, { useEffect, useState } from 'react';
import styles from './print.module.css';

const Print = () => {
    const [isClient, setIsClient] = useState(false);

    // Sprawdzenie, czy jesteśmy po stronie klienta
    useEffect(() => {
        setIsClient(true);
    }, []);

    const handlePrint = () => {
        if (isClient) {
            window.print();
        }
    };

    if (!isClient) return null;
    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={handlePrint}>
                🖨️ Drukuj Kartę
            </button>
            <span className={styles.text}>
                aby zapisać do pliku wybierz "Zapisz jako PDF"
            </span>
        </div>
    );
};
export default Print;

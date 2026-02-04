import React, { useEffect, useState } from 'react';
import styles from './print.module.css';
import Swal from 'sweetalert2';

const Print = ({ month, year, logo }) => {
    const [isClient, setIsClient] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    // Sprawdzenie, czy jesteśmy po stronie klienta
    useEffect(() => {
        setIsClient(true);
    }, []);

    const handlePrint = () => {
        if (isClient) {
            window.print();
        }
    };

    const handleDownload = async () => {
        if (!isClient || isGenerating) return;

        setIsGenerating(true);
        try {
            let logoBase64 = null;
            if (logo) {
                logoBase64 = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(logo);
                });
            }

            const response = await fetch('/api/generate-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    month,
                    year,
                    logo: logoBase64
                }),
            });

            if (!response.ok) {
                throw new Error('Generating PDF failed');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `karta_godzin_${month}_${year}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading PDF:', error);
            Swal.fire({
                icon: 'error',
                title: 'Błąd',
                text: 'Nie udało się wygenerować pliku PDF. Spróbuj ponownie później.'
            });
        } finally {
            setIsGenerating(false);
        }
    };

    if (!isClient) return null;
    return (
        <div className={styles.container}>
            <div className={styles.buttonWrapper}>
                <button className={styles.button} onClick={handlePrint}>
                    🖨️ Drukuj Kartę
                </button>
                <button
                    className={`${styles.button} ${styles.downloadButton}`}
                    onClick={handleDownload}
                    disabled={isGenerating}
                >
                    {isGenerating ? '⏳ Generowanie...' : '💾 Pobierz na dysk'}
                </button>
            </div>
            <span className={styles.text}>
                aby zapisać do pliku wybierz &quot;Zapisz jako PDF&quot;
            </span>
        </div>
    );
};
export default Print;


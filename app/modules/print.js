import React, { useEffect, useState } from 'react';
import styles from './print.module.css';
import Swal from 'sweetalert2';

const Print = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handlePrint = () => {
        if (isClient) {
            window.print();
        }
    };

    const handleDownload = async () => {
        if (!isClient) return;

        const html2pdf = (await import('html2pdf.js')).default;
        const originalElement = document.getElementById('printable-content');
        if (!originalElement) {
            Swal.fire({ text: 'Nie znaleziono elementu do wydruku', icon: 'error' });
            return;
        }

        const month = document.getElementById('miesiac')?.innerText || 'karta';
        const year = document.getElementById('rok')?.innerText || '';

        const opt = {
            margin: [10, 20, 10, 20],
            filename: `karta_godzin_${month}_${year}.pdf`,
            image: { type: 'jpeg', quality: 1.0 },
            html2canvas: {
                scale: 3, // Reduced from 4 for better Chrome stability while keeping high sharpness
                useCORS: true,
                letterRendering: true,
                windowWidth: 1024, // Force desktop-like width even on mobile devices
                onclone: (clonedDoc) => {
                    // Remove all iframes to avoid SecurityErrors and capture issues
                    const iframes = clonedDoc.querySelectorAll('iframe, .adsbygoogle, ins');
                    iframes.forEach(el => el.remove());

                    const element = clonedDoc.getElementById('printable-content');
                    if (element) {
                        element.classList.add('pdf-version');
                        element.style.width = '715px';
                        element.style.minWidth = '715px';
                        element.style.maxWidth = '715px';
                        element.style.height = '1011px'; // A4 height
                        element.style.display = 'flex';
                        element.style.flexDirection = 'column';
                        element.style.justifyContent = 'center';
                        element.style.alignItems = 'center';
                        element.style.backgroundColor = 'white';
                        element.style.overflow = 'hidden';
                        element.style.margin = '0 auto';
                        element.style.visibility = 'visible';
                        element.style.opacity = '1';

                        // Fix logo aspect ratio in the clone (keep original positioning)
                        const logoElement = element.querySelector('[class*="logo"]');
                        if (logoElement) {
                            logoElement.style.height = '32px';
                            logoElement.style.width = 'auto';
                        }
                    }
                }
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        try {
            await html2pdf().from(originalElement).set(opt).save();
        } catch (error) {
            console.error('Błąd podczas generowania PDF:', error);
            Swal.fire({ text: 'Wystąpił błąd podczas generowania pliku PDF', icon: 'error' });
        }
    };

    if (!isClient) return null;

    return (
        <div className={styles.container}>
            <div className={styles.buttonWrapper}>
                <button className={styles.button} onClick={handlePrint}>
                    🖨️ Drukuj Kartę
                </button>
                <button className={`${styles.button} ${styles.downloadButton}`} onClick={handleDownload}>
                    💾 Zapisz kartę
                </button>
            </div>
        </div>
    );
};

export default Print;

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

    const handleDownload = async () => {
        if (!isClient) return;

        const html2pdf = (await import('html2pdf.js')).default;
        const element = document.getElementById('printable-content');

        if (!element) return;

        // Force a specific width for the capture to ensure layout consistency
        const originalWidth = element.style.width;
        const originalMaxWidth = element.style.maxWidth;
        const originalPadding = element.style.padding;
        const originalOverflow = element.style.overflow;

        // A4 at 96dpi is ~794px. 210mm wide.
        // 715px represents ~189mm, leaving ~10mm margins on both sides.
        element.style.width = '715px';
        element.style.maxWidth = '715px';
        element.style.padding = '0'; // Removed 10px padding to fix logo alignment
        element.style.backgroundColor = 'white';
        element.style.overflow = 'hidden';

        // Ensure all children also respect the width and increase row height
        const children = element.querySelectorAll('*');
        const originalChildStyles = [];
        children.forEach((child, index) => {
            originalChildStyles[index] = {
                maxWidth: child.style.maxWidth,
                width: child.style.width,
                height: child.style.height,
                paddingTop: child.style.paddingTop,
                paddingBottom: child.style.paddingBottom,
                lineHeight: child.style.lineHeight,
                marginTop: child.style.marginTop,
                objectFit: child.style.objectFit
            };

            if (child.offsetWidth > 715) {
                child.style.maxWidth = '100%';
                child.style.width = '100%';
            }

            // Fix logo aspect ratio and container height
            if (child.className && typeof child.className === 'string' && child.className.includes('logo')) {
                child.style.height = 'auto';
                child.style.maxHeight = '150px'; // Limit max height to prevent page break issues
            }
            if (child.tagName === 'IMG') {
                child.style.objectFit = 'contain';
                child.style.height = 'auto';
                child.style.position = 'relative'; // Switch from absolute (fill) to relative for better capture
            }

            // Increase vertical space for table cells
            if (child.tagName === 'TD' || child.tagName === 'TH') {
                child.style.paddingTop = '1px'; // Reduced to 1px as requested
                child.style.paddingBottom = '1px';
                child.style.lineHeight = '1.2';
            }

            // Add margin to the table itself
            if (child.tagName === 'TABLE') {
                child.style.marginTop = '30px';
            }
        });

        const opt = {
            margin: [10, 10, 10, 10],
            filename: 'karta_godzin.pdf',
            image: { type: 'jpeg', quality: 1.0 },
            html2canvas: {
                scale: 3, // High resolution
                useCORS: true,
                logging: false,
                letterRendering: true,
                windowWidth: 715,
                scrollX: 0,
                scrollY: 0,
                x: 0,
                y: 0
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        try {
            await html2pdf().from(element).set(opt).save();
        } finally {
            // Restore children styles
            children.forEach((child, index) => {
                const styles = originalChildStyles[index];
                child.style.maxWidth = styles.maxWidth;
                child.style.width = styles.width;
                child.style.height = styles.height;
                child.style.paddingTop = styles.paddingTop;
                child.style.paddingBottom = styles.paddingBottom;
                child.style.lineHeight = styles.lineHeight;
                child.style.marginTop = styles.marginTop;
                child.style.objectFit = styles.objectFit;
            });
            // Restore original styles
            element.style.width = originalWidth;
            element.style.maxWidth = originalMaxWidth;
            element.style.padding = originalPadding;
            element.style.backgroundColor = '';
            element.style.overflow = originalOverflow;
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
                    💾 Pobierz na dysk
                </button>
            </div>
            <span className={styles.text}>
                aby zapisać do pliku wybierz &quot;Zapisz jako PDF&quot;
            </span>
        </div>
    );
};
export default Print;

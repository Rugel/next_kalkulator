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
        const originalElement = document.getElementById('printable-content');

        if (!originalElement) return;

        // Create a hidden container for the clone to avoid layout shifts on mobile
        const hiddenContainer = document.createElement('div');
        hiddenContainer.style.position = 'fixed';
        hiddenContainer.style.left = '-9999px';
        hiddenContainer.style.top = '0';
        hiddenContainer.style.width = '715px';
        document.body.appendChild(hiddenContainer);

        // Clone the element
        const element = originalElement.cloneNode(true);
        hiddenContainer.appendChild(element);

        // Add a class to allow specific PDF styling in CSS
        element.classList.add('pdf-version');

        // Force a specific width for the capture to ensure layout consistency
        element.style.width = '715px';
        element.style.minWidth = '715px';
        element.style.maxWidth = '715px';
        element.style.backgroundColor = 'white';
        element.style.overflow = 'hidden';

        // Fix logo aspect ratio and container height in the clone
        const logoElement = element.querySelector('[class*="logo"]');
        if (logoElement) {
            const logoImage = logoElement.querySelector('img');
            if (logoImage) {
                // Make image relative so 'auto' height on container works
                logoImage.style.position = 'relative';
                // Remove forced 100% height which caused distortion when combined with width constraints
                logoImage.style.height = 'auto';
                logoImage.style.width = 'auto';
                logoImage.style.maxWidth = '100%';
                logoImage.style.maxHeight = '100%';
                logoImage.style.objectFit = 'contain';
            }

            // Now we can safely set auto to let the container expand to the image
            logoElement.style.height = '150px';
            logoElement.style.maxHeight = '150px';
        }

        const opt = {
            margin: [5, 10, 10, 10],
            filename: 'karta_godzin.pdf',
            image: { type: 'jpeg', quality: 1.0 },
            html2canvas: {
                scale: 2, // Consistent resolution
                useCORS: true,
                logging: false,
                letterRendering: true,
                windowWidth: 715,
                width: 715, // Explicitly set capture width
                scrollX: 0,
                scrollY: 0,
                x: 0,
                y: 0,
                devicePixelRatio: 1 // Force consistent pixel ratio
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        try {
            await html2pdf().from(element).set(opt).save();
        } finally {
            // Clean up the hidden container
            if (document.body.contains(hiddenContainer)) {
                document.body.removeChild(hiddenContainer);
            }
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

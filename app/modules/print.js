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

        // Add a class to allow specific PDF styling in CSS
        element.classList.add('pdf-version');

        // Force a specific width for the capture to ensure layout consistency
        const originalWidth = element.style.width;
        const originalMaxWidth = element.style.maxWidth;
        const originalBackgroundColor = element.style.backgroundColor;
        const originalOverflow = element.style.overflow;

        // A4 at 96dpi is ~794px. 210mm wide.
        // 715px represents ~189mm, leaving ~10mm margins on both sides.
        element.style.width = '715px';
        element.style.maxWidth = '715px';
        element.style.backgroundColor = 'white';
        element.style.overflow = 'hidden';

        // Fix logo aspect ratio and container height if needed, but rely mostly on CSS
        const logoElement = element.querySelector('[class*="logo"]');
        let originalLogoStyle = null;
        let logoImage = null;
        let originalLogoImageStyle = null;

        if (logoElement) {
            originalLogoStyle = {
                height: logoElement.style.height,
                maxHeight: logoElement.style.maxHeight
            };

            // Check for the image inside
            logoImage = logoElement.querySelector('img');
            if (logoImage) {
                originalLogoImageStyle = {
                    position: logoImage.style.position,
                    height: logoImage.style.height,
                    width: logoImage.style.width,
                    objectFit: logoImage.style.objectFit
                };
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
            margin: [10, 10, 10, 10],
            filename: 'karta_godzin.pdf',
            image: { type: 'jpeg', quality: 1.0 },
            html2canvas: {
                scale: 3, // High resolution
                useCORS: true,
                logging: false,
                letterRendering: true,
                windowWidth: 715,
                width: 715, // Explicitly set capture width
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
            // Restore logo styles
            if (logoElement && originalLogoStyle) {
                logoElement.style.height = originalLogoStyle.height;
                logoElement.style.maxHeight = originalLogoStyle.maxHeight;
            }
            if (logoImage && originalLogoImageStyle) {
                logoImage.style.position = originalLogoImageStyle.position;
                logoImage.style.height = originalLogoImageStyle.height;
                logoImage.style.width = originalLogoImageStyle.width;
                logoImage.style.objectFit = originalLogoImageStyle.objectFit;
            }

            // Restore original styles
            element.classList.remove('pdf-version');
            element.style.width = originalWidth;
            element.style.maxWidth = originalMaxWidth;
            element.style.backgroundColor = originalBackgroundColor;
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
                    💾 Zapisz kartę
                </button>
            </div>
        </div>
    );
};
export default Print;

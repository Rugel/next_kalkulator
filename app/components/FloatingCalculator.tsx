'use client';

import React, { useState, useEffect } from 'react';
import ScientificCalculator from './ScientificCalculator';
import styles from './FloatingCalculator.module.css';

export default function FloatingCalculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= (document.documentElement.scrollHeight - 1);
      setIsBottom(atBottom);
      try {
        // Toggle class directly on .wynik elements to hide them at bottom
        const targets = Array.from(document.querySelectorAll('.wynik, [id="wynik"], [class*="wynik"]'));
        targets.forEach((el: Element) => {
          el.classList.toggle('fc-hide-wynik', atBottom);
        });
      } catch (e) {
        /* ignore in non-browser env */
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      try {
        const targets = Array.from(document.querySelectorAll('.wynik, [id="wynik"], [class*="wynik"]'));
        targets.forEach((el: Element) => {
          el.classList.remove('fc-hide-wynik');
        });
      } catch (e) {
        /* ignore */
      }
    };
  }, []);

  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : styles.backdropClosed}`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      <div
        className={`${styles.panel} ${isOpen ? styles.panelOpen : styles.panelClosed}`}
      >
        <ScientificCalculator />
      </div>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Calculator"
        aria-expanded={isOpen}
      title="Kalkulator — stawka-godzinowa.pl"
      className={`${styles.fab} ${isOpen ? styles.fabOpen : ''} ${isBottom ? styles.fabHidden : ''}`}
    >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
            <line x1="8" y1="6" x2="16" y2="6"></line>
            <line x1="16" y1="14" x2="16" y2="14.01"></line>
            <line x1="12" y1="14" x2="12" y2="14.01"></line>
            <line x1="8" y1="14" x2="8" y2="14.01"></line>
            <line x1="16" y1="18" x2="16" y2="18.01"></line>
            <line x1="12" y1="18" x2="12" y2="18.01"></line>
            <line x1="8" y1="18" x2="8" y2="18.01"></line>
            <line x1="16" y1="10" x2="16" y2="10.01"></line>
            <line x1="12" y1="10" x2="12" y2="10.01"></line>
            <line x1="8" y1="10" x2="8" y2="10.01"></line>
          </svg>
        )}
      </button>
    </>
  );
}

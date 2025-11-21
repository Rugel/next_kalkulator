'use client';
import React from 'react';
import Link from 'next/link';
import styles from './Menu.module.css';

interface MenuProps {
  currentPage: 'stawka' | 'brutto_netto' | 'godziny' | 'karta_godzin';
}

const Menu: React.FC<MenuProps> = ({ currentPage }) => {
  const menuItems = [
    { id: 'stawka', label: 'Kalkulator stawki godz.', href: '/' },
    { id: 'brutto_netto', label: 'Przelicznik BRUTTO/NETTO', href: '/brutto_netto' },
    { id: 'godziny', label: 'Wyliczenie z godzin pracy', href: '/godziny' },
    { id: 'karta_godzin', label: 'Karta godzin pracy', href: '/karta_godzin' },
  ];

  return (
    <div className={styles.container}>
      <nav className={styles.nav} aria-label="Main navigation">
        <ul className={styles.list}>
          {menuItems.map((item) => (
            <li key={item.id} className={styles.item}>
              {currentPage === item.id ? (
                <span className={styles.active}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;


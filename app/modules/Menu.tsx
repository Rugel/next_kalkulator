'use client';
import React from 'react';
import Link from 'next/link';
import styles from './Menu.module.css';
import { useSpinner } from '../components/GlobalSpinner';

interface MenuProps {
  currentPage: 'stawka' | 'brutto_netto' | 'godziny' | 'karta_godzin';
}

const Menu: React.FC<MenuProps> = ({ currentPage }) => {
  const { showSpinner } = useSpinner();

  const menuItems = [
    { id: 'godziny', label: 'Wyliczenie z godzin pracy', href: '/' },
    { id: 'brutto_netto', label: 'Przelicznik BRUTTO/NETTO', href: '/brutto_netto' },
    { id: 'stawka', label: 'Kalkulator stawki godz.', href: '/kalkulator_stawki' },
    { id: 'karta_godzin', label: 'Karta godzin pracy', href: '/karta_godzin' },
  ];

  const [isHamburgerMode, setIsHamburgerMode] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) {
        if (window.scrollY > 100) {
          setIsHamburgerMode(true);
        } else {
          setIsHamburgerMode(false);
          setIsMenuOpen(false);
        }
      } else {
        setIsHamburgerMode(false);
        setIsMenuOpen(false);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleNavigation = (itemId: string) => {
    if (currentPage !== itemId) {
      showSpinner();
    }
    if (isHamburgerMode) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className={`${styles.container} ${isHamburgerMode ? styles.hamburgerContainer : ''}`}>
      <nav className={styles.nav} aria-label="Main navigation">
        {isHamburgerMode && (
          <button
            className={`${styles.hamburgerButton} ${isMenuOpen ? styles.hamburgerActive : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        )}
        <ul className={`${styles.list} ${isHamburgerMode ? (isMenuOpen ? styles.mobileOpen : styles.mobileHidden) : ''}`}>
          {menuItems.map((item) => (
            <li key={item.id} className={styles.item}>
              {currentPage === item.id ? (
                <span className={styles.active}>
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={styles.link}
                  onClick={() => handleNavigation(item.id)}
                >
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


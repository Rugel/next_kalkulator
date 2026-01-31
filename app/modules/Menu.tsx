'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Menu.module.css';
import { useSpinner } from '../components/GlobalSpinner';

interface MenuProps {
  currentPage: 'stawka' | 'brutto_netto' | 'godziny' | 'karta_godzin' | 'zlecenie' | 'b2b';
}

const Menu: React.FC<MenuProps> = ({ currentPage }) => {
  const { showSpinner } = useSpinner();

  const menuItems = [
    { id: 'stawka', label: 'Kalkulator stawki godz. (UoP)', href: '/' },
    { id: 'godziny', label: 'Wyliczenie z godzin pracy (UoP)', href: '/wyliczenie_z_godzin' },
    { id: 'brutto_netto', label: 'Przelicznik BRUTTO/NETTO (UoP)', href: '/brutto_netto' },
    { id: 'zlecenie', label: 'Umowa Zlecenie', href: '/kalkulator-umowy-zlecenie' },
    { id: 'b2b', label: 'Kalkulator B2B', href: '/kalkulator-b2b' },
    { id: 'karta_godzin', label: 'Karta godzin pracy', href: '/karta_godzin' },
  ];

  const [isSticky, setIsSticky] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Show sticky hamburger when the static menu is scrolled out of view
        if (rect.bottom < 0) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
          setIsMenuOpen(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavigation = (itemId: string) => {
    if (currentPage !== itemId) {
      showSpinner();
    }
    setIsMenuOpen(false);
  };

  const NavContent = ({ isMobileStyle = false }: { isMobileStyle?: boolean }) => (
    <ul className={`${styles.list} ${isMobileStyle ? (isMenuOpen ? styles.mobileOpen : styles.mobileHidden) : ''}`}>
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
  );

  return (
    <>
      {/* Static Menu - Always visible at top of its position */}
      <div ref={containerRef} className={styles.container}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logoLink} onClick={() => handleNavigation('stawka')}>
            <Image
              src="/logo.webp"
              alt="Stawka Godzinowa"
              width={200}
              height={50}
              priority
              className={styles.logo}
            />
          </Link>
        </div>
        <nav className={styles.nav} aria-label="Main navigation">
          <NavContent />
        </nav>
      </div>

      {/* Sticky Hamburger - Visible only when scrolled past the static menu */}
      {isSticky && (
        <div className={styles.stickyContainer}>
          <nav className={styles.nav} aria-label="Sticky navigation">
            <button
              className={`${styles.hamburgerButton} ${isMenuOpen ? styles.hamburgerActive : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
            </button>
            <NavContent isMobileStyle={true} />
          </nav>
        </div>
      )}
    </>
  );
};

export default Menu;


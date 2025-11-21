'use client';
import React from 'react';
import Link from 'next/link';
import StarRating from './StarRating';

interface MenuProps {
  currentPage: 'stawka' | 'brutto_netto' | 'godziny' | 'karta_godzin';
}

const Menu: React.FC<MenuProps> = ({ currentPage }) => {
  return (
    <div className='box'>
      <nav aria-label="breadcrumb">
        <ul className='menu'>
          <li>
            {currentPage === 'stawka' ? (
              <span style={{ boxShadow: '0 5px' }}>kalkulator stawki godz.</span>
            ) : (
              <Link href='/'>kalkulator stawki godz.</Link>
            )}
          </li>
          <li>
            {currentPage === 'brutto_netto' ? (
              <span style={{ boxShadow: '0 5px' }}>przelicznik BRUTTO/NETTO</span>
            ) : (
              <Link href='/brutto_netto'>przelicznik BRUTTO/NETTO</Link>
            )}
          </li>
          <li>
            {currentPage === 'godziny' ? (
              <span style={{ boxShadow: '0 5px' }}>wyliczenie z godzin pracy</span>
            ) : (
              <Link href='/godziny'>wyliczenie z godzin pracy</Link>
            )}
          </li>
          <li>
            {currentPage === 'karta_godzin' ? (
              <span style={{ boxShadow: '0 5px' }}>karta godzin pracy</span>
            ) : (
              <Link href='/karta_godzin'>karta godzin pracy</Link>
            )}
          </li>
        </ul>
        <StarRating itemId={123} />
      </nav>
    </div>
  );
};

export default Menu;


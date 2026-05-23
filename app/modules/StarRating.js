"use client";

import { useState, useEffect, useCallback, useId } from 'react';
import styles from './StarRating.module.css';
import Swal from 'sweetalert2';

const STAR_EMPTY = '#e2e8f0';
const STAR_GOLD = '#c9a227';
const STAR_GOLD_LIGHT = '#e8c54a';
const STAR_STROKE_EMPTY = '#cbd5e1';
const STAR_STROKE_FILL = '#a8891f';

const StarIcon = ({ percentage, id }) => {
  const filled = percentage > 0;
  return (
    <svg
      className={styles.starIcon}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={STAR_GOLD_LIGHT} />
          <stop offset={`${percentage}%`} stopColor={STAR_GOLD} />
          <stop offset={`${percentage}%`} stopColor={STAR_EMPTY} />
          <stop offset="100%" stopColor={STAR_EMPTY} />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${id})`}
        stroke={filled ? STAR_STROKE_FILL : STAR_STROKE_EMPTY}
        strokeWidth="1.25"
        strokeLinejoin="round"
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  );
};

export default function StarRating({ itemId }) {
  const [hoverRating, setHoverRating] = useState(0);
  const [average, setAverage] = useState('0.0');
  const [votes, setVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [isIncognito, setIsIncognito] = useState(false);
  const [isCheckingIncognito, setIsCheckingIncognito] = useState(true);
  const componentId = useId();

  useEffect(() => {
    if (typeof window !== 'undefined' && itemId) {
      const voted = localStorage.getItem(`voted:${itemId}`) === 'true';
      setHasVoted(voted);

      const savedRating = parseInt(localStorage.getItem(`rating:${itemId}`) || '0', 10);
      if (voted && savedRating > 0) {
        setUserRating(savedRating);
      }

      detectIncognito().then((result) => {
        setIsIncognito(result);
        setIsCheckingIncognito(false);
      });
    }
  }, [itemId]);

  const detectIncognito = async () => {
    try {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        const { quota } = await navigator.storage.estimate();
        if (quota < 1200000000) return true;
      }
      return false;
    } catch (e) {
      console.error('[Incognito Check] Error:', e);
      return false;
    }
  };

  const fetchRating = useCallback(async () => {
    try {
      const res = await fetch(`/api/rating/${itemId}`);
      if (!res.ok) throw new Error('Failed to fetch rating');
      const data = await res.json();
      setAverage(data.average || '0.0');
      setVotes(Number(data.votes) || 0);
    } catch (error) {
      console.error('Error fetching rating:', error);
    }
  }, [itemId]);

  useEffect(() => {
    if (itemId) {
      fetchRating();
    }
  }, [itemId, fetchRating]);

  const handleRating = async (value) => {
    if (isCheckingIncognito) return;

    if (hasVoted) {
      Swal.fire({
        title: 'Już zagłosowałeś!',
        text: 'Możesz oddać głos tylko raz na tę aplikację.',
        icon: 'info',
        confirmButtonText: 'Rozumiem'
      });
      return;
    }

    if (isIncognito) {
      Swal.fire({
        title: 'Tryb Incognito',
        text: 'Głosowanie w trybie incognito jest niedostępne. Proszę przełączyć się na normalny tryb przeglądarki.',
        icon: 'warning',
        confirmButtonText: 'Rozumiem'
      });
      return;
    }

    const result = await Swal.fire({
      title: 'Potwierdzenie',
      text: `Czy na pewno chcesz ocenić aplikację na ${value} gwiazdek?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0d7a6b',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Tak, oceń!',
      cancelButtonText: 'Anuluj'
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/rating/${itemId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: value }),
      });

      if (res.ok) {
        await fetchRating();
        setHasVoted(true);
        setUserRating(value);
        if (typeof window !== 'undefined') {
          localStorage.setItem(`voted:${itemId}`, 'true');
          localStorage.setItem(`rating:${itemId}`, String(value));
        }
        Swal.fire({
          title: 'Dziękujemy!',
          text: 'Twój głos został zapisany.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#0d7a6b',
        });
      } else {
        throw new Error('Failed to submit rating');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      Swal.fire({
        title: 'Błąd!',
        text: 'Wystąpił problem podczas zapisywania głosu.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  if (!itemId) return null;

  const displayAverage = hoverRating > 0 && !hasVoted
    ? hoverRating.toFixed(1)
    : average;

  const votesLabel = votes === 1 ? '1 głos' : `${votes} głosów`;

  return (
    <div className={styles.ratingContainer}>
      <h2 className={`${styles.header} ${hasVoted ? styles.headerVoted : ''}`}>
        {hasVoted ? 'Dziękujemy za ocenę!' : 'Oceń aplikację'}
      </h2>

      <div className={styles.body}>
        <div className={styles.scoreBlock}>
          <span className={styles.scoreValue}>{displayAverage}</span>
          <div className={styles.scoreMeta}>
            <span className={styles.scoreMax}>na 5</span>
            <span className={styles.votesCount}>{votesLabel}</span>
          </div>
        </div>

        <div className={styles.starsColumn}>
          <p className={`${styles.starsHint} ${hoverRating > 0 && !hasVoted ? styles.starsHintActive : ''}`}>
            {isCheckingIncognito
              ? 'Ładowanie…'
              : hasVoted
                ? `Twoja ocena: ${userRating} ★`
                : hoverRating > 0
                  ? `${hoverRating} z 5 gwiazdek`
                  : 'Kliknij gwiazdkę'}
          </p>

          <div
            className={`${styles.stars} ${!hasVoted && !isCheckingIncognito ? styles.starsInteractive : ''}`}
            onMouseLeave={() => setHoverRating(0)}
            role="group"
            aria-label="Ocena w gwiazdkach od 1 do 5"
          >
            {[1, 2, 3, 4, 5].map((star, index) => {
              let displayValue = 0;
              if (hoverRating > 0 && !hasVoted) {
                displayValue = hoverRating >= star ? 100 : 0;
              } else {
                const ratingValue = parseFloat(average) || 0;
                if (ratingValue >= star) {
                  displayValue = 100;
                } else if (ratingValue > star - 1) {
                  displayValue = (ratingValue - (star - 1)) * 100;
                }
              }

              const gradientId = `star-${componentId}-${index}`;
              const isPreview = !hasVoted && hoverRating >= star;

              return (
                <button
                  key={star}
                  type="button"
                  className={`${styles.starBtn} ${isPreview ? styles.starBtnPreview : ''}`}
                  onClick={() => handleRating(star)}
                  onMouseEnter={() => !hasVoted && setHoverRating(star)}
                  disabled={isCheckingIncognito}
                  aria-label={`Oceń na ${star} gwiazdek`}
                  style={{
                    opacity: isCheckingIncognito ? 0.45 : 1,
                    cursor: isCheckingIncognito ? 'wait' : hasVoted ? 'default' : 'pointer',
                  }}
                >
                  <StarIcon percentage={displayValue} id={gradientId} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {hasVoted && userRating > 0 && (
        <p className={styles.thankYou}>
          Twoja opinia pomaga nam ulepszać kalkulator.
        </p>
      )}
    </div>
  );
}

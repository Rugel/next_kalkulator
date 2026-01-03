"use client";

import { useState, useEffect, useCallback, useId } from 'react';
import styles from './StarRating.module.css';
import Swal from 'sweetalert2';

const StarIcon = ({ percentage, id }) => (
  <svg
    className={styles.starIcon}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id={id}>
        <stop offset={`${percentage}%`} stopColor="#FFD700" />
        <stop offset={`${percentage}%`} stopColor="transparent" />
      </linearGradient>
    </defs>
    <path
      fill={`url(#${id})`}
      stroke="#999"
      strokeWidth="1.5"
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
    />
  </svg>
);

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
        console.log(`[Incognito Check] Storage Quota: ${quota} bytes (${(quota / 1024 / 1024).toFixed(2)} MB)`);

        // Improved heuristic for modern browsers (Chrome/Edge):
        // Incognito mode often caps quota significantly lower than normal mode.
        // While old limits were ~120MB, newer versions might go up to ~2GB or 10% of disk.
        // However, normal profiles usually have tens or hundreds of GBs available.
        // We set a threshold of 1.2GB (1,200,000,000 bytes).
        // If quota is less than this, we assume Incognito/Private.
        if (quota < 1200000000) return true;
      } else {
        console.log('[Incognito Check] Storage API not available');
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
    if (isCheckingIncognito) return; // Wait for check to complete

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
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
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
        }
        Swal.fire({
          title: 'Dziękujemy!',
          text: 'Twój głos został zapisany.',
          icon: 'success',
          confirmButtonText: 'OK'
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

  return (
    <div className={styles.ratingContainer}>
      <h2 className={styles.header}>
        {hasVoted ? "Dziękujemy za ocenę!" : "Oceń aplikację:"}
      </h2>

      <div className={styles.stars} onMouseLeave={() => setHoverRating(0)}>
        {[1, 2, 3, 4, 5].map((star, index) => {
          // Determine the value to display
          let displayValue = 0;
          if (hoverRating > 0 && !hasVoted) {
            // When hovering, show full stars up to the hovered one
            displayValue = hoverRating >= star ? 100 : 0;
          } else {
            // Otherwise show the average (or 0 if no votes yet)
            const ratingValue = parseFloat(average) || 0;
            if (ratingValue >= star) {
              displayValue = 100;
            } else if (ratingValue > star - 1) {
              displayValue = (ratingValue - (star - 1)) * 100;
            } else {
              displayValue = 0;
            }
          }

          const gradientId = `star-${componentId}-${index}`;

          return (
            <button
              key={star}
              className={styles.starBtn}
              onClick={() => handleRating(star)}
              onMouseEnter={() => !hasVoted && setHoverRating(star)}
              // disabled={hasVoted} // Removed disabled to allow clicking and showing the alert
              aria-label={`Oceń na ${star} gwiazdek`}
              style={{ opacity: isCheckingIncognito ? 0.5 : 1, cursor: isCheckingIncognito ? 'wait' : 'pointer' }}
            >
              <StarIcon percentage={displayValue} id={gradientId} />
            </button>
          );
        })}
      </div>

      <p className={styles.stats}>
        Średnia: <b>{average}</b> ({votes} głosów)
      </p>
    </div>
  );
}
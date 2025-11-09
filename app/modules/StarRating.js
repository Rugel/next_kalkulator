"use client";

import { useState, useEffect, useCallback } from 'react';
import styles from './StarRating.module.css';

export default function StarRating({ itemId }) {
  const [rating, setRating] = useState(0); // Ocena przy hoverze przed głosowaniem
  const [average, setAverage] = useState('0.0'); // Średnia z API
  const [votes, setVotes] = useState(0); // Liczba głosów
  const [hasVoted, setHasVoted] = useState(false); // Domyślnie false, ustawimy w useEffect

  // Inicjalizacja hasVoted z localStorage tylko po stronie klienta
  useEffect(() => {
    if (typeof window !== 'undefined' && itemId) {
      const voted = localStorage.getItem(`voted:${itemId}`) === 'true';
      setHasVoted(voted);
    }
  }, [itemId]);

  // Pobieranie danych z API

  const fetchRating = useCallback( async () => {
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
    if (hasVoted || !itemId || (typeof window !== 'undefined' && localStorage.getItem(`voted:${itemId}`) === 'true')) {
      return;
    }

    try {
      const res = await fetch(`/api/rating/${itemId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: value }),
      });

      if (res.ok) {
        await fetchRating();
        setHasVoted(true);
        setRating(value);
        if (typeof window !== 'undefined') {
          localStorage.setItem(`voted:${itemId}`, 'true');
        }
      } else {
        throw new Error('Failed to submit rating');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const getStarFill = (star, currentValue) => {
    if (currentValue >= star) {
      return '100%'; // Pełna gwiazdka
    } else if (currentValue >= star - 1) {
      const decimalPart = currentValue - (star - 1);
      return `${decimalPart * 100}%`; // Częściowe wypełnienie
    } else {
      return '0%'; // Pusta gwiazdka
    }
  };

  if (!itemId) {
    return <div>Brak ID elementu</div>;
  }

  return (
    <div className={styles.ratingContainer}>
      <div className={styles.stars}>
        <h5>Oceń aplikację:</h5>
        {[1, 2, 3, 4, 5].map((star) => {
          const fillPercentage = getStarFill(star, hasVoted ? parseFloat(average) : rating);
          return (
            <span
              key={star}
              className={styles.star}
              style={{ '--fill': fillPercentage }}
              onClick={() => handleRating(star)}
              onMouseEnter={() => !hasVoted && setRating(star)}
              onMouseLeave={() => !hasVoted && setRating(0)}
            >
              ★
            </span>
          );
        })}
        <p className={styles.stats}>
          <span style={{ color: 'blue' }}>
            <b>{average}</b>
          </span>{' '}
          ({votes} głosów)
          {!hasVoted && <span> 🟢</span>}
          {hasVoted && <span> 🚫</span>}
        </p>
      </div>
    </div>
  );
}
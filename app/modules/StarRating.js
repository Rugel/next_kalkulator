"use client";

import { useState, useEffect } from 'react';
import styles from './StarRating.module.css';

export default function StarRating({ itemId }) {
  const [rating, setRating] = useState(0); // Ocena przy hoverze przed głosowaniem
  const [average, setAverage] = useState('0.0'); // Średnia z API
  const [votes, setVotes] = useState(0); // Liczba głosów
  const [hasVoted, setHasVoted] = useState(() => {
    // Sprawdzamy przy załadowaniu, czy użytkownik już zagłosował
    return localStorage.getItem(`voted:${itemId}`) === 'true';
  });

  useEffect(() => {
    if (itemId) {
      fetchRating();
    }
  }, [itemId]);

  const fetchRating = async () => {
    try {
      const res = await fetch(`/api/rating/${itemId}`);
      if (!res.ok) throw new Error('Failed to fetch rating');
      const data = await res.json();
      setAverage(data.average || '0.0');
      setVotes(Number(data.votes) || 0);
    } catch (error) {
      console.error('Error fetching rating:', error);
    }
  };

  const handleRating = async (value) => {
    // Sprawdzamy, czy użytkownik już zagłosował
    if (hasVoted || !itemId || localStorage.getItem(`voted:${itemId}`) === 'true') {
      return;
    }

    try {
      const res = await fetch(`/api/rating/${itemId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: value }),
      });

      if (res.ok) {
        await fetchRating(); // Pobieramy zaktualizowane dane
        setHasVoted(true);
        setRating(value);
        // Zapisujemy w localStorage, że użytkownik zagłosował
        localStorage.setItem(`voted:${itemId}`, 'true');
      } else {
        throw new Error('Failed to submit rating');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  // Funkcja określająca klasę dla gwiazdki
  const getStarClass = (star) => {
    const currentValue = hasVoted ? parseFloat(average) : rating;
    if (currentValue >= star) {
      return `${styles.star} ${styles.filled}`; // Pełna gwiazdka
    }
    if (currentValue >= star - 0.5 && currentValue < star) {
      return `${styles.star} ${styles.halfFilled}`; // Połowa gwiazdki
    }
    return styles.star; // Pusta gwiazdka
  };

  if (!itemId) {
    return <div>Brak ID elementu</div>;
  }

  return (
    <div className={styles.ratingContainer}>
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={getStarClass(star)}
            onClick={() => handleRating(star)}
            onMouseEnter={() => !hasVoted && setRating(star)}
            onMouseLeave={() => !hasVoted && setRating(0)}
          >
            ★
          </span>
        ))}
      </div>
      <div className={styles.stats}>
        {average} ({votes} głosów)
        {!hasVoted && <span>🟢</span>}
        {hasVoted && <span>🚫</span>}
      </div>
    </div>
  );
}
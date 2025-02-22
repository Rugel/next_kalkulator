"use client";

import { useState, useEffect } from 'react';
import styles from './StarRating.module.css';

export default function StarRating({ itemId }) {
  const [rating, setRating] = useState(0);
  const [average, setAverage] = useState('0.0');
  const [votes, setVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

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
    if (hasVoted || !itemId) return;

    try {
      const res = await fetch(`/api/rating/${itemId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: value }),
      });

      if (res.ok) {
        await fetchRating(); // Ponowne pobranie danych po POST
        setHasVoted(true);
        setRating(value);
      } else {
        throw new Error('Failed to submit rating');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  if (!itemId) {
    return <div>Brak ID elementu</div>;
  }

  return (
    <div className={styles.ratingContainer}>
      <div className={styles.stars}>
        <span>oceń aplikację: </span>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`${styles.star} ${(hasVoted ? parseFloat(average) : rating) >= star ? styles.filled : ''
              }`}
            onClick={() => handleRating(star)}
            onMouseEnter={() => !hasVoted && setRating(star)}
            onMouseLeave={() => !hasVoted && setRating(0)}
          >
            ★
          </span>
        ))}
        <span className={styles.stats}>
          <b> <span style={{color:'green'}}>{average}</span></b> ({votes} głosów)
        </span>
      </div>
    </div>
  );
}
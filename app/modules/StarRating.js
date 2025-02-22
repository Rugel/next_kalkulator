"use client";

import { useState, useEffect } from 'react';
import styles from './StarRating.module.css';

export default function StarRating({ itemId }) {
  const [rating, setRating] = useState(0);
  const [average, setAverage] = useState('0.0');
  const [votes, setVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    fetchRating();
  }, [itemId]);

  const fetchRating = async () => {
    try {
      const res = await fetch(`/api/rating/${itemId}`);
      const data = await res.json();
      setAverage(data.average);
      setVotes(data.votes);
    } catch (error) {
      console.error('Error fetching rating:', error);
    }
  };

  const handleRating = async (value) => {
    if (hasVoted) return;

    try {
      const res = await fetch(`/api/rating/${itemId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: value }),
      });

      if (res.ok) {
        const data = await res.json();
        setAverage(data.average);
        setVotes(data.votes);
        setHasVoted(true);
        setRating(value);
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <div className={styles.ratingContainer}>
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`${styles.star} ${
              (hasVoted ? parseFloat(average) : rating) >= star ? styles.filled : ''
            }`}
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
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect, useCallback } from 'react';
import styles from './CommentsSection.module.css';
import Swal from 'sweetalert2';

export default function CommentsSection({ itemId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [author, setAuthor] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchComments = useCallback(async () => {
        if (!itemId) return;
        try {
            setIsLoading(true);
            const res = await fetch(`/api/comments/${itemId}`);
            if (!res.ok) throw new Error('Failed to fetch comments');
            const data = await res.json();
            setComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setIsLoading(false);
        }
    }, [itemId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const result = await Swal.fire({
            title: 'Potwierdzenie',
            text: 'Czy na pewno chcesz dodać ten komentarz?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Tak, dodaj!',
            cancelButtonText: 'Anuluj',
            confirmButtonColor: '#28a745',
        });

        if (!result.isConfirmed) return;

        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/comments/${itemId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: newComment,
                    author: author || 'Anonim',
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to submit comment');
            }

            const addedComment = await res.json();
            setComments([addedComment, ...comments]);
            setNewComment('');

            Swal.fire({
                title: 'Sukces!',
                text: 'Twój komentarz został dodany.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            console.error('Error submitting comment:', error);
            Swal.fire({
                title: 'Błąd!',
                text: error.message || 'Wystąpił problem podczas dodawania komentarza.',
                icon: 'error',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('pl-PL', options);
    };

    if (!itemId) return null;

    return (
        <div className={styles.commentsContainer}>
            <h2 className={styles.header}>Komentarze użytkowników</h2>

            <div className={styles.commentList}>
                {isLoading ? (
                    <p className={styles.noComments}>Ładowanie komentarzy...</p>
                ) : comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id} className={styles.commentItem}>
                            <div className={styles.commentHeader}>
                                <span className={styles.author}>{comment.author}</span>
                                <span className={styles.date}>{formatDate(comment.date)}</span>
                            </div>
                            <p className={styles.text}>{comment.text}</p>
                        </div>
                    ))
                ) : (
                    <p className={styles.noComments}>Brak komentarzy. Bądź pierwszy!</p>
                )}
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label htmlFor="author" className={styles.label}>Twoje imię / Nick:</label>
                    <input
                        id="author"
                        type="text"
                        className={styles.input}
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Anonim"
                        disabled={isSubmitting}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="comment" className={styles.label}>Treść komentarza:</label>
                    <textarea
                        id="comment"
                        className={styles.textarea}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Napisz co myślisz o aplikacji..."
                        required
                        disabled={isSubmitting}
                        maxLength={500}
                    />
                </div>
                <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={isSubmitting || !newComment.trim()}
                >
                    {isSubmitting ? 'Wysyłanie...' : 'Dodaj komentarz'}
                </button>
            </form>
        </div>
    );
}

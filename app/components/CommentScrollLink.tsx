'use client';
import React from 'react';

const CommentScrollLink = ({ text = "Zostaw komentarz!" }: { text?: string }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const el = document.getElementById('comments-section');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <a
            href="#comments-section"
            onClick={handleClick}
            style={{
                fontSize: '0.85em',
                textDecoration: 'underline',
                color: '#0b57d0',
                cursor: 'pointer',
                display: 'inline-block',
                marginTop: '5px',
                fontWeight: 500
            }}
        >
            {text}
        </a>
    );
};

export default CommentScrollLink;

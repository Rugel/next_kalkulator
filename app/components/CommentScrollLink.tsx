'use client';
import React from 'react';

const CommentScrollLink = ({ text = "[Zostaw komentarz i napisz co myślisz o wyniku]" }: { text?: string }) => {
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
                fontSize: '0.65em',
                textDecoration: 'underline',
                color: '#555',
                cursor: 'pointer',
                display: 'inline-block',
                marginTop: '5px'
            }}
        >
            {text}
        </a>
    );
};

export default CommentScrollLink;

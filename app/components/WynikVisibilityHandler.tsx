'use client';

import { useEffect } from 'react';

export default function WynikVisibilityHandler() {
  useEffect(() => {
    const onScroll = () => {
      const commentsSection = document.getElementById('comments-section');
      if (!commentsSection) {
        // fallback: hide at bottom if no comments section
        const atBottom =
          window.innerHeight + window.scrollY >= (document.documentElement.scrollHeight - 1);
        try {
          const targets = Array.from(document.querySelectorAll('.wynik'));
          targets.forEach((el: Element) => {
            el.classList.toggle('fc-hide-wynik', atBottom);
          });
        } catch (e) {
          /* ignore */
        }
        return;
      }

      const rect = commentsSection.getBoundingClientRect();
      // Hide .wynik when the top of #comments-section is within 200px of the viewport bottom
      const shouldHide = rect.top <= window.innerHeight + 200;

      try {
        const targets = Array.from(document.querySelectorAll('.wynik'));
        targets.forEach((el: Element) => {
          el.classList.toggle('fc-hide-wynik', shouldHide);
        });
      } catch (e) {
        /* ignore */
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      try {
        const targets = Array.from(document.querySelectorAll('.wynik'));
        targets.forEach((el: Element) => {
          el.classList.remove('fc-hide-wynik');
        });
      } catch (e) {
        /* ignore */
      }
    };
  }, []);

  return null;
}

'use client';

import { useEffect } from 'react';

export default function WynikVisibilityHandler() {
  useEffect(() => {
    const onScroll = () => {
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
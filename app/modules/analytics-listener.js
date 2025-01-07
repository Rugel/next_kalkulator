'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import * as gtag from '../utils/gtags';

export default function AnalyticsListener() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gtag.pageview(pathname);
    }
  }, [pathname]);

  return null;
}

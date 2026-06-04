'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

export default function WidgetsWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Pages where widgets should be visible (main calculator pages)
    const widgetPages = [
        '/',
        '/strona-glowna',
        '/kalkulator-stawki',
        '/brutto-netto',
        '/kalkulator-b2b',
        '/kalkulator-umowy-zlecenie',
        '/kalkulator-inflacji',
        '/karta-godzin',
        '/wyliczenie-z-godzin',
    ];

    const showWidgets = widgetPages.includes(pathname);

    if (!showWidgets) return null;

    return <>{children}</>;
}

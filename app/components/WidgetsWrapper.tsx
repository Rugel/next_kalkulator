'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

export default function WidgetsWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Pages where widgets should be visible (main calculator pages)
    const widgetPages = [
        '/',
        '/brutto_netto',
        '/kalkulator-b2b',
        '/kalkulator-umowy-zlecenie',
        '/kalkulator-inflacji',
        '/karta_godzin',
        '/wyliczenie_z_godzin',
    ];

    const showWidgets = widgetPages.includes(pathname);

    if (!showWidgets) return null;

    return <>{children}</>;
}

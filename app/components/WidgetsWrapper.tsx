'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

export default function WidgetsWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // Show widgets only on the homepage — hide on all sub-pages
    const isHomePage = pathname === '/';

    if (!isHomePage) return null;

    return <>{children}</>;
}

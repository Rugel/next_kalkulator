'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

export default function WidgetsWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isCookiesPage = pathname === '/cookies_info';

    if (isCookiesPage) return null;

    return <>{children}</>;
}

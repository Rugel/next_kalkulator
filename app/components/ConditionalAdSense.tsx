'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import React from 'react';

export default function ConditionalAdSense() {
    const pathname = usePathname();
    const isCookiesPage = pathname === '/cookies_info';

    if (isCookiesPage) return null;

    return (
        <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8789064360135564"
            crossOrigin="anonymous"
            strategy="afterInteractive"
            charSet="utf-8"
        />
    );
}

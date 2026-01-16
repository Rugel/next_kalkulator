"use client";

import Script from 'next/script';
import { useEffect, useRef } from 'react';

const AdSenseInArticle = ({ adSlot }) => {
  const adRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Check if ad loaded after initialization
    const checkAdLoaded = setTimeout(() => {
      if (adRef.current && wrapperRef.current) {
        const adIns = adRef.current;
        const hasAd = adIns.innerHTML.trim() !== '' ||
          adIns.getAttribute('data-ad-status') === 'filled' ||
          adIns.childNodes.length > 0;

        if (!hasAd) {
          // Hide wrapper if no ad loaded
          wrapperRef.current.style.display = 'none';
        }
      }
    }, 2000);

    return () => clearTimeout(checkAdLoaded);
  }, []);

  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8789064360135564"
        strategy="afterInteractive"
      />
      <div ref={wrapperRef} style={{ display: 'flex', justifyContent: 'center', width: '100%', minHeight: '150px', overflow: 'hidden', transition: 'all 0.3s ease', backgroundColor: '#f9f9f9' }}>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', textAlign: 'center', width: '100%' }}
          data-ad-format="fluid"
          data-ad-layout="in-article"
          data-ad-client="ca-pub-8789064360135564"
          data-ad-slot={adSlot}
        />
      </div>
      <Script id={`adsense-init-${adSlot}`} strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </>
  );
};

export default AdSenseInArticle;
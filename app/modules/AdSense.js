"use client";

import { useEffect, useRef } from "react";

const AdSense = ({ adClient, adSlot }) => {
  const adRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});

        // Check if ad loaded after a short delay
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
      } catch (error) {
        console.error("Błąd ładowania AdSense:", error);
        if (wrapperRef.current) {
          wrapperRef.current.style.display = 'none';
        }
      }
    }
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="adsense-wrapper"
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '280px', // Fixed height to prevent CLS
        overflow: 'hidden',
        backgroundColor: '#f9f9f9',
        containIntrinsicSize: '280px', // Reserve space even before content loads
        contentVisibility: 'auto' // Performance optimization
      }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center', width: '100%', height: '100%' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSense;
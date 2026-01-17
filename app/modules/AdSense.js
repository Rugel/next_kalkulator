"use client";

import { useEffect, useRef } from "react";

const AdSense = ({ adClient, adSlot }) => {
  const adRef = useRef(null);
  const wrapperRef = useRef(null);

  const isLoaded = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !isLoaded.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isLoaded.current = true;
      } catch (error) {
        console.error("Błąd ładowania AdSense:", error);
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
        alignItems: 'center',
        width: '100%',
        minHeight: '340px',
        maxHeight: '340px', // Prevent expansion
        height: '340px',
        overflow: 'hidden',
        backgroundColor: '#f9f9f9',
        containIntrinsicSize: '340px',
        contentVisibility: 'auto'
      }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
          width: '100%',
          maxWidth: '100%',
          height: '100%',
          maxHeight: '340px'
        }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSense;
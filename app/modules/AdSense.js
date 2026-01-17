"use client";

import { useEffect, useRef } from "react";

const AdSense = ({ adClient, adSlot }) => {
  const adRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
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
        minHeight: '300px',
        maxHeight: '300px', // Prevent expansion
        height: '300px',
        overflow: 'hidden',
        backgroundColor: '#f9f9f9',
        containIntrinsicSize: '300px',
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
          maxHeight: '300px'
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
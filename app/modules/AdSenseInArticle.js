"use client";

import { useEffect, useRef } from 'react';

const AdSenseInArticle = ({ adSlot }) => {
  const adRef = useRef(null);
  const wrapperRef = useRef(null);

  const isLoaded = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !isLoaded.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isLoaded.current = true;
      } catch (error) {
        console.error("Błąd ładowania AdSense (In-Article):", error);
      }
    }
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: '320px',
        maxHeight: '320px',
        height: '320px',
        overflow: 'hidden',
        backgroundColor: '#f9f9f9',
        containIntrinsicSize: '320px',
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
          maxHeight: '320px'
        }}
        data-ad-format="fluid"
        data-ad-layout="in-article"
        data-ad-client="ca-pub-8789064360135564"
        data-ad-slot={adSlot}
      />
    </div>
  );
};

export default AdSenseInArticle;
"use client";

import Script from 'next/script';
import { useEffect, useRef } from 'react';

const AdSenseInArticle = ({ adSlot }) => {
  const adRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Initial load handled by Script components
  }, []);

  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8789064360135564"
        strategy="afterInteractive"
      />
      <div
        ref={wrapperRef}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          minHeight: '250px',
          maxHeight: '250px',
          height: '250px',
          overflow: 'hidden',
          backgroundColor: '#f9f9f9',
          containIntrinsicSize: '250px',
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
            maxHeight: '250px'
          }}
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
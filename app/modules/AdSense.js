"use client";

import { useEffect } from "react";

const AdSense = ({ adClient, adSlot }) => {
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
    <div className="adsense-wrapper">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client={adClient} // np. ca-pub-XXXXXXXXXXXXXXXX
        data-ad-slot={adSlot} // ID jednostki reklamowej
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSense;
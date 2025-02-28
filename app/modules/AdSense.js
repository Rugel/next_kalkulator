"use client";

import { useEffect } from "react";

const AdSense = ({ adClient, adSlot, style }) => {
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
    <div>
      <ins
        className="adsbygoogle"
        style={style || { display: "block" }}
        data-ad-client={adClient} // np. ca-pub-XXXXXXXXXXXXXXXX
        data-ad-slot={adSlot} // ID jednostki reklamowej
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSense;
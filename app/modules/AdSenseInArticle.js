import Script from 'next/script';

const AdSenseInArticle = ({adSlot}) => {
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
        strategy="afterInteractive" // Ładuje skrypt po interaktywności strony
      />
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-format="fluid"
        data-ad-layout="in-article"
        data-ad-client="ca-pub-8789064360135564"
        data-ad-slot={adSlot}
      />
      <Script id="adsense-init" strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </>
  );
};

export default AdSenseInArticle;
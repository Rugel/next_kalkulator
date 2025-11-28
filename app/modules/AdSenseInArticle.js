import Script from 'next/script';

const AdSenseInArticle = ({ adSlot }) => {
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8789064360135564"
        strategy="afterInteractive" // Ładuje skrypt po interaktywności strony
      />
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <ins
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
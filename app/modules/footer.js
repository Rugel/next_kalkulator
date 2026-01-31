"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const Footer = () => {
   const [dateString, setDateString] = useState("");

   useEffect(() => {
      const now = new Date();
      // Format: "30 stycznia 2026"
      const formatted = now.toLocaleDateString("pl-PL", {
         day: "numeric",
         month: "long",
         year: "numeric"
      });
      setDateString(formatted);
   }, []);

   return (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
         <Image
            src="/logo.webp"
            alt="Stawka Godzinowa"
            width={120}
            height={30}
            style={{ height: '30px', width: 'auto', opacity: 0.9 }}
         />
         <strong><u>{dateString} - &copy; Grzegorz Dychała</u></strong>
      </div>
   );
};

export default Footer;

"use client";
import React, { useState, useEffect } from "react";

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
      <div>
         <strong><u>{dateString} - &copy; Grzegorz Dychała</u></strong>
      </div>
   );
};

export default Footer;

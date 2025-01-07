'use client';

import { useEffect, useState } from "react";

function Counter() {
  const [visits, setVisits] = useState(null);

  useEffect(() => {
    async function fetchVisits() {
      try {
        const response = await fetch("/api/visits");
        const data = await response.json();
        setVisits(data.visits);
      } catch (error) {
        console.error("Error fetching visit count:", error);
      }
    }

    fetchVisits();
  }, []);

  return (
    <div>
      <h1>Witaj na stronie!</h1>
      <p>Liczba odwiedzin: {visits !== null ? visits : "Ładowanie..."}</p>
    </div>
  );
}


export default Counter;

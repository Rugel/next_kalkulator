import { createClient } from 'redis';

// Inicjalizacja klienta Redis z Upstash
const redis = createClient({
  url: process.env.REDIS_URL, // URL z Upstash Redis (dostaniesz go po utworzeniu bazy)
  password: process.env.REDIS_PASSWORD, // Hasło Redis (także dostępne w panelu Upstash)
});

redis.connect();

export default async function handler(req, res) {
  // Ustaw nagłówki CORS i cache
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  // Obsługuje zapytania GET
  if (req.method === 'GET') {
    const currentDate = new Date().toISOString().split('T')[0]; // dzisiejsza data w formacie YYYY-MM-DD
    const cookie = req.cookies['hasVisitedToday'];

    // Sprawdź, czy użytkownik już odwiedził stronę dzisiaj
    let storedDate = await redis.get('storedDate');
    let dailyCount = parseInt(await redis.get('dailyCount')) || 0;
    let totalCount = parseInt(await redis.get('totalCount')) || 0;

    if (!cookie) {
      if (storedDate === currentDate) {
        // Zwiększ dzienny licznik
        dailyCount++;
      } else {
        // Zresetuj dzienny licznik
        storedDate = currentDate;
        dailyCount = 1;
      }

      // Zwiększ ogólny licznik
      totalCount++;

      // Zapisz nowe wartości w Redis
      await redis.set('storedDate', storedDate);
      await redis.set('dailyCount', dailyCount);
      await redis.set('totalCount', totalCount);

      // Ustaw cookie
      res.setHeader('Set-Cookie', 'hasVisitedToday=true; Max-Age=86400; Path=/; HttpOnly');
    }

    // Zwróć aktualne liczby
    return res.status(200).json({
      dailyCount,
      totalCount,
    });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

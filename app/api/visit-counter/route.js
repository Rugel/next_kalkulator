import Redis from 'ioredis';

// Inicjalizacja połączenia z Redis
const redis = new Redis({
  host: process.env.UPSTASH_REDIS_REST_URL,
  password: process.env.UPSTASH_REDIS_REST_TOKEN,
  port: 6379, // Port dla Redis
});

export async function GET(req) {
  const currentDate = new Date().toISOString().split('T')[0]; // Dzisiejsza data w formacie YYYY-MM-DD

  // Klucz Redis dla dziennego i całkowitego licznika
  const dailyCountKey = `dailyCount:${currentDate}`;
  const totalCountKey = 'totalCount';

  try {
    // Sprawdź, czy użytkownik odwiedził już stronę
    const cookie = req.headers.get('cookie') || '';
    const hasVisitedToday = cookie.includes('hasVisitedToday=true');

    let dailyCount = await redis.get(dailyCountKey) || 0;
    let totalCount = await redis.get(totalCountKey) || 0;

    if (!hasVisitedToday) {
      // Jeśli użytkownik nie odwiedził strony dzisiaj, zaktualizuj liczniki
      dailyCount = parseInt(dailyCount, 10) + 1;
      totalCount = parseInt(totalCount, 10) + 1;

      // Zapisz nową wartość w Redis
      await redis.set(dailyCountKey, dailyCount);
      await redis.set(totalCountKey, totalCount);

      // Ustaw cookie w odpowiedzi
      return new Response(
        JSON.stringify({ dailyCount, totalCount }),
        {
          status: 200,
          headers: {
            'Set-Cookie': `hasVisitedToday=true; Path=/; HttpOnly; Max-Age=${24 * 60 * 60}`,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Zwróć aktualne wartości liczników
    return new Response(
      JSON.stringify({ dailyCount, totalCount }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

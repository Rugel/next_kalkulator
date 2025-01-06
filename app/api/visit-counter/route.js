import { promises as fs } from 'fs';
import path from 'path';

export async function GET(req) {
  const filename = path.join(process.cwd(), 'public', 'visit_counter.txt');
  const currentDate = new Date().toISOString().split('T')[0]; // Dzisiejsza data w formacie YYYY-MM-DD

  try {
    // Sprawdź, czy plik istnieje, jeśli nie, utwórz go z wartościami początkowymi
    let fileContents;
    try {
      fileContents = await fs.readFile(filename, 'utf-8');
    } catch (err) {
      // Plik nie istnieje, więc tworzymy nowy
      fileContents = `${currentDate}\n0\n0`; // Format: data, licznik dzienny, licznik całkowity
      await fs.writeFile(filename, fileContents, 'utf-8');
    }

    // Parsowanie zawartości pliku
    const [storedDate, dailyCountRaw, totalCountRaw] = fileContents.split('\n');
    let dailyCount = parseInt(dailyCountRaw, 10);
    let totalCount = parseInt(totalCountRaw, 10);

    // Obsługa ciasteczek
    const cookie = req.headers.get('cookie') || '';
    const hasVisitedToday = cookie.includes('hasVisitedToday=true');

    if (!hasVisitedToday) {
      if (storedDate === currentDate) {
        // Jeśli data jest taka sama, zwiększ dzienny licznik
        dailyCount++;
      } else {
        // Jeśli data jest inna, zresetuj dzienny licznik
        dailyCount = 1;
      }

      // Zwiększ ogólny licznik
      totalCount++;

      // Zapisz nową datę i liczniki do pliku
      const newFileContents = `${currentDate}\n${dailyCount}\n${totalCount}`;
      await fs.writeFile(filename, newFileContents, 'utf-8');

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

    // Zwróć aktualne wartości liczników jako odpowiedź
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
import { createClient } from "redis";
import { serialize } from "cookie";

 const client = createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

 async function connectRedis() {
  if (!client.isOpen) {
    await client.connect();
  }
}

// Obsługa żądań GET
export async function GET(request) {
  try {
    await connectRedis();

    // Pobierz aktualną datę w formacie YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];

    // Sprawdź, czy użytkownik ma już cookie
    const cookieName = "visited_today";
    const cookies = request.headers.get("cookie")?.split("; ").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key] = value;
      return acc;
    }, {});

    if (cookies && cookies[cookieName] === today) {
      // Użytkownik już odwiedził stronę dzisiaj
      const totalVisits = await client.get("page_visits") || 0;
      const dailyVisits = await client.get(`daily_visits:${today}`) || 0;

      return new Response(
        JSON.stringify({
          message: "Już dziś odwiedziłeś stronę.",
          totalVisits: parseInt(totalVisits, 10),
          dailyVisits: parseInt(dailyVisits, 10),
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Jeśli nie ma cookie, dodaj wizytę do Redis
    const totalVisits = await client.incr("page_visits");
    const dailyVisits = await client.incr(`daily_visits:${today}`);

    // Ustaw cookie dla użytkownika na jeden dzień
    const cookie = serialize(cookieName, today, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 24 godziny
      path: "/",
    });

    return new Response(
      JSON.stringify({
        message: "Pierwsza dzisiejsza wizyta zapisana.",
        totalVisits,
        dailyVisits,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": cookie,
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Obsługa żądań POST (jeśli potrzebujesz)
export async function POST(request) {
  try {
    await connectRedis();
    const body = await request.json();

    // Przykładowa logika: zapisanie danych do Redis
    await client.set("custom_data", JSON.stringify(body));

    return new Response(
      JSON.stringify({ message: "Dane zostały zapisane.", data: body }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

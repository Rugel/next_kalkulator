import Redis from "ioredis";

const redis = new Redis({
    url: 'https://coherent-cub-48245.upstash.io',
  token: 'Abx1AAIjcDE4OTg3OGNkYzdiNzQ0YTEyOTc0NTU2YTkyMmVjNjcwMHAxMA',
});

export default async function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    try {
      // Pobierz wartość licznika
      const visits = await redis.incr("page_visits");
      res.status(200).json({ visits });
    } catch (error) {
      console.error("Redis error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}

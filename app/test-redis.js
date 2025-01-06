const Redis = require('ioredis');

const redis = new Redis({
  host: process.env.REDIS_URL, // lub 'your-redis-host'
  port: 6379, // Domyślny port Redis
  password: process.env.REDIS_PASSWORD, // lub 'your-password'
  tls: {}, // Jeśli Redis wymaga TLS
});

redis.ping()
  .then((result) => {
    console.log('Redis connected:', result); // Spodziewany wynik: "PONG"
    process.exit(0); // Zamknięcie procesu po udanym teście
  })
  .catch((error) => {
    console.error('Redis connection error:', error);
    process.exit(1); // Zamknięcie procesu z błędem
  });


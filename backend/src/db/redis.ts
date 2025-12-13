import Redis from "ioredis";

export const redis = new Redis({
  port: Number(process.env.REDIS_PORT) || 6379,
  host: process.env.REDIS_HOST || "127.0.0.1",
});

redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (err: unknown) => {
  console.error("Redis error:", err);
});

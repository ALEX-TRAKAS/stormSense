import { redis } from "../db/redis";

export class CacheService {

  static async set(key: string, value: unknown, ttl = 3600): Promise<void> {
    await redis.set(key, JSON.stringify(value), "EX", ttl);
  }

  static async get<T>(key: string): Promise<T | null> {
    const data = await redis.get(key);
    return data ? (JSON.parse(data) as T) : null;
  }

  static async remove(key: string): Promise<void> {
    await redis.del(key);
  }

  static async exists(key: string): Promise<boolean> {
    const result = await redis.exists(key);
    return result === 1;
  }

  static async clearAll(): Promise<void> {
    await redis.flushall();
  }
}

import Redis from "ioredis";
import { env } from "../config/env.js";

let redis = null;

if (env.REDIS_URL) {
  redis = new Redis(env.REDIS_URL);
  console.log("⚡ Redis Connected");
}

export const cacheSet = async (key, value, ttl = 3600) => {
  if (!redis) return;
  return redis.set(key, JSON.stringify(value), "EX", ttl);
};

export const cacheGet = async (key) => {
  if (!redis) return null;
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
};

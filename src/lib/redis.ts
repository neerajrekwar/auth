import { Redis } from '@upstash/redis'

let redis: Redis;

if (process.env.UPSTASH_REDIS_URL && process.env.UPSTASH_REDIS_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_URL,
    token: process.env.UPSTASH_REDIS_TOKEN,
  });
} else {
  if (process.env.NODE_ENV !== 'production') {
    console.warn("[Redis] Upstash Redis not configured. App will run in a mock data mode. Missing UPSTASH_REDIS_URL or UPSTASH_REDIS_TOKEN environment variables.");
  }
  
  const mockPipeline = {
    hgetall: () => mockPipeline,
    exec: async () => [],
  };
  
  redis = {
    hset: async () => 0,
    zadd: async () => 0,
    zcard: async () => 0,
    zrange: async () => [],
    hgetall: async () => null,
    pipeline: () => mockPipeline,
  } as any;
}

export { redis };

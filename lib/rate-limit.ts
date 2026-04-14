/**
 * Persistent rate limiting via Upstash Redis.
 *
 * Falls back to an in-memory Map when UPSTASH_REDIS_REST_URL is not set
 * (dev convenience). In-memory limits DO NOT work across serverless
 * invocations, so production must have Upstash configured.
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type Result = { success: boolean; remaining?: number; reset?: number };

// Memoized limiters — avoid rebuilding on every request.
const limiters = new Map<string, Ratelimit>();

// In-memory fallback (dev only).
const memoryMap = new Map<string, { count: number; resetTime: number }>();

function memoryLimit(key: string, max: number, windowMs: number): Result {
  const now = Date.now();
  const entry = memoryMap.get(key);
  if (!entry || now > entry.resetTime) {
    memoryMap.set(key, { count: 1, resetTime: now + windowMs });
    return { success: true, remaining: max - 1, reset: now + windowMs };
  }
  if (entry.count >= max) {
    return { success: false, remaining: 0, reset: entry.resetTime };
  }
  entry.count++;
  return {
    success: true,
    remaining: max - entry.count,
    reset: entry.resetTime,
  };
}

function getLimiter(namespace: string, max: number, windowSec: number) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const cacheKey = `${namespace}:${max}:${windowSec}`;
  let limiter = limiters.get(cacheKey);
  if (!limiter) {
    limiter = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(max, `${windowSec} s`),
      analytics: false,
      prefix: `rl:${namespace}`,
    });
    limiters.set(cacheKey, limiter);
  }
  return limiter;
}

/**
 * Check & consume a rate-limit slot. Returns `success: false` if the
 * identifier has exceeded its quota.
 */
export async function checkLimit(
  namespace: string,
  identifier: string,
  max: number,
  windowSec: number
): Promise<Result> {
  const limiter = getLimiter(namespace, max, windowSec);
  if (!limiter) {
    if (process.env.NODE_ENV === "production") {
      console.warn(
        `[rate-limit] Upstash not configured — using in-memory fallback. ` +
          `This WILL NOT work across serverless invocations. ` +
          `Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.`
      );
    }
    return memoryLimit(`${namespace}:${identifier}`, max, windowSec * 1000);
  }

  const r = await limiter.limit(identifier);
  return { success: r.success, remaining: r.remaining, reset: r.reset };
}

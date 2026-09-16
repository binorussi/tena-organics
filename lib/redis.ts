import { Redis } from '@upstash/redis';

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error('Missing Upstash Redis environment variables.');
}

export const redis = Redis.fromEnv();

export const productStockKey = (productId: string) => `product:${productId}:stock`;

/**
 * Deducts stock atomically in Upstash Redis.
 * Returns remaining stock if successful, or -1 if requested weight exceeds available stock.
 */
export async function deductStock(productId: string, weightGrams: number): Promise<number> {
  const key = productStockKey(productId);

  const luaScript = `
    local current = tonumber(redis.call('get', KEYS[1]) or "0")
    local requested = tonumber(ARGV[1])
    if current >= requested then
      local remaining = current - requested
      redis.call('set', KEYS[1], remaining)
      return remaining
    else
      return -1
    end
  `;

  // Fix: Pass keys and args directly as parameter arrays, then cast the return type
  const remaining = await redis.eval(luaScript, [key], [weightGrams.toString()]);
  return Number(remaining);
}
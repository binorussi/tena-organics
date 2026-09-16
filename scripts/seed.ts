import { PRODUCTS } from "../data/products";
import { redis, productStockKey } from "../lib/redis";

async function seed() {
  const DEFAULT_STOCK_GRAMS = 25000; // 25 kg initial stock per item

  for (const product of PRODUCTS) {
    const key = productStockKey(product.id);
    await redis.set(key, DEFAULT_STOCK_GRAMS);
    console.log(`Seeded ${key} = ${DEFAULT_STOCK_GRAMS}g (${DEFAULT_STOCK_GRAMS / 1000}kg)`);
  }
}

seed().catch(console.error);
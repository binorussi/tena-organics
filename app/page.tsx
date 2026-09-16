import { PRODUCTS } from "@/data/products";
import { redis, productStockKey } from "@/lib/redis";
import { CartExperience } from "@/components/CartExperience";

export default async function HomePage() {
  const pipeline = redis.pipeline();
  PRODUCTS.forEach((product) => {
    pipeline.get<number>(productStockKey(product.id));
  });
  const stockResults = await pipeline.exec<Array<number | null>>();

  const productsWithStock = PRODUCTS.map((product, index) => ({
    ...product,
    stock: stockResults[index] ?? 0,
  }));

  return (
    <main className="min-h-screen bg-slate-50">
      <CartExperience products={productsWithStock} />
    </main>
  );
}
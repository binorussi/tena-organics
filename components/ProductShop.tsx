"use client";

import { useState } from "react";
import { ProductWithStock } from "./ProductCard";
import ProductCard from "./ProductCard";

interface ProductShopProps {
  products: ProductWithStock[];
  // Update onAddToCart to accept both product and weight in grams
  onAddToCart?: (product: ProductWithStock, weightGrams: number) => void;
}

export default function ProductShop({ products, onAddToCart }: ProductShopProps) {
  const [filter, setFilter] = useState<string>("all");

  const filteredProducts = filter === "all" 
    ? products 
    : products.filter((p) => p.category === filter);

  return (
    <section id="shop" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-green">
          Our Premium Selection
        </h2>
        <p className="text-gray-600 mt-2">Handpicked for purity, taste, and maximum health benefits.</p>
        
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {[
            { label: "All Items", value: "all" },
            { label: "Herbal Teas", value: "herbal-teas" },
            { label: "Superfood Powders", value: "powders" },
            { label: "Whole Spices", value: "spices" },
            { label: "Seeds & Nuts", value: "seeds-nuts" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${
                filter === tab.value
                  ? "bg-brand-green text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-amber-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart} 
          />
        ))}
      </div>
    </section>
  );
}
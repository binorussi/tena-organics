"use client";

import { useState } from "react";
import { Product } from "@/data/products";

export interface ProductWithStock extends Product {
  stock: number; // Stored in grams (e.g. 25000 = 25kg)
}

export interface ProductCardProps {
  product: ProductWithStock;
  onAddToCart?: (product: ProductWithStock, weightGrams: number) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [selectedWeight, setSelectedWeight] = useState<number>(250); // Default 250g

  // Weight dropdown options ranging from 250g to 5000g (5kg)
  const weightOptions = [
    { label: "100 g", value: 100 },
    { label: "250 g", value: 250 },
    { label: "500 g", value: 500 },
    { label: "750 g", value: 750 },
    { label: "1 kg", value: 1000 },
    { label: "2 kg", value: 2000 },
    { label: "3 kg", value: 3000 },
    { label: "5 kg", value: 5000 },
  ];

  // Calculate dynamic price based on weight selected (base price is for 250g)
  const currentPrice = product.price * (selectedWeight / 250);
  const isOutOfStock = product.stock < 250;
  const cannotFulfillSelection = product.stock < selectedWeight;

  return (
    <div className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="relative">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-brand-gold text-white text-xs font-bold px-3 py-1 rounded-full">
              {product.badge}
            </span>
          )}
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-start">
            <h3 className="font-serif font-bold text-lg text-brand-green">{product.name}</h3>
            <span className="font-bold text-brand-gold">{currentPrice} ETB</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{product.tagline}</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <label htmlFor={`weight-${product.id}`} className="text-xs font-medium text-gray-600">
            Select Weight:
          </label>
          <select
            id={`weight-${product.id}`}
            value={selectedWeight}
            onChange={(e) => setSelectedWeight(Number(e.target.value))}
            disabled={isOutOfStock}
            className="text-xs border border-gray-300 rounded-md px-3 py-1.5 bg-white font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-brand-green"
          >
            {weightOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between items-center">
          {/* Status Badge without revealing raw quantity numbers */}
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              !isOutOfStock ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-700"
            }`}
          >
            {!isOutOfStock ? "In Stock" : "Out of Stock"}
          </span>

          <button
            disabled={isOutOfStock || cannotFulfillSelection}
            onClick={() => onAddToCart && onAddToCart(product, selectedWeight)}
            className="bg-brand-green hover:bg-opacity-90 text-white text-xs px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {cannotFulfillSelection && !isOutOfStock ? "Weight Unavailable" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
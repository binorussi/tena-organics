"use client";

import { useEffect, useState } from "react";

interface NavbarProps {
  cartCount: number;
}

export default function Navbar({ cartCount }: NavbarProps) {
  const [isPulsing, setIsPulsing] = useState(false);

  // Trigger brief bounce/scale effect when cartCount updates
  useEffect(() => {
    if (cartCount === 0) return;
    setIsPulsing(true);
    const timer = setTimeout(() => setIsPulsing(false), 300);
    return () => clearTimeout(timer);
  }, [cartCount]);

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 py-4 px-6 flex justify-between items-center">
      <div className="font-serif text-xl font-bold text-brand-green">Tena Organics</div>

      <div className="relative flex items-center gap-2 font-medium text-sm text-brand-green">
        <span>Cart</span>
        <div
          className={`relative bg-brand-gold text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
            isPulsing ? "scale-125 bg-emerald-600" : "scale-100"
          }`}
        >
          {cartCount}
        </div>
      </div>
    </nav>
  );
}
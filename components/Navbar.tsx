"use client";

import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const navLinks = ["Home", "Shop", "Why Tena", "Benefits", "Contact"];

export default function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-amber-200/50 bg-brand-cream/90 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <a href="#home" className="font-serif text-2xl font-bold tracking-tight text-brand-green">
          Tena Organic Health
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm font-medium text-gray-800 transition hover:text-brand-gold"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Desktop Controls & Enlarged Cart Trigger */}
        <div className="hidden items-center gap-4 lg:flex">
          <button
            aria-label="Search"
            className="rounded-full p-2 text-brand-green transition hover:bg-amber-100"
          >
            <Search size={20} />
          </button>

          {/* Enlarged Interactive Cart Button */}
          <button
            onClick={onOpenCart}
            aria-label="Shopping cart"
            className="relative flex items-center gap-2.5 rounded-full bg-brand-green px-5 py-2.5 font-bold text-white shadow-md transition hover:bg-emerald-900 hover:scale-105 active:scale-95"
          >
            <ShoppingCart size={22} />
            <span className="text-sm font-bold">Cart</span>
            <span className="ml-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-brand-gold px-1.5 text-xs font-black text-white border border-white">
              {cartCount}
            </span>
          </button>

          <a
            href="#shop"
            className="rounded-full bg-brand-gold px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-goldHover"
          >
            Shop Now
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenCart}
            className="relative rounded-full p-2 text-brand-green"
            aria-label="Open cart"
          >
            <ShoppingCart size={22} />
            <span className="absolute -right-1 -top-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-brand-gold px-1 text-xs font-bold text-white">
              {cartCount}
            </span>
          </button>

          <button
            className="rounded-full p-2 text-brand-green"
            aria-label="Toggle mobile menu"
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="border-t border-amber-200/50 bg-brand-cream px-4 py-5 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link}
                onClick={() => setIsOpen(false)}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="font-medium text-gray-800 hover:text-brand-gold"
              >
                {link}
              </a>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenCart();
              }}
              className="rounded-full bg-brand-gold px-5 py-3 text-center font-semibold text-white shadow"
            >
              View Cart · {cartCount} items
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
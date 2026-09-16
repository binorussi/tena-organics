"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="bg-brand-green text-amber-50/90 pt-12 pb-6 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-emerald-800/60">
        
        {/* Brand Info */}
        <div>
          <h3 className="font-serif text-xl font-bold text-amber-100 mb-3">Tena Organics</h3>
          <p className="text-xs text-amber-100/70 leading-relaxed">
            Your source for pure, organic health products, spices, and natural wellness ingredients in Ethiopia.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-sm text-amber-100 mb-3">Quick Links</h4>
          <ul className="space-y-2 text-xs text-amber-100/80">
            <li><a href="#home" className="hover:text-brand-gold transition-colors">Home</a></li>
            <li><a href="#shop" className="hover:text-brand-gold transition-colors">Shop</a></li>
            <li><a href="#why-tena" className="hover:text-brand-gold transition-colors">Why Tena</a></li>
            <li><a href="#benefits" className="hover:text-brand-gold transition-colors">Benefits</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-bold text-sm text-amber-100 mb-3">Contact Us</h4>
          <p className="text-xs text-amber-100/80">Addis Ababa, Ethiopia</p>
          <p className="text-xs text-amber-100/80 mt-1">Phone: 0960102804</p>
        </div>
      </div>

      {/* Developer Credit Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-amber-200/60 gap-3">
        <p>© {new Date().getFullYear()} Tena Organics. All rights reserved.</p>
        
        {/* Web Developer Credit */}
        <p className="flex items-center gap-2">
          <span>Developed by</span>
          <a
            href="https://www.linkedin.com/in/benyam-tadesse-data"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-gold hover:underline transition-colors"
          >
            Benyam Tadesse
          </a>
          <span>(0911471568)</span>
        </p>
      </div>
    </footer>
  );
}
"use client";

import { ChevronDown, Leaf } from "lucide-react";
import { useState } from "react";

const tips = [
  { title: "Morning vitality", body: "Blend moringa powder into a smoothie with citrus and leafy greens for a gentle daily nutrient lift." },
  { title: "Afternoon reset", body: "Brew hibiscus tea over ice with mint for antioxidant refreshment without caffeine." },
  { title: "Evening restoration", body: "Use calming herbal blends 30 minutes before bed as part of a screen-free wind-down ritual." },
];

export function InvestInHealth() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="benefits" className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative min-h-[440px] overflow-hidden rounded-[3rem] bg-[#2D5A4C] p-8 text-[#F7F5EE]">
          <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-[#A3B899]/40 blur-2xl" />
          <div className="relative flex h-full min-h-[376px] flex-col justify-end rounded-[2rem] border border-white/15 bg-white/10 p-8 backdrop-blur">
            <Leaf className="mb-8 h-28 w-28 text-[#A3B899]" strokeWidth={1.2} />
            <p className="font-serif text-4xl font-bold">Botanical care, crafted with intention.</p>
          </div>
        </div>
        <div>
          <p className="font-bold uppercase tracking-[0.3em] text-[#A3B899]">Daily wellness education</p>
          <h2 className="mt-3 font-serif text-4xl font-bold text-[#2D5A4C] sm:text-5xl">Invest In Your Health</h2>
          <p className="mt-5 text-lg leading-8 text-[#1A2E26]/75">Experience the pure power of nature with Tena's certified organic health products — crafted for your wellbeing.</p>
          <div className="mt-8 space-y-3">
            {tips.map((tip, index) => (
              <div key={tip.title} className="rounded-2xl border border-[#2D5A4C]/10 bg-[#F7F5EE]">
                <button className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-[#2D5A4C]" onClick={() => setOpenIndex(index)}>
                  {tip.title}<ChevronDown className={`transition ${openIndex === index ? "rotate-180" : ""}`} size={18} />
                </button>
                {openIndex === index && <p className="px-5 pb-5 text-[#1A2E26]/75">{tip.body}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-brand-cream py-20 px-4 md:px-8 border-b border-amber-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block bg-amber-100 text-brand-gold font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Pure • Natural • Wholesome
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-green leading-tight">
            Your Source for Spices & Health Ingredients
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Carefully selected from the best origins around the world to bring you natural goodness in every cup and bite.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#shop"
              className="bg-brand-gold hover:bg-brand-goldHover text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all"
            >
              Explore Shop
            </a>
            <a
              href="#why-tena"
              className="border-2 border-brand-green text-brand-green font-bold px-8 py-3.5 rounded-xl hover:bg-brand-green hover:text-white transition-all"
            >
              Why Choose Us
            </a>
          </div>
        </div>
        <div className="relative h-80 md:h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
          <Image
            src="/img/hero-spices.webp"
            alt="Spices and Herbs"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
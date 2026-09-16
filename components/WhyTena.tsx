import { BadgeCheck, HandHeart, Leaf, Users } from "lucide-react";

const values = [
  { title: "100% Organic Ingredients", icon: Leaf },
  { title: "Ethically & Sustainably Sourced", icon: HandHeart },
  { title: "Carefully Crafted Formulas", icon: BadgeCheck },
  { title: "Trusted by Wellness Lovers", icon: Users },
];

export function WhyTena() {
  return (
    <section id="why-tena" className="bg-brand-green py-16 text-brand-cream">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {values.map(({ title, icon: Icon }) => (
          <article key={title} className="rounded-3xl border border-white/15 bg-white/5 p-6 text-center backdrop-blur">
            <Icon className="mx-auto mb-4 h-9 w-9 text-brand-gold" />
            <h3 className="font-serif text-2xl font-semibold">{title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
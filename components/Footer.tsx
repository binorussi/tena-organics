import { Facebook, Instagram, Mail, MapPin, Phone, Send, Twitter } from "lucide-react";

const socials = ["Instagram @tenaorganics", "Facebook /tenaorganics", "Twitter @tena_health", "Pinterest /tenaorganics"];

export function Footer() {
  return (
    <footer id="contact" className="bg-brand-green py-16 text-brand-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <h2 className="font-serif text-3xl font-bold">Tena Organic Health</h2>
          <p className="mt-3 text-brand-cream/80">Organic • Certified • Trusted by Nature</p>
          <form className="mt-8 flex max-w-md overflow-hidden rounded-full bg-white p-1" aria-label="Newsletter subscription">
            <input className="min-w-0 flex-1 px-4 text-gray-800 outline-none" placeholder="Your email" type="email" />
            <button className="rounded-full bg-brand-gold px-5 py-3 font-semibold text-white hover:bg-brand-goldHover transition-colors" type="submit">
              <Send size={18} />
            </button>
          </form>
        </div>
        <div className="space-y-3 text-brand-cream/85">
          <h3 className="font-serif text-xl font-semibold text-white">Contact Info</h3>
          <p className="flex gap-2"><MapPin size={18} /> <a href="https://www.tenaorganics.com">www.tenaorganics.com</a></p>
          <p className="flex gap-2"><Mail size={18} /> hello@tenaorganics.com</p>
          <p className="flex gap-2"><Phone size={18} /> +251 913349783</p>
        </div>
        <div>
          <h3 className="font-serif text-xl font-semibold text-white">Social Links</h3>
          <div className="mt-4 space-y-2 text-brand-cream/85">
            {socials.map((social, index) => (
              <p key={social} className="flex items-center gap-2">
                {index === 0 ? <Instagram size={18} /> : index === 1 ? <Facebook size={18} /> : <Twitter size={18} />} {social}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { SHOP } from "@/lib/constants";

const footerLinks = [
  { href: "/collections", label: "Collections" },
  { href: "/services", label: "Signature Services" },
  { href: "/gold-price", label: "Gold Rate" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[linear-gradient(180deg,#120d0b_0%,#0a0807_100%)] text-white">
      <div className="section-padding mx-auto max-w-7xl py-12 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.8fr_1.1fr] lg:items-start">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <Logo variant="footer" showText={false} />
              <div>
                <p className="font-serif text-base text-gold">{SHOP.name}</p>
                <p className="text-xs uppercase tracking-[0.24em] text-white/48">
                  Chavakachcheri
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-white/68">
              Traditional Tamil gold jewellery for bridal, thali, temple, and everyday wear in Chavakachcheri.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-gold">
              Explore
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:max-w-md lg:grid-cols-1">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative text-sm text-white/68 transition-colors duration-500 hover:text-gold group/foot"
                  >
                    {link.label}
                    <span className="absolute inset-x-0 -bottom-0.5 h-[1px] origin-left bg-gold scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/foot:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-gold">
              Visit
            </h3>
            <ul className="space-y-4 text-sm text-white/68">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{SHOP.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <a href={`tel:${SHOP.phoneTel}`} className="transition-colors hover:text-gold">
                  {SHOP.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                <a href={`mailto:${SHOP.email}`} className="transition-colors hover:text-gold">
                  {SHOP.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 md:flex-row md:items-center">
          <p className="text-xs uppercase tracking-[0.28em] text-white/48">
            (C) {new Date().getFullYear()} {SHOP.name}
          </p>
          <p className="text-xs uppercase tracking-[0.28em] text-white/48">
            Chavakachcheri, Jaffna
          </p>
        </div>
      </div>
    </footer>
  );
}

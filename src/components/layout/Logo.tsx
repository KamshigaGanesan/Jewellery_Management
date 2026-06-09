import Image from "next/image";
import Link from "next/link";
import { SHOP } from "@/lib/constants";

interface LogoProps {
  variant?: "header" | "footer";
  showText?: boolean;
}

export function Logo({ variant = "header", showText = true }: LogoProps) {
  const isHeader = variant === "header";

  return (
    <Link href="/" className="group flex items-center gap-3">
      <div
        className={`relative shrink-0 overflow-hidden ${
          isHeader ? "h-11 w-11 sm:h-12 sm:w-12" : "h-10 w-10"
        }`}
      >
        <Image
          src="/images/indiran-logo.svg"
          alt={SHOP.name}
          fill
          className="object-contain object-center"
          sizes={isHeader ? "52px" : "40px"}
          priority
        />
      </div>
      {showText && (
        <div className="hidden min-w-0 flex-col leading-tight md:flex">
          <span className="font-serif text-sm font-medium tracking-wide text-gold transition-colors group-hover:text-[#fff4da]">
            {SHOP.name}
          </span>
          <span className="font-tamil text-xs text-[var(--color-text-muted)]">
            {SHOP.nameTamil}
          </span>
        </div>
      )}
    </Link>
  );
}

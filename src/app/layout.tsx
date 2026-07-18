import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Sans_Tamil } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WishlistProvider } from "@/components/providers/WishlistProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ScrollRevealProvider } from "@/components/providers/ScrollRevealProvider";
import { LuxuryCursorGlow } from "@/components/ui/LuxuryCursorGlow";
import { SHOP } from "@/lib/constants";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  variable: "--font-tamil",
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${SHOP.name} | Tamil Gold Jewelry — Jaffna`,
    template: `%s | ${SHOP.name}`,
  },
  description:
    "Traditional Tamil gold jewelry in Chavakachcheri, Jaffna. Temple jewelry, thali, jimikki, bridal sets & daily gold at Indiran Jewellers.",
  keywords: [
    "Tamil jewelry",
    "Jaffna jewellers",
    "gold jewelry Jaffna",
    "Chavakachcheri",
    "temple jewelry",
    "thali chain",
    "bridal gold",
    "Indiran Jewellers",
  ],
  openGraph: {
    type: "website",
    locale: "ta_LK",
    siteName: SHOP.name,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ta"
      suppressHydrationWarning
      className={`light ${playfair.variable} ${inter.variable} ${notoTamil.variable}`}
    >
      <body className="font-sans text-[var(--color-text)]">
        <ThemeProvider>
          <WishlistProvider>
            <ScrollRevealProvider>
              <Header />
              <main className="relative min-h-screen overflow-x-hidden">{children}</main>
              <Footer />
              <LuxuryCursorGlow />
            </ScrollRevealProvider>
          </WishlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


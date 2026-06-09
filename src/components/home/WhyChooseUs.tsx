import { Award, Shield, Gem, HeartHandshake } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SHOP } from "@/lib/constants";

const features = [
  {
    icon: Shield,
    title: "916 Hallmarked Gold",
    description: "Certified purity — trusted by Jaffna families for generations",
  },
  {
    icon: Gem,
    title: "Traditional Tamil Designs",
    description: "Thali, jimikki, kasu mala, haram & bridal sets",
  },
  {
    icon: Award,
    title: "Jaffna Heritage",
    description: "North Sri Lankan Tamil jewelry craftsmanship",
  },
  {
    icon: HeartHandshake,
    title: "Honest Pricing",
    description: "Transparent daily gold rates at our New Market showroom",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding section-ribbon bg-[#f7efe4]">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection>
          <SectionHeading
            title="Why Indiran"
            subtitle={`${SHOP.name} — ${SHOP.nameTamil}, a premium Tamil jewelry house in Jaffna`}
          />
        </AnimatedSection>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.1}>
              <div className="luxury-card h-full p-6 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-gold/20 bg-gold/10 text-gold">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="font-serif text-xl text-[#2b1c15]">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">{feature.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

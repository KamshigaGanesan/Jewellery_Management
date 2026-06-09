import Image from "next/image";
import Link from "next/link";
import type { GalleryImage } from "@/lib/content/types";
import { getImageUrl } from "@/lib/content/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Share2 } from "lucide-react";
import { JEWELRY_IMAGES } from "@/lib/constants";

const heritageLabels = [
  "Temple Necklace",
  "Gold Ring",
  "Bridal Necklace Set",
  "Lotus Pendant",
  "Tamil Bride",
  "Heritage Craft",
];

interface InstagramGalleryProps {
  images: GalleryImage[];
}

export function InstagramGallery({ images }: InstagramGalleryProps) {
  const displayImages =
    images.length > 0
      ? images.slice(0, 6).map((img, i) => ({
          _id: img._id,
          title: img.title || heritageLabels[i % heritageLabels.length],
          url: img.image
            ? getImageUrl(img.image, 400, 400)
            : JEWELRY_IMAGES.gallery[i % JEWELRY_IMAGES.gallery.length],
          objectPosition: ["center 22%", "center center", "center 30%", "center 18%", "center 40%", "center center"][i % 6],
        }))
      : JEWELRY_IMAGES.gallery.slice(0, 6).map((url, i) => ({
          _id: `fallback-${i}`,
          title: heritageLabels[i % heritageLabels.length],
          url,
          objectPosition: ["center 22%", "center center", "center 30%", "center 18%", "center 40%", "center center"][i % 6],
        }));

  return (
    <section className="section-padding section-ribbon bg-[#f5ebdc]">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection>
          <SectionHeading
            title="Heritage Gallery"
            subtitle="A cinematic grid of temple, bridal, and heritage jewelry moments"
          />
        </AnimatedSection>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-6 md:grid-rows-2 lg:gap-4">
          {displayImages.map((item, i) => (
            <AnimatedSection
              key={item._id}
              delay={i * 0.05}
              className={
                i === 0
                  ? "md:col-span-2 md:row-span-2"
                  : i === 1
                    ? "md:col-span-2"
                    : i === 4
                      ? "md:col-span-2"
                      : ""
              }
            >
              <div
                className={`group relative overflow-hidden rounded-[1.5rem] border border-gold/10 bg-[#f8f0e3] ${
                  i === 0
                    ? "aspect-[4/5] md:h-full"
                    : i === 1
                      ? "aspect-[16/9] md:h-full"
                      : i === 4
                        ? "aspect-[16/9] md:h-full"
                        : "aspect-square"
                }`}
              >
                <Image
                  src={item.url}
                  alt={item.title || "Tamil gold jewelry"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ objectPosition: item.objectPosition }}
                  sizes="200px"
                />
                <div className="absolute inset-0 flex items-end bg-[linear-gradient(180deg,rgba(248,240,227,0.06),rgba(49,23,12,0.46))] opacity-100 transition-opacity group-hover:bg-[linear-gradient(180deg,rgba(248,240,227,0.02),rgba(49,23,12,0.22))]">
                  <div className="flex w-full items-center justify-between p-4 text-white">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.35em] text-[#f6df8d]">Heritage Crop</p>
                      <p className="mt-2 max-w-[12rem] font-serif text-lg leading-tight text-white">
                        {item.title}
                      </p>
                    </div>
                    <Share2 className="h-7 w-7 text-[#f6df8d] opacity-90" />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/gallery" className="btn-outline-gold inline-flex">
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}

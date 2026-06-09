"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import type { GalleryImage } from "@/lib/content/types";
import { getImageUrl } from "@/lib/content/image";
import { motion } from "framer-motion";
import { JEWELRY_IMAGES } from "@/lib/constants";

const heritageLabels = [
  "Temple Necklace",
  "Gold Ring",
  "Bridal Necklace Set",
  "Lotus Pendant",
  "Tamil Bride",
  "Heritage Finish",
  "Festive Style",
  "Jaffna Craft",
];

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then(setImages)
      .catch(() => setImages([]));
  }, []);

  const display =
    images.length > 0
      ? images.map((img, i) => ({
          id: img._id,
          url: img.image
            ? getImageUrl(img.image, 600, 600)
            : JEWELRY_IMAGES.gallery[i % JEWELRY_IMAGES.gallery.length],
          title: img.title || heritageLabels[i % heritageLabels.length],
        }))
      : JEWELRY_IMAGES.gallery.map((url, i) => ({
          id: `f-${i}`,
          url,
          title: heritageLabels[i % heritageLabels.length],
        }));

  return (
    <>
      <PageHero
        title="Tamil Culture Gallery"
        subtitle="Temple, wedding, festive, and heritage moments shown together"
      />
      <section className="section-padding">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {display.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="group relative aspect-square overflow-hidden rounded-sm"
            >
              <Image
                src={item.url}
                alt={item.title || "Tamil jewelry"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {item.title && (
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-maroon/80 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-sm text-gold">{item.title}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

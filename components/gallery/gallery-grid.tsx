"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { galleryImages } from "@christlife/lib/gallery-data";
import { ImageLightbox } from "./image-lightbox";

export function GalleryGrid() {
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <section className="container mx-auto px-4 py-12 md:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4"
        >
          {galleryImages.map((image, index) => {
            // Create masonry effect by varying heights
            const isPortrait = image.height > image.width;
            const isTall = index % 7 === 0 || index % 11 === 0;

            return (
              <motion.div
                key={image.id}
                variants={itemVariants}
                className={`group relative cursor-pointer overflow-hidden border-2 border-white/20 bg-black transition-all hover:border-yellow-400 ${
                  isPortrait || isTall ? "row-span-2" : ""
                }`}
                onClick={() => setSelectedImageId(image.id)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    placeholder="blur"
                    blurDataURL={image.blurDataURL}
                    loading={index < 6 ? "eager" : "lazy"}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-sm font-bold uppercase text-white md:text-base">
                        {image.title}
                      </h3>
                      {image.description && (
                        <p className="mt-1 text-xs text-white/80">
                          {image.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Lightbox Modal */}
      {selectedImageId && (
        <ImageLightbox
          imageId={selectedImageId}
          onClose={() => setSelectedImageId(null)}
        />
      )}
    </>
  );
}

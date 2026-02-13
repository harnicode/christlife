"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { galleryImages } from "@christlife/lib/gallery-data";
import { ImageLightbox } from "./image-lightbox";

export function GalleryGrid() {
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [imageRotations, setImageRotations] = useState<Record<string, number>>(
    {},
  );

  const updateRotation = (id: string, rotation: number) => {
    setImageRotations((prev) => ({ ...prev, [id]: rotation }));
  };

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
          className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              className="group relative mb-3 cursor-pointer overflow-hidden break-inside-avoid border-2 border-white/20 bg-black transition-all hover:border-yellow-400 md:mb-4"
              onClick={() => setSelectedImageId(image.id)}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={600}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
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
          ))}
        </motion.div>
      </section>

      {/* Lightbox Modal */}
      {selectedImageId && (
        <ImageLightbox
          imageId={selectedImageId}
          rotations={imageRotations}
          onRotate={updateRotation}
          onClose={() => setSelectedImageId(null)}
        />
      )}
    </>
  );
}

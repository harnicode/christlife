"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { GalleryImage } from "@christlife/lib/gallery-data";
import { ImageLightbox } from "./image-lightbox";

export interface PaginationData {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export function GalleryGrid({
  images,
  pagination,
}: {
  images: GalleryImage[];
  pagination?: PaginationData | null;
}) {
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
          {images.map((image, index) => (
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
                  className="w-full object-cover transition-all duration-500 group-hover:scale-110"
                  style={{
                    transform: `rotate(${imageRotations[image.id] || 0}deg)`,
                  }}
                  loading={index < 6 ? "eager" : "lazy"}
                  unoptimized
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

        {/* Pagination Controls */}
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            {pagination.currentPage > 1 ? (
              <Link
                href={`/gallery?page=${pagination.currentPage - 1}`}
                className="rounded-md border border-white/20 bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:border-yellow-400 hover:text-yellow-400 md:text-base"
              >
                Previous
              </Link>
            ) : (
              <span className="cursor-not-allowed rounded-md border border-white/10 bg-black px-4 py-2 text-sm font-medium text-white/50 md:text-base">
                Previous
              </span>
            )}

            <div className="mx-2 flex items-center gap-1">
              <span className="text-sm text-white/80 md:text-base">
                Page{" "}
                <span className="font-bold text-white">
                  {pagination.currentPage}
                </span>{" "}
                of{" "}
                <span className="font-bold text-white">
                  {pagination.totalPages}
                </span>
              </span>
            </div>

            {pagination.currentPage < pagination.totalPages ? (
              <Link
                href={`/gallery?page=${pagination.currentPage + 1}`}
                className="rounded-md border border-white/20 bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:border-yellow-400 hover:text-yellow-400 md:text-base"
              >
                Next
              </Link>
            ) : (
              <span className="cursor-not-allowed rounded-md border border-white/10 bg-black px-4 py-2 text-sm font-medium text-white/50 md:text-base">
                Next
              </span>
            )}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {selectedImageId && (
        <ImageLightbox
          images={images}
          imageId={selectedImageId}
          rotations={imageRotations}
          onRotate={updateRotation}
          onClose={() => setSelectedImageId(null)}
        />
      )}
    </>
  );
}

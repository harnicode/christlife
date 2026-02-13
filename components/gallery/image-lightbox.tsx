"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages } from "@christlife/lib/gallery-data";

interface ImageLightboxProps {
  imageId: string;
  onClose: () => void;
}

export function ImageLightbox({ imageId, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(
    galleryImages.findIndex((img) => img.id === imageId),
  );
  const [direction, setDirection] = useState(0);

  const currentImage = galleryImages[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === galleryImages.length - 1;

  // Navigation functions
  const goToPrevious = useCallback(() => {
    if (!isFirst) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [isFirst]);

  const goToNext = useCallback(() => {
    if (!isLast) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [isLast]);

  const goToImage = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex],
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, goToPrevious, goToNext]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Swipe gesture handling
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const swipeThreshold = 50;

    if (info.offset.x > swipeThreshold) {
      goToPrevious();
    } else if (info.offset.x < -swipeThreshold) {
      goToNext();
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-black"
      onClick={onClose}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 p-4">
        <div className="text-sm font-medium text-white">
          {currentIndex + 1} / {galleryImages.length}
        </div>
        <button
          onClick={onClose}
          className="rounded-sm p-2 text-white transition-colors hover:bg-white/10 hover:text-yellow-400"
          aria-label="Close gallery"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Main Image Area */}
      <div
        className="relative flex-1 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentImage.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 flex items-center justify-center p-4"
          >
            <div className="relative h-full w-full">
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
                quality={95}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons - Desktop */}
        <button
          onClick={goToPrevious}
          disabled={isFirst}
          className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-sm border-2 border-white bg-black/50 p-3 text-white backdrop-blur-sm transition-all hover:border-yellow-400 hover:text-yellow-400 disabled:opacity-30 md:block"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={goToNext}
          disabled={isLast}
          className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-sm border-2 border-white bg-black/50 p-3 text-white backdrop-blur-sm transition-all hover:border-yellow-400 hover:text-yellow-400 disabled:opacity-30 md:block"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Image Info */}
      <div className="border-t border-white/10 bg-black p-4">
        <h2 className="text-lg font-bold uppercase text-white">
          {currentImage.title}
        </h2>
        {currentImage.description && (
          <p className="mt-1 text-sm text-white/70">
            {currentImage.description}
          </p>
        )}
      </div>

      {/* Thumbnail Strip */}
      <div
        className="border-t border-white/10 bg-black p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-2 overflow-x-auto pb-2">
          {galleryImages.map((image, index) => (
            <button
              key={image.id}
              onClick={(e) => {
                e.stopPropagation();
                goToImage(index);
              }}
              className={`relative h-16 w-16 shrink-0 overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? "border-yellow-400"
                  : "border-white/20 hover:border-white/40"
              }`}
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

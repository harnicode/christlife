"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function GalleryHeader() {
  return (
    <header className="relative border-b border-white/10 bg-black">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-yellow-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Yellow accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 h-1 w-24 origin-left bg-yellow-400"
        />

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-4 text-5xl font-bold uppercase tracking-tight text-white md:text-7xl"
        >
          Gallery
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl text-lg text-white/80"
        >
          Moments from our worship services, community events, and church family
        </motion.p>
      </div>
    </header>
  );
}

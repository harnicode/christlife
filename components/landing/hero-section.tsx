"use client";

import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      {/* Geometric background elements */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-400 rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white rounded-full blur-3xl opacity-10"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Diagonal accent line */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-0 right-0 w-1 h-full bg-yellow-400 origin-top-right rotate-12 opacity-30" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <motion.div
              className="inline-block mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="px-4 py-2 bg-yellow-400 text-black font-bold text-sm uppercase tracking-wider">
                ChristLife City Cathedral
              </div>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Welcome
              <br />
              <span className="text-yellow-400">Home</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A place where faith comes alive, community thrives, and lives are
              transformed
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <a
                href="#welcome"
                className="group relative px-8 py-4 bg-yellow-400 text-black font-bold text-lg overflow-hidden transition-all hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black"
              >
                <span className="relative z-10">Discover More</span>
              </a>

              <a
                href="#service-times"
                className="px-8 py-4 border-2 border-white text-white font-bold text-lg transition-all hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              >
                Service Times
              </a>
            </motion.div>
          </div>

          {/* Visual Element */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative w-full aspect-square">
              {/* Geometric shapes */}
              <motion.div
                className="absolute inset-0 border-4 border-yellow-400"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-8 border-4 border-white opacity-50"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl font-black text-white opacity-10">
                    ✝
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <a
          href="#welcome"
          className="flex flex-col items-center text-gray-400 transition-colors hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded-full p-2"
          aria-label="Scroll to content"
        >
          <span className="text-sm font-medium mb-2 uppercase tracking-wider">
            Scroll
          </span>
          <ArrowDown className="h-6 w-6" />
        </a>
      </motion.div>
    </section>
  );
}

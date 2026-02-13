"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

export function WelcomeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="welcome" ref={ref} className="relative py-32 px-4 bg-white">
      {/* Large background text */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-gray-100 whitespace-nowrap">
          WELCOME
        </div>
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Asymmetric grid layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left column - Mission statement */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="sticky top-24">
              <div className="w-16 h-1 bg-yellow-400 mb-6" />

              <h2 className="text-5xl md:text-6xl font-black text-black leading-tight mb-8">
                You&apos;re
                <br />
                Welcome
                <br />
                <span className="text-yellow-400">Here</span>
              </h2>

              <div className="p-8 bg-black text-white">
                <div className="text-xs uppercase tracking-widest mb-3 text-yellow-400">
                  Our Mission
                </div>
                <p className="text-xl font-bold leading-relaxed">
                  We Manifest, Model and Minister the very Life of Christ as a
                  Church and a People Globally.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right column - Content */}
          <motion.div
            className="lg:col-span-7 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-2xl text-gray-800 leading-relaxed font-light">
                CHRISTLIFE CITY CATHEDRAL stands as a beacon of faith. We are a
                place of prayer, peace and joy to all who join us.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                Our church is richly diverse, with people of different ages and
                backgrounds coming together to worship and serve together. We
                welcome all individuals seeking God&apos;s love and our doors
                are open to every soul seeking to welcome Jesus into their
                heart.
              </p>
            </div>

            <motion.div
              className="pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <a
                href="#connect"
                className="inline-block px-12 py-5 bg-yellow-400 text-black font-bold text-lg uppercase tracking-wider transition-all hover:bg-black hover:text-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-offset-4"
              >
                Connect With Us →
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

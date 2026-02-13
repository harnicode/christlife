"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { churchInfo } from "@christlife/lib/church-info";

export function ServiceTimesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="service-times"
      ref={ref}
      className="relative py-32 px-4 bg-black text-white"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-20 h-1 bg-yellow-400 mb-6" />
          <h2 className="text-5xl md:text-7xl font-black">
            Join Us
            <br />
            <span className="text-yellow-400">This Week</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-0">
          {churchInfo.services.weekly.map((service, index) => (
            <motion.div
              key={service.day}
              className={`relative p-10 border-2 border-white ${
                index === 0
                  ? "md:border-r-0"
                  : index === 1
                    ? "md:border-r-0"
                    : ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15 + 0.2,
                ease: "easeOut",
              }}
            >
              <div className="text-sm uppercase tracking-widest text-yellow-400 mb-4">
                {service.day}
              </div>

              <div className="text-3xl font-black mb-2 group-hover:text-yellow-400 transition-colors">
                {service.time}
              </div>

              <div className="text-lg font-bold text-white mb-2">
                {service.name}
              </div>

              <div className="text-sm text-gray-400 leading-relaxed">
                {service.description}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <p className="text-gray-400 mb-6 text-lg">
            Can&apos;t make it in person? Join us online!
          </p>
          <a
            href="#online"
            className="inline-block px-12 py-5 bg-white text-black font-bold text-lg uppercase tracking-wider transition-all hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-offset-4 focus:ring-offset-black"
          >
            Watch Live Stream →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Calendar, Clock } from "lucide-react";
import { churchInfo } from "@christlife/lib/church-info";

export function EventsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="events" ref={ref} className="relative py-32 px-4 bg-white">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-20 h-1 bg-yellow-400 mb-6" />
          <h2 className="text-5xl md:text-7xl font-black text-black">
            Monthly
            <br />
            <span className="text-yellow-400">Programs</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {churchInfo.programs.monthly.map((program, index) => (
            <motion.div
              key={program.name}
              className="group relative p-10 border-4 border-black transition-all hover:bg-black hover:text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2 + 0.2,
                ease: "easeOut",
              }}
            >
              {/* Geometric accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-400 -mt-4 -mr-4 transition-transform group-hover:scale-110" />

              <div className="relative">
                {/* Icon */}
                <div className="flex h-16 w-16 items-center justify-center bg-yellow-400 mb-6 group-hover:bg-white transition-colors">
                  <Calendar className="h-8 w-8 text-black" />
                </div>

                {/* Program Name */}
                <h3 className="text-4xl font-black mb-4 group-hover:text-yellow-400 transition-colors">
                  {program.name}
                </h3>

                {/* Schedule */}
                <div className="flex items-center gap-2 mb-2 text-gray-600 group-hover:text-gray-300">
                  <Calendar className="h-5 w-5" />
                  <span className="font-bold">{program.schedule}</span>
                </div>

                {/* Time */}
                <div className="flex items-center gap-2 mb-6 text-gray-600 group-hover:text-gray-300">
                  <Clock className="h-5 w-5" />
                  <span className="font-bold">{program.time}</span>
                </div>

                {/* Description */}
                <p className="text-base leading-relaxed text-gray-600 group-hover:text-gray-300 transition-colors">
                  {program.description}
                </p>

                {/* Call to action */}
                <div className="mt-6 flex items-center text-sm font-bold uppercase tracking-wider">
                  <span className="group-hover:translate-x-2 transition-transform">
                    Join Us →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <p className="text-gray-600 text-lg">
            Mark your calendars and join us for these special gatherings!
          </p>
        </motion.div>
      </div>
    </section>
  );
}

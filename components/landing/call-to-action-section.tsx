"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Users, Heart, BookOpen, Sparkles } from "lucide-react";

const ctaCards = [
  {
    icon: Users,
    title: "Join a Small Group",
    description:
      "Connect with others in a welcoming, intimate setting where faith and friendship grow together.",
    href: "#groups",
  },
  {
    icon: Heart,
    title: "Serve Your Community",
    description:
      "Make a difference through our outreach programs and volunteer opportunities.",
    href: "#serve",
  },
  {
    icon: BookOpen,
    title: "Explore the Bible",
    description:
      "Deepen your understanding through our Bible studies and discipleship programs.",
    href: "#bible-study",
  },
  {
    icon: Sparkles,
    title: "Plan Your Visit",
    description:
      "New here? Let us know you&apos;re coming and we&apos;ll make sure you feel right at home.",
    href: "#visit",
  },
];

export function CallToActionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="connect" ref={ref} className="relative py-32 px-4 bg-white">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-20 h-1 bg-yellow-400 mb-6" />
          <h2 className="text-5xl md:text-7xl font-black text-black">
            Take Your
            <br />
            <span className="text-yellow-400">Next Step</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {ctaCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.a
                key={card.title}
                href={card.href}
                className="group relative p-10 border-4 border-black transition-all hover:bg-black hover:text-white focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-offset-4"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{
                  duration: 0.8,
                  delay: index * 0.1 + 0.2,
                  ease: "easeOut",
                }}
              >
                <div className="flex items-start gap-6">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-yellow-400 group-hover:bg-white transition-colors">
                    <Icon className="h-8 w-8 text-black" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-black mb-3 group-hover:text-yellow-400 transition-colors">
                      {card.title}
                    </h3>

                    <p className="text-base leading-relaxed text-gray-600 group-hover:text-gray-300 transition-colors">
                      {card.description}
                    </p>

                    <div className="mt-4 flex items-center text-sm font-bold uppercase tracking-wider">
                      <span className="group-hover:translate-x-2 transition-transform">
                        Learn More →
                      </span>
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

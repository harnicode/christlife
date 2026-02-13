"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Phone, MapPin, Mail } from "lucide-react";
import { churchInfo } from "@christlife/lib/church-info";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Google Maps embed URL using digital code
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(churchInfo.location.digitalCode + " Ghana")}`;

  return (
    <section
      id="contact"
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
            Visit
            <br />
            <span className="text-yellow-400">Us</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="space-y-8">
              {/* Location */}
              <div className="border-l-4 border-yellow-400 pl-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-yellow-400">
                    <MapPin className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-2 uppercase tracking-wider">
                      Location
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {churchInfo.location.address}
                      <br />
                      {churchInfo.location.city}, {churchInfo.location.country}
                    </p>
                    <p className="text-yellow-400 font-bold mt-2">
                      Digital Code: {churchInfo.location.digitalCode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="border-l-4 border-yellow-400 pl-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-yellow-400">
                    <Phone className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-2 uppercase tracking-wider">
                      Phone
                    </h3>
                    <div className="space-y-1">
                      {churchInfo.contact.phones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone}`}
                          className="block text-gray-300 hover:text-yellow-400 transition-colors font-medium"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="border-l-4 border-yellow-400 pl-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-yellow-400">
                    <Mail className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-2 uppercase tracking-wider">
                      Email
                    </h3>
                    <a
                      href={`mailto:${churchInfo.contact.email}`}
                      className="text-gray-300 hover:text-yellow-400 transition-colors font-medium"
                    >
                      {churchInfo.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Get Directions Button */}
              <div className="pt-4">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(churchInfo.location.digitalCode)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-yellow-400 text-black font-bold text-lg uppercase tracking-wider transition-all hover:bg-white focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-offset-4 focus:ring-offset-black"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            className="relative h-[500px] border-4 border-white overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ChristLife City Cathedral Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

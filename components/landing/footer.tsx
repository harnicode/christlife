"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { churchInfo } from "@christlife/lib/church-info";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t-4 border-yellow-400">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <h3 className="text-2xl font-black mb-6 text-yellow-400">
              {churchInfo.name}
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              {churchInfo.tagline}
            </p>
            {/* Social Media */}
            <div className="flex gap-4">
              <a
                href={churchInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center border-2 border-white text-white transition-all hover:bg-yellow-400 hover:border-yellow-400 hover:text-black"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={churchInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center border-2 border-white text-white transition-all hover:bg-yellow-400 hover:border-yellow-400 hover:text-black"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={churchInfo.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center border-2 border-white text-white transition-all hover:bg-yellow-400 hover:border-yellow-400 hover:text-black"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-black mb-6 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#welcome"
                  className="text-gray-400 hover:text-yellow-400 transition-colors font-medium"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#service-times"
                  className="text-gray-400 hover:text-yellow-400 transition-colors font-medium"
                >
                  Service Times
                </a>
              </li>
              <li>
                <a
                  href="#events"
                  className="text-gray-400 hover:text-yellow-400 transition-colors font-medium"
                >
                  Events
                </a>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-gray-400 hover:text-yellow-400 transition-colors font-medium"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-yellow-400 transition-colors font-medium"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Service Times */}
          <div>
            <h3 className="text-xl font-black mb-6 uppercase tracking-wider">
              Service Times
            </h3>
            <ul className="space-y-3">
              {churchInfo.services.weekly.map((service) => (
                <li key={service.day}>
                  <div className="text-yellow-400 font-bold text-sm">
                    {service.day}
                  </div>
                  <div className="text-gray-400 text-sm">{service.time}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-black mb-6 uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-yellow-400 shrink-0 mt-1" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  {churchInfo.location.address}, {churchInfo.location.city}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-yellow-400 shrink-0 mt-1" />
                <div className="space-y-1">
                  {churchInfo.contact.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone}`}
                      className="block text-gray-400 hover:text-yellow-400 transition-colors text-sm"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-yellow-400 shrink-0 mt-1" />
                <a
                  href={`mailto:${churchInfo.contact.email}`}
                  className="text-gray-400 hover:text-yellow-400 transition-colors text-sm"
                >
                  {churchInfo.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} {churchInfo.name}. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Built with faith and purpose
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

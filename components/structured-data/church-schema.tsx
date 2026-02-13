"use client";

import { churchInfo } from "@christlife/lib/church-info";

export function ChurchSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: churchInfo.name,
    description: churchInfo.tagline,
    url: "https://christlifecathedral.org",
    telephone: churchInfo.contact.phones,
    email: churchInfo.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: churchInfo.location.address,
      addressLocality: churchInfo.location.city,
      addressCountry: churchInfo.location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: churchInfo.location.coordinates.lat,
      longitude: churchInfo.location.coordinates.lng,
    },
    openingHoursSpecification: churchInfo.services.weekly.map((service) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: service.day,
      opens: service.time.split(" - ")[0],
      closes: service.time.split(" - ")[1],
    })),
    sameAs: [
      churchInfo.social.facebook,
      churchInfo.social.instagram,
      churchInfo.social.youtube,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

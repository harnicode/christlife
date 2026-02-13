import type { Metadata } from "next";
import { GalleryGrid } from "@christlife/components/gallery/gallery-grid";
import { GalleryHeader } from "@christlife/components/gallery/gallery-header";
import { StructuredData } from "@christlife/components/gallery/structured-data";

export const metadata: Metadata = {
  title: "Gallery | ChristLife City Cathedral - Church Photos & Events",
  description:
    "Explore photos from ChristLife City Cathedral. View our worship services, community events, and church family moments.",
  keywords: [
    "ChristLife City Cathedral",
    "church gallery",
    "worship photos",
    "community events",
    "church photos",
  ],
  authors: [{ name: "ChristLife City Cathedral" }],
  openGraph: {
    title: "Gallery | ChristLife City Cathedral",
    description:
      "Explore photos from ChristLife City Cathedral. View our worship services, community events, and church family moments.",
    url: "https://christlifecitycathedral.org/gallery",
    siteName: "ChristLife City Cathedral",
    images: [
      {
        url: "/images/gallery/worship-service-1.jpg",
        width: 1920,
        height: 1280,
        alt: "ChristLife City Cathedral worship service",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | ChristLife City Cathedral",
    description:
      "Explore photos from ChristLife City Cathedral. View our worship services, community events, and church family moments.",
    images: ["/images/gallery/worship-service-1.jpg"],
  },
  alternates: {
    canonical: "https://christlifecitycathedral.org/gallery",
  },
};

export default function GalleryPage() {
  return (
    <>
      <StructuredData />
      <main className="min-h-screen bg-black">
        <GalleryHeader />
        <GalleryGrid />
      </main>
    </>
  );
}
